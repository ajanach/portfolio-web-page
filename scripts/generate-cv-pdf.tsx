/** @jsxImportSource react */
import { renderToFile } from '@react-pdf/renderer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import React from 'react';
import { CVDocument } from '../src/components/CVDocument';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const generatePdf = async () => {
  try {
    console.log('🔄 Optimizing profile image...');
    
    // 1. Optimize profile image with sharp (400×400 = 2× density for 72pt PDF render, sharp at print/zoom)
    const optimizedBase64 = await sharp(path.join(projectRoot, 'public/profile.webp'))
      .resize(400, 400, {
        fit: 'cover',
        position: 'centre',
        kernel: sharp.kernel.lanczos3
      })
      .jpeg({
        quality: 85,
        progressive: true,
        mozjpeg: true
      })
      .toBuffer()
      .then(b => `data:image/jpeg;base64,${b.toString('base64')}`);
      
    console.log('🔄 Generating PDF document...');

    // 2. Render PDF with optimized image
    const outputPath = path.join(projectRoot, 'public/Antonio_Janach_CV.pdf');
    await renderToFile(<CVDocument profileImage={optimizedBase64} />, outputPath);

    // 3. Verify size constraint
    const { size } = fs.statSync(outputPath);
    console.log(`✅ Generated: ${outputPath} (${(size / 1024).toFixed(1)} KB)`);
    
    if (size > 524288) { // 500KB limit (catches regressions well before ATS 2MB ceiling)
      console.error(`❌ PDF exceeds 500KB limit: ${size} bytes`);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Failed to generate PDF:', error);
    process.exit(1);
  }
};

generatePdf();
