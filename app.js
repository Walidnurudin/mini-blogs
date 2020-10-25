const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const blogRoutes = require('./routes/blogRouter');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000

const app = express();

// set view engine
app.set('view engine', 'ejs')

// connect mongodb with dotenv
require('dotenv').config();
const dbURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vt15h.mongodb.net/first-basic?retryWrites=true&w=majority`;

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
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


// routes
app.use(blogRoutes)

// 404 page
app.use((req, res) => {
    res.render('404', { title: "404" })
});