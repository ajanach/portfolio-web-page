---
title: "Implementing cloud computing in Azure and OpenStack (IRUO)"
draft: false
---

# Timeline and Details

## Azure part:
| Start date    | End date      | Associated with | Project URL                                                                        |
| ------------- | ------------- | --------------- | ---------------------------------------------------------------------------------- |
| April 2021 | July 2021 | Algebra           | [Project PDF](/project/IRUO/antonio_janach_-_projektni_zadatak_IRUO_Azure.pdf) |

## OpenStack part:
| Start date    | End date      | Associated with | Project URL                                                                        |
| ------------- | ------------- | --------------- | ---------------------------------------------------------------------------------- |
| April 2021 | July 2021 | Algebra           | [Project PDF](/project/IRUO/antonio_janach_-_projektni_zadatak_IRUO_OpenStack.pdf) |

## Description

### Azure part:
The project involves creating a resource group in Azure and within that resource group, installing three objects (virtual machines, app services, or other Azure services of your choice) in separate Azure regions, and configuring one Azure virtual network for each region. The first object must be a publicly available L7 load balancer/reverse proxy and load balancing to the WordPress servers in the background must go through the Azure virtual networks. The second and third objects must be WP installations with different active articles. Additionall
y, an automatic redirect from HTTP to HTTPS must be implemented for access to the load balancer from the internet. The WordPress files can be stored in a virtual machine or outside of a virtual machine using Azure storage solutions.

### OpenStack part:
The objective of this project is to install OpenStack with an all-in-one solution within a virtual environment on the cloud, utilizing all available resources to create the environment. The method of installation should be chosen and explained in the project. The project also involves creating two projects within the OpenStack solution, one for production and one for testing. Each project will include minimal installations of Linux distributions, with one instance serving as a database and one as a WordPress. The instances must be connected through a private network and be visible through an external network that allows connection to the WordPress instance only. The production and test environments must be accessible as websites from outside using their own IP addresses. Synchronization can be achieved by connecting the production and test environments through a separate network, with a crontab set up to transfer the production database to the test server every day at midnight.