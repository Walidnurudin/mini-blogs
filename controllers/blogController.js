const Blog = require('../models/blog');

const blogPost = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(result => {
            res.redirect('/blogs')
        })
        .catch(err => {
            console.log(err)
        })
};

const blogDelete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        })
}

const blogHome = (req, res) => {
    res.render('home', { title: "home" })
}

const blogGet = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('blogs', { title: "blogs", blog: result })
        })
        .catch(err => console.log(err))
}

const blogDetail = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Detail page' });
        })
        .catch(err => {
            console.log(err)
        })
}

const blogAbout = (req, res) => {
    res.render('about', { title: "about" })
}

const blogCreate = (req, res) => {
    res.render('create', { title: "create new blog" })
}

module.exports = {
    blogPost,
    blogDelete,
    blogHome,
    blogGet,
    blogDetail,
    blogAbout,
    blogCreate
}