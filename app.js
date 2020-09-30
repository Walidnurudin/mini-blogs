const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRouter');
const port = process.env.PORT || 3000

const app = express();

// set view engine
app.set('view engine', 'ejs')

// connect mongodb
const dbURI = 'mongodb+srv://walid:walid@cluster0.vt15h.mongodb.net/first-basic?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // jika connect ke db, maka app berjalan
    .then(result => app.listen(port, () => console.log(`port berjalan di http://localhost:${port}`)))
    .catch(err => console.log(err))

// middleware & static files
app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'expanded'
}));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// routes
app.use(blogRoutes)

// 404 page
app.use((req, res) => {
    res.render('404', { title: "404" })
});


