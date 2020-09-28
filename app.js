const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

const app = express();

// set view engine
app.set('view engine', 'ejs')

// connect mongodb
const dbURI = 'mongodb+srv://walid:walid@cluster0.vt15h.mongodb.net/first-basic?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // jika connect ke db, maka app berjalan
    .then(result => app.listen(3000, () => console.log('port berjalan di http://localhost:3000')))
    .catch(err => console.log(err))

// middleware & static files
app.use(express.static('public'))
app.use(morgan('dev'))

// route
app.get('/', (req, res) => {
    res.render('home', { title: "home" })
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then(result => {
        res.render('blogs', { title: "blogs", blog: result })
    })
    .catch(err => console.log(err))
});

app.get('/about', (req, res) => {
    res.render('about', { title: "about" })
});

app.get('/create', (req, res) => {
    res.render('create', { title: "create new blog" })
});

// 404 page
app.use((req, res) => {
    res.render('404', { title: "404" })
});