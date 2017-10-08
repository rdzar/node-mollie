import tape from 'tape'
import path from 'path'
import tapeNock from 'tape-nock'
import sinon from 'sinon'
import { https } from '../../src/index'
const test = tapeNock(tape, {
  fixtures: path.join(__dirname, 'fixtures')
});

test('https - make get call', (t) => {
  test.nock('https://mollie.com').get('/api').reply(200, {'body': true});
  return https.request({
    'hostname': 'mollie.com',
    'port': 443,
    'path': '/api',
    'method': 'get'
  }).then(response => {
    t.deepEqual(response, { 'body': true }, 'should return body: true');
    t.end();
  });
});

test('https - make get call with custom header', (t) => {
  test.nock('https://mollie.com', {
    'reqheaders': {
      'x-custom': 'value'
    }
  }).get('/api').reply(200, {'body': true});
  return https.request({
    'hostname': 'mollie.com',
    'port': 443,
    'path': '/api',
    'method': 'get',
    'headers': {
      'x-custom': 'value'
    }
  }).then(response => {
    t.deepEqual(response, { 'body': true }, 'should return body: true');
    t.end();
  });
});

test('https - make post call', (t) => {
  test.nock('https://mollie.com').post('/api/v2/ID/contacts', {
    'contact': {
      'company_name': 'DualDev'
    }
  }).reply(200, {'created': true});
  return https.request({
    'hostname': 'mollie.com',
    'port': 443,
    'path': '/api/v2/ID/contacts',
    'method': 'post',
    'body': {
      'contact': {
        'company_name': 'DualDev'
      }
    }
  }).then(response => {
    t.deepEqual(response, { 'created': true }, 'should return created: true');
    t.end();
  });
});

test('https - make delete call', (t) => {
  test.nock('https://mollie.com').delete('/api/v2/ID/contacts/UUID').reply(201, {});
  return https.request({
    'hostname': 'mollie.com',
    'port': 443,
    'path': '/api/v2/ID/contacts/UUID',
    'method': 'delete'
  }).then(response => {
    t.deepEqual(response, {}, 'should return empty response');
    t.end();
  });
});

test('https - make invalid post call', (t) => {
  test.nock('https://mollie.com', {
    'reqheaders': {}
  }).post('/api/v2/ID/contacts', { 'company_name': 'DualDev' }).reply(400, {
    'error': 'token is invalid'
  });

  return https.request({
    'hostname': 'mollie.com',
    'port': 443,
    'path': '/api/v2/ID/contacts',
    'method': 'post',
    'body': { 'company_name': 'DualDev' }
  }).catch(err => {
    t.equal(err.message, 'token is invalid', 'should return error nicely');
    t.end();
  });
});

test('https - make invalid post call without return error', (t) => {
  test.nock('https://mollie.com', {
    'reqheaders': {}
  }).post('/api/v2/ID/contacts', { 'company_name': 'DualDev' }).reply(405, {});

  return https.request({
    'hostname': 'mollie.com',
    'port': 443,
    'path': '/api/v2/ID/contacts',
    'method': 'post',
    'body': { 'company_name': 'DualDev' }
  }).catch(err => {
    t.equal(err.message, '405', 'should return error code');
    t.end();
  });
});

test('https - make invalid json return', (t) => {
  test.nock('https://mollie.com', {
    'reqheaders': {}
  }).post('/api/v2/ID/contacts', { 'company_name': 'DualDev' }).reply(400, 'T{}');

  return https.request({
    'hostname': 'mollie.com',
    'port': 443,
    'path': '/api/v2/ID/contacts',
    'method': 'post',
    'body': { 'company_name': 'DualDev' }
  }).catch(err => {
    t.equal(err.message, '400', 'should return error code');
    t.end();
  });
});

test('https - make request crash on something internally', (t) => {
  test.nock('https://mollie.com').get('/api').replyWithError({'message': 'E_TIMEOUT', 'code': 'E_TIMEOUT'});

  return https.request({
    'hostname': 'mollie.com',
    'port': 443,
    'path': '/api',
    'method': 'get'
  }).catch(err => {
    t.equal(err.message, 'E_TIMEOUT', 'should return error code of internal error');
    t.end();
  });
});
