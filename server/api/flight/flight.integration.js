'use strict';

var app = require('../..');
import request from 'supertest';

var newFlight;

describe('Flight API:', function() {

  describe('GET /api/flight', function() {
    var flights;

    beforeEach(function(done) {
      request(app)
        .get('/api/flight')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          flights = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      flights.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/flight', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/flight')
        .send({
          name: 'New Flight',
          info: 'This is the brand new flight!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFlight = res.body;
          done();
        });
    });

    it('should respond with the newly created flight', function() {
      newFlight.name.should.equal('New Flight');
      newFlight.info.should.equal('This is the brand new flight!!!');
    });

  });

  describe('GET /api/flight/:id', function() {
    var flight;

    beforeEach(function(done) {
      request(app)
        .get('/api/flight/' + newFlight._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          flight = res.body;
          done();
        });
    });

    afterEach(function() {
      flight = {};
    });

    it('should respond with the requested flight', function() {
      flight.name.should.equal('New Flight');
      flight.info.should.equal('This is the brand new flight!!!');
    });

  });

  describe('PUT /api/flight/:id', function() {
    var updatedFlight;

    beforeEach(function(done) {
      request(app)
        .put('/api/flight/' + newFlight._id)
        .send({
          name: 'Updated Flight',
          info: 'This is the updated flight!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFlight = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFlight = {};
    });

    it('should respond with the updated flight', function() {
      updatedFlight.name.should.equal('Updated Flight');
      updatedFlight.info.should.equal('This is the updated flight!!!');
    });

  });

  describe('DELETE /api/flight/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/flight/' + newFlight._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when flight does not exist', function(done) {
      request(app)
        .delete('/api/flight/' + newFlight._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
