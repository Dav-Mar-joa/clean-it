const mongoose = require('mongoose');

const commentairesSchema = new mongoose.Schema({
  texte: { type: String, required: true },
  done: { type: Boolean, default: false },
  date:{type:String,defaut:""},
  avatar:{type:String,default:"pictures/anonyme.jpg"}
});

module.exports = mongoose.model('Commentaires', commentairesSchema);
