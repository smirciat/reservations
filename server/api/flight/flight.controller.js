/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/flight              ->  index
 * POST    /api/flight              ->  create
 * GET     /api/flight/:id          ->  show
 * PUT     /api/flight/:id          ->  update
 * DELETE  /api/flight/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Flight = require('./flight.model');

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

// Gets a list of Flights
export function index(req, res) {
  var options = {};
  if (req.query.date) {
    var date = new Date(req.query.date);
    var endDate = new Date(date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (date.getDate()+1));
    options.date = {
      $lt: endDate,
      $gte: date 
    }
  }
  Flight.findAsync(options)
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Flight from the DB
export function show(req, res) {
  Flight.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Flight in the DB
export function create(req, res) {
  Flight.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Flight in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Flight.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Flight from the DB
export function destroy(req, res) {
  Flight.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
