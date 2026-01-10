---
title: "Cloud-Based WordPress Infrastructure: LAMP Stack Administration & Optimization"
summary: "Designed and deployed a high-availability LAMP stack infrastructure for production WordPress environments, implementing automated backups, SSL security, and performance optimization for local business clients."
date: "2018-10-01"
tags:
  - Side Projects
draft: false
demoUrl: ""
repoUrl: ""
---

# Timeline and Details

| Start date | End date | Status | Associated with |
|------------|----------|--------|-----------------|
| Oct 2018 | Present | Active (ongoing) | Freelance |

## Overview
Architected and administered a robust cloud-based infrastructure to host production WordPress websites for business clients. This project involved moving beyond shared hosting to a managed VPS environment, enabling full control over the stack for superior performance, security, and scalability. The solution delivers 99.9% uptime, optimized page load speeds, and hardened security posture for e-commerce and corporate presentation sites.

## Technical Architecture

### Cloud & Infrastructure
- **Hosting**: Managed Cloud VPS (Virtual Private Server) environment.
- **Web Server**: configured **Apache HTTP Server** with optimized `.htaccess` rules, Gzip compression, and caching policies.
- **Database**: Tuning **MariaDB** for WordPress query performance and reliability.
- **Security**: Implemented **Let's Encrypt SSL/TLS** certificates with automated renewal scripts (Certbot). Configured firewalls (`ufw`) and Fail2Ban for intrusion prevention.

### DevOps & Administration
- **Automation**: Scripted automated off-site backups for disaster recovery.
- **Monitoring**: Integrated server health monitoring and Google Analytics for traffic insights.
- **Optimization**: Implemented server-side caching and PHP-FPM tuning to handle concurrent traffic spikes.

## Tech Stack
- **Infrastructure**: Linux (Ubuntu/CentOS), Apache, MySQL/MariaDB, PHP (LAMP)
- **CMS**: WordPress
- **Security**: SSL/TLS, Fail2Ban, Firewalld
- **Tools**: Bash scripting, SSH, FTP/SFTP

## Live Production Deployments
- **[fijaing.com](https://fijaing.com/)**: Corporate presentation website for an engineering firm.
- **[avb-service.hr](https://avb-service.hr/)**: Full-featured e-commerce webshop with payment gateway integration.

## Key Outcomes
- **Enhanced Performance**: Significant reduction in Time-To-First-Byte (TTFB) compared to shared hosting.
- **Improved Security**: Zero successful breaches due to proactive hardening and patch management.
- **Business Continuity**: Automated backup strategy ensures zero data loss.
