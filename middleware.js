module.exports = (req, res, next) => {
  if (typeof req.session.user === 'string')
    next();
  else
    res.redirect('/login');
};