const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminUsername || !adminPassword || !jwtSecret) {
    return res.status(500).json({ message: 'Admin credentials are not configured.' });
  }

  if (username !== adminUsername || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const token = jwt.sign({ role: 'admin', username }, jwtSecret, { expiresIn: '8h' });
  res.json({ token });
};
