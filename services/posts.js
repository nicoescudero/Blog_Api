const moment = require('moment');

const { ErrorObject } = require('../helpers/error');
const Post = require('../models/post');

exports.createPost = async (req) => {
  try {
    const { title, image, body } = req.body;
    const post = new Post({
      title,
      image,
      body,
      date: `${moment().format('LL')}`,
    });
    await post.save();
    return post;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.getPostById = async (req) => {
  try {
    const { id } = req.params;
    const response = await Post.findById(id);
    if (response) return response;
    throw new ErrorObject('Post not found', 404);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.getAllPost = async () => {
  try {
    const response = await Post.find();
    if (response.length > 0) return response;
    throw new ErrorObject('Posts not found', 404);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.putPost = async (req) => {
  try {
    const { id } = req.params;
    const { title, image, body } = req.body;
    const post = await Post.findById(id);
    if (!post) throw new ErrorObject('Post not found', 404);
    await post.update({
      title,
      image,
      body,
      date: `${moment().format('LL')}`,
    });
    await post.save();
    return post;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.deletePost = async (req) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) throw new ErrorObject('Post not found', 404);
    return post;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
