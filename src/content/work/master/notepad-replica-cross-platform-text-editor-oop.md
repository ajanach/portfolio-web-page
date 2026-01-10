---
title: "Notepad Replica - Cross-Platform Text Editor"
summary: "Windows Notepad replica built with wxWidgets demonstrating object-oriented programming and cross-platform GUI development."
date: "2022-02-28"
tags:
  - Master
draft: false
---

# Timeline and Details

| Start date | End date | Associated with | Resources |
|------------|----------|-----------------|-----------|
| February 2021 | September 2021 | Algebra University College | [Thesis PDF](/projects/bachelor/antonio_janach_-_završni_rad.pdf) |

## Overview

Cross-platform text editor replicating Windows Notepad functionality using wxWidgets framework and C++. Demonstrates event-driven architecture, GUI development, and multi-platform deployment with single codebase [file:38].

## Key Features

**File Operations**: New, New Window, Open, Save, Save As, Page Setup, Print  
**Text Editing**: Undo, Cut, Copy, Paste, Delete, Find, Replace, Go to Line, Select All, Time/Date  
**Formatting**: Auto-line scroll, Word wrap, Font selection  
**UI**: Menu bar (File, Edit, Format, View, Help), Status bar with contextual messages

## Technical Implementation

**Architecture**:
- Notepad Class (wxFrame): 28 event handlers, event table macros
- MainApp Class (wxApp): Application initialization
- Event-driven design using wxWidgets event system

**Libraries**: wxBase, wxCore, wxAdvanced, C++ Standard Library [file:38]

**Build**: CMake cross-platform build system with automatic wxWidgets dependency management

## Tech Stack

**Language**: C++  
**Framework**: wxWidgets (LGPL)  
**IDE**: Visual Studio 2019  
**Platforms**: Windows, macOS, Linux (same codebase, zero modifications)

## Skills

C++ programming, object-oriented design, wxWidgets, event-driven architecture, cross-platform development, CMake, GUI development, documentation
