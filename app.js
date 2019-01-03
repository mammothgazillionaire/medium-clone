// requiring express
const express = require("express");

// intializing express in app
var app = express();

// requiring db
const mongoose = require('mongoose');

// requiring body parser
const bodyParser = require('body-parser');

// 
const session = require('express-session')

const path = require('path');                                                                                                                                         

const MongoStore = require('connect-mongo')(session);

const port = 3000;

const Article = require('./models/Article');

// const Users = require('./models/User');

const passport = require('passport');

const user = require('./controllers/user.controller');


const articles = require('./controllers/article.controller');

// const auth = require('./modules/auth');


// connecting mongo
mongoose.connect('mongodb://localhost/medium', { useNewUrlParser: true },  function(err, connection) {
  if(err) throw err
  else console.log('Connected to mongodb');
});

// parsing request body login
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

// using path 
app.set('views', path.join(__dirname, 'views'));

// setting view engine
app.set('view engine', 'ejs');


// using express session
app.use(session({ 
  secret: 'medium clone', 
  cookie: { maxAge: 9000000 },
  store: new MongoStore(
    { url: 'mongodb://localhost/medium-session' }
  ),
  resave: true,
  saveUninitialized: true
}));

// intializing  passport
app.use(passport.initialize());

// using passport session
app.use(passport.session());


//  route home
app.get('/', (req, res) => {
  // console.log(req.user, 'user')
  Article.find({}, function(err, data) {
    console.log(data);
    res.render('index', { data, user: req.user })
  })
});


// user signup
app.post('/signup', user.signup);

// router
app.use(require('./routes/routes'));

// passport
require('./modules/passport')(passport);

// new articles
app.post('/new', articles.createArticles);

// authenticating user login via passport
app.post('/login', user.login);

app.listen(port, () => console.log(`http://localhost:${port}`))