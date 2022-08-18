const { ErrorObject } = require('../helpers/error');
const { generateToken } = require('../helpers/jwt');
const User = require('../models/user');

exports.register = async (req) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) throw new ErrorObject('Already exist user', 404);
    const user = new User({ email, password: await User.encrypt(password) });
    await user.save();
    return user;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.login = async (req) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new ErrorObject('User not found', 404);
    const response = await user.descrypt(password, user.password);
    if (response === false) throw new ErrorObject('Login auth denied', 401);
    const login = {
      token: await generateToken(email),
    };
    return login;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
