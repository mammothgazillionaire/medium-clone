const User = require('../models/User');
const passport = require('passport');
const Article = require('../models/Article');


module.exports = {
  signup : (req, res) => {
    // console.log(req.body);
    const userData = req.body;
    // console.log(userData);
      const newUser = new User(userData);
      res.redirect('/login');	
      newUser.save((err, data) => {
            if(err) throw err;
            console.log(data);
          });
    },

    whoami: (req,res) => {
      User.findOne({_id : req.user._id}, (err,data)=> {
        res.json(data);
      })
    },

    login: passport.authenticate('local', { failureRedirect: '/login' }), 
    function(req, res) {
        console.log(req.user);
        console.log('authenticating');
        return res.json({ user: req.user }) 
        // return res.redirect('/');
      } ,

  logout : (req, res) => {
    req.session.destroy();
    res.status(200).json({
      msg : "Session is removed"
    })
  },
  profile : (req,res) => {
    // console.log(req.user , "profile user");
    User.findById({_id : req.user._id})
    .populate('articles')
    .exec((err,data) => {
        console.log(data, "in profile")
        res.render('profile', { data: data.articles });
    })
  }
}

