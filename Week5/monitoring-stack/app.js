const express = require('express');
const promClient = require('prom-client');

const app = express();
const PORT = 3000;

// Create a Registry to register metrics
const register = new promClient.Registry();

// Add default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({ register });

// Create custom metrics
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  registers: [register]
});

// Middleware to track all requests
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode
    });
    httpRequestDuration.observe(
      { method: req.method, route: req.path },
      duration
    );
  });
  next();
});

// Home page
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Monitored App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #1a1a2e;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            padding: 40px;
            text-align: center;
            max-width: 500px;
          }
          h1 { color: #4299e1; }
          p { color: #a0aec0; margin: 10px 0; }
          .badge {
            background: #48bb78;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
          }
          a {
            color: #4299e1;
            display: block;
            margin: 8px 0;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <span class="badge">Being Monitored</span>
          <h1>Hello from the Monitored App!</h1>
          <p>Built by Chinonso Vivian Ojeri</p>
          <p>InternCareerPath DevOps Internship 2026</p>
          <p>Every visit to this page is tracked by Prometheus</p>
          <a href="/metrics">View Raw Metrics</a>
          <a href="http://localhost:3001" target="_blank">Open Grafana Dashboard</a>
        </div>
      </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Metrics endpoint - Prometheus scrapes this
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(PORT, () => {
  console.log(`App running on port${PORT}`);
  console.log(`Metrics available at http://localhost:${PORT}/metrics`);
});