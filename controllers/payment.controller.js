const axios = require('axios');

const controller = { };

controller.createOrder = async (req, res) => {
  try {
    const order = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            description: 'Buy a coffee',
            currency_code: 'USD',
            value: '1.00',
          },
        },
      ],
      application_context: {
        brand_name: 'mycompani.com',
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
        username: process.env.PAYAPL_CLIENT_ID,
        password: process.env.PAYAPL_SECRET_KEY,
      },
    });
    const response = await axios.post(`${process.env.URL}/v2/checkout/orders`, order, {
      headers: {
        Authorization: `BEARER ${auth.data.access_token}`,
      },
    });
    return res.send(response.data);
  } catch (error) {
    return res.send(error);
  }
};

controller.captureOrder = async (req, res) => {
  const { token } = req.query;
  await axios.post(`${process.env.URL}/v2/checkout/orders/${token}/capture`, {}, {
    auth: {
      username: process.env.PAYAPL_CLIENT_ID,
      password: process.env.PAYAPL_SECRET_KEY,
    },
  });
  res.redirect('/payed.html');
};

controller.cancelingOrder = (req, res) => {
  res.redirect('/');
};

module.exports = controller;
