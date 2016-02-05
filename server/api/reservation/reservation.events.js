/**
 * Reservation model events
 */

'use strict';

import {EventEmitter} from 'events';
var Reservation = require('./reservation.model');
var ReservationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ReservationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Reservation.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ReservationEvents.emit(event + ':' + doc._id, doc);
    ReservationEvents.emit(event, doc);
  }
}

export default ReservationEvents;
