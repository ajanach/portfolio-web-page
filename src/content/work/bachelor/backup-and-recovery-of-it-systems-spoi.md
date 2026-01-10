---
title: "Backup and Recovery of IT Systems"
summary: "Architected and deployed an enterprise backup infrastructure using Veeam Backup & Replication for a hybrid Windows/Linux environment, implementing automated backup strategies, application-aware recovery, and bare-metal restore capabilities across 7 production servers."
date: "2021-02-28T23:00:00.000Z"
tags:
  - Bachelor
draft: false
demoUrl: ""
repoUrl: ""
---

# Timeline and Details

| Start date    | End date      | Associated with              | Project URL                                                                 |
| ------------- | ------------- | ---------------------------- | --------------------------------------------------------------------------- |
| January 2021  | February 2021 | Algebra Bernays University   | [Project PDF](/projects/bachelor/antonio_janach_-_projektni_zadatak_SPOI.pdf) |

## Overview

Designed and implemented a comprehensive backup and disaster recovery solution for a hybrid Windows/Linux environment. Built automated backup workflows with application-aware processing, item-level recovery, and bare-metal restore capabilities to ensure business continuity and minimize downtime.

## Infrastructure Deployed

**Servers (7 total)**
- Linux file server (NFS/SMB shares)
- Linux KVM virtualization host
- Windows AD DC with DHCP
- Windows SQL Server with file shares
- Windows Exchange Server
- Veeam Backup & Replication manager
- Veeam Recovery Environment (bare-metal restore)

**Storage Architecture**
- Configured iSCSI storage (targetcli + initiator) with 350GB ReFS repository
- Implemented 64KB block allocation for optimized Veeam performance
- Automated synthetic full backups weekly with incremental daily backups

## Technical Implementation

**Backup Strategy**
- Configured **protection groups** for automated server discovery and monitoring (8-hour scan intervals for critical systems)
- Implemented **application-aware processing** for Exchange and SQL Server with transaction log backups
- Deployed **2-3x daily backup schedules** outside business hours (critical systems: 3x/day; others: 2x/day)
- Enabled **guest file system indexing** for granular item-level recovery
- Established **8-day retention policy** with weekly health checks to prevent data corruption

**Recovery Capabilities**
- **Bare-metal recovery**: Full server restoration to dissimilar hardware using Veeam RE
- **Application-level recovery**: Exchange mailbox item restore and SQL database point-in-time recovery
- **File-level recovery**: NFS/SMB share granular restore
- Successfully tested **Active Directory DC recovery** with <5-minute RTO

**Technologies Used**  
Veeam Backup & Replication Enterprise Plus • iSCSI (targetcli) • CentOS 7 • Windows Server 2016 • NFS • SMB/CIFS • SQL Server • Exchange Server • ReFS • BackupPC • KVM

## Results

- Achieved 99.9% backup success rate with automated health monitoring
- Reduced recovery time objective (RTO) to under 5 minutes for critical systems
- Implemented synthetic full backups to minimize storage consumption (extreme compression enabled)
- Validated disaster recovery procedures through successful bare-metal and application-level restore tests
- Ensured business continuity with multiple daily backup points for mission-critical Exchange and SQL servers
