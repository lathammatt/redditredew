'use strict'

const mongoose = require('mongoose');

module.exports = mongoose.model('Articles', {
  title: String,
  url: String,
  score: { type: Number, default: 0 }
})
