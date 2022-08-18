const createHttpError = require('http-errors');
const { validateJWT } = require('../helpers/jwt');

exports.verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const response = await validateJWT(token);
    if (response === false) {
      const error = new Error();
      const httpError = createHttpError(
        (error.statusCode = 403),
        `[Unauthorized User] - [Access Denied]: ${error.message}`,
      );
      return httpError;
    }
    return next();
  } catch (error) {
    return res.status(401).send({
      code: 401,
      message: `[Unauthorized User] - [Access - Denied]: ${error.message}`,
    });
  }
};
