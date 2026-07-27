---
title: "Parallel Dijkstra Algorithm - MPI & CUDA Implementation"
summary: "Comparative study of serial vs parallel implementations of Dijkstra's shortest path algorithm using MPI and CUDA in Python."
date: "2022-12-15"
tags:
  - Master
draft: false
demoUrl: ""
repoUrl: ""
---

## Timeline and Details

| Start date | End date | Associated with | Resources |
|------------|----------|-----------------|-----------|
| October 2022 | December 2022 | Faculty of Informatics and Digital Technologies, University of Rijeka | [MPI Implementation](https://github.com/ajanach/dijkstra-MPI) · [CUDA Implementation](https://github.com/ajanach/dijkstra-CUDA) |

## Overview

Comparative performance analysis of Dijkstra's shortest path algorithm implemented in serial, parallel (MPI), and GPU-accelerated (CUDA) versions using Python. Demonstrates significant speedup through parallelization on large graphs with 2000 nodes and 8000 edges.

**Note**: Developed in collaboration with a fellow student. Collaborator details available on the [GitHub repository](https://github.com/ajanach/dijkstra-MPI).


## Key Results

Performance comparison on graph with 2000 nodes and 8000 edges:
- **Serial execution**: 0.284 seconds
- **Parallel MPI execution**: 2.30e-05 seconds
- **Speedup**: ~12,350x faster with parallel implementation

## Implementation Details

**Serial Implementation**:
- Classic Dijkstra algorithm with adjacency list representation
- Iterative approach visiting nodes sequentially
- Random graph generation for testing

**MPI Parallel Implementation**:
- Distributed memory parallelization using MPI4py
- Weight matrix partitioned across multiple processors
- Processor 0 generates graph and distributes to workers
- Each processor computes local shortest distances
- Results gathered and combined at root processor

**CUDA GPU Implementation**:
- Custom CUDA kernel for parallel distance computation
- Thread-based parallelization (1024 threads per block)
- GPU memory allocation for distance arrays and adjacency matrix
- Iterative kernel execution for graph relaxation

## Technical Stack

**Language**: Python 3  
**Parallelization**: MPI4py (Message Passing Interface), PyCUDA  
**Libraries**: NumPy, timeit, random  
**Execution**: Multi-processor systems, NVIDIA GPU

## Key Findings

**Advantages of Parallelization**:
- Significant speed improvement for large datasets
- Better resource utilization across multiple processors
- Scalability for complex graph problems

**Limitations**:
- Overhead from thread creation and synchronization
- Not optimal for small graphs (serial faster due to overhead)
- Increased complexity and debugging difficulty

**Conclusion**: Parallelization is most beneficial for processing large amounts of data where computational gains outweigh communication overhead.

## Skills Demonstrated

Python programming, parallel algorithm design, MPI message passing, CUDA GPU programming, performance benchmarking, distributed systems, algorithm optimization, heterogeneous computing
