const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/blogs', blogController.blogPost);
router.delete('/blogs/:id', blogController.blogDelete);
router.get('/', blogController.blogHome);
router.get('/blogs', blogController.blogGet);
router.get('/blogs/:id', blogController.blogDetail);
router.get('/about', blogController.blogAbout);
router.get('/create', blogController.blogCreate);

module.exports = router;