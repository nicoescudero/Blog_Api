const axios = require('axios');
const { ErrorObject } = require('../helpers/error');

exports.createOrder = async () => {
  try {
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            description: 'Invitar un cafe',
            currency_code: 'USD',
            value: '1.00',
          },
        },
      ],
      application_context: {
        brand_name: process.env.LIVE_URL,
        landing_page: 'LOGIN',
        user_action: 'PAY_NOW',
        return_url: `${process.env.HOST}/capture-order`,
        cancel_url: `${process.env.HOST}/cancel-order`,
      },
    };
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    const auth = await axios.post(`${process.env.URL}/v1/oauth2/token`, params, {
      headers: {
        Content_type: 'application/x-www-form-urlencoded',
      },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET_KEY,
      },
    });
    const response = await axios.post(`${process.env.URL}/v2/checkout/orders`, order, {
      headers: {
        Authorization: `BEARER ${auth.data.access_token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.captureOrder = async (req, res) => {
  try {
    const { token } = req.query;
    await axios.post(`${process.env.URL}/v2/checkout/orders/${token}/capture`, {}, {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET_KEY,
      },
    });
    return res.redirect(`${process.env.LIVE_URL}thanks`);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};

exports.cancelingOrder = (res) => {
  try {
    return res.redirect(`${process.env.LIVE_URL}`);
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode || 500);
  }
};
