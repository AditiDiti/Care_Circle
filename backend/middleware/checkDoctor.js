module.exports = (req, res, next) => {
  if (req.user && req.user.isDoctor) {
    next();
  } else {
    res.status(403).send('Access denied. Only doctors can access this route.');
  }
};
