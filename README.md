# TinyML Smart Parking System

A full-stack smart parking system that combines Embedded Systems, TinyML, IoT communication, backend API development, and a modern React dashboard to provide real-time parking occupancy monitoring.

---

## Project Overview

This project was developed as part of a final-year engineering dissertation and demonstrates the complete development pipeline from sensor acquisition to machine learning deployment and web-based visualisation.

The system uses an HC-SR04 ultrasonic sensor connected to an ESP32 microcontroller. Distance measurements are processed locally using a TinyML model generated with Edge Impulse. Occupancy predictions are transmitted via Wi-Fi to a Node.js backend and displayed through a React dashboard.

Unlike traditional threshold-based parking systems, the solution incorporates machine learning directly on embedded hardware, enabling low-latency and cloud-independent decision making.

---

## Key Features

### Embedded Systems
- ESP32 microcontroller implementation
- HC-SR04 ultrasonic distance sensing
- LCD status display
- LED occupancy indicators
- Real-time sensor acquisition

### TinyML
- Edge Impulse model development
- Embedded machine learning inference
- Confidence-based classification
- On-device processing
- No cloud dependency

### Backend Development
- Node.js REST API
- Express.js server
- JSON data handling
- HTTP communication
- Real-time status updates

### Frontend Development
- React dashboard
- Live occupancy monitoring
- Session tracking
- Duration charts
- Dark and light dashboard views

---

## System Architecture

The system consists of four integrated layers:

1. **Sensor Layer**
   - HC-SR04 ultrasonic sensor collects distance measurements.

2. **TinyML Layer**
   - ESP32 executes a trained Edge Impulse classifier locally.

3. **Backend Layer**
   - Node.js server receives and processes occupancy data.

4. **Frontend Layer**
   - React dashboard visualises parking activity and system status.

---

## System Workflow

```text
HC-SR04 Sensor
       │
       ▼
ESP32 Microcontroller
       │
       ▼
TinyML Inference
       │
       ▼
JSON Payload
       │
       ▼
Node.js Backend API
       │
       ▼
React Dashboard
       │
       ▼
User Visualisation
```

---

## Technologies Used

### Embedded Systems
- ESP32
- Arduino IDE
- HC-SR04 Ultrasonic Sensor
- LiquidCrystal_I2C

### TinyML
- Edge Impulse
- Embedded C++
- Supervised Machine Learning

### Backend
- Node.js
- Express.js
- CORS

### Frontend
- React.js
- JavaScript
- HTML
- CSS

### Communication
- Wi-Fi
- HTTP
- JSON

---

## Repository Structure

```text
tinyml-smart-parking-system/
│
├── esp32-firmware/
│   └── smart_parking_tinyml.ino
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── routes/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── screenshots/
│   ├── system-architecture-diagram.png
│   ├── data-flow-diagram.png
│   ├── dashboard-dark-mode.png
│   ├── dashboard-light-mode.png
│   ├── edge-impulse-metrics.png
│   ├── feature-space-visualisation.png
│   ├── dashboard-duration-chart.png
│   ├── dashboard-multiple-sessions.png
│   ├── nodejs-backend-logic.png
│   ├── esp32-json-payload.png
│   └── system-live-action.png
│
├── README.md
└── .gitignore
```

---

## Project Demonstration

### System Architecture

![System Architecture](screenshots/system-architecture-diagram.png)

### Data Flow

![Data Flow](screenshots/data-flow-diagram.png)

### TinyML Training Performance

![Edge Impulse Metrics](screenshots/edge-impulse-metrics.png)

### Feature Space Visualisation

![Feature Space](screenshots/feature-space-visualisation.png)

### Dashboard (Dark Mode)

![Dashboard Dark](screenshots/dashboard-dark-mode.png)

### Dashboard (Light Mode)

![Dashboard Light](screenshots/dashboard-light-mode.png)

### Dashboard Analytics

![Dashboard Analytics](screenshots/dashboard-duration-chart.png)

### Backend API Processing

![Backend Logic](screenshots/nodejs-backend-logic.png)

### ESP32 Communication

![JSON Payload](screenshots/esp32-json-payload.png)

### Live System Operation

![System Live Action](screenshots/system-live-action.png)

---

## Testing and Evaluation

The system was evaluated under a range of operating conditions including:

- Standard indoor operation
- Sensor tilt conditions
- Reflective surfaces
- Low-light environments
- Outdoor deployment

### Performance Results

- Classification Accuracy: **93.3%**
- Average Response Time: **648 ms**
- Reliable occupancy detection across varied conditions

---

##Installation

## Running the Project

### Backend

npm install

npm start

### Frontend

npm install

npm run dev


## Future Improvements

Potential future developments include:

- Multi-space parking management
- Additional sensor integration
- Mobile application support
- Cloud database integration
- Predictive parking analytics
- Expanded TinyML training dataset

---

## Author

**Patrick Loughran**

Embedded Systems Engineering

Final Year Dissertation Project

---

## Copyright

Copyright © 2026 Patrick Loughran.

This repository is provided for educational and portfolio purposes.
