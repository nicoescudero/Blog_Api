const express = require('express');
const { createOrder, captureOrder, cancelOrder } = require('../controllers/payments');

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/capture-order', captureOrder);
router.get('/cancel-order', cancelOrder);

module.exports = router;
