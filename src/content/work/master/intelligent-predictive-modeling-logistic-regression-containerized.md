---
title: "ML Model Serving - TensorFlow, Django & MongoDB"
summary: "End-to-end machine learning deployment pipeline: training logistic regression model, serving via TensorFlow Serving, Django web interface, and MongoDB storage."
date: "2023-02-27"
tags:
  - Master
draft: false
demoUrl: ""
repoUrl: ""
---

## Timeline and Details

| Start date | End date | Associated with | Resources |
|------------|----------|-----------------|-----------|
| April 2024 | September 2024 | Faculty of Informatics and Digital Technologies, University of Rijeka | [GitHub](https://github.com/ajanach/comparison-of-orchestration-systems-for-microservices-applications.git) |

## Overview

Complete ML deployment system demonstrating model training, containerized serving, and web application integration. Implements logistic regression classifier trained with TensorFlow, deployed via TensorFlow Serving REST API, integrated with Django web framework, and persists predictions to MongoDB.

## System Architecture

**Model Training**:
- Binary classification using logistic regression
- TensorFlow 2.x with Keras Sequential API
- 100 epochs training on sample XOR-like dataset
- SavedModel format export for serving

**TensorFlow Serving**:
- Dockerized model serving on ports 8500 (gRPC) and 8501 (REST)
- RESTful API endpoint for predictions
- Hot-swappable model versions

**Django Web Application**:
- Form-based input interface for predictions
- Real-time model inference via HTTP requests
- Prediction history viewer
- Input validation and error handling

**MongoDB Database**:
- NoSQL storage for prediction logs
- Stores: input values, predictions, timestamps
- Docker containerized deployment

## Technical Implementation

**Deployment Stack**:
- Docker Compose orchestrates 3 containers (TensorFlow Serving, Django, MongoDB)
- Bridge network for inter-container communication
- Volume mounts for model persistence
- Port mappings: 8000 (Django), 8501 (TF Serving), 27017 (MongoDB)

**Data Flow**:
1. User submits values via Django form
2. Django sends POST request to TensorFlow Serving REST API
3. Model returns prediction probabilities
4. Results stored in MongoDB with UUID and timestamps
5. Predictions displayed to user and accessible via history page

## Tech Stack

**ML Framework**: TensorFlow 2.x, NumPy  
**Web Framework**: Django 4.1.7  
**Database**: MongoDB (PyMongo driver)  
**Containerization**: Docker, Docker Compose  
**API**: TensorFlow Serving REST API  
**Language**: Python 3.9

## Key Features

- Virtual environment isolation for reproducible builds
- requirements.txt dependency management
- Dockerfile for each service (TF Serving, Django)
- Docker Compose single-command deployment
- REST API integration between Django and TF Serving
- Persistent prediction storage with unique IDs
- Input validation (type checking, empty field handling)

## Skills Demonstrated

Machine learning model deployment, TensorFlow Serving, Django web development, MongoDB NoSQL databases, Docker containerization, Docker Compose orchestration, REST API integration, Python virtual environments, full-stack development
