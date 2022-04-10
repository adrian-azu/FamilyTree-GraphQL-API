'use strict';
const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  familyName: {
    type: String,
    required: true,
  },
  mother: {
    type: mongoose.Types.ObjectId,
    ref: 'parents',
    required: true,
  },
  father: {
    type: mongoose.Types.ObjectId,
    ref: 'parents',
    required: true,
  },
  children: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'individual',
      required: true,
    },
  ],
});

module.exports = mongoose.model('Family', familySchema);
