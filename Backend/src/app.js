require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');


app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


module.exports = app;