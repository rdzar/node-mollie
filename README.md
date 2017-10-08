# node-mollie

[![Build Status](https://travis-ci.org/renedx/node-mollie.svg?branch=master)](https://travis-ci.org/renedx/node-mollie)
[![Coverage Status](https://coveralls.io/repos/github/renedx/node-mollie/badge.svg?branch=master)](https://coveralls.io/github/renedx/node-mollie?branch=master)
[![npm version](https://badge.fury.io/js/node-mollie.svg)](https://badge.fury.io/js/mollie)

A promise based API wrapper for mollie.com in Node

## Install
```bash
npm install node-mollie --save
```

## What do I need?
A mollie live or test token.

## Obtain a mollie token
To obtain a mollie token go to your mollie dashboard, choose website profiles under Settings. It will provide you with a live and test API key.

## Why, Mollie has their own module named mollie-api-node?
Their module got me annoyed so much, it always lacks most recent support (its not written as a wrapper at all) and has so many useless deps most of us do not need.

## Example create customer
```js
import { Client } from 'mollie'

const mollieClient = new Client('TOKEN');
mollieClient.post('customers', {
  'name': 'DualDev'
}).then(res => {
  console.log('created!', res);
}).catch(err => {
  console.log('Whoops, something went wrong!', err);
});
```

## How do I make other calls?
This promise based API wrapper is not call-specific, allowing it to be more flexible to future API changes. The following methods are available for use.

## API
### Client(Token, [version=v1])
#### .get('resource_path')
#### .put('resource_path', body)
#### .patch('resource_path', body)
#### .create('resource_path', body)
#### .delete('resource_path')

## Does this package depends upon other packages?
**No**, this package doesn't use any dependencies besides dev-dependencies for testing and building.
