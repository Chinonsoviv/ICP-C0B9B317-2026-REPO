const express = require('express');
const redis = require('redis');

const app = express();
const PORT = 3000;

// Connect to Redis service
const client = redis.createClient({
  socket: {
    host: 'redis',
    port: 6379
  }
});

client.on('error', (err) => {
  console.log('Redis Client Error', err);
});

// Connect to Redis when app starts
client.connect();

app.get('/', async (req, res) => {
  try {
    // Get current visit count from Redis
    let visits = await client.get('visits');

    if (visits === null) {
      visits = 0;
    }

    // Increment the count
    visits = parseInt(visits) + 1;

    // Save updated count back to Redis
    await client.set('visits', visits);

    res.send(`
      <html>
        <head>
          <title>Visitor Counter</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f0f4f8;
            }
            .card {
              background: white;
              padding: 40px;
              border-radius: 12px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.1);
              text-align: center;
            }
            h1 { color: #2d3748; }
            .count {
              font-size: 80px;
              font-weight: bold;
              color: #4299e1;
            }
            p { color: #718096; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Visitor Counter</h1>
            <div class="count">${visits}</div>
            <p>Total visits tracked by Redis</p>
            <p>Built by Chinonso Vivian Ojeri</p>
            <p>InternCareerPath DevOps Internship 2026</p>
            <p><em>Powered by Node.js + Redis + Docker Compose</em></p>
          </div>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error connecting to Redis: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Web service running on port${PORT}`);
});