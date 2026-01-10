---
title: "Planning of Advanced Infrastructure"
summary: "Architected enterprise Windows Server infrastructure from ground-up with automated user provisioning, Storage Spaces with DAC, Certificate Authority, clustered DHCP/IIS services, Network Load Balancing, and hybrid Linux gateway with reverse proxy capabilities."
date: "2020-11-30T23:00:00.000Z"
tags:
  - Bachelor
draft: false
demoUrl: ""
repoUrl: ""
---


# Timeline and Details


| Start date    | End date     | Associated with             | Project URL                                                                     |
| ------------- | ------------ | --------------------------- | ------------------------------------------------------------------------------- |
| December 2020 | January 2021 | Algebra University College | [Project PDF](/projects/bachelor/antonio_janach_-_projektni_zadatak_PNI.pdf) |


## Overview


Designed and deployed a complete Windows Server enterprise infrastructure for janach-klinika.hr clinic from scratch, integrating automated user management, redundant storage with granular access control, high-availability web services with SSL/TLS encryption, clustered DHCP, and hybrid Linux-based internet gateway with reverse proxy functionality.


## Technical Implementation


**Active Directory Infrastructure**
- Deployed primary DC (SERVERDC) with janach-klinika.hr domain (Windows Server 2016 functional level)
- Promoted SERVER1 as **Additional/Backup Domain Controller** with automatic AD replication
- Configured **AD Sites and Services** for optimal replication topology
- Implemented dual-NIC architecture across all servers (172.16.45.0/23 management + 192.168.44.0/24 DHCP)


**Automated User Provisioning**
- Developed **PowerShell automation** for bulk user creation from CSV files
- Created **50 user accounts** across 5 Organizational Units (Odrzavanje: 10, Sestre: 10, Doktori: 15, Uprava: 5, Hitna: 10)
- Configured department-based security groups with automated group membership assignment
- Implemented automated OU structure creation and group policy inheritance


**Storage Infrastructure with DAC**
- Configured **Storage Spaces** on SERVER1 with **RAID5 parity** using 4x10GB disks
- Implemented **Hot Spare disk** for automatic failover and data reconstruction
- Created 30GB thin-provisioned virtual disk (janach-VD) with janach-volume
- Deployed **Dynamic Access Control (DAC)** with claim-based authorization
- Configured **FSRM (File Server Resource Manager)** with automated classification rules
- Implemented **content classifier** for sensitive documents (files containing "secret" text)
- Created **Central Access Rules** for Department and Confidentiality attributes with granular permissions


**DNS Configuration**
- Configured **primary and reverse lookup zones** (172.16.45.0/23 and 192.168.44.0/24)
- Implemented **PTR records** for all infrastructure servers and clients
- Enabled **zone transfers** between primary and secondary DNS servers
- Configured **secure dynamic DNS updates** for DHCP integration


**Distributed File System**
- Deployed **DFS Namespaces** (`\\janach-klinika.hr\Bolnica`) with domain-based namespace
- Configured **DFS Replication** between SERVER2 and SERVER3 with full-mesh topology
- Implemented **continuous replication** with full bandwidth allocation
- Created shared document repository with automatic bidirectional synchronization


**Certificate Services & PKI**
- Installed **Enterprise Root CA** on SERVER3 (janach-klinika-SERVER3-CA)
- Configured **Certificate Authority Web Enrollment** and **Online Responder** (OCSP)
- Created custom certificate templates (JANACH-CERT-WEB-SERVER, JANACH-USERS)
- Implemented **auto-enrollment** via Group Policy for user and computer certificates
- Configured **superseded templates** for automatic certificate renewal
- Deployed 2048-bit RSA keys with SHA256 hashing algorithm, 5-year validity period


**Web Services with SSL/TLS**
- Deployed **IIS 10** on SERVER1 and SERVER2 with SSL/TLS encryption
- Configured **domain certificates** issued by internal CA for HTTPS (port 443)
- Implemented **Client Certificate Mapping Authentication**
- Configured web servers to accept SSL certificates automatically
- Created default web pages for high-availability testing


**High Availability & Clustering**
- Configured **DHCP failover cluster** between SERVER2 and SERVER3
- Deployed DHCP scope 192.168.44.0/24 with automatic IP allocation
- Implemented **Network Load Balancing (NLB)** cluster on SERVERDC for SERVER1/SERVER2
- Configured NLB with virtual IP 172.16.45.128 (`www.janach-klinika.hr`)
- Set up **port rules** for HTTP (80) and HTTPS (443) with equal load distribution
- Enabled automatic host failover with convergence monitoring


**Hybrid Linux Gateway Infrastructure**
- Deployed **CentOS Linux** gateway (CentOS1) as default gateway for SERVER3
- Configured **reverse proxy** using Linux for accessing NLB when domain network fails
- Implemented temporary internet connectivity through CentOS1 for package management
- Deployed **Docker Engine** on Windows Server via Linux gateway
- Downloaded and configured Docker containers
- Disabled internet connectivity post-deployment for security compliance


**Infrastructure Upgrade & Backup**
- Performed **in-place upgrade** from Windows Server 2016 to Windows Server 2019 on SERVER3
- Backed up **CA database and certificates** using certutil
- Backed up **DHCP configuration** using netsh
- Exported and restored **DFS replication** topology
- Validated all services post-upgrade (CA, DHCP, DFS-R, IIS certificates)


**Group Policy Configuration**
- Enabled **KDC support for claims, compound authentication, and Kerberos Armoring**
- Configured **Certificate Services Client Auto-Enrollment** for automated cert deployment
- Implemented **User Account Control** policies for Administrator approval mode
- Deployed custom GPO for automatic user certificate enrollment


**Technologies Used**  
Windows Server 2016/2019 • Active Directory Domain Services • PowerShell • Storage Spaces • RAID5 • Dynamic Access Control (DAC) • FSRM • DFS Namespaces • DFS Replication • Active Directory Certificate Services (ADCS) • Enterprise PKI • IIS 10 • SSL/TLS • DHCP Failover • Network Load Balancing (NLB) • DNS • CentOS Linux • Reverse Proxy • Docker • GPO • CSV Automation


## Results


- Successfully deployed fully functional enterprise infrastructure supporting 50+ users across 5 departments
- Achieved zero downtime web services with NLB cluster and automatic failover validation
- Implemented granular file access control with claim-based authentication reducing unauthorized access
- Automated user provisioning reduced onboarding time from hours to seconds
- Deployed redundant storage with hot spare protection against disk failures
- Established high-availability DHCP with automatic failover ensuring continuous IP address allocation
- Successfully upgraded critical infrastructure (SERVER3) from Server 2016 to 2019 with zero service interruption
- Validated end-to-end SSL/TLS encryption across all web services with internal PKI
- Demonstrated hybrid Windows/Linux integration for advanced networking scenarios
