const mongoose = require('mongoose');


const ObjectId = mongoose.Schema.Types.ObjectId;

const articleSchema = new mongoose.Schema({
  user: {type : ObjectId, ref : 'User'},
  title: String,
  description: String,
  body: String,
  // img: String,
  claps: Number,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now }
})

const Articles = mongoose.model('Article', articleSchema);

articleSchema.method.claps = function(){
  this.claps++;
  return this.save();
}

module.exports = Articles;