import assert from 'node:assert/strict';
import { test, describe, beforeEach } from 'node:test';
import { TargetProfileRegistry } from '../../core/registry/target-profile-registry.mjs';

describe('Target Profile Registry (Phase F Mechanism)', () => {
  let registry;

  beforeEach(() => {
    registry = new TargetProfileRegistry();
  });

  test('stores and retrieves an opaque profile by targetId key', () => {
    const profile = {
      arbitrary: 'data',
      nested: { value: 42 }
    };

    registry.register('target-a', profile);

    assert.equal(registry.has('target-a'), true);
    assert.equal(registry.get('target-a'), profile);
  });

  test('does not require or infer a Target Profile schema', () => {
    const primitiveProfile = 'opaque-profile-value';

    registry.register('target-b', primitiveProfile);

    assert.equal(registry.get('target-b'), primitiveProfile);
  });

  test('missing targetId returns undefined without imposing a default target', () => {
    assert.equal(registry.get('missing'), undefined);
    assert.equal(registry.has('missing'), false);
  });

  test('listAll exposes container contents without interpreting profile fields', () => {
    const first = { anything: true };
    const second = { anotherShape: ['x', 'y'] };

    registry.register('target-a', first);
    registry.register('target-b', second);

    assert.deepEqual(registry.listAll(), [
      { targetId: 'target-a', profile: first },
      { targetId: 'target-b', profile: second }
    ]);
    assert.equal(registry.size, 2);
  });

  test('registration remains a mechanism operation and performs no adapter or generator work', () => {
    const profile = {
      adapter: () => {
        throw new Error('adapter execution must not occur');
      },
      generator: () => {
        throw new Error('generator execution must not occur');
      }
    };

    assert.doesNotThrow(() => registry.register('target-a', profile));
    assert.equal(registry.get('target-a'), profile);
  });
});
