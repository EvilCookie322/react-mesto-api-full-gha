require('dotenv').config();
const jwt = require('jsonwebtoken');
const AuthError = require('../custom_errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-banana');
  } catch (error) {
    return next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
