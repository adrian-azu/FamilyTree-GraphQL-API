'use strict';

const mongoose = require('mongoose');

const individualSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  born: {
    type: Date,
    required: true,
  },
  died: {
    type: Date,
  },
});

module.exports = mongoose.model('Individual', individualSchema);
