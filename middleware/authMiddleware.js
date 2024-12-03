const jwt = require('jsonwebtoken');

const SECRET_KEY = 'brainstorm'; // In production, use environment variables

const authMiddleware = (roles) => {
  return (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if no token
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, SECRET_KEY);

      // Check if user role is authorized
      if (roles && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Add user from payload
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};

module.exports = authMiddleware;