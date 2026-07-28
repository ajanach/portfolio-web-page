/** @jsxImportSource react */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link, Image } from '@react-pdf/renderer';
import { experience, education, certifications, personalInfo, skills, projects } from '../lib/cv-data';
import { fileURLToPath } from 'url';
import path from 'path';

void React;

const fontsDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public/fonts');

// Register Inter — premium, modern engineering font
Font.register({
  family: 'Inter',
  fonts: [
    { src: `${fontsDir}/Inter-Regular.ttf`, fontWeight: 400 },
    { src: `${fontsDir}/Inter-SemiBold.ttf`, fontWeight: 600 },
    { src: `${fontsDir}/Inter-Bold.ttf`, fontWeight: 700 },
  ]
});

// Disable automatic word hyphenation
Font.registerHyphenationCallback((word: string) => [word]);

const COLORS = {
  // Sidebar — GitHub dark
  sidebarBg: '#0D1117',
  sidebarText: '#C9D1D9',
  sidebarHeading: '#8B949E',
  sidebarName: '#F0F6FC',
  sidebarAccent: '#58A6FF',
  sidebarDivider: '#21262D',
  // Main area
  mainText: '#1F2937',
  mainSecondary: '#6B7280',
  mainHeading: '#0F172A',
  mainAccent: '#0EA5E9',
  mainAccentLight: '#38BDF8',
  mainDivider: '#E5E7EB',
  mainHighlightBg: '#F0F9FF',
  mainHighlightBorder: '#0EA5E9',
  white: '#FFFFFF',
  bulletDot: '#0EA5E9',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 9.5,
    backgroundColor: COLORS.white,
    paddingTop: 0,
    paddingBottom: 0,
  },
  // ─── Sidebar ───
  sidebarBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '33%',
    backgroundColor: COLORS.sidebarBg,
    zIndex: -1,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '33%',
    paddingLeft: 22,
    paddingRight: 16,
    paddingTop: 32,
    color: COLORS.sidebarText,
  },
  sidebarSection: {
    marginBottom: 18,
  },
  // Name block at top of sidebar
  nameBlock: {
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.sidebarDivider,
    alignItems: 'center',
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 12,
    objectFit: 'cover',
  },
  name: {
    fontSize: 15,
    fontWeight: 700,
    color: COLORS.sidebarName,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 9,
    color: COLORS.sidebarAccent,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  // Sidebar section headers
  sectionHeaderSidebar: {
    fontSize: 8,
    fontWeight: 700,
    color: COLORS.sidebarHeading,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  dividerSidebar: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.sidebarDivider,
    marginBottom: 10,
  },
  // Contact
  contactItem: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactLabel: {
    fontSize: 7.5,
    color: COLORS.sidebarHeading,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    width: 50,
  },
  contactText: {
    fontSize: 8.5,
    color: COLORS.sidebarText,
    textDecoration: 'none',
  },
  // Skills
  skillCategory: {
    fontWeight: 700,
    fontSize: 9,
    color: COLORS.sidebarName,
    marginBottom: 2,
  },
  skillTech: {
    fontSize: 8,
    color: COLORS.sidebarText,
    marginBottom: 8,
    lineHeight: 1.5,
  },
  // Certs
  certItem: {
    marginBottom: 8,
  },
  certName: {
    fontWeight: 700,
    fontSize: 8.5,
    color: COLORS.sidebarName,
    marginBottom: 2,
    textDecoration: 'none',
  },
  certMeta: {
    flexDirection: 'row',
    gap: 6,
  },
  certDetails: {
    fontSize: 7,
    color: COLORS.sidebarHeading,
  },
  // ─── Main Content ───
  main: {
    marginLeft: '33%',
    paddingLeft: 24,
    paddingRight: 28,
    paddingTop: 32,
    color: COLORS.mainText,
  },
  sectionHeaderMain: {
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.mainHeading,
    marginTop: 16,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  sectionHeaderMainFirst: {
    fontSize: 11,
    fontWeight: 700,
    color: COLORS.mainHeading,
    marginTop: 0,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  dividerMain: {
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.mainAccent,
    marginBottom: 12,
  },
  summary: {
    fontSize: 9.5,
    lineHeight: 1.65,
    marginBottom: 4,
    color: COLORS.mainText,
  },
  // Experience / Education items
  itemGroup: {
    marginBottom: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  itemTitle: {
    fontWeight: 700,
    fontSize: 11,
    color: COLORS.mainHeading,
  },
  itemDate: {
    fontSize: 8,
    color: COLORS.mainAccent,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemCompany: {
    fontSize: 9,
    color: COLORS.mainSecondary,
    marginBottom: 5,
    fontWeight: 600,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 14,
    fontSize: 7,
    color: COLORS.bulletDot,
    marginTop: 2.5,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: COLORS.mainText,
  },
  // Education highlights
  pubHighlight: {
    backgroundColor: COLORS.mainHighlightBg,
    padding: 7,
    borderLeftWidth: 2.5,
    borderLeftColor: COLORS.mainHighlightBorder,
    marginTop: 3,
    marginBottom: 3,
  },
  pubHighlightText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: COLORS.mainText,
  },
});

interface CVDocumentProps {
  profileImage: string;
}

export const CVDocument = ({ profileImage }: CVDocumentProps) => (
  <Document
    title="Antonio Janach - CV"
    author={personalInfo.name}
    subject="DevOps & Cloud Engineer - Curriculum Vitae"
    keywords="DevOps, Kubernetes, Azure, Terraform, GitOps, RHCE, IEEE"
    creator="janach.cloud"
  >
    <Page size="A4" style={styles.page}>
      {/* Repeating Sidebar Background */}
      <View style={styles.sidebarBackground} fixed />

      {/* ─── Sidebar Content ─── */}
      <View style={styles.sidebar}>
        
        {/* Name & Title */}
        <View style={styles.nameBlock}>
          <Image src={profileImage} style={styles.profileImage} />
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.role}</Text>
        </View>

        {/* Contact */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sectionHeaderSidebar}>Contact</Text>
          <View style={styles.dividerSidebar} />
          
          <View style={styles.contactItem}>
            <Link src={`mailto:${personalInfo.email}`} style={styles.contactText}>{personalInfo.email}</Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={`https://${personalInfo.website}`} style={styles.contactText}>{personalInfo.website}</Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={`https://${personalInfo.github}`} style={styles.contactText}>{personalInfo.github}</Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={`https://${personalInfo.linkedin}`} style={styles.contactText}>{personalInfo.linkedin}</Link>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>{personalInfo.location}</Text>
          </View>
        </View>

        {/* Technical Stack */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sectionHeaderSidebar}>Technical Stack</Text>
          <View style={styles.dividerSidebar} />
          
          {skills.map((skill, idx) => (
            <View key={idx}>
              <Text style={styles.skillCategory}>{skill.label}</Text>
              <Text style={styles.skillTech}>{skill.tech}</Text>
            </View>
          ))}
        </View>

        {/* Certifications */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sectionHeaderSidebar}>Certifications</Text>
          <View style={styles.dividerSidebar} />
          
          {certifications.map((cert, idx) => (
            <View key={idx} style={styles.certItem}>
              <Link src={cert.link} style={styles.certName}>{cert.name}</Link>
              <Text style={styles.certDetails}>Issued: {cert.issued}  •  Expires: {cert.expires}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ─── Main Content Area ─── */}
      <View style={styles.main}>

        {/* About Me */}
        <Text style={styles.sectionHeaderMainFirst}>About Me</Text>
        <View style={styles.dividerMain} />
        <Text style={styles.summary}>{personalInfo.summary}</Text>

        {/* Experience */}
        <Text style={styles.sectionHeaderMain}>Experience</Text>
        <View style={styles.dividerMain} />
        {experience.map((exp, idx) => (
          <View key={idx} wrap={false} style={styles.itemGroup}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{exp.title}</Text>
              <Text style={styles.itemDate}>{exp.date}</Text>
            </View>
            <Text style={styles.itemCompany}>{exp.company}</Text>
            {exp.points.map((point, pIdx) => (
              <View key={pIdx} style={styles.bulletPoint}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{point}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionHeaderMain}>Projects</Text>
        <View style={styles.dividerMain} />
        {projects.map((proj, idx) => (
          <View key={idx} wrap={false} style={styles.itemGroup}>
            <View style={styles.itemHeader}>
              <View style={{flex: 1, paddingRight: 8}}>
                <Text style={styles.itemTitle}>{proj.title}</Text>
              </View>
              <Text style={{...styles.itemDate, flexShrink: 0}}>{proj.date}</Text>
            </View>
            <View style={styles.pubHighlight}>
              <Link src={proj.url} style={{...styles.pubHighlightText, textDecoration: 'none'}}>
                {proj.summary}
              </Link>
            </View>
          </View>
        ))}

        {/* Education */}
        <View break>
        <Text style={styles.sectionHeaderMain}>Education</Text>
        <View style={styles.dividerMain} />
        {education.map((edu, idx) => (
          <View key={idx} wrap={false} style={styles.itemGroup}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{edu.title}</Text>
              <Text style={styles.itemDate}>{edu.date}</Text>
            </View>
            <Text style={styles.itemCompany}>{edu.company}</Text>
            {edu.pdfPoints.map((pointObj, pIdx) => {
              const isHighlight = pointObj.text.includes('MIPRO 2025') || pointObj.text.includes('Thesis:');
              
              if (isHighlight) {
                return (
                  <View key={pIdx} style={styles.pubHighlight}>
                    <Link src={pointObj.link} style={{...styles.pubHighlightText, textDecoration: 'none'}}>
                      {pointObj.text}
                    </Link>
                  </View>
                );
              }
              return (
                <View key={pIdx} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Link src={pointObj.link} style={{...styles.bulletText, textDecoration: 'none', color: COLORS.mainText}}>
                    {pointObj.text}
                  </Link>
                </View>
              );
            })}
          </View>
        ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default CVDocument;
