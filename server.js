const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const SUBMISSIONS_FILE = path.join(ROOT_DIR, 'submissions.json');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function loadSubmissions() {
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveSubmission(payload) {
  const submissions = loadSubmissions();
  const record = {
    id: `app-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    ...payload
  };
  submissions.push(record);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
  return record;
}

function forwardToWebhook(payload) {
  const webhookUrl = process.env.JOB_BOARD_WEBHOOK_URL;
  if (!webhookUrl) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    const url = new URL(webhookUrl);
    const transport = url.protocol === 'https:' ? https : http;
    const body = JSON.stringify(payload);

    const request = transport.request(
      {
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body)
        }
      },
      response => {
        let responseBody = '';
        response.on('data', chunk => {
          responseBody += chunk;
        });
        response.on('end', () => resolve({ status: response.statusCode, body: responseBody }));
      }
    );

    request.on('error', reject);
    request.write(body);
    request.end();
  });
}

function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (pathname === '/') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(pathname).replace(/^([a-zA-Z]:)?[\\/]+/, '');
  const fullPath = path.join(ROOT_DIR, safePath);

  if (!fullPath.startsWith(ROOT_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.stat(fullPath, (error, stats) => {
    if (error || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(fullPath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'POST' && requestUrl.pathname === '/api/apply') {
    try {
      const body = await readBody(req);
      const payload = JSON.parse(body || '{}');

      if (!payload.jobTitle || !payload.companyName) {
        sendJson(res, 400, { success: false, error: 'Job title and company name are required.' });
        return;
      }

      const record = saveSubmission(payload);
      await forwardToWebhook(payload);

      sendJson(res, 200, {
        success: true,
        message: 'Application ready and stored successfully.',
        submissionId: record.id
      });
    } catch (error) {
      sendJson(res, 500, { success: false, error: 'Unable to process the application request.' });
    }
    return;
  }

  if (req.method === 'GET' && requestUrl.pathname === '/api/applications') {
    sendJson(res, 200, { success: true, applications: loadSubmissions() });
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Auto-apply server running at http://localhost:${PORT}`);
});
