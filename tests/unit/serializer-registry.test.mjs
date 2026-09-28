import assert from 'node:assert/strict';
import { test, describe, beforeEach } from 'node:test';
import { SerializerRegistry } from '../../core/registry/serializer-registry.mjs';

describe('Serializer Registry (Phase E Mechanism)', () => {
  let registry;

  beforeEach(() => {
    registry = new SerializerRegistry();
  });

  test('register validates Contract v2.1 shape before storing', () => {
    const invalidEntry = {
      format: 'INVALID_FORMAT',
      serializerId: 'test-serializer',
      version: '1.0.0',
      isDeprecated: false
    };

    const result = registry.register(invalidEntry);

    assert.equal(result.success, false);
    assert.equal(result.diagnostics.length > 0, true);
    assert.equal(registry.has('test-serializer'), false);
  });

  test('register stores a valid SerializerRegistryEntry successfully', () => {
    const validEntry = {
      format: 'MOBILECONFIG',
      serializerId: 'ios-mobileconfig-v1',
      version: '2.1.0',
      isDeprecated: false
    };

    const result = registry.register(validEntry);

    assert.equal(result.success, true);
    assert.equal(result.diagnostics.length, 0);
    assert.equal(registry.has('ios-mobileconfig-v1'), true);
    assert.deepEqual(registry.get('ios-mobileconfig-v1'), validEntry);
  });

  test('getByFormat retrieves matching entries and applies the explicit API option', () => {
    const activeEntry = {
      format: 'CLASH_YAML',
      serializerId: 'clash-v1',
      version: '1.0',
      isDeprecated: false
    };

    const deprecatedEntry = {
      format: 'CLASH_YAML',
      serializerId: 'clash-legacy',
      version: '0.9',
      isDeprecated: true
    };

    registry.register(activeEntry);
    registry.register(deprecatedEntry);

    const allEntries = registry.getByFormat('CLASH_YAML');
    assert.equal(allEntries.length, 2);

    const activeOnly = registry.getByFormat('CLASH_YAML', {
      includeDeprecated: false
    });

    assert.equal(activeOnly.length, 1);
    assert.equal(activeOnly[0].serializerId, 'clash-v1');
  });

  test('get and has operate on serializerId', () => {
    const entry = {
      format: 'JSON_RAW',
      serializerId: 'json-raw-v1',
      version: 'custom-version',
      isDeprecated: false
    };

    registry.register(entry);

    assert.equal(registry.has('json-raw-v1'), true);
    assert.equal(registry.get('json-raw-v1'), entry);
    assert.equal(registry.has('missing'), false);
    assert.equal(registry.get('missing'), undefined);
  });

  test('listAll and size expose registered metadata without executing generators', () => {
    registry.register({
      format: 'SING_BOX_JSON',
      serializerId: 'singbox-v1',
      version: '1.0.0',
      isDeprecated: false
    });

    registry.register({
      format: 'DNS_ZONE',
      serializerId: 'dns-zone-v1',
      version: 'opaque',
      isDeprecated: true
    });

    const all = registry.listAll();

    assert.equal(all.length, 2);
    assert.equal(registry.size, 2);
    assert.deepEqual(
      all.map((entry) => entry.serializerId),
      ['singbox-v1', 'dns-zone-v1']
    );
  });
});
