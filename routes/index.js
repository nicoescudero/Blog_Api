const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const { configSwagger } = require('../config/swagger');

const router = express.Router();
const specs = swaggerJSDoc(configSwagger);
/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/', require('./payments'));
router.use('/', require('./emails'));
router.use('/posts', require('./posts'));
router.use('/auth', require('./auth'));

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

module.exports = router;
