const http = require('http');
const server = require('./app');

describe('Node.js App Tests', () => {
  afterAll(() => {
    server.close();
  });

  test('Home page returns 200 status', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      expect(res.statusCode).toBe(200);
      done();
    });

    req.on('error', done);
    req.end();
  });

  test('Home page contains expected content', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        expect(data).toContain('Hello from Node.js');
        expect(data).toContain('InternCareerPath');
        done();
      });
    });

    req.on('error', done);
    req.end();
  });
});