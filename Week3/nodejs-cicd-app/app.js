const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>Hello from Node.js!</h1>
      <p>This app is running inside a Docker container.</p>
      <p>Built by Chinonso Vivian Ojeri</p>
      <p>InternCareerPath DevOps Internship 2026</p>
      <p>Deployed automatically via CI/CD Pipeline</p>
    `);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
});

module.exports = server;