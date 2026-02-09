---
title: "FOI Career Week: Live Demo of Terraform to GitOps on AKS"
summary: "Co-hosted hands-on workshop at FOI Career Week, demonstrating Infrastructure as Code with Terraform, Azure Kubernetes Service provisioning via GitLab CI/CD, and GitOps-based deployments with ArgoCD."
date: "2025-10-23"
tags: 
  - Career
draft: false
---

![Antonio Janach and Robi Hrnčić presenting GitOps workshop at FOI Career Week 2025](/projects/career/antonio-janach-robi-hrncic-foi-career-week-2025.jpg)

## Overview

Delivered a hands-on DevOps workshop at the Faculty of Organization and Informatics Career Week, representing SICK Sensor Intelligence alongside Robi Hrnčić. Guided students through building a production-grade **Azure Kubernetes Service** cluster from scratch using **Terraform**, automating infrastructure deployment with **GitLab CI/CD**, and implementing **GitOps** with **ArgoCD** for continuous synchronization.

The workshop demonstrated how Infrastructure as Code and GitOps eliminate manual deployment steps and enable teams to achieve deployment cycles measured in minutes rather than days. By combining declarative infrastructure, automated pipelines, and pull-based synchronization, we showcased the same workflows used to manage production Kubernetes environments.

## Why This Matters

Traditional infrastructure provisioning through Azure Portal leads to configuration drift, manual errors, and deployment times measured in hours or days. Modern DevOps teams need reproducible, auditable, and fast deployment workflows that scale across multiple environments.
This workshop brought real-world practices to students, demonstrating the exact tools and methodologies used to manage multi-cluster Kubernetes deployments in production, staging, and development environments. Infrastructure that would take days to provision manually was automated to minutes with full version control and rollback capabilities.

## What We Built

Designed and delivered a live demonstration covering the full DevOps lifecycle, from infrastructure provisioning to application deployment, using industry-standard tools.

### Infrastructure as Code with Terraform

Provisioned the entire Azure Kubernetes Service cluster through Terraform configuration files, including Resource Groups, Virtual Networks, multi-node pools, and networking integration. The setup was version-controlled in Git and automatically applied via GitLab CI/CD pipelines, eliminating manual Azure Portal configuration and ensuring reproducible deployments across environments.

### GitOps with ArgoCD

Connected the AKS cluster to ArgoCD and configured GitOps workflows for both system services (ingress-nginx, kube-prometheus-stack, Grafana, Rancher) and a demo application. ArgoCD monitored Git repositories and automatically synchronized Kubernetes manifests to the cluster. Every Git commit triggered automatic application rollouts without manual kubectl commands, providing complete audit trails and instant rollback capabilities.

### System and Application Services

Deployed production-grade components using GitOps: ingress-nginx for cluster routing with TLS certificates, kube-prometheus-stack for monitoring with Prometheus and Grafana dashboards, and Rancher for web-based cluster management. All services were deployed declaratively through ArgoCD, demonstrating how production clusters require comprehensive observability from Day 1.

Additionally, built a hands-on demo application that allowed students to deploy their own containerized workloads directly to the cluster. The application provided a web interface where students could generate personalized Kubernetes manifests by entering their username, with each deployment automatically exposed at a unique URL path. This interactive element turned the workshop from a passive presentation into an engaging hands-on experience, where students saw their own deployments go live within seconds.

## Tech Stack

**Cloud Platform:** Azure (AKS, Virtual Network, Resource Groups)  
**Infrastructure as Code:** Terraform, GitLab CI/CD  
**Kubernetes:** Azure Kubernetes Service (AKS)  
**GitOps:** ArgoCD  
**System Services:** ingress-nginx, kube-prometheus-stack, Prometheus, Grafana, Rancher

## Skills Demonstrated

Infrastructure as Code, Terraform automation, GitLab CI/CD pipelines, Azure Kubernetes Service, GitOps methodologies, ArgoCD deployment workflows, Ingress controllers, Kubernetes cluster management, observability with Prometheus and Grafana, technical workshop delivery, enterprise DevOps practices

## Key Outcomes

- Delivered 2-hour live demonstration to FOI students, showcasing end-to-end DevOps automation from cloud infrastructure to running applications
- Demonstrated infrastructure provisioning workflows that reduce deployment times from days to minutes with full automation
- Enabled hands-on learning of production-grade cloud-native tools actively used in enterprise environments
- Demonstrated multi-tenancy patterns with dynamic Ingress routing, isolating each student's application at unique URL paths
- Showcased GitOps pull-based deployment model with complete audit trails and instant rollback capabilities
- Represented SICK Sensor Intelligence at FOI Career Week 2025, connecting students with real-world DevOps practices

---

**Event:** FOI Career Week 2025  
**Organization:** Faculty of Organization and Informatics, University of Zagreb
