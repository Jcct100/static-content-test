/* globals  describe, request, it, expect, assert */

require('./spec_helper');

describe('3 tests for static content challenge', function() {

  it('Valid URL should return a 200 HTTP status code', function(done) {
    request.get({ url: 'http://localhost:8000/valves' },
      function(error, response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
  });

  it('URL should return a body that contains the HTML generated from the relevant index.md markdown file', function(done) {
    request.get({ url: 'http://localhost:8000/valves' },
      function(error, response, body) {
        assert.ok(body.includes('Acme Co. valves are amongst the highest quality in the industry. Whether it&#39;s for industrial, commercial, medical or space exploration, you can always count on an Acme Co. valve'));
        done();
      });
  });

  it('Invalid URL should return a 404 HTTP status code', function(done) {
    request.get({ url: 'http://localhost:8000' },
      function(error, response) {
        expect(response.statusCode).to.equal(404);
        done();
      });
  });

});
