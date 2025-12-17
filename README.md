# 🌍 AI Travel Planner

An intelligent travel planning application powered by AI that generates personalized day-by-day itineraries based on user preferences, budget, and travel style.

![Travel Planner Logo](https://res.cloudinary.com/drit9nkha/image/upload/v1765941772/TP_LOGO_xiaun4.png)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Frontend Routes](#frontend-routes)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

AI Travel Planner is a full-stack web application that helps travelers create customized trip itineraries in minutes. Users can input their destination, travel dates, budget, preferences, and constraints, and the AI generates a complete day-by-day travel plan with activities, restaurants, accommodation suggestions, and transportation details.

### What It Does

- Intelligent AI-based itinerary generation
- Budget-aware travel planning
- Preference-driven recommendations
- Editable, savable trips
- Secure user authentication

---

## ✨ Features

- 🤖 AI-powered itinerary generation  
- 📅 Multi-day trip planning  
- 💰 Budget-based customization  
- 🗺️ Geographic optimization  
- 🍽️ Dietary preference support  
- 🎯 Activity customization  
- ✏️ Editable itineraries  
- 💾 Trip management  
- 📱 Fully responsive UI  

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Google Gemini API

---

## 📁 Project Structure

Refer to the detailed folder structure included in this repository description.

---

## 🚀 Installation

### Prerequisites
- Node.js v16+
- MongoDB
- Google Gemini API Key

### Clone Repository
```bash
git clone <your-repo-url>
cd travel-planner
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-planner
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Travel Planner
```

---

## 🛣️ API Routes

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Trips
- GET /api/trips
- POST /api/trips
- PUT /api/trips/:id
- DELETE /api/trips/:id

### AI
- POST /api/ai/generate
- POST /api/ai/regenerate/:id

---

## 🌐 Frontend Routes

- / → Landing
- /login → Login
- /signup → Signup
- /dashboard → Dashboard
- /create-trip → Create Trip
- /my-trips → My Trips
- /trip/:id → Trip Details

---

## 📖 Usage

1. Register or Login
2. Create a new trip
3. Enter preferences
4. Generate itinerary
5. Save or edit trip

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 👨‍💻 Author

**Harsha Vardhan Yanakandla**  
GitHub: https://github.com/harshavardhan-hub  
Email: yanakandlaharshavardhan@gmail.com  


---

**Made with ❤️ by Harsha Vardhan Yanakandla**
