process.env.NODE_ENV = 'test';

const chai = require('chai');
global.expect = chai.expect;
global.assert  = require('assert');
global.request = require('request');
