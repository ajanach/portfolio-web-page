---
title: "Master's Thesis - Comparison of Orchestration Systems for Microservices Applications"
draft: false
---

# Timeline and Details
| Start date    | End date      | Associated with | Project URL                                                                        |
| ------------- | ------------- | --------------- | ---------------------------------------------------------------------------------- |
| April 2024 | September 2024 | Faculty of Informatics and Digital Technologies | [GitHub Project](https://github.com/ajanach/comparison-of-orchestration-systems-for-microservices-applications.git) |

## Downloads
- [Thesis PDF](/projects/MASTER/masters_thesis_-_comparison_of_orchestration_systems_for_microservices_applications.pdf)
- [Presentation PDF](/projects/MASTER/presentation_-_comparison_of_orchestration_systems_for_microservices_applications.pdf)

## Video
- [Master's Thesis Defense on YouTube](https://youtu.be/kA0KqmDsE-o?si=ueKHOJE_VROfPiWS)

## Description
This thesis provides a comprehensive comparison of Kubernetes orchestration tools, specifically focusing on Azure Kubernetes Service (AKS) and K3S, to determine their suitability for orchestrating a medium-complexity microservices application, exemplified by the "Online Boutique" application, which consists of 15 containers. The analysis compares one tool supporting on-premises environments (K3S) with another designed for cloud environments (AKS), emphasizing performance, cost-effectiveness, management complexity, and scalability.

The quantitative analysis was conducted on infrastructure with identical resources, including CPU, memory, and storage, to ensure a fair comparison. AKS demonstrated significant cost advantages over a five-year period, largely due to its integration with the Azure ecosystem, which optimizes resource allocation and reduces operational overhead. However, K3S consistently outperformed AKS in key performance metrics, including CPU speed, memory transfer rate, and request-handling capabilities. These performance differences are partly due to the additional load created by the hypervisor and the extra cloud-specific services running within the AKS cluster.

The qualitative analysis identified differences in implementation, configuration, ease of deployment, integration, and management. AKS excels in cloud environments due to its automated management and seamless integration with Azure, making it suitable for organizations looking to minimize operational overhead. In contrast, K3S offers greater flexibility and customization, particularly for on-premises deployments or scenarios requiring specific configurations. Additionally, K3S is suitable for organizations with existing on-premises infrastructure.

Keywords: Kubernetes, Azure Kubernetes Service, AKS, K3S, microservices, cloud 
computing, on-premises, container orchestration, performance analysis, cost-effectiveness. 
