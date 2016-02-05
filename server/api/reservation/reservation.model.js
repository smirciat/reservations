'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ReservationSchema = new mongoose.Schema({
  name: String,
  customerId: String,
  flightId:{ type: Schema.Types.ObjectId, ref: 'Flight' },
  hourOfDay: Number,
  date : {type:Date, default:Date.now},
  weight : Number,
  freightWeight: Number,
  travelCodeId: { type: Schema.Types.ObjectId, ref: 'TravelCode' },
  dateReserved: {type:Date, default:Date.now},
  dateModified: {type:Date, default:Date.now}
});

export default mongoose.model('Reservation', ReservationSchema);
