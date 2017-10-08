import https from '../libs/https';

export default class Client {
  constructor (token, version = 'v1') {
    this.version = version;
    this.token = token;
  }

  get (...args) {
    return this.request(...['get'].concat(...args));
  }

  post (...args) {
    return this.request(...['post'].concat(...args));
  }

  put (...args) {
    return this.request(...['patch'].concat(...args));
  }

  patch (...args) {
    return this.request(...['patch'].concat(...args));
  }

  delete (...args) {
    return this.request(...['delete'].concat(...args));
  }

  request (...args) {
    const method = String(args[0]).toUpperCase();
    return https.request({
      'hostname': 'api.mollie.nl',
      'headers': {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json; charset=utf-8'
      },
      'path': '/' + this.version + '/' + (Client.requestHasBody(method) ? args.slice(1, -1) : args.slice(1)).join('/'),
      'port': 443,
      'method': method,
      'body': (Client.requestHasBody(method) ? args.slice(-1)[0] : null)
    });
  }

  static requestHasBody (method) {
    return method === 'POST' || method === 'PATCH';
  }
}
