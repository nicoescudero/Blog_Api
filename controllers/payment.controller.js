const axios = require('axios');

const controller = { };

controller.createOrder = async (req, res) => {
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
      return_url: 'http://localhost:3000/capture-order',
      cancel_url: 'http://localhost:3000/cancel-order',
    },
  };
  const response = await axios.post(`${process.env.URL}/v2/checkout/order`, order, {
    auth: {
      username: process.env.PAYAPL_CLIENT_ID,
      password: process.env.PAYAPL_SECRET_KEY,
    },
  });
  console.log(response);
  res.send('Creating Order');
};

controller.captureOrder = (req, res) => {
  res.send('Capturing order');
};

controller.cancelingOrder = (req, res) => {
  res.send('Canceling order');
};

module.exports = controller;
