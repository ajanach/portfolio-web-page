---
title: "Coin Piggy - Smart Piggy Bank"
summary: "IoT piggy bank with auto-lock mechanism, progress tracking, and interactive feedback for teaching children financial literacy."
date: "2017-12-01"
tags:
  - Legacy
draft: false
---

## Timeline and Details

| Start date | End date | Associated with | Project URL |
|------------|----------|-----------------|-------------|
| September 2017 | December 2017 | Enter Koprivnica | [ePodravina Article](https://epodravina.hr/kreativni-srednjoskolci-izradili-pametnu-kasicu-prasicu-koja-vas-motivira-stednju/) |

**Recognition**: Featured at PBZ Novathon, Zagreb

## Overview

IoT-enabled piggy bank that auto-locks until savings goal is reached. Combines multiple microcontrollers and wireless communication for interactive financial education.

## Technical Implementation

**Hardware Components**:
- 3x Micro:bit (parent controller + 2 child nodes)
- Arduino (lock control logic)
- 5V relay + 12V electronic lock
- Laser-cut enclosure (Solid Edge CAD, CNC machined)

**Software Architecture**:
- **Parent Micro:bit**: Main controller with radio communication, savings tracking, mode switching
- **Child Micro:bit 1**: Visual feedback (eye display based on progress)
- **Child Micro:bit 2**: Serial communication bridge to Arduino (9600 baud)
- **Arduino**: Lock control logic (releases when goal reached)

**Communication**:
- Radio mesh network (Micro:bit to Micro:bit)
- Serial UART (Micro:bit to Arduino)

## Features

- Goal-based auto-lock mechanism
- Manual coin value input via Micro:bit buttons
- Shake-to-activate deposit mode
- Visual progress tracking on LED matrix
- Emotional feedback (displays sad face if inactive 4+ days)
- Emergency unlock override

## Tech Stack

**Hardware**: Micro:bit, Arduino, relay, servo lock  
**CAD/Manufacturing**: Solid Edge, CNC laser cutter  
**Programming**: MicroPython, Arduino C/C++  
**Communication**: Radio mesh (2.4GHz), serial UART

## Skills

Embedded systems, multi-microcontroller architecture, wireless communication protocols, CAD design, CNC fabrication, hardware prototyping
