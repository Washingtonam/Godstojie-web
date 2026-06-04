const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
