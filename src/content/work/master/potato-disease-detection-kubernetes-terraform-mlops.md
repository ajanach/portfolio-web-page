---
title: "Potato Disease Detection - CNN Model with Kubernetes & Terraform MLOps Pipeline"
summary: "End-to-end ML system for agricultural disease detection using CNN, deployed on Azure Kubernetes Service via Terraform IaC, with TensorFlow Serving, FastAPI backend, and React frontend."
date: "2024-02-28"
tags:
  - Master
draft: false
---

## Timeline and Details

| Start date | End date | Associated with | Resources |
|------------|----------|-----------------|-----------|
| January 2024 | February 2024 | Faculty of Informatics and Digital Technologies, University of Rijeka | [GitHub Repo](https://github.com/ajanach/potato-disease-detection-kubernetes-terraform-mlops.git) |

## Overview

Production-ready ML system for detecting potato plant diseases (Early Blight, Late Blight, Healthy) through leaf image analysis using CNN. Deployed on cloud-native infrastructure with Azure Kubernetes Service, orchestrated via Terraform IaC. Enables farmers to photograph potato leaves with mobile devices and receive instant disease diagnosis for organic farming treatment.

## ML Model & Training

**CNN Architecture**:
- 6 convolutional layers (32→64 filters) with ReLU activation
- MaxPooling2D layers (2x2) for spatial reduction
- Input: 256x256x3 RGB images
- Output: 3-class softmax classification
- Data augmentation: random flips, rotations, rescaling

**Training Results**:
- Dataset: 2,152 images from Kaggle (80/10/10 split)
- **Final Accuracy**: 97.51% training, 98.44% validation, 96.88% test
- Optimizer: Adam with SparseCategoricalCrossentropy loss
- 60 epochs, batch size 32
- Training: Google Colab with GPU acceleration

## System Architecture

**Application Stack**:
- **Model Serving**: TensorFlow Serving with REST API (port 8501) and gRPC (port 8500)
- **Backend**: FastAPI on port 8080 for request handling and TF Serving integration
- **Frontend**: React SPA with Nginx for web/mobile responsive UI
- **Model Versioning**: Supports v1/v2 model hot-swapping without downtime

**Infrastructure & Deployment**:
- **IaC**: Terraform for automated Azure infrastructure provisioning
- **Orchestration**: Azure Kubernetes Service (AKS) with 3 containerized microservices
- **Ingress**: Nginx controller for external traffic routing
- **Containerization**: Docker images for TF Serving, FastAPI, React+Nginx

**Terraform Configuration**:
```hcl
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "ajanach-aks"
  kubernetes_version  = "1.27"
  default_node_pool {
    vm_size    = "Standard_DS2_v2"
    node_count = 1
  }
  network_profile {
    network_plugin = "kubenet"
    network_policy = "calico"
  }
}
```

## Model Performance Comparison

Evaluated 4 CNN configurations:

| Model | Epochs | Validation Accuracy | Training Accuracy |
|-------|--------|---------------------|-------------------|
| 1     | 60     | 96.88%              | 97.82%            |
| 2     | 60     | 96.32%              | 97.26%            |
| 3     | 50     | 96.88%              | 96.41%            |
| 4     | 40     | 94.68%              | 95.66%            |

**Conclusion**: Model 1 (60 epochs) achieved optimal performance with 97.82% training accuracy and minimal overfitting.

## Tech Stack

**ML & Training**: TensorFlow 2.x, Keras, NumPy, Google Colab  
**Backend**: FastAPI, TensorFlow Serving, uvicorn  
**Frontend**: React, Nginx  
**Infrastructure**: Kubernetes (AKS), Terraform, Docker  
**Cloud**: Microsoft Azure

## Skills Demonstrated

Convolutional Neural Networks, TensorFlow model training and serving, Infrastructure as Code (Terraform), Kubernetes orchestration, Azure cloud architecture, Docker containerization, FastAPI development, React development, MLOps pipeline design, model versioning, cloud-native microservices

## Key Features

- Real-time disease prediction with 96.88% accuracy
- Multi-model versioning with hot-swapping
- Scalable microservices on Kubernetes
- Automated infrastructure via Terraform
- Mobile-responsive web interface
- CORS-enabled API with 40MB upload limit
- Production deployment on Azure AKS
