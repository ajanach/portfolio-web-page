---
title: "A Decision-Making Framework for Evaluating Orchestration Systems in Microservices Applications"
summary: "Published research paper (MIPRO 2025 / IEEE Xplore) presenting a structured decision-making framework for selecting optimal container orchestration systems based on performance, cost, setup effort, and operational complexity."
date: "2025-05-20"
tags:
  - Master
  - Research
draft: false
demoUrl: ""
repoUrl: ""
---

# Publication Details

| Conference | Publication | Co-Author | Resources |
|------------|-------------|-----------|-----------|
| MIPRO 2025, Opatija | IEEE Xplore | Rok Piltaver | [IEEE Paper](https://ieeexplore.ieee.org/document/10569234) • [YouTube Presentation](https://youtu.be/DnZDIiyP8yw?si=NzeaXhhUma0pZlpG) • [Slides](https://www.slideshare.net/slideshow/a-decision-making-framework-for-evaluating-orchestration-systems-in-microservices-applications/283042960) |

## Overview

Published research paper addressing the critical challenge of selecting container orchestration systems for microservices architectures. Proposes a structured decision-making framework using DEXi methodology to replace intuition-based decisions with data-driven analysis across performance, cost, setup effort, and operational complexity dimensions.

**Context**: Extends MSc thesis work by introducing a hierarchical, multi-criteria evaluation model tailored to organizational needs and business priorities.

## Research Motivation

Modern microservices architectures require orchestration systems (Kubernetes, Docker Swarm, Nomad) to manage deployment, scaling, and resilience. However, choosing the optimal platform is complex due to trade-offs between:
- Performance vs. resource overhead
- Cloud flexibility vs. infrastructure costs
- Ease of use vs. feature richness
- Setup complexity vs. long-term maintenance

**Problem Statement**: Organizations lack structured frameworks for evaluating orchestration systems, leading to suboptimal decisions with long-term consequences.

## Decision-Making Framework

**DEXi Methodology**: Multi-criteria, hierarchical, qualitative, rule-based decision analysis method for evaluating, ranking, and comparing alternatives.

**Evaluation Hierarchy**:
```
Overall Assessment
├── Performance (end-user experience)
├── Cost (total cost of ownership)
├── Setup (initial DevOps effort)
│   ├── Implementation & Configuration
│   ├── Security Setup
│   └── Other (documentation, integrations, customization)
└── Ops (ongoing maintenance)
    ├── Application Deployment
    ├── Monitoring
    └── Scaling
```

**Qualitative Scale**: unacceptable < acceptable < good

## Evaluation Dimensions

**Performance** (Objective & Quantitative):
- **Metrics**: Request latency, availability, throughput
- **Tools**: Apache Benchmark (AB), K6 load testing
- **Results**: K3s averaged 9ms vs. AKS 23ms for home page requests
- **Business Impact**: Directly affects user satisfaction and determines maximum service capacity before scaling

**Cost** (Objective & Quantitative):
- **Scope**: Total cost of ownership over 5 years (hardware, cloud services, maintenance, electricity, networking, data center)
- **Tool**: Azure TCO Calculator
- **Results**: K3s $28,100 ($14,000 without hardware) vs. AKS $16,100
- **Business Impact**: Directly impacts profitability and operational expenses

**Setup Effort** (Subjective & Qualitative):
- **Definition**: DevOps work required before first production deployment
- **Components**: Implementation, configuration, security setup, documentation, integrations
- **Business Impact**: Affects time-to-market and team expertise requirements
- **Evaluation**: Based on documentation, known processes, and team experience

**Ops Effort** (Subjective & Qualitative):
- **Definition**: Long-term DevOps work after deployment
- **Components**: Application updates, monitoring, scaling, maintenance
- **Business Impact**: Ensures application stability and incurs most long-term maintenance costs
- **Evaluation**: Based on tooling complexity and team experience

## Case Study: K3s vs. Azure Kubernetes Service (AKS)

**Compared Systems**:
- **K3s**: Self-managed, bare-metal deployment with minimal resource usage and upfront hardware costs
- **AKS**: Managed Azure cloud service with simplified operations, higher resource usage, and pay-as-you-go pricing

**Business Scenarios**:

1. **SoloDev** (Solo Developer):
   - Priorities: Low cost, simple deployment, minimal overhead
   - Performance requirements: Modest

2. **CloudCorp** (Cloud-based SaaS Provider):
   - Priorities: Reliability, security, cloud infrastructure
   - Operates entirely on Azure

3. **OwnMetal** (On-Premises Enterprise):
   - Priorities: Reliability, security, private data center
   - Has veteran DevOps team and existing hardware

## Key Findings

**Performance Results**:
- K3s outperformed AKS in request latency (9ms vs 23ms)
- Both systems rated "acceptable" for all business scenarios
- Consistent performance across different load profiles

**Cost Analysis**:
- **SoloDev**: K3s rated "unacceptable" (high hardware investment), AKS "acceptable"
- **CloudCorp**: K3s "acceptable" (ongoing cloud costs), AKS "good" (native Azure integration)
- **OwnMetal**: K3s "good" (existing infrastructure), AKS "acceptable"

**Setup & Ops Complexity**:
- K3s requires more initial setup but provides full control
- AKS simplifies operations but introduces cloud dependencies
- OwnMetal scenario benefits from existing DevOps expertise with K3s

**Overall Conclusions**:
- **No universal "best" system** - optimal choice depends on business context
- **SoloDev**: AKS preferred (lower initial cost, simpler setup)
- **CloudCorp**: AKS optimal (native Azure integration, managed services)
- **OwnMetal**: K3s favorable (leverage existing infrastructure and expertise)

## Research Contributions

- Structured decision-making model replacing intuition-based orchestration selection
- Hierarchical framework evaluating 4 key dimensions with 9 sub-attributes
- Objective performance and cost evaluation methodologies
- DEXi-based comparative analysis across multiple business scenarios
- Demonstrates context-dependent nature of "optimal" orchestration choices
- Practical framework adaptable to specific organizational use cases

## Methodology Highlights

**Strengths**:
- Good balance between discriminative power and practical usability
- Easy to adjust: simplify, extend, refine, or adapt for specific use cases
- Combines objective (performance, cost) and subjective (setup, ops) evaluations
- Highlights key differences depending on business environment

**Tools Used**:
- **Performance Testing**: Apache AB, K6
- **Cost Analysis**: Azure TCO Calculator
- **Decision Analysis**: DEXi software
- **Test Application**: Google Online Boutique microservices demo

## Skills Demonstrated

Research methodology, technical writing, multi-criteria decision analysis, orchestration systems architecture, performance benchmarking, cost-benefit analysis, qualitative evaluation frameworks, academic publishing, conference presentation

## Acknowledgments

Special thanks to SICK Mobilisis d.o.o. for their resources and support in conducting this research.

**Co-authored with**: Rok Piltaver, Faculty of Informatics and Digital Technologies, University of Rijeka
