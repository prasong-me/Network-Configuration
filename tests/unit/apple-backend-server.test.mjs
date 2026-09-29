import test from 'node:test';
import assert from 'node:assert/strict';
import { createAppleBackendServer } from '../../apple/backend-server.mjs';

const source = {
  target: 'apple',
  platforms: ['ios'],
  profile: {
    PayloadDisplayName: 'Server Test',
    PayloadIdentifier: 'com.example.server.test',
    PayloadType: 'Configuration',
    PayloadUUID: '11111111-1111-4111-8111-111111111111',
    PayloadVersion: 1,
    payloads: [{
      PayloadType: 'com.apple.wifi.managed',
      PayloadIdentifier: 'com.example.server.test.wifi',
      PayloadUUID: '22222222-2222-4222-8222-222222222222',
      PayloadVersion: 1,
      Content: { SSID_STR: 'ServerWiFi' }
    }]
  }
};

test('Apple backend exposes health and compilation endpoints', async () => {
  const server = createAppleBackendServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  try {
    const base = `http://127.0.0.1:${port}`;
    const health = await fetch(`${base}/health`);
    assert.equal(health.status, 200);
    assert.equal((await health.json()).ok, true);

    const response = await fetch(`${base}/compile/mobileconfig`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(source)
    });
    assert.equal(response.status, 200);
    assert.match(await response.text(), /ServerWiFi/);
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});
