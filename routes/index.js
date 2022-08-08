const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/', require('./payments'));
router.use('/posts', require('./posts'));

module.exports = router;
