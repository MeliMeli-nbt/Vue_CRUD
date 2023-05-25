const jwt = require('jsonwebtoken');
const config = require('../config/private');

const verifyToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  // Split the header into 'Bearer' and the token
  const tokenArray = authHeader.split(' ');
  // Get the token from the second element of the array
  const token = tokenArray[1];

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
