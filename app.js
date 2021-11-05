const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

var path = require('path');

//Express App
const app = express();

//Register View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Connect to MongoDB
const dbURI = 'mongodb+srv://aj:pass1234@cluster0.6cvu6.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result) => {
    console.log('connected to DB');
    //Listen for request
    app.listen(3000);
    console.log("listinig on http://localhost:3000");
}).catch((err) => {
    console.log(err);
});

//Middleware & Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: "About" });
});

//Blog routes
app.use('/blogs',blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
});