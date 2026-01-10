---
title: "Portfolio Website: Astro Framework with GitHub Pages Deployment"
summary: "Modern portfolio website built with Astro framework and customized Astro Sphere template, deployed to GitHub Pages via automated GitHub Actions CI/CD pipeline."
date: "2026-01-10"
tags:
  - Side Projects
draft: false
demoUrl: ""
repoUrl: ""
---

# Timeline and Details

| Start date | Migration date | Status | Associated with |
|------------|----------------|--------|-----------------|
| March 2023 | January 2026 | Active (ongoing) | Personal Portfolio |

## Overview

This project represents a significant evolution of my personal digital presence, transitioning from a basic Hugo-based static site to a dynamic, high-performance web application built with the **Astro** framework. 

The primary motivation for this migration was to leverage Astro's "Island Architecture" for superior performance and to gain finer control over the UI/UX using modern component-based development. I utilized the "Astro Sphere" template as a foundation but heavily customized it to align with my "dark mode" aesthetic and professional branding, including a custom terminal emulator component.

The entire deployment workflow is automated using **GitHub Actions**, ensuring that every commit to the `main` branch is instantly built, verified, and deployed to **GitHub Pages**.

## Technical Architecture

### Frontend Stack
- **Astro**: A next-generation web framework optimizing for speed by shipping zero JavaScript by default.
- **TypeScript**: Ensuring type safety and code quality across components and logic.
- **Tailwind CSS**: Utility-first CSS framework for rapid, responsive, and consistent styling.
- **Astro Content Collections**: Type-safe content management for portfolio projects and blog posts.
- **Responsive Design**: Mobile-first approach ensuring perfect rendering on all devices.

### Deployment Pipeline
- **Hosting**: GitHub Pages (Static Hosting)
- **CI/CD**: GitHub Actions
- **Custom Domain**: Configured via GitHub Pages settings with CNAME record.
- **Automation**: Automated dependency installation, build generation, and artifact upload.

## GitHub Actions CI/CD Pipeline

The Continuous Deployment pipeline is defined in `.github/workflows/deploy.yml`. It is triggered on every push to the `main` branch or manually via workflow dispatch.

**Key Steps:**
1. **Checkout**: Pulls the latest code from the repository.
2. **Setup Node**: Configures Node.js v20 environment.
3. **Install**: Runs `npm ci` for a clean install of dependencies.
4. **Build**: Executes `npm run build` to generate the static site in the `./dist` folder.
5. **Deploy**: Uploads the `./dist` artifact and deploys it to GitHub Pages.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: |
           npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Customizations & Features

**Template Modifications**:
- Dark mode aesthetic with custom color scheme and professional branding
- Custom terminal emulator component for interactive experience
- Restructured project showcase layout with enhanced navigation
- Optimized mobile responsiveness for all device sizes

**Performance Optimizations**:
- Zero JavaScript by default leveraging Astro Islands architecture
- Optimized image loading with lazy loading strategy
- Minimal CSS bundle via Tailwind CSS purging
- Fast build times with incremental builds

**Content Management**:
- Type-safe Astro Content Collections for projects and posts
- Markdown-based content with frontmatter metadata
- Dynamic project filtering by tags
- Automated sitemap generation

## Tech Stack

**Frontend**: Astro, TypeScript, Tailwind CSS  
**Content**: Markdown, Astro Content Collections  
**Deployment**: GitHub Actions, GitHub Pages  
**Tooling**: Node.js 20, npm, Git

## Skills Demonstrated

Astro framework, static site generation, TypeScript, Tailwind CSS, component-based architecture, CI/CD pipeline design, GitHub Actions, automated deployment, responsive web design, performance optimization, template customization, Git workflow, dark mode implementation, content management systems

## Key Features

- Lightning-fast performance with Astro Island Architecture
- Fully customized dark mode design with professional branding
- Automated CI/CD deployment pipeline via GitHub Actions
- Mobile-first responsive design for all devices
- Type-safe content management with Astro Content Collections
- Custom terminal emulator component for interactive UX
- Zero-config GitHub Pages hosting with custom domain support
- Minimal JavaScript bundle for optimal performance
