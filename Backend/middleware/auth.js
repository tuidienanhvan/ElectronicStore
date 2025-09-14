import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header provided' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Authentication error:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
    res.status(401).json({
      message: 'Authentication failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};