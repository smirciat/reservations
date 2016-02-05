'use strict';

var app = require('../..');
import request from 'supertest';

var newReservation;

describe('Reservation API:', function() {

  describe('GET /api/reservation', function() {
    var reservations;

    beforeEach(function(done) {
      request(app)
        .get('/api/reservation')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reservations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      reservations.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/reservation', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/reservation')
        .send({
          name: 'New Reservation',
          info: 'This is the brand new reservation!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newReservation = res.body;
          done();
        });
    });

    it('should respond with the newly created reservation', function() {
      newReservation.name.should.equal('New Reservation');
      newReservation.info.should.equal('This is the brand new reservation!!!');
    });

  });

  describe('GET /api/reservation/:id', function() {
    var reservation;

    beforeEach(function(done) {
      request(app)
        .get('/api/reservation/' + newReservation._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          reservation = res.body;
          done();
        });
    });

    afterEach(function() {
      reservation = {};
    });

    it('should respond with the requested reservation', function() {
      reservation.name.should.equal('New Reservation');
      reservation.info.should.equal('This is the brand new reservation!!!');
    });

  });

  describe('PUT /api/reservation/:id', function() {
    var updatedReservation;

    beforeEach(function(done) {
      request(app)
        .put('/api/reservation/' + newReservation._id)
        .send({
          name: 'Updated Reservation',
          info: 'This is the updated reservation!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedReservation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedReservation = {};
    });

    it('should respond with the updated reservation', function() {
      updatedReservation.name.should.equal('Updated Reservation');
      updatedReservation.info.should.equal('This is the updated reservation!!!');
    });

  });

  describe('DELETE /api/reservation/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/reservation/' + newReservation._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when reservation does not exist', function(done) {
      request(app)
        .delete('/api/reservation/' + newReservation._id)
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
