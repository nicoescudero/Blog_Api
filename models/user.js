const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.descrypt = async (password, hash) => {
  const response = await bcrypt.compare(password, hash);
  return response;
};

userSchema.statics.encrypt = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = model('User', userSchema);
