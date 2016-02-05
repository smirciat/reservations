/**
 * Flight model events
 */

'use strict';

import {EventEmitter} from 'events';
var Flight = require('./flight.model');
var FlightEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FlightEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Flight.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FlightEvents.emit(event + ':' + doc._id, doc);
    FlightEvents.emit(event, doc);
  }
}

export default FlightEvents;
