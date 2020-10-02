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

// API
const blogDelete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs', res: result });
        })
        .catch(err => {
            console.log(err);
        })
}

const getAllBlogs = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.json(result)
        })
        .catch(err => console.log(err))
}

const Posting = (req, res) => {
    const post = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    })

    post.save()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}

const BlogUpdate = (req, res) => {
    const id = req.params.id;
    const post = {
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body
    }

    Blog.updateOne({_id: id}, post)
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
        })
}


module.exports = {
    blogPost,
    blogDelete,
    blogHome,
    blogGet,
    blogDetail,
    blogAbout,
    blogCreate,
    getAllBlogs,
    Posting,
    BlogUpdate
}