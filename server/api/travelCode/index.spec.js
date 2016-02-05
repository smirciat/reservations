'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var travelCodeCtrlStub = {
  index: 'travelCodeCtrl.index',
  show: 'travelCodeCtrl.show',
  create: 'travelCodeCtrl.create',
  update: 'travelCodeCtrl.update',
  destroy: 'travelCodeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var travelCodeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './travelCode.controller': travelCodeCtrlStub
});

describe('TravelCode API Router:', function() {

  it('should return an express router instance', function() {
    travelCodeIndex.should.equal(routerStub);
  });

  describe('GET /api/travelCode', function() {

    it('should route to travelCode.controller.index', function() {
      routerStub.get
        .withArgs('/', 'travelCodeCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/travelCode/:id', function() {

    it('should route to travelCode.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'travelCodeCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/travelCode', function() {

    it('should route to travelCode.controller.create', function() {
      routerStub.post
        .withArgs('/', 'travelCodeCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/travelCode/:id', function() {

    it('should route to travelCode.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'travelCodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/travelCode/:id', function() {

    it('should route to travelCode.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'travelCodeCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/travelCode/:id', function() {

    it('should route to travelCode.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'travelCodeCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
