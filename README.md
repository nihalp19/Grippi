# Grippi - Marketing Campaign Management

A full-stack application for managing and analyzing marketing campaigns, built with React, FastAPI, and SQLite.

![Grippi Dashboard](https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [API Documentation](#api-documentation)
- [Live Demo](#live-demo)

## 🔍 Overview

Grippi is a marketing campaign management application that allows users to view and filter marketing campaigns based on their status. The application displays campaign metrics such as clicks, costs, and impressions in an easy-to-read table format.

## ✨ Features

- View marketing campaigns in a well-structured table
- Filter campaigns by status (Active/Paused)
- Create new marketing campaigns
- Fetch individual campaign details
- Responsive design that works on desktop and mobile devices
- State management using Zustand
- Backend API with SQLite database

## 🛠️ Tech Stack

### Frontend
- React
- TailwindCSS for styling
- Axios for API requests
- Zustand for state management

### Backend
- FastAPI (Python)
- SQLite database
- Pydantic for data validation

### Deployment
- Vercel (Frontend)
- Railway (Backend)

## 📂 Project Structure

```
grippi/
├── frontend/
│   ├── src/
│   │   ├── axiosInstance/    # Axios configuration
│   │   ├── components/       # React components
│   │   ├── data/            # Zustand store
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── main.py              # FastAPI application
│   ├── campaigns.db         # SQLite database
│   └── requirements.txt     # Python dependencies
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- SQLite3

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/nihalp19/Grippi.git
   cd grippi/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```
   VITE_API_URL=http://localhost:8000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the API server:
   ```bash
   uvicorn main:app --reload
   ```

## 📝 API Documentation

### Endpoints

#### GET /campaigns
Returns a list of all campaigns with optional status filtering.

**Query Parameters:**
- `status` (optional): Filter campaigns by status (`Active` or `Paused`)

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Summer Sale",
    "status": "Active",
    "clicks": 150,
    "cost": 45.99,
    "impressions": 1000
  }
]
```

#### GET /campaigns/{campaign_id}
Returns details of a specific campaign.

**Parameters:**
- `campaign_id`: ID of the campaign to retrieve

**Example Response:**
```json
{
  "id": 1,
  "name": "Summer Sale",
  "status": "Active",
  "clicks": 150,
  "cost": 45.99,
  "impressions": 1000
}
```

#### POST /campaigns
Creates a new campaign.

**Request Body:**
```json
{
  "name": "New Campaign",
  "status": "Active",
  "clicks": 0,
  "cost": 0.00,
  "impressions": 0
}
```

## 🔗 Live Demo

- Frontend: [https://grippi-nu.vercel.app/](https://grippi-nu.vercel.app/)
- Backend API: [https://grippi-production.up.railway.app/](https://grippi-production.up.railway.app/)
