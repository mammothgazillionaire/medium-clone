const express = require("express");

const router = express.Router()

const auth = require('../modules/auth');

const user = require('../controllers/user.controller');

const article = require('../controllers/article.controller');

router.get('/signup',(req,res) => {
  res.render('signup' , {user : null});
})

router.get('/login',(req,res) => {
  res.render('login', {user : null});
})


router.get('/profile' , user.profile);

router.get('/whoami', auth.isLgggedin, user.whoami );

router.get('/article', article.singleArticle);

router.get('/new' , auth.isLgggedin ,(req,res) => {
  res.render('new', {user : req.user});
})

router.get('/logout', user.logout);

module.exports = router;
