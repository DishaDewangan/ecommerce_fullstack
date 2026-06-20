# Frontend Setup & Running Guide

## Architecture Overview

Your application is now composed of:

```
Backend (Express + MongoDB)
- Running on: http://localhost:5000
- API Endpoints: /users/* (CRUD operations)
- Required fields: name, email

Frontend (React + Tailwind + Vite)
- Running on: http://localhost:3000
- Connected to backend at: http://localhost:5000
```

## Installation Steps

### 1. Backend Setup (Already configured)
```bash
# Ensure MongoDB URI is in .env
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# DB_NAME=your_database_name

# Install dependencies (if not done)
npm install
```

### 2. Frontend Setup (Already configured)
```bash
# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Start Backend:**
```bash
npm start        # Production mode on port 5000
# OR
npm run dev      # Development mode with nodemon
```

**Terminal 2 - Start Frontend:**
```bash
npm run client   # Runs Vite dev server on port 3000
```

### Option 2: Run Both Concurrently
```bash
# Install concurrently (one-time setup)
npm install --save-dev concurrently

# Add this script to root package.json:
# "dev": "concurrently \"npm start\" \"npm run client\""

# Then run:
npm run dev
```

## Features

### ✅ User Management UI
- **View All Users** - See list of all users in a responsive table
- **Create User** - Add new users with name, email, phone, address
- **Edit User** - Update existing user information
- **Delete User** - Remove users with confirmation dialog
- **Real-time Feedback** - Success/error notifications
- **Responsive Design** - Works on desktop, tablet, and mobile

### ✅ Frontend Components
- `UserForm.jsx` - Form for creating/editing users
- `UserList.jsx` - Table display of all users
- `api.js` - API service layer for backend communication
- `App.jsx` - Main app with state management

### ✅ Backend API Endpoints
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Data Flow

1. **User submits form** → Frontend validates
2. **API call sent** → `api.js` makes HTTP request
3. **Backend receives** → Express handler validates
4. **MongoDB operation** → Data persisted
5. **Response returned** → Frontend updates UI
6. **User sees feedback** → Success/error message displayed

## Troubleshooting

### "Failed to fetch users" Error
- Check if backend is running on port 5000
- Verify MongoDB connection in .env
- Check browser console for CORS errors

### CORS Error
- Backend has CORS headers configured
- Ensure frontend is calling http://localhost:5000
- Check that backend server is running

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Project Structure

```
project-root/
├── backend files
│   ├── app.js (Express app with CORS)
│   ├── server.js (Server startup - port 5000)
│   ├── package.json (Backend dependencies)
│   └── src/
│       ├── config/db.js
│       ├── models/userModel.js
│       ├── routes/userRoutes.js
│       ├── handlers/userHandler.js
│       └── services/userService.js
│
└── frontend/
    ├── src/
    │   ├── App.jsx (Main component)
    │   ├── main.jsx (Entry point)
    │   ├── index.css (Tailwind styles)
    │   ├── components/
    │   │   ├── UserForm.jsx
    │   │   └── UserList.jsx
    │   └── services/
    │       └── api.js (API calls)
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json (Frontend dependencies)
```

## Next Steps

1. **Run Backend:** `npm start` or `npm run dev`
2. **Run Frontend:** `cd frontend && npm run dev`
3. **Access App:** Open http://localhost:3000 in browser
4. **Create Users:** Use the form to create and manage users
5. **See Data:** Check MongoDB to verify data persistence

## Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React 18, Vite, Tailwind CSS 3
- **API**: REST with JSON
- **Database**: MongoDB with Node.js driver

Happy coding! 🚀
