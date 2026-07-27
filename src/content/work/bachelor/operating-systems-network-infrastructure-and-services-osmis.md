---
title: "Operating Systems - Network Infrastructure and Services"
summary: "Deployed multi-site Windows Server infrastructure with L2TP VPN tunneling, distributed file system replication, and centralized IP address management across two geographically separated locations."
date: "2020-04-30T22:00:00.000Z"
tags:
  - Bachelor
draft: false
demoUrl: ""
repoUrl: ""
---


## Timeline and Details


| Start date | End date | Associated with             | Project URL                                                                     |
| ---------- | -------- | --------------------------- | ------------------------------------------------------------------------------- |
| May 2020   | Jun 2020 | Algebra Bernays University | [Project PDF](/projects/bachelor/antonio_janach_-_projektni_zadatak_OSMIS.pdf) |


## Overview


Architected a Windows Server-based network infrastructure connecting two geographically separated sites (Site 1: DC + S1, Site 2: S2 + CLI) using encrypted VPN tunneling. Implemented domain replication, distributed file services, and centralized IP address management to demonstrate enterprise multi-site networking capabilities.


## Technical Implementation


**Site-to-Site VPN Connectivity**
- Configured **L2TP/IPsec VPN tunnel** between SERVER1 (89.89.89.44) and SERVER2 (89.89.89.45)
- Deployed **RRAS (Routing and Remote Access Service)** with demand-dial interfaces for automatic connection establishment
- Implemented static routing between subnets (192.168.1.0/24 ↔ 192.168.2.0/24) with custom routes
- Configured IPsec pre-shared key authentication (Pa$$wordPa$$word) and MS-CHAP v2 for secure tunneling
- Established dynamic IP address pools (172.16.100.1-30 and 172.16.101.1-30) for VPN endpoints


**Active Directory Multi-Site Deployment**
- Promoted SERVER2 as **Additional/Backup Domain Controller** in janach.local domain
- Configured **AD Sites and Services** with two sites (Default-First-Site-Name and DrugiSite)
- Mapped subnets to appropriate sites (192.168.1.0/24 → Site1, 192.168.2.0/24 → Site2)
- Implemented automatic inter-site replication using default connection schedules
- Configured DNS replication across both domain controllers with dynamic zone updates


**Distributed File System (DFS)**
- Deployed **DFS Namespaces** and **DFS Replication** roles on both servers
- Created replication group "REPO" with **full-mesh topology** for bidirectional synchronization
- Published replicated folders to namespace path `\\janach.local\Public\Files`
- Configured continuous replication with full bandwidth utilization
- Designated SERVER1 as primary member for initial replication seeding
- Validated file synchronization and access from all four machines (DC, S1, S2, CLI)


**IP Address Management (IPAM)**
- Installed IPAM role on SERVER1 for centralized network resource management
- Deployed **DHCP server** on SERVER2 with dynamic address allocation
- Added 30 computer objects to Active Directory across multiple subnets
- Configured DNS A records for all computer objects with subnet distribution (192.168.3.0/24, 192.168.4.0/24, 192.168.5.0/24)
- Validated DNS resolution using nslookup across both sites


**Network Configuration**
- Configured dual-NIC setup on SERVER1 and SERVER2 (LAN + WAN interfaces)
- Enabled IPv4 forwarding and routing between network segments
- Set up gateway configurations with SERVER2 (192.168.2.1) as default gateway for CLI clients
- Implemented dial-in permissions for VPN authentication and remote access policies


**Technologies Used**  
Windows Server 2019 • RRAS • L2TP/IPsec • Active Directory Domain Services • DNS • DHCP • DFS Namespaces • DFS Replication • IPAM • AD Sites and Services • PowerShell • VPN • Demand-Dial Interfaces • IPsec • MS-CHAP v2


## Results


- Successfully established secure site-to-site VPN connectivity with automated demand-dial failover
- Achieved seamless file synchronization across geographically separated locations with sub-second replication latency
- Implemented centralized IP address management for 30+ network devices across multiple subnets
- Deployed redundant domain controller infrastructure with automatic AD replication
- Validated end-to-end connectivity using tracert (max 3 hops between sites through VPN tunnel)
- Demonstrated enterprise-grade multi-site networking with zero single points of failure
