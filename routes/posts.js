const express = require('express');
const {
  get, post, put, destroy, all,
} = require('../controllers/posts');

const router = express.Router();

router.get('/:id', get);
router.get('/all', all);
router.post('/', post);
router.put('/:id', put);
router.delete('/:id', destroy);

module.exports = router;
