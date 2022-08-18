const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require('../helpers/success');
const { login } = require('../services/users');

module.exports = {
  login: catchAsync(async (req, res, next) => {
    try {
      const response = await login(req);
      endpointResponse({
        code: 200,
        res,
        message: 'Login successfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error auth login] - [auth - Login]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
