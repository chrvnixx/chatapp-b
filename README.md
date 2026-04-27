# LockIn Chat App

LockIn Chat App is a full-stack real-time messaging app built with Express, MongoDB, Socket.IO, React, and Vite. It supports user authentication, contact discovery, presence indicators, and live one-to-one messaging.

## Features

- User signup, login, logout, and auth checks with JWT cookies
- Real-time messaging with Socket.IO
- Contact sidebar with search and online-only filtering
- Online presence indicators for connected users
- Persistent conversations and message history with MongoDB
- Responsive chat UI for desktop and smaller screens

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- Socket.IO
- JWT authentication

### Frontend

- React
- Vite
- Zustand
- Axios
- Tailwind CSS + DaisyUI
- React Router

## Project Structure

```text
chat-app-b/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket.js
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
├── package.json
└── README.md
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string

## Installation

Install backend dependencies from the project root:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Variables used by the app

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | No | Backend server port. Defaults to `4000`. |
| `MONGODB_URI` | Yes | MongoDB connection string used by Mongoose. |
| `JWT_SECRET` | Yes | Secret used to sign auth cookies. |
| `NODE_ENV` | No | Enables production static file serving when set to `production`. |
| `CLIENT_URL` | No | Allowed frontend origin for CORS and Socket.IO. Localhost is already allowed by default. |
| `RENDER_EXTERNAL_URL` | No | Optional deployed origin added to the CORS allowlist. |
| `VITE_API_URL` | No | Frontend API base URL override. Defaults to `http://localhost:4000/api` in development. |
| `VITE_SOCKET_URL` | No | Frontend Socket.IO URL override. Defaults to `http://localhost:4000` in development. |

Note: the current root `.env` also includes `MONGODB_PASS`, but the app code connects with `MONGODB_URI`.

## Running the App Locally

Start the backend from the project root:

```bash
npm run dev
```

In a second terminal, start the frontend:

```bash
cd frontend
npm run dev
```

Local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`

## Available Scripts

From the project root:

- `npm run dev` - starts the backend with `nodemon`
- `npm start` - starts the backend with Node
- `npm run build` - installs frontend dependencies and builds the frontend

From `frontend/`:

- `npm run dev` - starts the Vite dev server
- `npm run build` - creates a production frontend build
- `npm run preview` - previews the production frontend build
- `npm run lint` - runs ESLint

## API Overview

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/check-auth`

### Users

- `GET /api/users`

### Messages

- `GET /api/messages/:id`
- `POST /api/messages/send/:id`

Protected routes rely on the auth cookie set after login/signup.

## Production Build

Build the frontend:

```bash
npm run build
```

Then start the backend in production mode:

```bash
NODE_ENV=production npm start
```

When `frontend/dist` exists and `NODE_ENV=production`, Express serves the built frontend and handles client-side routing.
