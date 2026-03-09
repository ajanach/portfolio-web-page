# Janach Cloud Portfolio

![License](https://img.shields.io/github/license/ajanach/portfolio-web-page?color=yellow)
![Astro](https://img.shields.io/badge/Astro-v5.16-orange.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-v3.4.19-38bdf8.svg)

A professional DevOps & Cloud Engineer portfolio built with **Astro 5** and **Tailwind CSS**. Features a unique interactive terminal interface, content collections for work and blog posts, and a high-performance minimalist design.

## Features

- **Interactive Terminal**: A fully functional, Zsh-like terminal emulator accessible via `Cmd+K` or the UI button. Supports commands like `help`, `neofetch`, `status`, and file navigation.
- **Content Collections**: Type-safe management for `work` projects and `blog` posts using Astro's content layer.
- **Responsive Design**: Mobile-first layout with smooth transitions and glassmorphism effects.
- **Dark Mode**: Native dark theme optimized for readability and "hacker" aesthetics.
- **SEO Optimized**: Built-in sitemap, metadata, and Open Graph support.

## Tech Stack

- **Framework**: [Astro 5](https://astro.build/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Integrations**: MDX, Sitemap, SolidJS
- **Deployment**: GitHub Actions -> GitHub Pages

## Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ajanach/portfolio-web-page.git
   cd portfolio-web-page
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:4321` to see your site.

## Build & Deployment

This project is configured for **automated deployment** to GitHub Pages using GitHub Actions.

### CV PDF Generation

The downloadable PDF is **generated at build time** from `src/lib/cv-data.ts`.

**How it works:**
1. `tsx scripts/generate-cv-pdf.tsx` runs before Astro build
2. Profile image optimized: `public/profile.png` → 400×400 JPEG @ quality 85 (mozjpeg, lanczos3) → base64
3. `@react-pdf/renderer` renders `CVDocument.tsx` with optimized image
4. Result: `public/Antonio_Janach_CV.pdf` (~48KB)
5. Astro copies it to `dist/` during build

**Local testing:**
```bash
npm run generate:cv      # Generate PDF only
npm run build            # Full pipeline (generate → check → build)
```

**Editing CV content:**
Edit `src/lib/cv-data.ts` — next build auto-regenerates the PDF.

**CI verification:**
GitHub Actions asserts the PDF exists in `dist/` and is under 500KB (safety margin well below the 2MB ATS ceiling).

### Manual Build (Windows Note)
If building locally on Windows, you may encounter file locking issues with Rollup. It is recommended to rely on the CI/CD pipeline or build in a Linux environment (WSL).

### CI/CD Pipeline
The workflow in `.github/workflows/deploy.yml` will automatically:
1. Checkout code
2. Install dependencies
3. Build the static site (`npm run build`)
4. Deploy the `dist/` folder to GitHub Pages

## License

Copyright &copy; 2026 [Antonio Janach](https://janach.cloud).
Based on the Astro Sphere template by Mark Horn.
Licensed under the [MIT License](LICENSE).
