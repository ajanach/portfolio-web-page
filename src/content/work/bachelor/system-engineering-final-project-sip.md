---
title: "System Engineering - Final Project"
summary: "Design and implementation of a complex IT infrastructure for a company across two locations, including site-to-site VPN connectivity, Active Directory infrastructure, high availability clustering, and comprehensive enterprise services deployment."
date: "2021-01-31T23:00:00.000Z"
tags:
  - Bachelor
draft: false
demoUrl: ""
repoUrl: ""
---

## Timeline and Details

| Start date    | End date      | Associated with           | Project PDF                                                                        |
| ------------- | ------------- | ------------------------- | ---------------------------------------------------------------------------------- |
| February 2021 | August 2021   | Algebra University        | [Project PDF](/projects/bachelor/antonio_janach_-_projektni_zadatak_SIP.pdf)      |

## Overview

This comprehensive project involved designing and implementing a complete enterprise IT infrastructure from scratch for a company operating across two geographically separate locations. The infrastructure encompasses 11 virtual machines running Ubuntu 20.10, CentOS 8.3, Windows Server 2019, and Windows 10, interconnected through a secure site-to-site VPN tunnel. The implementation demonstrates end-to-end system engineering capabilities, from initial planning and requirements analysis to deployment and documentation of complex network, server, and virtualization environments.

The project showcases the integration of diverse technologies including Active Directory with Read-Only Domain Controller (RODC), PKI infrastructure with Root and Subordinate Certificate Authorities, Windows Failover Clustering with iSCSI storage, DFS replication, FreeIPA synchronization with Active Directory, and automated backup solutions.

## Infrastructure Overview

### Virtual Machines Deployment

**Location A:**
- OpenVPN1 (Ubuntu 20.10) - VPN server with reverse proxy/load balancing
- Linux1 (CentOS 8.3) - Multi-service server (FreeIPA, iSCSI, Samba, WordPress, Mail)
- ServerDC (Windows Server 2019) - Primary Domain Controller
- Server1 (Windows Server 2019) - Root CA and Failover Cluster node
- Server2 (Windows Server 2019) - Subordinate CA and Failover Cluster node

**Location B:**
- OpenVPN2 (Ubuntu 20.10) - VPN server with reverse proxy/load balancing
- Linux2 (CentOS 8.3) - WordPress server with centralized logging
- RODC (Windows Server 2019) - Read-Only Domain Controller
- Server3 (Windows Server 2019) - IIS with certificate authentication and DFS
- Server4 (Windows Server 2019) - IIS with certificate authentication and DFS

**Management:**
- Client1 (Windows 10) - Remote management and troubleshooting workstation

### Network Architecture

**Subnets:**
- Location A: 192.168.64.0/24
- Location B: 192.168.128.0/24
- VPN Interconnect: 10.10.10.0/24
- VPN Tunnel: 10.8.0.0/24

**Network Security:**
- Firewalld on all Linux systems with minimal service exposure
- Internet access NICs disabled post-installation
- Routing between locations through VPN gateways only

## Technologies & Tools

### Operating Systems
- **Ubuntu 20.10** - VPN servers
- **CentOS 8.3** - Application and service servers
- **Windows Server 2019** - Domain services, clustering, and web services
- **Windows 10** - Management workstation

### Networking & Security
- **OpenVPN** - Site-to-site VPN with maximum security (TLS-crypt, AES-256-GCM, SHA256)
- **firewalld** - Linux firewall management
- **nginx/HAProxy** - Reverse proxy and load balancing
- **SSH** - Secure remote access with key-based authentication

### Directory Services & Identity Management
- **Active Directory Domain Services (AD DS)** - Central identity management
- **Read-Only Domain Controller (RODC)** - Secure domain services at remote location
- **FreeIPA** - Linux identity management synchronized with Active Directory
- **DNS** - Name resolution services
- **DHCP** - Dynamic IP address assignment

### Certificate Authority & PKI
- **Active Directory Certificate Services (AD CS)** - PKI infrastructure
- **Root CA** - Primary certificate authority on Server1
- **Subordinate CA** - Issuing certificate authority on Server2
- **Certificate Templates** - Custom templates for web servers (2-year validity) and client authentication (1-year validity)
- **TLS 1.2** - Minimum encryption standard for all HTTPS services

### Storage & High Availability
- **iSCSI** - Block-level storage protocol (LVM with targetcli)
- **Windows Failover Clustering** - High availability file server
- **Storage Spaces** - Software-defined storage with parity and hot spare
- **ReFS** - Resilient File System with deduplication
- **DFS Replication (DFS-R)** - Distributed file system with replication

### Web & Application Services
- **IIS (Internet Information Services)** - Windows web server with client certificate authentication
- **Apache (LAMP)** - Linux web server stack
- **WordPress** - Content management system (latest version)
- **PHP 7.4** - Server-side scripting
- **MariaDB** - Database management system

### File & Backup Services
- **Samba** - SMB/CIFS file sharing for domain users
- **rsync** - Incremental backup with 7-day retention
- **cron** - Scheduled tasks for backup automation

### Mail Services
- **Postfix** - MX mail server for domain
- **mailx** - Email client for notifications

### Monitoring & Security
- **SELinux** - Enforcing mode on CentOS systems
- **rsyslog** - Centralized logging with TCP transport and log rotation
- **Custom bash scripts** - SSH security monitoring with email alerts
- **NTP (w32time/chrony)** - Time synchronization

### Development & Automation
- **Bash scripting** - Automation and monitoring
- **PowerShell** - Windows automation and configuration
- **easy-rsa** - OpenVPN PKI management

## Key Achievements

### Network & VPN Infrastructure
- Implemented secure site-to-site OpenVPN tunnel connecting two locations with AES-256-GCM encryption
- Configured reverse proxy/load balancing on OpenVPN servers for high availability web access (ports 10443 and 12443)
- Established proper network segmentation with dedicated NICs for cluster heartbeat, VPN, intra-site communication, and management
- Enabled seamless inter-location communication while maintaining security boundaries
- Configured persistent DNS namespace on Ubuntu servers using resolvconf

### Active Directory & Domain Services
- Deployed full Active Directory infrastructure with primary DC at Location A and RODC at Location B
- Configured Active Directory Sites and Services for multi-site replication
- Implemented DHCP servers at both locations with proper scope configuration (8-hour lease duration)
- Established NTP time synchronization hierarchy with ServerDC as authoritative time source
- Created and deployed Group Policy Objects for certificate auto-enrollment

### Public Key Infrastructure (PKI)
- Built two-tier PKI hierarchy with Root CA (Server1) and Subordinate CA (Server2) following best practices
- Created custom certificate templates for web servers (2-year validity) and user authentication (1-year validity)
- Issued and deployed SSL/TLS certificates for all web services (IIS and Apache)
- Configured certificate-based authentication for IIS websites, requiring client certificates for access
- Established trust relationships between FreeIPA CA and Active Directory CA infrastructure

### Storage & High Availability Clustering
- Configured iSCSI Target on Linux1 with LVM (volume group iSCSI01, logical volumes LUN0/1/2)
- Implemented Windows Failover Cluster between Server1 and Server2 using iSCSI shared storage
- Deployed Storage Spaces with parity and hot spare disk for resilience
- Enabled ReFS with data deduplication for efficient storage utilization
- Created clustered file server role with SMB share accessible from entire domain
- Configured CSV (Cluster Shared Volume) for high availability

### Distributed File System (DFS)
- Implemented DFS Namespace for transparent file access across servers
- Configured DFS Replication (DFS-R) between Server3 and Server4 for data redundancy
- Validated replication functionality with test file synchronization

### Linux Identity Management
- Deployed FreeIPA server on Linux1 as identity management solution for Linux systems
- Established bidirectional trust and synchronization between FreeIPA and Active Directory
- Configured cross-platform authentication allowing domain users to access Linux resources
- Implemented certificate exchange between Windows CA and FreeIPA infrastructure

### File Sharing & Backup Services
- Configured Samba file server with domain-integrated authentication for /domainshare directory
- Developed custom incremental backup script using rsync for automated daily backups
- Implemented 7-day backup retention with scheduled execution at 02:00:00 via cron
- Automated backup transfer from Linux1 to Linux2 over VPN tunnel
- Applied proper SELinux contexts for Samba shares

### Web Services
- Deployed dual WordPress installations on Linux1 and Linux2 served from /wordpress1 and /wordpress2 directories
- Configured LAMP stack (Apache, MariaDB, PHP 7.4) on CentOS servers
- Implemented HTTPS-only access with TLS 1.2 minimum using CA-issued certificates
- Configured Apache virtual hosts with custom ports (10443) for reverse proxy compatibility
- Deployed IIS websites on Server3 and Server4 with certificate-based authentication
- Disabled HTTP protocol on all web servers for security
- Applied SELinux policies for web directories with proper file contexts

### Mail Services & Monitoring
- Configured Postfix as MX mail server for the domain on Linux1
- Enabled mail relay for Linux systems across both locations
- Developed custom SSH monitoring scripts executed every 2 hours via cron
- Implemented automated email alerts for suspicious SSH activity (failed logins, brute-force attempts)
- Configured centralized logging with rsyslog forwarding from Linux2 to Linux1
- Implemented log rotation every 2 days with compression

### Security Implementation
- Enforced SELinux in enforcing mode on all CentOS systems
- Configured firewalld on all Linux systems with minimal required services
- Implemented principle of least privilege for network access
- Disabled internet-facing NICs post-configuration on all systems
- Applied certificate-based authentication for administrative access
- Configured SSH key-based authentication across infrastructure

## Documentation & Project Management

### Planning & Analysis
- Comprehensive requirements analysis identifying business needs and technical constraints
- Data modeling and process modeling for information system design
- Network topology design with clear separation of management, production, and cluster networks

### Implementation Documentation
- Detailed step-by-step configuration procedures for all components
- PowerShell and Bash script documentation with inline comments
- Network diagrams showing physical and logical topology
- Configuration files preserved for reference and disaster recovery

### Testing & Validation
- Systematic verification of all services and connectivity
- Cross-location communication testing through VPN tunnel
- Failover testing for clustered services
- Certificate chain validation for all PKI-secured services
- Replication verification for DFS and AD

### Technical Specifications
- 65-page comprehensive project documentation
- 46 screenshots demonstrating configuration steps and validation
- Complete command reference for reproducibility
- Troubleshooting procedures for common issues (e.g., SELinux alerts)

## Learning Outcomes

This project provided hands-on experience in:

- **Enterprise Infrastructure Design** - Planning and implementing multi-site IT infrastructure
- **Virtualization** - Managing multiple VMs with complex networking requirements
- **Windows Server Administration** - AD DS, RODC, Failover Clustering, Certificate Services, IIS
- **Linux System Administration** - CentOS and Ubuntu configuration, service management
- **Network Security** - VPN implementation, firewall configuration, certificate-based authentication
- **Storage Technologies** - iSCSI, Storage Spaces, DFS, LVM
- **High Availability** - Failover clustering, load balancing, replication
- **Automation** - Bash and PowerShell scripting for configuration and monitoring
- **Cross-Platform Integration** - FreeIPA and Active Directory synchronization
- **Security Best Practices** - PKI implementation, SELinux, principle of least privilege
- **Project Documentation** - Technical writing, network diagrams, configuration procedures

## Conclusion

This project successfully demonstrates the complete lifecycle of enterprise IT infrastructure implementation, from initial requirements gathering and planning through deployment, testing, and documentation. The resulting infrastructure provides a robust, secure, and highly available environment supporting both Windows and Linux workloads across geographically distributed locations.

The implementation showcases integration of diverse technologies working cohesively: Windows and Linux systems authenticated against the same directory, high availability through clustering and replication, secure communication through VPN and PKI, and comprehensive monitoring with automated alerting. The project serves as a reference implementation for enterprise-grade infrastructure suitable for production environments.

Key success factors included systematic approach to requirements analysis, thorough testing of each component before integration, proper security hardening throughout the stack, and comprehensive documentation enabling reproducibility and future maintenance.
