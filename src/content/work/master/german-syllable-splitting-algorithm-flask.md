---
title: "German Syllabification Algorithm with Flask Web Interface"
summary: "Rule-based NLP algorithm for splitting German words into syllables using linguistic patterns. Flask web application with 87% partial accuracy on test dataset."
date: "2023-01-31"
tags:
  - Master
draft: false
demoUrl: ""
repoUrl: ""
---

# Timeline and Details

| Start date | End date | Associated with | Resources |
|------------|----------|-----------------|-----------|
| November 2022 | January 2023 | Faculty of Informatics and Digital Technologies, University of Rijeka | [GitHub](https://github.com/ajanach/word_syllables) • [Project PDF](/projects/master/antonio_janach_-_projektna_dokumentacija_PZRZ.pdf) |

## Overview

Rule-based NLP algorithm for German language syllabification that splits words into syllables using linguist-defined patterns. Implements explicit and tacit linguistic knowledge formalized in Python, with Flask web interface for manual text input or .txt file upload.

## Algorithm Design

**Linguistic Rule Implementation**:
- Compound word splitting using `compound-split` module
- Prefix separation (an, ab, auf, aus, ein, ver, zer, etc.)
- Vowel-consonant pattern matching (VCCV, VCCCV, VCV, VV)
- Special handling for st, tz, pf clusters
- Three exception rules (Knie, tsch, consecutive vowels)

**Processing Pipeline**:
1. Preprocessing: Handle German special characters (ä, ö, ü, ß)
2. Convert words to vowel (V) and consonant (C) representation
3. Apply regex-based pattern matching for splitting rules
4. Three-pass execution for complete syllable separation
5. Output with spaces between syllables

**Pattern Examples**:
- VCCV → VC-CV (e.g., "Kat-ze")
- VCCCV → VCC-CV (e.g., "Fens-ter")
- VCV → V-CV (e.g., "Au-to")

## Web Application

**Flask Framework Implementation**:
- Manual text input via web form
- .txt file upload and processing
- Live accuracy measurement display (test set results)
- Three-button interface: text input, file upload, accuracy viewer

**User Flow**:
1. Select input method (manual or file upload)
2. Submit German text for syllabification
3. View syllable-separated output with spaces
4. Access real-time accuracy metrics

## Accuracy Testing

**Test Methodology**:
- 72-word test set provided by linguistic expert
- Automated accuracy measurement script using PrettyTable
- Two metrics: complete accuracy and partial accuracy
- Color-coded terminal output with termcolor module

**Results**:
- **Partial accuracy**: 87% (62.53/72 words correctly split)
- **Complete accuracy**: 78% (56/72 words perfectly split)
- 9% improvement when measuring partial vs. complete accuracy
- Limitations primarily from compound-split module performance

## Technical Implementation

**Core Modules**:
- `re`: Regex pattern matching for linguistic rules
- `string`: Punctuation handling and text processing
- `compound-split`: German compound word decomposition (~95% accuracy on 1M Wikipedia nouns)

**Algorithm Functions**:
- `syllables_rules_exceptions()`: Handles compound splitting and 3 exception rules
- `sentence_in_vc()`: Converts text to vowel-consonant representation
- `syllables_rules()`: Applies main splitting patterns (VCCV, VCCCV, VCV, VV)
- Three-pass execution for comprehensive syllable separation

## Tech Stack

**Backend**: Python 3.9, Flask  
**NLP Processing**: regex (re module), compound-split  
**Visualization**: PrettyTable, termcolor  
**Testing**: Custom accuracy measurement scripts

## Skills Demonstrated

Natural language processing, linguistic rule formalization, pattern matching with regex, Flask web development, algorithm optimization, accuracy evaluation methodologies, German language morphology, Python virtual environments, test-driven development

## Key Features

- Handles German special characters and compound words
- Rule-based approach following linguistic expert guidelines
- Multi-pass processing for edge cases
- Web UI with multiple input options
- Automated testing with visual accuracy reports
- Exception handling for irregular patterns (Knie, tsch clusters)
