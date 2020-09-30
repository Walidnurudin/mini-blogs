const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/blogs', blogController.blogPost);
router.get('/', blogController.blogHome);
router.get('/blogs', blogController.blogGet);
router.get('/blogs/:id', blogController.blogDetail);
router.get('/about', blogController.blogAbout);
router.get('/create', blogController.blogCreate);

// API
router.delete('/api/blogs/:id', blogController.blogDelete);
router.get('/api/blogs', blogController.getAllBlogs)
router.post('/api/create', blogController.blogPost);

module.exports = router;