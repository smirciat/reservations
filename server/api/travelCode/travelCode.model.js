'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TravelCodeSchema = new mongoose.Schema({
  code: String,
  depart: String,
  arrive: String,
  index: Number
});

export default mongoose.model('TravelCode', TravelCodeSchema);
