const mongoose = require('mongoose');

const commentairesSchema = new mongoose.Schema({
  texte: { type: String, required: true },
  done: { type: Boolean, default: false }
});

module.exports = mongoose.model('Commentaires', commentairesSchema);
