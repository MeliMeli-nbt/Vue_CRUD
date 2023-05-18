const jwt = require('jsonwebtoken');
const config = require('../config/private');

const verifyToken = (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).json({ msg: 'Authentication token required' });
  }

  try {
    const decodedToken = jwt.verify(token, config.privateKey);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(500).json({ msg: `Authentication error: ${err.message}` });
  }
};

module.exports = {
  verifyToken
};
