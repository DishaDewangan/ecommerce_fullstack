# 🛒 E‑Commerce Fullstack (React + Node + MongoDB)

A complete full‑stack e‑commerce example with a React + Vite frontend and a Node + Express backend connecting to MongoDB Atlas. The backend follows a layered architecture (Routes → Handlers → Services → Models) to keep responsibilities separated and testable. This README documents structure, setup, APIs, database schemas, development workflows, deployment notes, and troubleshooting.

---

## Project overview

This repository contains two separate projects:

- frontend — React application built with Vite. UI to list/manage users, products, and orders, and to view order details.
- backend — Node + Express REST API that implements business logic and data persistence in MongoDB Atlas (native driver).

Keeping frontend and backend separate makes it easy to deploy them independently and to replace either side later.

---

## Features

- CRUD: Users, Products, Orders
- Order Details API showing which user ordered which product, with quantity and computed total price
- Layered backend architecture (Routes → Handlers → Services → Models)
- Uses environment variables for configuration with `dotenv`
- Example startup scripts for development and production
- Clear folder structure for maintainability

---

## Complete folder structure

```text
ecommerce_fullstack/
│
├── frontend/                        # React + Vite app
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.js?         # optional
│   ├── public/
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Navigation.jsx
│       │   ├── ProductList.jsx
│       │   ├── ProductForm.jsx
│       │   ├── UserList.jsx
│       │   ├── UserForm.jsx
│       │   ├── OrderList.jsx
│       │   └── OrderForm.jsx
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Management.jsx
│       │   ├── About.jsx
│       │   └── Contact.jsx
│       └── services/
│           └── api.js               # client-side API helpers / axios or fetch wrappers
│
├── backend/                         # Node + Express API
│   ├── .env                         # local only (ignored)
│   ├── package.json
│   ├── package-lock.json
│   ├── start-dev.bat                # Windows helper
│   ├── server.js                    # server entry, connects DB then listens
│   ├── app.js                       # express app, middleware, routes mounting
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # MongoDB connection helper
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   ├── productModel.js
│   │   │   └── orderModel.js
│   │   ├── services/
│   │   │   ├── userService.js
│   │   │   ├── productService.js
│   │   │   ├── orderService.js
│   │   │   └── statsService.js
│   │   ├── handlers/
│   │   │   ├── userHandler.js
│   │   │   ├── productHandler.js
│   │   │   ├── orderHandler.js
│   │   │   └── statsHandler.js
│   │   └── routes/
│   │       ├── userRoutes.js
│   │       ├── productRoutes.js
│   │       ├── orderRoutes.js
│   │       └── statsRoutes.js
│
├── .gitignore
└── README.md
```

---

## Prerequisites

- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB Atlas account or a running MongoDB instance
- Optional: Postman / Insomnia for API testing

---

## Installation

Clone the repository:

```bash
git clone https://github.com/DishaDewangan/ecommerce_fullstack.git
cd ecommerce_fullstack
```

Install and run backend and frontend separately.

Backend:

```bash
cd backend
npm install
# create .env as documented below
npm run dev      # or `npm start` for production
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Open frontend dev server URL printed by Vite (commonly `http://localhost:5173`) and ensure backend is running (default `http://localhost:5000`).

---

## Environment variables

Create `.env` in backend with at least:

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net
DB_NAME=ecommerce
PORT=5000
```

- `MONGO_URI` — MongoDB Atlas connection string (keep credentials secure)
- `DB_NAME` — database name
- `PORT` — port for backend server

Do NOT commit `.env`. Add `.env` and `node_modules/` to .gitignore (root and per-subproject).

Suggested .gitignore entries:

```
.env
node_modules/
backend/node_modules/
frontend/node_modules/
.env.local
.DS_Store
```

---

## Scripts (examples)

Add / verify scripts in package.json:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

In package.json typical scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "serve": "vite preview"
}
```

---

## Backend — Detailed API Reference

Base URL (dev): `http://localhost:5000`

Use JSON for request bodies and responses.

### Users

- GET /users
  - Description: List all users
  - Response 200:
    ```json
    [{"_id":"...","name":"Harshith","email":"harshith@gmail.com"}]
    ```

- GET /users/:id
  - Description: Get a user by id
  - Response 200:
    ```json
    {"_id":"...","name":"Harshith","email":"harshith@gmail.com"}
    ```
  - 404 if not found

- POST /users
  - Body:
    ```json
    {"name":"Harshith","email":"harshith@gmail.com"}
    ```
  - Response 201: created user object

- PUT /users/:id
  - Body: partial or full update fields
  - Response 200: updated object

- DELETE /users/:id
  - Response 204: no content

### Products

- GET /products
- GET /products/:id
- POST /products
  - Body:
    ```json
    {"name":"iPhone 16","price":80000}
    ```
- PUT /products/:id
- DELETE /products/:id

### Orders

- GET /orders
  - List all orders (may contain IDs referencing users and products)
- POST /orders
  - Body:
    ```json
    {"userId":"<USER_ID>","productId":"<PRODUCT_ID>","quantity":2}
    ```
  - Response 201 with created order
- PUT /orders/:id
- DELETE /orders/:id

### Order Details (enriched)

- GET /orders/details/all
  - Returns enriched data combining user and product details and computed `totalPrice`.
  - Sample response:
    ```json
    [
      {
        "orderId":"6850abcd1234567890ef1234",
        "customer":"Harshith",
        "product":"iPhone 16",
        "quantity":2,
        "totalPrice":160000
      }
    ]
    ```

---

## Data Models (examples)

These are JSON-like representations used by backend models.

Users:

```json
{
  "_id": "ObjectId(...)",
  "name": "Harshith",
  "email": "harshith@gmail.com",
  "createdAt": "ISODate(...)"
}
```

Products:

```json
{
  "_id": "ObjectId(...)",
  "name": "iPhone 16",
  "price": 80000,
  "createdAt": "ISODate(...)"
}
```

Orders:

```json
{
  "_id": "ObjectId(...)",
  "userId": "ObjectId(...)",
  "productId": "ObjectId(...)",
  "quantity": 2,
  "createdAt": "ISODate(...)"
}
```

---

## Frontend integration notes

- api.js should contain the base API URL configuration and helpers (fetch or axios).
- Set the API base URL to `http://localhost:5000` in development.
- If CORS issues occur, either enable CORS in the backend (`npm i cors` and use `app.use(cors())` in `app.js`) or configure Vite proxy in `vite.config.js`:
  ```js
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
  ```
- Ensure HTTP paths used in frontend match backend route prefixes (e.g., users, `/products`, `/orders`).

---

## Development workflow

1. Start backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
2. Start frontend in a separate terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Use Postman or the UI to exercise the APIs:
   - Create users and products
   - Create orders linking users to products
   - Call `/orders/details/all` to verify enriched output

---

## Author

**Disha Dewangan**
