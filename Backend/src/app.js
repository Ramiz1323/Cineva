require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,      
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // allow requests with no origin (mobile apps, Postman, curl)
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const movieRouter = require('./routes/movie.routes');
const tvRoutes = require('./routes/tv.routes');

app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/movie', movieRouter);
app.use('/api/tv', tvRoutes);


module.exports = app;