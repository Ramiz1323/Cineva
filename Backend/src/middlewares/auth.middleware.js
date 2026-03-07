const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    // After it,,, Check in Authorization Header (Bearer)
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ 
            message: "Not authorized, no token provided. Please log in." 
        });
    }

    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        
        next();
    } catch (error) {
        res.status(401).json({ 
            message: "Not authorized, token is invalid or expired." 
        });
    }
};

module.exports = { protect };