const express = require('express');
const { createOrder, captureOrder, cancelOrder } = require('../controllers/payment.controller');

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/capture-order', captureOrder);
router.get('/cancel-order', cancelOrder);

module.exports = router;
