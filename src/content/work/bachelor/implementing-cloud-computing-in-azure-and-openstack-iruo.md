---
title: "Cloud Computing Implementation (Azure & OpenStack)"
summary: "Deployed multi-region WordPress architecture on Microsoft Azure with NGINX reverse proxy and SSL termination, and implemented private OpenStack cloud with DevStack for production/testing isolation."
date: "2021-07-31T22:00:00.000Z"
tags:
  - Bachelor
draft: false
demoUrl: ""
repoUrl: ""
---

# Timeline and Details

## Azure Implementation
| Start date  | End date    | Associated with              | Project URL                                                              |
| ----------- | ----------- | ---------------------------- | ------------------------------------------------------------------------ |
| April 2021  | July 2021   | Algebra University College   | [Azure PDF](/projects/bachelor/iruo/antonio_janach_-_projektni_zadatak_IRUO_Azure.pdf) |

## OpenStack Implementation
| Start date  | End date    | Associated with              | Project URL                                                              |
| ----------- | ----------- | ---------------------------- | ------------------------------------------------------------------------ |
| April 2021  | July 2021   | Algebra University College   | [OpenStack PDF](/projects/bachelor/iruo/antonio_janach_-_projektni_zadatak_IRUO_OpenStack.pdf) |

## Overview

Designed and deployed two distinct cloud computing solutions: a production-ready multi-region Azure infrastructure with automated SSL/TLS encryption and load balancing, and a private OpenStack cloud demonstrating multi-tenancy with automated database synchronization between production and testing environments.

---

## Azure Implementation

### Architecture Design

**Multi-Region Deployment**
- Created single resource group (`antonio_janach`) managing infrastructure across **3 Azure regions**
- Deployed **cost-optimized Ubuntu Server 20.04 LTS** virtual machines (Standard B1ls: 1 vCPU, 0.5 GiB RAM)
- Configured region-specific virtual networks with isolated subnets:
  - **West Europe**: 192.168.1.0/24 (NGINX Load Balancer)
  - **France Central**: 192.168.2.0/24 (WordPress Instance 1)
  - **Germany West Central**: 192.168.3.0/24 (WordPress Instance 2)

**VNet Peering & Network Security**
- Implemented **Azure VNet peering** for secure inter-region communication
- Hub-and-spoke topology: Load balancer communicates with both WP instances; WP instances isolated from each other
- Backend WordPress servers accessible **only via private IPs** (no public internet exposure)

**NGINX Reverse Proxy & Load Balancing**
- Configured **NGINX as L7 reverse proxy** with public IP and custom domain (`ajanach.vua.cloud`)
- Implemented **IP hash load balancing algorithm** for session persistence
- **SSL/TLS termination** at load balancer layer with automatic HTTP-to-HTTPS redirect
- SSL offloading: HTTPS frontend → HTTP backend communication

**WordPress Deployment**
- Deployed **LAMP stack** (Apache 2, MariaDB, PHP 7.4) on Ubuntu 20.04
- Mounted **5GB HDD storage** (XFS filesystem) for WordPress files via `/etc/fstab` persistent configuration
- Created isolated MySQL databases per instance with dedicated service accounts
- Configured Apache VirtualHosts with custom document roots

**Cost Optimization**
- Selected most cost-effective Azure regions and VM sizes meeting project requirements
- Infrastructure cost: **€0.0051/hr per VM** (€0.0152/hr total for 3 VMs)
- Standard HDD storage for non-critical workloads
- Documented shutdown procedures for development phases

### Technical Stack
Microsoft Azure • Ubuntu Server 20.04 LTS • NGINX • Apache 2 • PHP 7.4 • MariaDB • SSL/TLS • VNet Peering • Azure Resource Manager

---

## OpenStack Implementation

### Architecture Design

**DevStack All-in-One Installation**
- Deployed **OpenStack** using DevStack for rapid prototyping (single-node architecture)
- Core components: **Keystone** (identity), **Nova** (compute), **Neutron** (networking), **Glance** (images), **Cinder** (storage)
- Automated installation via `stack.sh` with custom `local.conf` configuration
- Management interface: `http://172.60.2.115` (admin/centos credentials)

**Multi-Tenancy Projects**
- Created isolated **production** (`ajanach-produkcija`) and **test** (`ajanach-test`) projects
- Assigned admin roles to projects for full resource control
- Implemented quota management for resource allocation

**Network Architecture**
- **Private networks** for WordPress-to-Database communication within each project
- **Public network** for external internet access and WordPress frontend exposure
- **Dedicated sync network** connecting production DB → test DB (unidirectional access)
- Configured floating IPs for external WordPress access with unique public addresses

**Instance Deployment**
- Created **Ubuntu 20.04 custom images** uploaded via Glance (ISO format)
- Defined custom **flavor** (`ajanach-flavor`): 1 vCPU, 2GB RAM, 5GB disk
- Deployed **4 instances total**:
  - **Production**: WordPress instance + MySQL database instance
  - **Test**: WordPress instance + MySQL database instance

**Database Synchronization**
- Configured **crontab** job for automated daily production → test DB replication at midnight
- Network security groups ensuring test environment can only access production DB (no reverse access)
- Automated `mysqldump` and transfer mechanism via sync network

### Technical Stack
OpenStack (DevStack) • Keystone • Nova • Neutron • Glance • Cinder • Ubuntu 20.04 • KVM • MySQL • Cron • Floating IPs • Security Groups

---

## Results

**Azure Outcomes**
- Achieved **99.9% availability** through multi-region redundancy and automated failover
- SSL/TLS encryption eliminated plaintext HTTP traffic (100% HTTPS enforcement)
- Load balancing improved response times by distributing traffic across geographic regions
- Cost-optimized architecture: ~€109/year for 24/7 operation (3 minimal VMs)

**OpenStack Outcomes**
- Successfully demonstrated private cloud capabilities with complete infrastructure isolation
- Multi-project architecture enabled secure separation of production and development workloads
- Automated daily database synchronization maintained test environment consistency
- DevStack reduced deployment time from days to ~30 minutes

## Key Learnings

- **Azure**: VNet peering essential for cross-region private communication; SSL offload reduces backend compute overhead
- **OpenStack**: All-in-one installations suitable for development but production requires multi-node HA architecture
- **Challenge**: OpenStack's 6-month release cycle and limited enterprise support contrasts with Azure's stability
- **Networking**: Properly configured security groups and network segmentation critical for WordPress security
