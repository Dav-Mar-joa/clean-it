const mongoose = require('mongoose');

const inventaireSchema = new mongoose.Schema({
  papierToilette: { type: String, required: true },
  drapBleuJaune: { type: String, required: true , default: ''},
  drapSatin: { type: String, required: true , default: ''},
  drapFleuris: { type: String, required: true , default: ''},
  serviette: { type: String, required: true , default: ''},
});

module.exports = mongoose.model('Inventaire', inventaireSchema);
