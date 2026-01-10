---
title: "Advanced Administration of Open Source Operating Systems"
summary: "Deployed enterprise Linux infrastructure for a transport company with centralized authentication (FreeIPA), secure VPN, mail server, file sharing, and automated backups across two CentOS servers supporting 50+ users."
date: "2020-01-31T23:00:00.000Z"
tags:
  - Bachelor
draft: false
demoUrl: ""
repoUrl: ""
---

# Timeline and Details

| Start date    | End date   | Associated with            | Project URL                                                                    |
| ------------- | ---------- | -------------------------- | ------------------------------------------------------------------------------ |
| February 2020 | June 2020  | Algebra Bernays University | [Project PDF](/projects/bachelor/antonio_janach_-_projektni_zadatak_NAOOS.pdf) |

## Overview

Designed and deployed a production-ready Linux infrastructure for Križić Prijevoz, a growing transport company requiring centralized management for 50+ users. Built a scalable, secure two-server architecture with role-based access control and redundant services.

## Technical Implementation

**Server Architecture (CentOS 7)**
- **OOS1**: FreeIPA authentication server, DNS, iSCSI initiator, VPN client, BackupPC
- **OOS2**: Mail server (Postfix/Roundcube), web services (Nginx/httpd), iSCSI target, OpenVPN server, BackupPC

**Key Services Deployed**
- Implemented **FreeIPA** for centralized LDAP/Kerberos authentication and DNS management
- Configured **iSCSI storage** with multi-platform support (Windows/Mac via targetcli)
- Deployed **OpenVPN** with PKI infrastructure for secure remote access
- Set up **Postfix + Roundcube** webmail with TLS certificates
- Built **MediaWiki** intranet (Nginx) and **WordPress** extranet (Apache httpd) with SSL
- Automated infrastructure backups using **BackupPC** across all servers

**Technologies Used**  
FreeIPA • CentOS 7 • OpenVPN • iSCSI • Postfix • Roundcube • Nginx • Apache httpd • MediaWiki • WordPress • MariaDB • PHP-FPM • BackupPC • SELinux • Firewalld

## Results

- Centralized authentication reduced administrative overhead and improved security
- Secure VPN enabled remote workforce connectivity during COVID-19 transition
- Cross-platform file sharing streamlined operations across mixed Windows/Mac environment
- Automated backup strategy ensured business continuity and disaster recovery capability
