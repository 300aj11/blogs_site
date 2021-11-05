const Blog = require('../models/blog');

module.exports = {
    index : (req, res) => {
        Blog.find().sort({ createdAt: -1 }).then((result) => {
            res.render('index', { title: "All Blogs", blogs: result });
        }).catch((err) => {
            console.log(err);
        });
    },
    
    details : (req, res) => {
        const id = req.params.id;
        Blog.findById(id).then((result) => {
            res.render('details', { title: "Blog Details", blog: result });
        }).catch((err) => {
            res.render('404',{ title: 'Blog Not Found'});
        });
    },
    
    create_get : (req, res) => {
        res.render('create', { title: "Create a new Blog" });
    },
    
    create_post : (req, res) => {
        const blog = new Blog(req.body);
        blog.save().then((result) => {
            res.redirect('/blogs');
        }).catch((err) => {
            console.log(err);
        });
    },
    
    del : (req, res) => {
        const id = req.params.id;
        Blog.findByIdAndDelete(id).then((result) => {
            res.json({ redirect: '/blogs' });
        }).catch((err) => {
            console.log(err);
        });
    }
};