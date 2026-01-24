const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Kwaka token mu header yitwa 'x-auth-token'
  const token = req.header('x-auth-token');

  // Kugenzura niba nta token ihari
  if (!token) {
    return res.status(401).json({ msg: 'Nta token ibonetse, uburenganzira burabuzwa (No token, authorization denied)' });
  }

  // Gusuzuma token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Ongeramo user object (id, username, role) muri request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token ntiyizewe (Token is not valid)' });
  }
};
