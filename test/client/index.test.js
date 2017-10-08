import test from 'tape'
import sinon from 'sinon'
import { Client, https } from '../../src/index'

const mollieClientV2 = new Client('CUSTOM_TOKEN', 'v2');
const mollieClientV1 = new Client('CUSTOM_TOKEN');

test('new client v2 - constructor - token', (t) => {
  t.equal(mollieClientV2.token, 'CUSTOM_TOKEN');
  t.end();
});

test('new client v2 - constructor - version', (t) => {
  t.equal(mollieClientV2.version, 'v2');
  t.end();
});

test('new client v1 - constructor - version', (t) => {
  t.equal(mollieClientV1.version, 'v1');
  t.end();
});

let requestStub;
test('new client - request stubbing', (t) => {
  requestStub = sinon.stub(mollieClientV2, 'request');
  requestStub.returns(Promise.resolve());
  t.end();
});

test('new client - get', (t) => {
  requestStub.reset();
  return mollieClientV2.get('resource_path').then(() => {
    t.equal(mollieClientV2.request.callCount, 1, 'should be called one time');
    t.equal(mollieClientV2.request.getCall(0).args[0], 'get', 'first argument should be get');
    t.equal(mollieClientV2.request.getCall(0).args[1], 'resource_path', 'second argument should be resource path');
    t.end();
  });
});

test('new client - post', (t) => {
  requestStub.reset();
  return mollieClientV2.post('resource_path', { 'body': true }).then(() => {
    t.equal(mollieClientV2.request.callCount, 1, 'should be called one time');
    t.equal(mollieClientV2.request.getCall(0).args[0], 'post', 'first argument should be post');
    t.equal(mollieClientV2.request.getCall(0).args[1], 'resource_path', 'second argument should be resource path');
    t.deepEqual(mollieClientV2.request.getCall(0).args[2], { 'body': true }, 'third argument should be body');
    t.end();
  });
});

test('new client - put', (t) => {
  requestStub.reset();
  return mollieClientV2.put('resource_path', { 'body': true }).then(() => {
    t.equal(mollieClientV2.request.callCount, 1, 'should be called one time');
    t.equal(mollieClientV2.request.getCall(0).args[0], 'patch', 'first argument should be patch not put');
    t.equal(mollieClientV2.request.getCall(0).args[1], 'resource_path', 'second argument should be resource path');
    t.deepEqual(mollieClientV2.request.getCall(0).args[2], { 'body': true }, 'third argument should be body');
    t.end();
  });
});

test('new client - patch', (t) => {
  requestStub.reset();
  return mollieClientV2.patch('resource_path', { 'body': true }).then(() => {
    t.equal(mollieClientV2.request.callCount, 1, 'should be called one time');
    t.equal(mollieClientV2.request.getCall(0).args[0], 'patch', 'first argument should be patch');
    t.equal(mollieClientV2.request.getCall(0).args[1], 'resource_path', 'second argument should be resource path');
    t.deepEqual(mollieClientV2.request.getCall(0).args[2], { 'body': true }, 'third argument should be body');
    t.end();
  });
});

test('new client - delete', (t) => {
  requestStub.reset();
  return mollieClientV2.delete('resource_path').then(() => {
    t.equal(mollieClientV2.request.callCount, 1, 'should be called one time');
    t.equal(mollieClientV2.request.getCall(0).args[0], 'delete', 'first argument should be delete');
    t.equal(mollieClientV2.request.getCall(0).args[1], 'resource_path', 'second argument should be resource path');
    t.end();
  });
});

test('new client - request restore', (t) => {
  requestStub.restore();
  t.end();
});

let httpsrequest;
test('new client - https stub', (t) => {
  httpsrequest = sinon.stub(https, 'request');
  httpsrequest.returns(Promise.resolve());
  t.end();
});

test('new client - request - hostname', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('get', 'resource_path').then(() => {
    t.equal(httpsrequest.callCount, 1, 'should be called one time');
    t.equal(httpsrequest.getCall(0).args[0].hostname, 'api.mollie.nl', 'hostname should be mollie.nl');
    t.end();
  });
});

test('new client - request - header token', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('get', 'resource_path').then(() => {
    t.equal(httpsrequest.getCall(0).args[0].headers.Authorization, 'Bearer CUSTOM_TOKEN', 'headers.Authorization should include token');
    t.end();
  });
});

test('new client - request - header content-type', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('get', 'resource_path').then(() => {
    t.equal(httpsrequest.getCall(0).args[0].headers['Content-Type'], 'application/json; charset=utf-8', 'headers.Content-Type should include JSON');
    t.end();
  });
});

test('new client - request - path', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('get', 'resource_path').then(() => {
    t.equal(httpsrequest.getCall(0).args[0].path, '/v2/resource_path', 'path should be set to resource_path with version including format');
    t.end();
  });
});

test('new client - request - path post', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('post', 'resource_path', {}).then(() => {
    t.equal(httpsrequest.getCall(0).args[0].path, '/v2/resource_path', 'path should be set to resource_path with version including format');
    t.end();
  });
});

test('new client - request - path v1', (t) => {
  httpsrequest.reset();
  return mollieClientV1.request('post', 'resource_path', {}).then(() => {
    t.equal(httpsrequest.getCall(0).args[0].path, '/v1/resource_path', 'path should be set to resource_path with version including format');
    t.end();
  });
});

test('new client - request - port', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('get', 'resource_path').then(() => {
    t.equal(httpsrequest.getCall(0).args[0].port, 443, 'port should always be set to SSL');
    t.end();
  });
});

test('new client - request - method', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('get', 'resource_path').then(() => {
    t.equal(httpsrequest.getCall(0).args[0].method, 'GET', 'should be uppercase');
    t.end();
  });
});

test('new client - request - method post', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('post', 'resource_path', {}).then(() => {
    t.equal(httpsrequest.getCall(0).args[0].method, 'POST', 'should be uppercase');
    t.end();
  });
});

test('new client - request - body', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('get', 'resource_path').then(() => {
    t.equal(httpsrequest.getCall(0).args[0].body, null);
    t.end();
  });
});

test('new client - request - body on post', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('post', 'resource_path', { 'body': true }).then(() => {
    t.deepEqual(httpsrequest.getCall(0).args[0].body, { 'body' : true });
    t.end();
  });
});

test('new client - request - body on patch', (t) => {
  httpsrequest.reset();
  return mollieClientV2.request('patch', 'resource_path', { 'body': true }).then(() => {
    t.deepEqual(httpsrequest.getCall(0).args[0].body, { 'body' : true });
    t.end();
  });
});

test('new client - https restore', (t) => {
  httpsrequest.restore();
  t.end();
});

test('client - requestHasBody - POST', (t) => {
  t.equal(Client.requestHasBody('POST'), true);
  t.end();
});

test('client - requestHasBody - PATCH', (t) => {
  t.equal(Client.requestHasBody('PATCH'), true);
  t.end();
});

test('client - requestHasBody - GET', (t) => {
  t.equal(Client.requestHasBody('GET'), false);
  t.end();
});

test('client - requestHasBody - DELETE', (t) => {
  t.equal(Client.requestHasBody('DELETE'), false);
  t.end();
});
