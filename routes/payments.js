const express = require('express');
const controller = require('../controllers/payment.controller');

const router = express.Router();

router.get('/create-order', controller.createOrder);
router.get('/capture-order', controller.captureOrder);
router.get('/cancel-order', controller.cancelingOrder);

module.exports = router;
