module.exports = (req, res, next) => {
  if (typeof req.session.user === 'string')
    next()
  else
    res.status(401).json({error: 'not logged in'})
}