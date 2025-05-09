const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
  texte: { type: String, required: true },
  done: { type: Boolean, default: false }
});

module.exports = mongoose.model('ChecklistItem', checklistItemSchema);
