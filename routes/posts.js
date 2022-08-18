const express = require('express');
const { verifyUser } = require('../middleware/auth');
const {
  get, post, put, destroy, all,
} = require('../controllers/posts');

const router = express.Router();

router.get('/all', all);
router.get('/:id', verifyUser, get);
router.post('/', verifyUser, post);
router.put('/:id', verifyUser, put);
router.delete('/:id', verifyUser, destroy);

module.exports = router;
