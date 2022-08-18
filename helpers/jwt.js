const jwt = require('jsonwebtoken');

exports.generateToken = async (email) => {
  const token = await jwt.sign({ email }, process.env.TOKEN_KEY, {
    expiresIn: '5m',
  });
  return token;
};

exports.validateJWT = async (token) => {
  const response = await jwt.verify(token, process.env.TOKEN_KEY);
  return response;
};
