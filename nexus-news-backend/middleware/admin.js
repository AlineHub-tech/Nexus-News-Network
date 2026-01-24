module.exports = function (req, res, next) {
  // req.user yaturutse kuri auth middleware
  if (req.user && req.user.role === 'admin') {
    next(); // Nibyo, ni Admin, komeza
  } else {
    // Iyo atari Admin, tumwima uburenganzira (Status 403 Forbidden)
    res.status(403).json({ msg: 'Uburenganzira ntibuhagije. Ukeneye kuba Admin.' });
  }
};
