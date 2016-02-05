'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var reservationCtrlStub = {
  index: 'reservationCtrl.index',
  show: 'reservationCtrl.show',
  create: 'reservationCtrl.create',
  update: 'reservationCtrl.update',
  destroy: 'reservationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var reservationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './reservation.controller': reservationCtrlStub
});

describe('Reservation API Router:', function() {

  it('should return an express router instance', function() {
    reservationIndex.should.equal(routerStub);
  });

  describe('GET /api/reservation', function() {

    it('should route to reservation.controller.index', function() {
      routerStub.get
        .withArgs('/', 'reservationCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/reservation/:id', function() {

    it('should route to reservation.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'reservationCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/reservation', function() {

    it('should route to reservation.controller.create', function() {
      routerStub.post
        .withArgs('/', 'reservationCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/reservation/:id', function() {

    it('should route to reservation.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'reservationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/reservation/:id', function() {

    it('should route to reservation.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'reservationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/reservation/:id', function() {

    it('should route to reservation.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'reservationCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
