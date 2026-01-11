---
title: "Wireless Network Implementation & RF Site Survey"
summary: "Conducted comprehensive RF spectrum analysis with Ekahau HeatMapper and NetSpot, designed enterprise WLAN infrastructure for 780m² office using 5 omnidirectional access points with dual-band 802.11n/ac coverage, and performed antenna radiation pattern analysis."
date: "2021-07-31T22:00:00.000Z"
tags:
  - Bachelor
draft: false
demoUrl: ""
repoUrl: ""
---

# Timeline and Details

| Start date  | End date    | Associated with              | Project URL                                                              |
| ----------- | ----------- | ---------------------------- | ------------------------------------------------------------------------ |
| April 2021  | July 2021   | Algebra Bernays University   | [Project PDF](/projects/bachelor/antonio_janach_-_projektni_zadatak_BRM.pdf) |

## Overview

Designed and deployed enterprise-grade wireless LAN infrastructure through comprehensive RF site surveys, spectrum analysis, and capacity planning. Implemented multi-access point architecture with channel optimization and roaming capabilities, ensuring seamless connectivity for collaborative applications while meeting regulatory compliance (HAKOM EIRP limits).

---

## Part 1: Residential RF Site Survey & Optimization

### Spectrum Analysis (2.4 GHz & 5 GHz)

**RF Environment Assessment**
- Utilized **Intel Dual Band Wireless-AC 7265** adapter for spectrum scanning
- Performed analysis using **NetSpot** and **Ekahau HeatMapper** professional tools
- Tested with **Innbox V45 Home Gateway** (Optima Telekom) - 2.4 GHz only device
- Measured SSID "inbox" operating on **Channel 12** with **-31 dBm** signal strength at 1-meter distance
- Identified **zero channel overlap** with neighboring networks (clean RF environment)
- SNR > 20 dBm confirmed healthy network operation

**Interference Sources Identified**
- Wireless phones and cameras
- Bluetooth devices
- LCD monitors with RF emissions
- Satellite receivers
- ISM band devices (2400-2500 MHz)

### Heat Map Generation & Coverage Analysis

**Survey Methodology**
- Created architectural floor plan using **RoomSketcher** (127.37m² residential space)
- Conducted **walking survey** with 1-meter measurement intervals
- Generated visual heat maps showing RSSI distribution across entire property
- Performed two comparative tests:
  - **Test 1**: 100% transmit power (maximum coverage)
  - **Test 2**: 20% transmit power (reduced coverage showing dead zones)

**Signal Quality Standards Applied**

| Signal Strength | Quality      | Use Case                                    |
|-----------------|--------------|---------------------------------------------|
| -30 dBm         | Excellent    | Maximum achievable (few meters from AP)     |
| -67 dBm         | Very Good    | Reliable for latency-sensitive applications |
| -70 dBm         | Good         | Minimum for reliable packet delivery        |
| -80 dBm         | Poor         | Basic connectivity (unreliable packets)     |
| -90 dBm         | Unusable     | No functional connectivity                  |

**Coverage Results**
- At 100% power: Adequate coverage throughout property including kitchen and terrace
- At 20% power: Significant signal degradation in kitchen and terrace areas
- Material attenuation effects observed (concrete, drywall, glass)

### Optimization Recommendations

**Access Point Repositioning**
- Proposed relocation to central hallway position (upper-right corner)
- Rationale: Equalized signal propagation to all rooms
- Expected improvement: 15-20% better coverage uniformity

**Equipment Upgrades**
- Replace ISP combo device with dedicated **enterprise-grade AP** supporting 5 GHz
- Enable **40 MHz channel bonding** for increased throughput
- Disable WiFi on ISP gateway, use purely as router
- Maintain Channel 12 operation (no interference detected)

### Technical Stack
NetSpot • Ekahau HeatMapper • RoomSketcher • Intel Dual Band Wireless-AC 7265 • ISM Band (2.4 GHz) • Channel Planning • RSSI Measurements

---

## Part 2: Enterprise WLAN Design (BRM d.o.o.)

### Project Requirements

**Client Specifications**
- Office space: **780m²** (conference rooms, offices, reception, kitchen, employee area)
- Dual-band support: **2.4 GHz + 5 GHz** mandatory
- Standards: **802.11n** and **802.11ac** only
- Seamless roaming: No connection drops during inter-AP transitions
- SSID: "BRM"
- Collaborative applications: Zoom, Skype, Adobe Connect (VoIP quality required)
- Budget constraint: Minimize AP count while meeting performance targets

**Regulatory Compliance (HAKOM)**
- **2.4 GHz**: Maximum EIRP 20 dBm (200 mW with 20 MHz bandwidth)
- **5 GHz**: EIRP varies by sub-band:
  - UNII-1: 23 dBm
  - UNII-2: 23 dBm
  - UNII-2 Extended: 30 dBm
  - UNII-3: 36 dBm

**Performance Targets**
- **2.4 GHz**: Net loss ≤ 83 dB; minimum data rate 200 Mbps at weakest point
- **5 GHz**: Net loss ≤ 94 dB; minimum data rate 160 Mbps at weakest point

### Architecture Design

**Building Material Analysis**

| Material                 | Signal Attenuation |
|--------------------------|-------------------|
| Drywall (15 cm)          | 8-16 dBm          |
| Reinforced concrete (25 cm) | 10-19 dBm      |
| Glass wall (15 cm)       | 4 dBm             |
| Metal doors              | 4 dBm             |
| Partition walls (6 cm)   | 3-4 dBm           |

**EIRP Calculations**
- **Antenna**: 5 dBi omnidirectional
- **Transmit power**: 63 mW (17.99 dBm)
- **Cable loss**: 0 dB (internal antenna)
- **EIRP formula**: `EIRP = Transmit Power - Cable Loss + Antenna Gain`
- **Result**: 22.99 dBm (199.22 mW) - within legal 200 mW limit

**RSSI Calculations**
- **2.4 GHz**: RSSI = 22.99 dBm - 83 dB = **-60 dBm** (Good quality)
- **5 GHz**: RSSI = 22.99 dBm - 94 dB = **-71 dBm** (Acceptable quality)

**MCS Index Configuration**
- **2.4 GHz**: 802.11n with **3 spatial streams**, 400ns GI → 216.7 Mbps (exceeds 200 Mbps requirement)
- **5 GHz**: 802.11ac with **2 spatial streams**, 40 MHz channel → 180 Mbps (exceeds 160 Mbps requirement)

### Deployment Solution

**Access Point Configuration (5 APs Total)**

| AP    | 2.4 GHz Config                | 5 GHz Config                    |
|-------|-------------------------------|---------------------------------|
| **AP1** | Channel 1, 63 mW, 802.11n, 20 MHz | Channels 36-40, 63 mW, 802.11n/ac, 40 MHz |
| **AP2** | Channel 11, 63 mW, 802.11n, 20 MHz | Channels 44-48, 63 mW, 802.11n/ac, 40 MHz |
| **AP3** | Channel 6, 63 mW, 802.11n, 20 MHz | Channels 52-56, 63 mW, 802.11n/ac, 40 MHz |
| **AP4** | Channel 6, 63 mW, 802.11n, 20 MHz | Channels 60-64, 63 mW, 802.11n/ac, 40 MHz |
| **AP5** | Channel 1, 63 mW, 802.11n, 20 MHz | Channels 100-104, 63 mW, 802.11n/ac, 40 MHz |

**Channel Planning Strategy**
- **2.4 GHz**: Non-overlapping channels **1, 6, 11** (EU best practice)
- Avoided 1, 5, 9, 13 scheme due to potential co-channel interference
- **5 GHz**: Distributed across UNII bands with 40 MHz bonding
- Zero channel overlap achieved on both bands

**Coverage Analysis**
- **2.4 GHz**: Full office coverage with RSSI ≥ -60 dBm everywhere
- **5 GHz**: Critical areas fully covered (conference rooms, offices, reception, kitchen)
- Central employee area: Partial 5 GHz coverage, but workstations receive adequate signal
- Heat maps generated using **Acrylic Wi-Fi HeatMaps** software

### Technical Stack
Acrylic Wi-Fi HeatMaps • 5 dBi Omnidirectional Antennas • 802.11n/ac • EIRP Calculations • MCS Index Optimization • Channel Bonding (40 MHz) • HAKOM Compliance • RSSI Planning

---

## Part 3: Antenna Radiation Pattern Analysis

### Pattern Visualization

**Antenna Specifications**
- Type: **Omnidirectional 5 dBi**
- Radiation: 360° horizontal plane coverage
- Vertical null: Signal strength approaches zero along antenna axis
- Application: Point-to-multipoint topology

**2D & 3D Pattern Generation**
- Tool: **Antenna Pattern Editor**
- **2D pattern**: Shows uniform 360° horizontal radiation (doughnut shape)
- **3D pattern**: Visualizes toroidal radiation pattern (multiple viewing angles)
- Confirmed omnidirectional behavior across horizontal plane
- Demonstrated vertical axis null (minimal coverage directly above/below antenna)

**Analysis Insights**
- Horizontal axis: Maximum energy propagation
- Vertical axis: Signal attenuation to near-zero
- Pattern confirms suitability for indoor office deployment (ceiling-mounted APs)

### Technical Stack
Antenna Pattern Editor • 5 dBi Omnidirectional Antenna • Radiation Pattern Analysis • 2D/3D Visualization • RF Propagation Modeling

---

## Results

**Part 1: Residential Survey**
- Successfully identified clean RF environment (Channel 12 with no interference)
- Generated actionable optimization recommendations (AP repositioning + equipment upgrade)
- Demonstrated 80% coverage degradation at 20% transmit power in remote areas

**Part 2: Enterprise Deployment**
- **5 access points** provide complete 780m² office coverage
- Met all technical requirements: EIRP compliance, RSSI thresholds, MCS data rates
- Achieved **zero channel overlap** on both 2.4 GHz and 5 GHz bands
- Seamless roaming enabled via overlapping coverage cells
- Cost-optimized solution: Minimal AP count while exceeding performance targets

**Part 3: Antenna Analysis**
- Validated omnidirectional radiation characteristics through 2D/3D patterns
- Confirmed antenna selection appropriate for office environment
- Documented theoretical vs. practical propagation behavior

## Key Learnings

- **Site survey methodology**: 1-meter interval walking surveys provide accurate heat map data for residential/SMB environments
- **Material attenuation**: Reinforced concrete (10-19 dBm loss) significantly impacts coverage vs. drywall (8-16 dBm)
- **Channel planning**: European 2.4 GHz deployments should use channels 1, 6, 11 to avoid co-channel interference
- **5 GHz advantages**: 40 MHz bonding and less congested spectrum provide superior performance for enterprise applications
- **Roaming**: Overlapping coverage cells (15-20% overlap zones) essential for seamless VoIP/video conferencing
- **Regulatory compliance**: HAKOM EIRP limits must be calculated including antenna gain to avoid violations
- **MCS optimization**: 802.11ac with 2+ spatial streams required to meet 160+ Mbps requirements in realistic office environments
