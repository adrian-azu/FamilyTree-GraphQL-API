'use strict';
const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  mother: {
    type: mongoose.Types.ObjectId,
    ref: 'Individual',
    required: true,
  },
  father: {
    type: mongoose.Types.ObjectId,
    ref: 'Individual',
    required: true,
  },
});

module.exports = mongoose.model('Parent', parentSchema);
