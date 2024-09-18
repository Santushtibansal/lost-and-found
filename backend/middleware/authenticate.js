const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path if necessary

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const user = await User.findById(decoded.id); // Find user by ID

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = {
            username: user.username,
            email: user.email
        }; // Set user info in request
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authenticate ;
