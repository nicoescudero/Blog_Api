const mongoose = require('mongoose');

const { URI_DB_PRODUCTION, URI_DB_DEVELOPMENT, NODE_ENV } = process.env;
let uri = '';
if (NODE_ENV === 'development') uri = URI_DB_DEVELOPMENT;
else uri = URI_DB_PRODUCTION;

const connect = async () => {
  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    return connection;
  } catch (error) {
    return error;
  }
};

module.exports = { connect };
