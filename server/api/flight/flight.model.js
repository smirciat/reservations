'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var FlightSchema = new mongoose.Schema({
  number: String,
  hourOfDay: Number,
  date: Date,
  pilot: String,
  aircraft: String
});

export default mongoose.model('Flight', FlightSchema);
