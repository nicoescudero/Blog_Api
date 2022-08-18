const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require('../helpers/success');
const { login, register } = require('../services/users');

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
  register: catchAsync(async (req, res, next) => {
    try {
      const response = await register(req);
      endpointResponse({
        code: 201,
        res,
        message: 'Register successfuly',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error auth register] - [auth - Register]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
