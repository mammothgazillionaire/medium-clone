const Article = require('../models/Article');
const User = require('../models/User');


module.exports = {
  createArticles : (req,res) => {
    const currentUser = req.user;
    const userData = req.body;
    const newArticle = new Article({
      ...userData,
      user : currentUser._id
    });
    User.findOne({_id : req.user._id}, (err,user) => {
      console.log(user,"in new")
      if(err) throw err;
      newArticle.save((err,data) => {
        if(err) throw err;
        user.articles.push(data._id);
        user.save();
        res.redirect('/');
      })
    })
  },
  singleArticle : (req,res) => {
    Article.findOne({user : req.user._id},function(err, data) {
      if (err) return err;
      console.log(data);
      res.render('article', { data, user: req.user})
    })
  }
}