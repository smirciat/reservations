/**
 * TravelCode model events
 */

'use strict';

import {EventEmitter} from 'events';
var TravelCode = require('./travelCode.model');
var TravelCodeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TravelCodeEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TravelCode.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TravelCodeEvents.emit(event + ':' + doc._id, doc);
    TravelCodeEvents.emit(event, doc);
  }
}

export default TravelCodeEvents;
