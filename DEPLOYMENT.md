# SOP Ecosystem - Deployment Guide

Complete instructions for setting up the SOP Management System on a new Windows PC.

---

## Quick Start (Automated Setup)

For fastest deployment, use the automated setup script:

1. **Download SETUP.bat** from this repository
2. **Double-click SETUP.bat** to run
3. The script will:
   - Check for Node.js and Git
   - Clone the repository
   - Install dependencies
   - Start the server automatically

4. **Open browser** to: http://localhost:8080

---

## Prerequisites

Before starting, ensure you have:

### Required Software

| Software | Minimum Version | Download Link |
|----------|----------------|---------------|
| **Node.js** | v18.0.0+ | https://nodejs.org/ |
| **Git** | v2.30+ | https://git-scm.com/download/win |
| **npm** | v9.0.0+ | (Included with Node.js) |

### System Requirements

- **OS**: Windows 10/11, macOS, or Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 500MB free space
- **Browser**: Chrome, Firefox, Edge, or Safari (latest version)

---

## Manual Setup Instructions

### Step 1: Install Prerequisites

#### Install Node.js
Download from: https://nodejs.org/
Choose LTS (Long Term Support) version
Verify installation:
  node --version
  npm --version

#### Install Git
Download from: https://git-scm.com/download/win
Verify installation:
  git --version

### Step 2: Clone Repository

Open Command Prompt or PowerShell:

  cd C:\Projects
  git clone https://github.com/Chunkys0up7/SOPDemo.git
  cd SOPDemo

### Step 3: Checkout Main Branch

  git checkout main
  git pull origin main

### Step 4: Install Dependencies

  npm install

This will install all Node.js dependencies from package.json

### Step 5: Start the Server

  npm start

Expected output:
  Server running at: http://localhost:8080

### Step 6: Access the Application

Open your browser and navigate to:

  http://localhost:8080

---

## Available URLs

### Main Application
- Dashboard: http://localhost:8080
- Interactive Graph: http://localhost:8080/public/interactive-graph.html
- Impact Analysis: http://localhost:8080/public/impact-viewer.html
- Component Library: http://localhost:8080/public/components-library.html
- Workspace: http://localhost:8080/public/workspace.html
- Contribute: http://localhost:8080/public/contribute.html
- Search: http://localhost:8080/public/search.html

### Data Endpoints
- Graph Data: http://localhost:8080/graph/sop-graph.json
- Mortgage Graph: http://localhost:8080/graph/mortgage-sop-graph.json

### API Endpoints
- POST /api/assistant/query - RAG-powered SOP queries
- GET /api/assistant/health - Service health check
- GET /api/sops/metrics - SOP metrics dashboard

---

## Features Overview

### Interactive Visualizations

1. **Interactive Graph** (78 Nodes)
   - D3.js force-directed layout
   - Real-time filtering and search
   - Color-coded by component type

2. **Impact Analysis**
   - Change propagation visualization
   - Risk scoring (Critical/High/Medium/Low)
   - Tree view of dependencies

3. **Component Library**
   - Browse 78 components
   - Reuse metrics and statistics
   - Search and filter capabilities

### Data Set

- 42 Atoms: Forms, templates, policies
- 18 Molecules: Procedures, workflows
- 8 Organisms: Complete processes
- 10 SOPs: End-to-end standards
- 122 Edges: Dependency relationships

---

## NPM Commands

| Command | Description |
|---------|-------------|
| npm start | Start the development server |
| npm run build | Build SOPs from components |
| npm run serve | Start basic HTTP server |

---

## Troubleshooting

### Port Already in Use

If port 8080 is already in use:

  netstat -ano | findstr :8080
  taskkill /PID <PID> /F

### npm install Fails

  npm cache clean --force
  del package-lock.json
  npm install

### Git Clone Fails

Download ZIP from GitHub and extract, then run:
  npm install

---

## Verification Checklist

After setup, verify:

- Server starts without errors
- Dashboard loads at http://localhost:8080
- Navigation header shows 7 links
- 6 quick action cards display correctly
- Interactive Graph loads and shows 78 nodes
- All pages have "Back to Dashboard" navigation

---

## Updating the Application

  cd SOPDemo
  git pull origin main
  npm install
  npm start

---

## Quick Reference

### One-Command Setup (Automated)
  SETUP.bat

### Manual Setup (3 Commands)
  git clone https://github.com/Chunkys0up7/SOPDemo.git
  cd SOPDemo
  npm install && npm start

### Access Application
  http://localhost:8080

---

Last Updated: November 30, 2025
Version: 1.0.0
Status: Production Ready
