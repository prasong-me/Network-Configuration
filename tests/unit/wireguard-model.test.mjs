import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  normalizeWireGuardModel,
  validateWireGuardModel
} from '../../targets/wireguard/wireguard-model.mjs';

const fixture = {
  interface: {
    privateKey: 'TEST_PRIVATE_KEY'
  },
  peers: [{
    publicKey: 'TEST_PUBLIC_KEY',
    allowedIPs: ['0.0.0.0/0', '::/0'],
    endpoint: 'vpn.example.test:51820',
    persistentKeepalive: 25
  }]
};

describe('WireGuard protocol model', () => {
  test('accepts evidence-backed interface and peer fields', () => {
    const result = validateWireGuardModel(fixture);
    assert.equal(result.valid, true);
    assert.deepEqual(result.errors, []);
  });

  test('requires privateKey and peers with publicKey plus allowedIPs', () => {
    const result = validateWireGuardModel({
      interface: {},
      peers: [{ publicKey: 'TEST_PUBLIC_KEY' }]
    });

    assert.equal(result.valid, false);
    assert.deepEqual(
      result.errors.map((error) => error.path),
      ['interface.privateKey', 'peers[0].allowedIPs']
    );
  });

  test('preserves UNKNOWN rather than inventing target-specific fields', () => {
    const result = validateWireGuardModel({
      interface: {
        privateKey: 'TEST_PRIVATE_KEY',
        dns: ['1.1.1.1']
      },
      peers: [{
        publicKey: 'TEST_PUBLIC_KEY',
        allowedIPs: ['0.0.0.0/0']
      }]
    });

    assert.equal(result.valid, false);
    assert.equal(result.errors[0].code, 'UNSUPPORTED_FIELD');
    assert.equal(result.errors[0].path, 'interface.dns');
  });

  test('keeps wg-quick extensions outside the protocol model', () => {
    const result = validateWireGuardModel({
      interface: {
        privateKey: 'TEST_PRIVATE_KEY',
        address: ['10.0.0.2/32'],
        mtu: 1420,
        table: 'auto'
      },
      peers: [{
        publicKey: 'TEST_PUBLIC_KEY',
        allowedIPs: ['0.0.0.0/0']
      }]
    });

    assert.equal(result.valid, false);
    assert.deepEqual(
      result.errors.map((error) => error.path),
      ['interface.address', 'interface.mtu', 'interface.table']
    );
  });

  test('does not impose a universal persistent keepalive default', () => {
    const withoutKeepalive = {
      interface: { privateKey: 'TEST_PRIVATE_KEY' },
      peers: [{
        publicKey: 'TEST_PUBLIC_KEY',
        allowedIPs: ['10.0.0.0/8']
      }]
    };

    const result = validateWireGuardModel(withoutKeepalive);
    assert.equal(result.valid, true);
  });

  test('normalization does not mutate input or add defaults', () => {
    const input = structuredClone(fixture);
    const normalized = normalizeWireGuardModel(input);

    assert.deepEqual(normalized, input);
    assert.notEqual(normalized, input);
    assert.notEqual(normalized.interface, input.interface);
    assert.notEqual(normalized.peers, input.peers);
    assert.equal(Object.hasOwn(normalized.interface, 'listenPort'), false);
  });

  test('rejects invalid port and keepalive values', () => {
    const result = validateWireGuardModel({
      interface: {
        privateKey: 'TEST_PRIVATE_KEY',
        listenPort: 70000
      },
      peers: [{
        publicKey: 'TEST_PUBLIC_KEY',
        allowedIPs: ['0.0.0.0/0'],
        persistentKeepalive: -1
      }]
    });

    assert.equal(result.valid, false);
    assert.deepEqual(
      result.errors.map((error) => error.path),
      ['interface.listenPort', 'peers[0].persistentKeepalive']
    );
  });
});
