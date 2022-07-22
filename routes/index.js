const express = require('express');
const paymentsRouter = require('./payments');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/', paymentsRouter);

module.exports = router;
