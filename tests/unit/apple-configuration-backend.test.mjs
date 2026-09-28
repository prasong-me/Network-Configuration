import test from 'node:test';
import assert from 'node:assert/strict';

import {
  validateAppleSource,
  generateMobileconfig,
  generateDeclarationsJson,
  generateDeclarationsProfile,
  generateApplicationConfigurationCommand
} from '../../targets/apple/index.mjs';

const uuid = '11111111-1111-4111-8111-111111111111';

function source() {
  return {
    target: 'apple',
    platforms: ['ios', 'ipados'],
    profile: {
      PayloadDisplayName: 'Test Network Profile',
      PayloadIdentifier: 'com.example.network.test',
      PayloadType: 'Configuration',
      PayloadUUID: uuid,
      PayloadVersion: 1,
      payloads: [{
        PayloadType: 'com.apple.wifi.managed',
        PayloadIdentifier: 'com.example.network.test.wifi',
        PayloadUUID: '22222222-2222-4222-8222-222222222222',
        PayloadVersion: 1,
        Content: {
          SSID_STR: 'ExampleWiFi',
          AutoJoin: true
        }
      }]
    },
    declarations: [{
      Type: 'com.apple.configuration.app.settings',
      Identifier: '33333333-3333-4333-8333-333333333333',
      ServerToken: 'test-token',
      Payload: { Privacy: { PermissionDefaults: { 'com.example.app': { Camera: 'Allow' } } } }
    }]
  };
}

test('validates Apple source envelope', () => {
  const result = validateAppleSource(source());
  assert.equal(result.valid, true);
  assert.deepEqual(result.diagnostics, []);
});

test('rejects non-Configuration top-level payload type', () => {
  const bad = structuredClone(source());
  bad.profile.PayloadType = 'NotConfiguration';
  assert.equal(validateAppleSource(bad).valid, false);
});

test('generates a valid-looking XML property list with payload metadata', () => {
  const xml = generateMobileconfig(source());
  assert.match(xml, /<plist version="1\.0">/);
  assert.match(xml, /com\.apple\.wifi\.managed/);
  assert.match(xml, /ExampleWiFi/);
});

test('generates declaration JSON without inventing payload fields', () => {
  const json = generateDeclarationsJson(source());
  const parsed = JSON.parse(json);
  assert.equal(parsed[0].Type, 'com.apple.configuration.app.settings');
  assert.equal(parsed[0].Payload.Privacy.PermissionDefaults['com.example.app'].Camera, 'Allow');
});

test('generates declaration install profile', () => {
  const xml = generateDeclarationsProfile(source());
  assert.match(xml, /com\.apple\.declarations/);
  assert.match(xml, /<data>/);
});

test('generates Settings application configuration command', () => {
  const xml = generateApplicationConfigurationCommand({
    bundleIdentifier: 'com.example.app',
    configuration: { enabled: true }
  });
  assert.match(xml, /<string>Settings<\/string>/);
  assert.match(xml, /ApplicationConfiguration/);
  assert.match(xml, /com\.example\.app/);
});
