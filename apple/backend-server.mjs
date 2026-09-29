import http from 'node:http';
import { validateAppleSource, generateMobileconfig, generateDeclarationsJson, generateDeclarationsProfile, generateMdmCommand } from '../targets/apple/index.mjs';

const MAX_BODY = 1024 * 1024;

async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) throw Object.assign(new Error('request body too large'), { statusCode: 413 });
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

function send(res, status, body, contentType = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'content-type': contentType, 'cache-control': 'no-store' });
  res.end(typeof body === 'string' ? body : JSON.stringify(body, null, 2));
}

function compile(command, source, index = 0) {
  if (command === 'mobileconfig') return { body: generateMobileconfig(source), type: 'application/x-apple-aspen-config' };
  if (command === 'declarations') return { body: generateDeclarationsJson(source), type: 'application/json; charset=utf-8' };
  if (command === 'declarations-profile') return { body: generateDeclarationsProfile(source), type: 'application/x-apple-aspen-config' };
  if (command === 'mdm-command') return { body: generateMdmCommand(source, index), type: 'application/xml; charset=utf-8' };
  throw Object.assign(new Error('unknown compile command'), { statusCode: 404 });
}

export function createAppleBackendServer() {
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? '/', 'http://localhost');

      if (req.method === 'GET' && url.pathname === '/health') {
        return send(res, 200, { ok: true, service: 'apple-configuration-backend', version: '1' });
      }

      if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'method_not_allowed' });

      const source = await readJson(req);

      if (url.pathname === '/validate') {
        const result = validateAppleSource(source);
        return send(res, result.valid ? 200 : 422, result);
      }

      const match = url.pathname.match(/^\/compile\/(mobileconfig|declarations|declarations-profile|mdm-command)$/);
      if (!match) return send(res, 404, { ok: false, error: 'not_found' });

      const result = compile(match[1], source, Number(url.searchParams.get('index') ?? 0));
      return send(res, 200, result.body, result.type);
    } catch (error) {
      const status = Number(error.statusCode) || 400;
      return send(res, status, { ok: false, error: error instanceof Error ? error.message : String(error) });
    }
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 8787);
  const host = process.env.HOST ?? '127.0.0.1';
  createAppleBackendServer().listen(port, host, () => {
    console.log(`Apple configuration backend listening on http://${host}:${port}`);
  });
}
