const http = require('http');

const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const ENVIRONMENT = process.env.NODE_ENV || 'development';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <title>Kubernetes Deployment</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: Arial, sans-serif;
              background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .card {
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 16px;
              padding: 50px;
              text-align: center;
              max-width: 600px;
              width: 90%;
            }
            .badge {
              background: #4299e1;
              color: white;
              padding: 6px 16px;
              border-radius: 20px;
              font-size: 13px;
              display: inline-block;
              margin-bottom: 20px;
            }
            h1 { color: white; font-size: 32px; margin-bottom: 10px; }
            .subtitle { color: #a0aec0; margin-bottom: 30px; }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin: 30px 0;
            }
            .info-box {
              background: rgba(255,255,255,0.05);
              border-radius: 8px;
              padding: 15px;
            }
            .info-label { color: #718096; font-size: 12px; margin-bottom: 5px; }
            .info-value { color: white; font-weight: bold; }
            .footer { color: #4a5568; font-size: 13px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">Running on Kubernetes</div>
            <h1>Hello from Kubernetes!</h1>
            <p class="subtitle">This Node.js app is deployed and managed by Kubernetes</p>
            <div class="info-grid">
              <div class="info-box">
                <div class="info-label">Built By</div>
                <div class="info-value">Chinonso Vivian Ojeri</div>
              </div>
              <div class="info-box">
                <div class="info-label">Program</div>
                <div class="info-value">InternCareerPath</div>
              </div>
              <div class="info-box">
                <div class="info-label">App Version</div>
                <div class="info-value">v${APP_VERSION}</div>
              </div>
              <div class="info-box">
                <div class="info-label">Environment</div>
                <div class="info-value">${ENVIRONMENT}</div>
              </div>
            </div>
            <p class="footer">DevOps Engineering Internship 2026</p>
          </div>
        </body>
      </html>
    `);
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', version: APP_VERSION }));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port${PORT}`);
  console.log(`Environment:${ENVIRONMENT}`);
  console.log(`Version:${APP_VERSION}`);
});

module.exports = server;