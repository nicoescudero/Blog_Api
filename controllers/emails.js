const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require('../helpers/success');
const { nodemail } = require('../services/emails');

module.exports = {
  sendEmail: catchAsync(async (req, res, next) => {
    try {
      const response = await nodemail(req);
      endpointResponse({
        code: 200,
        res,
        message: 'Email sent',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error sending email] - [email - Post]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
