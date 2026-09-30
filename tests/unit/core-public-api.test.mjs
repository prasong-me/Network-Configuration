import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SerializerRegistry,
  TargetProfileRegistry
} from '../../core/index.mjs';

test('Core public API re-exports registry mechanisms', () => {
  assert.equal(typeof SerializerRegistry, 'function');
  assert.equal(typeof TargetProfileRegistry, 'function');

  const serializerRegistry = new SerializerRegistry();
  const targetProfileRegistry = new TargetProfileRegistry();

  assert.equal(typeof serializerRegistry.register, 'function');
  assert.equal(typeof targetProfileRegistry.register, 'function');
});
