---
title: "Final Thesis - Windows Computer Administration using MECM in Microsoft Azure Cloud"
summary: "Bachelor thesis project covering complete SCCM infrastructure deployment in Azure, including automated client management, application deployment, OS imaging, and update management for enterprise environments."
date: "2021-09-30"
tags:
  - Bachelor
  - Thesis
draft: false
demoUrl: ""
repoUrl: ""
---

# Timeline and Details

| Start date    | End date       | Associated with              | Project PDF                                           |
| ------------- | -------------- | ---------------------------- | ----------------------------------------------------- |
| February 2021 | September 2021 | Algebra Bernays University   | [Thesis PDF](/projects/bachelor/antonio_janach_-_završni_rad.pdf) |

## Overview

Complete Microsoft Endpoint Configuration Manager (SCCM) deployment in Azure demonstrating enterprise Windows endpoint management, automated application deployment, OS imaging, and patch management.

## Architecture

**Infrastructure Components**:
- Domain Controller (AD DS, DNS, Group Policy)
- SCCM Primary Site Server (all core roles)
- SQL Server 2016 SP2 (database backend)
- Windows 10 client workstation

**Network**: Azure Virtual Network (192.168.0.0/24, West Europe)  
**Installation Time**: 3 hours 48 minutes

## Key Implementations

| Area | Implementation |
|------|----------------|
| **Client Management** | AD discovery (Forest, System, User), automated Client Push deployment |
| **Application Deployment** | Office 365 via Software Center, detection methods, targeted collections |
| **Update Management** | WSUS integration, automated deployment rules, compliance monitoring |
| **OS Deployment** | Windows 10 21H1 imaging, custom task sequences, upgrade from 20H2 to 21H1 |
| **Reporting** | 471 built-in reports, OS inventory, compliance tracking |

## Tech Stack

**Cloud**: Microsoft Azure (VMs, Virtual Networks, Resource Groups)  
**Microsoft Stack**: SCCM 2103, Windows Server 2019, SQL Server 2016 SP2, Active Directory, WSUS, IIS  
**Automation**: PowerShell, SCCM Task Sequences  
**Client OS**: Windows 10 (20H2, 21H1)

## SCCM vs Desktop Central Comparison

| Aspect | SCCM | Desktop Central |
|--------|------|-----------------|
| **Best For** | Enterprise (1000+ endpoints) | SMB (25-500 endpoints) |
| **Setup Complexity** | High | Low |
| **Cost** | 8,365 - 22,808 HRK | Free (up to 25 devices) |
| **Scalability** | Exceptional | Moderate |
| **Integration** | Deep Microsoft ecosystem | Cross-platform |

**Conclusion**: SCCM superior for enterprises requiring advanced features and Microsoft integration (Gartner Magic Quadrant 2021 leader).

## Skills Demonstrated

**Cloud Infrastructure**: Azure VMs, networking, resource management  
**Enterprise Management**: SCCM architecture, site hierarchy, role configuration  
**Automation**: Client deployment, application packaging, OS imaging  
**Windows Server**: Active Directory, SQL Server, IIS, WSUS  
**Scripting**: PowerShell automation  
**Research**: Comparative analysis, technical documentation