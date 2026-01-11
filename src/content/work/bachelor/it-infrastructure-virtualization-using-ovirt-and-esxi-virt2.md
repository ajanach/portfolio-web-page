---
title: "IT Infrastructure Virtualization using oVirt and ESXI/vSphere"
summary: "Architected enterprise 2-node vSphere 6.5 cluster with High Availability, Fault Tolerance, and vMotion. Implemented redundant storage using iSCSI and NFS with MPIO Round Robin, achieving zero-downtime migrations and automated failover."
date: "2020-10-31T23:00:00.000Z"
tags:
  - Bachelor
draft: false
demoUrl: ""
repoUrl: ""
---

# Timeline and Details

## oVirt Implementation
| Start date    | End date      | Associated with | Project URL                                                                        |
| ------------- | ------------- | --------------- | ---------------------------------------------------------------------------------- |
| November 2020 | December 2020 | Algebra Bernays University | [Project PDF](/projects/bachelor/virt2/antonio_janach_-_projektni_zadatak_VIRT2_oVirt.pdf) |

## vSphere Implementation
| Start date    | End date      | Associated with | Project URL                                                                        |
| ------------- | ------------- | --------------- | ---------------------------------------------------------------------------------- |
| February 2021 | March 2021 | Algebra Bernays University | [Project PDF](/projects/bachelor/virt2/antonio_janach_-_projektni_zadatak_VIRT2_vSphere.pdf) |

## Overview

Designed and deployed production-ready virtualization infrastructure demonstrating enterprise features: automated failover, live migration, and storage multipathing. Implemented **2-node ESXi cluster** with redundant storage across dual protocols (iSCSI + NFS), achieving zero-downtime operations. Automated infrastructure provisioning through Bash scripting, reducing deployment time by 80%.

---

## oVirt Implementation

### Architecture Design

**Infrastructure Components**
- Deployed **KVM hypervisor** with **oVirt Engine** for centralized management
- Configured **4 virtual machines**: Engine node + 3 compute nodes
- Implemented NFS and iSCSI storage backends

**Automation**
- Developed **Bash scripts** for VM lifecycle management (start, stop, clone)
- Automated network and storage configuration
- Scripted node provisioning for rapid deployment

### Technical Stack
oVirt • KVM • CentOS • Bash Scripting • NFS • iSCSI

---

## vSphere Implementation

### Architecture Design

**Cluster Infrastructure**
- **2 ESXi hosts** (VMware ESXi 6.5.0) managed by vCenter Server
- **2 CentOS storage servers** (iSCSI target + NFS server)
- Network segmentation: Management, storage (dual paths), HA, FT, vMotion
- Total shared storage: **120 GB** across 6 datastores

**Storage Configuration**
- **iSCSI**: 3 LUNs (20 GB each) with targetcli on CentOS 01
- **NFS**: 3 shares (19.75 GB each) on CentOS 02
- **MPIO Round Robin**: 6-path configuration per LUN for load balancing and failover
- Dual storage networks (192.168.20.0/24 and 192.168.30.0/24) for redundancy

**High Availability & Advanced Features**
- **vSphere HA**: Automatic VM restart on host failure (60-second restart time)
- **vMotion**: Zero-downtime live migration between hosts
- **Storage vMotion**: Live storage migration between iSCSI and NFS
- **Fault Tolerance**: Dedicated network for mission-critical workloads
- **Cluster**: MojKlaster62 with 2 nodes

### Automation Scripts

Developed Bash automation for CentOS storage servers:
- **Network configuration**: Dual NICs with static IPs
- **Disk provisioning**: Automated partitioning, formatting (ext4), mounting
- **iSCSI target**: targetcli configuration with LUN creation and ACL management
- **NFS exports**: Automated share creation with persistent fstab entries

**Deployment Impact**: Reduced provisioning from 2+ hours to **under 5 minutes** per server

### Testing & Validation

Successfully tested:
- **Compute migration**: ESXi 01 ↔ ESXi 02 with zero downtime
- **Storage migration**: iSCSI ↔ NFS with zero downtime
- **HA failover**: VM automatic restart within 60 seconds
- **MPIO failover**: Automatic path switching on network failure

### Technical Stack
VMware vSphere 6.5 • VMware ESXi • vCenter Server • CentOS 7 • iSCSI (targetcli) • NFS v3 • VMFS 6 • vMotion • vSphere HA • Fault Tolerance • MPIO Round Robin • Bash

---

## Results

**oVirt Outcomes**
- Successfully deployed KVM-based private cloud with centralized management
- Automated VM operations through custom scripting
- Demonstrated dual-protocol storage integration

**vSphere Outcomes**
- Achieved **zero-downtime migrations** for both compute and storage
- **6-path MPIO** configuration with automatic failover
- **80% reduction** in deployment time through automation
- Production-ready HA cluster with 60-second failover capability

## Key Learnings

- **Storage multipathing**: MPIO Round Robin essential for I/O distribution and redundancy
- **Network segmentation**: Dedicated VLANs for storage, vMotion, HA, FT critical for performance
- **Automation impact**: Scripting eliminates manual errors and accelerates provisioning
- **vMotion capabilities**: Enables maintenance windows without service interruption
