---
title: "Master's Thesis - Comparison of Orchestration Systems for Microservices Applications"
summary: "Research-driven comparison of Kubernetes orchestration platforms (AKS vs K3S) analyzing performance, cost-effectiveness, and operational complexity for medium-scale microservices deployments."
date: "2024-09-30"
tags:
  - Master
  - Thesis
draft: false
---

## Timeline & Info

| Start date | End date | Associated with | Resources |
|------------|----------|-----------------|-----------|
| April 2024 | September 2024 | Faculty of Informatics and Digital Technologies, University of Rijeka | [Thesis PDF](https://zir.nsk.hr/en/object/infri:1316) · [GitHub](https://github.com/ajanach/comparison-of-orchestration-systems-for-microservices-applications.git) · [Defense Video](https://youtu.be/kA0KqmDsE-o) |

## Overview

Deployed and benchmarked Google's "Online Boutique" (15-microservice e-commerce application) on both cloud-based (AKS) and on-premises (K3S) infrastructure with identical resources. Conducted comprehensive performance testing, cost analysis, and qualitative comparison to develop a selection framework for organizations choosing Kubernetes platforms.

## Key Findings

### Performance Results

**K3S outperforms AKS by 3-5x in raw performance:**

| Metric | K3S | AKS | Winner |
|--------|-----|-----|--------|
| **Throughput** | 109.44 req/s | 34 req/s | K3S (3.2x) |
| **Response Time** | 9.14ms avg | 29.41ms avg | K3S |
| **CPU Performance** | 20,219 events/s | 8,051 events/s | K3S (2.5x) |
| **Idle CPU Usage** | 12.5% | 42.3% | K3S (3.4x less) |
| **Failed Requests (500 users)** | <0.1% | 2.96% | K3S |

### Cost Analysis (5-Year TCO)

**AKS is 2.25x more cost-effective:**

| Platform | Total Cost | Main Components |
|----------|-----------|-----------------|
| **AKS** | **$12,499** | Compute: $8,760 · Storage: $730 · Networking: $1,825 · Labor: $1,184 |
| **K3S** | **$28,135** | Hardware: $10,000 · Power: $4,380 · Maintenance: $2,470 · Labor: $8,000 |

**Key Insight**: AKS wins on cost unless you have existing on-premises infrastructure with high utilization.

### Quick Comparison

| Aspect | AKS | K3S |
|--------|-----|-----|
| **Performance** | Good | Excellent (3x faster) |
| **Cost (5yr)** | $12.5K | $28K |
| **Setup Time** | 15-30 min | 45-90 min |
| **Management** | Automated | Manual |
| **Customization** | Limited | Full control |
| **Best For** | Cloud-first, ease of use | Performance, on-prem, edge |

## Tech Stack

### Platforms
- **Azure Kubernetes Service (AKS)** - Managed Kubernetes on Azure
- **K3S** - Lightweight Kubernetes by Rancher

### Infrastructure
- **Azure** (AKS): Terraform IaC, Standard_A2_v2 VMs (2 vCPU, 4GB RAM)
- **VMware vSphere** (K3S): Ansible automation, Rocky Linux, 3 control + 2 worker nodes

### Application
- **Google Online Boutique** - 15-microservice e-commerce demo
- **Languages**: Go, Java, Node.js, Python, C#
- **Communication**: gRPC, HTTP/REST
- **Storage**: Redis

### Testing & Monitoring
- **Load Testing**: Apache Benchmark, K6 (up to 500 concurrent users)
- **Benchmarking**: Sysbench (CPU, memory, I/O)
- **Monitoring**: Prometheus, Grafana, kube-prometheus-stack

### Automation
- **Terraform** - Azure infrastructure provisioning
- **Ansible** - K3S cluster automation
- **Helm** - Kubernetes package management
- **kubectl** - Cluster management

## Architecture

### AKS Deployment
- Azure Resource Group → AKS Cluster → VM Scale Sets → Azure Load Balancer
- Networking: Kubenet + Calico network policies
- Fully automated via Terraform

### K3S Deployment  
- VMware vSphere → HA Control Plane (3 nodes) → Worker Nodes (2)
- Networking: Flannel CNI
- Automated via Ansible playbooks

### Online Boutique App
15 microservices: Frontend, Product Catalog, Cart, Checkout, Payment, Shipping, Currency, Recommendation, Email, Ad Service, Load Generator

## Recommendations

### Choose AKS When:
- Cost is primary concern (no existing infrastructure)  
- Ease of management > raw performance  
- Azure ecosystem integration valuable  
- Limited Kubernetes expertise in-house  
- Cloud-first strategy  

### Choose K3S When:
- Maximum performance critical  
- Existing on-premises infrastructure  
- Edge/IoT deployments  
- Need full customization  
- Data sovereignty requirements  
- Expert Kubernetes team available  

## Skills Demonstrated

**Cloud & Infrastructure**: Azure, Kubernetes, VMware vSphere, Infrastructure as Code  
**Automation**: Terraform, Ansible, CI/CD concepts  
**Containers**: Docker, Kubernetes orchestration  
**Monitoring**: Prometheus, Grafana, performance analysis  
**Testing**: Load testing, benchmarking, system optimization  
**Networking**: Kubernetes networking, load balancing, CNI plugins  
**Research**: Quantitative analysis, cost modeling, technical writing

**Supported by**: SICK Mobilisis (infrastructure resources)
