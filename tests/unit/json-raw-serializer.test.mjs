import test from 'node:test';
import assert from 'node:assert/strict';
import { serializeJsonRaw } from '../../generators/json-raw/json-raw-serializer.mjs';

// This suite is part of the repository test gate.

test('JSON_RAW serializer preserves representation as formatted JSON', () => {
  const representation = { target: 'generic', settings: { enabled: true } };
  assert.equal(
    serializeJsonRaw(representation),
    '{\n  "target": "generic",\n  "settings": {\n    "enabled": true\n  }\n}\n'
  );
});

test('JSON_RAW serializer rejects values JSON.stringify cannot serialize', () => {
  assert.throws(() => serializeJsonRaw(undefined), {
    name: 'TypeError',
    message: 'JSON_RAW serialization requires a JSON-serializable value'
  });
});
