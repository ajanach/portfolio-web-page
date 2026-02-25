# Janach Cloud - IT Tools

![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?style=for-the-badge&logo=cloudflare)
![CI/CD](https://img.shields.io/badge/CI%2FCD-Automated-success?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Built%20with-Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs)

Welcome to my personal instance of developer tools, hosted at [tools.janach.cloud](https://tools.janach.cloud).

## DevOps Infrastructure & CI/CD
This repository serves as a practical demonstration of modern GitOps and Edge-hosting:
- **Hosting:** Deployed globally using **Cloudflare Pages** for zero-latency access.
- **CI/CD Pipeline:** Fully automated. Every push to the `main` branch triggers an isolated build environment on Cloudflare, compiling the Nuxt/Vue application into static assets.
- **Upstream Syncing:** A GitHub Action runs nightly to keep this fork updated with the upstream repository automatically.

---
*Note: This is an automated, customized fork of the excellent [IT-Tools](https://github.com/CorentinTh/it-tools) project created by CorentinTh. All core logic and functionality credit goes to the original author.*

To view the original project documentation, instructions for self-hosting via Docker, or to contribute, please see the [Upstream README](../README.md).
