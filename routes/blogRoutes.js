const express = require('express');
const blogController = require('../controllers/blogController')

const router = express.Router();

router.get('/', blogController.index);
router.post('/', blogController.create_post);
router.get('/create', blogController.create_get);
router.get('/:id', blogController.details);
router.delete('/:id', blogController.del);

module.exports = router;