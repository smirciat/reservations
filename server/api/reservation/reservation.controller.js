/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reservation              ->  index
 * POST    /api/reservation              ->  create
 * GET     /api/reservation/:id          ->  show
 * PUT     /api/reservation/:id          ->  update
 * DELETE  /api/reservation/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Reservation = require('./reservation.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Reservations
export function index(req, res) {
  var options = {};
  if (req.query.date) {
    
    var date = new Date(req.query.date); 
    var endDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),23,59,59); 
    options.date = {
      $lte: endDate,
      $gte: date 
    };
  }
  if (req.query.hourOfDay){
    options.hourOfDay = req.query.hourOfDay;
  }
  Reservation.find(options)
    //populate
    .populate('flightId travelCodeId')
    .execAsync()
    //respond
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Reservation from the DB
export function show(req, res) {
  Reservation.findById(req.params.id)
    .then(handleEntityNotFound(res))
    //populate
    .populate('flightId travelCodeId')
    //respond
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Reservation in the DB
export function create(req, res) {
  Reservation.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Reservation in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Reservation.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Reservation from the DB
export function destroy(req, res) {
  Reservation.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
