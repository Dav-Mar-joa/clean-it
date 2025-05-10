const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({

  ongletMénageVisible: {
    type: Boolean,
    default: false
  },
  ongletInventaireVisible: {
    type: Boolean,
    default: false
  },
  ongletCommentairesVisible: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('UserSettings', userSettingsSchema);
