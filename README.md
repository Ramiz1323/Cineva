# 🎬 Full Stack Movie Discovery Platform

A **full-stack movie discovery web application** where users can explore movies and TV shows, search content in real time, watch trailers, and manage their movie preferences.

This platform integrates the **TMDB (The Movie Database) API** for movie data and a **custom backend** for authentication, favorites, and watch history.

The project demonstrates building a **production-level MERN-style application** using modern technologies like React, Redux Toolkit, Node.js, Express, and MongoDB.

---

# 🚀 Features

## 🎥 Movie & TV Show Discovery

- Browse **Trending Movies**
- View **Popular Movies**
- Explore **TV Shows**
- Discover **Actors / People**
- View movie images and media

All movie data is fetched dynamically from the **TMDB API**.

---

## 🔎 Real-Time Search

Users can search for:

- Movies
- TV Shows
- Actors / People

Features include:

- Real-time search results
- **Debounced API calls**
- Fast and relevant results

---

## ▶️ Movie Trailer Preview

- Watch movie trailers inside the app
- Trailer fetched via **YouTube links**
- Opens inside a **modal video player**

Fallback handling:

> Trailer for this movie is currently unavailable.

The application safely handles missing trailers.

---

## ⏳ Loader & Skeleton UI

While data loads:

- Loader animations
- Skeleton UI
- Smooth user experience

---

## 🔐 Authentication System

Secure authentication using **JWT tokens**.

Users can:

- Sign Up
- Log In
- Log Out

---

## ❤️ Favorites System

Users can:

- Add movies to favorites
- Remove movies from favorites
- View favorite movies in a dedicated section

Favorites are stored in the **backend database**.

---

## 🕒 Watch History

When a user:

- Opens a movie page
- Watches a trailer

That movie is automatically stored in **Recent Watch History**.

---

## 🛠 Admin Dashboard

Admin can manage platform content.

### Admin Capabilities

- Add movies
- Edit movie details
- Delete movies
- View users
- Ban users
- Delete users

### Movie Fields

Admin must provide:

- Movie Title
- Poster Image URL
- Description
- Movie ID
- Release Date
- Trailer YouTube Link
- Genre
- Category

---

# 🧰 Tech Stack

## Frontend

- React.js
- Redux Toolkit
- React Router
- Axios / Fetch
- Infinite Scroll
- Debouncing
- Responsive UI

## Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication

---

# ⚙️ Backend CRUD Operations

| Operation | Description |
|-----------|-------------|
| Create | Admin adds movies |
| Read | Fetch movies and users |
| Update | Edit movie details |
| Delete | Remove movies |

---

# 📱 Responsive Design

The application works smoothly on:

- Desktop
- Mobile
- Tablet

---

# ⚡ Performance Optimizations

- Debouncing for search
- Lazy loading
- Efficient API calls
- State management with **Redux Toolkit**

---

# 🧪 Error Handling

| Missing Data | Fallback |
|--------------|----------|
| Poster | Placeholder Image |
| Description | "Description not available" |
| Trailer | "Trailer not available" |

The application **never crashes due to missing API data**.

---

# 📦 Installation

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/movie-platform.git
cd movie-platform
```

---

## 2️⃣ Install Frontend Dependencies

```bash
npm install
```

---

## 3️⃣ Start Frontend Server

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🖥 Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start backend server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```
TMDB_API_KEY=your_tmdb_api_key
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

# 📂 Project Structure

```
movie-platform
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── redux
│   │   ├── services
│   │   └── App.js
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── server.js
│
└── README.md
```

---

# 📸 Screenshots

Add screenshots of:

- Home Page
- Movie Details Page
- Search Results
- Favorites Page
- Admin Dashboard

---

# 👨‍💻 Author

**Sk Ramiz Raza**

LinkedIn:  
https://www.linkedin.com/in/sk-ramiz-raza/

---

⭐ If you like this project, consider giving it a **star on GitHub**.
