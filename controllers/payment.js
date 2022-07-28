const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require('../helpers/success');
const { createOrder, captureOrder, cancelingOrder } = require('../services/payments');

module.exports = {
  createOrder: catchAsync(async (req, res, next) => {
    try {
      const response = await createOrder();
      endpointResponse({
        code: 201,
        res,
        message: 'Order succesfully created',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating order] - [order - Post]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  captureOrder: catchAsync(async (req, res, next) => {
    try {
      const response = await captureOrder(req, res);
      endpointResponse({
        code: 200, res, message: 'Order succesfully captured', body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error capturing order] - [order - Get]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  cancelOrder: catchAsync(async (req, res, next) => {
    try {
      const response = await cancelingOrder(res);
      endpointResponse({
        code: 200, res, message: 'Order canceled', body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error canceling order] - [order - Get]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
