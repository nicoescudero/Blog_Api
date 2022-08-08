const createHttpError = require('http-errors');
const { catchAsync } = require('../helpers/catchAsync');
const { endpointResponse } = require('../helpers/success');
const {
  createPost, getAllPost, getPostById, putPost, deletePost,
} = require('../services/posts');

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await getPostById(req);
      endpointResponse({
        code: 200,
        res,
        message: 'Post returned',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error receiving post] - [post - Get]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  post: catchAsync(async (req, res, next) => {
    try {
      const response = await createPost(req);
      endpointResponse({
        code: 201,
        res,
        message: 'Post successfuly created',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating post] - [post - Post]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const response = await putPost(req);
      endpointResponse({
        code: 200,
        res,
        message: 'Post updated',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating post] - [post - Put]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  destroy: catchAsync(async (req, res, next) => {
    try {
      const response = await deletePost(req);
      endpointResponse({
        code: 200,
        res,
        message: 'Post deleted',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting post] - [post - Delete]: ${error.message}`,
      );
      next(httpError);
    }
  }),
  all: catchAsync(async (req, res, next) => {
    try {
      const response = await getAllPost();
      endpointResponse({
        code: 200,
        res,
        message: 'Retrieved posts',
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error receiving posts] - [post - Get]: ${error.message}`,
      );
      next(httpError);
    }
  }),
};
