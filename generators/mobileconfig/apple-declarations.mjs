import { randomUUID } from 'node:crypto';
import { normalizeAppleSource } from '../../targets/apple/apple-model.mjs';
import { validateAppleSource } from '../../targets/apple/apple-validation.mjs';
import { plistXml } from './apple-plist.mjs';

function validate(source) {
  const normalized = normalizeAppleSource(source);
  const result = validateAppleSource(normalized);
  if (!result.valid) throw new Error(result.diagnostics.filter(d => d.severity === 'error').map(d => `${d.path}: ${d.message}`).join('; '));
  return normalized;
}

function encodeDeclaration(declaration) {
  return Buffer.from(JSON.stringify(declaration, null, 2), 'utf8');
}

export function generateDeclarationsJson(source) {
  const normalized = validate(source);
  return JSON.stringify(normalized.declarations, null, 2) + '\n';
}

export function generateDeclarationsProfile(source, {
  displayName = 'Apple Declarations',
  identifier = `com.network-configuration.declarations.${randomUUID()}`
} = {}) {
  const normalized = validate(source);
  const payload = {
    Declarations: normalized.declarations.map(encodeDeclaration),
    PayloadDisplayName: displayName,
    PayloadIdentifier: identifier,
    PayloadType: 'com.apple.declarations',
    PayloadUUID: randomUUID(),
    PayloadVersion: 1
  };

  return plistXml({
    PayloadContent: [payload],
    PayloadDisplayName: displayName,
    PayloadIdentifier: identifier,
    PayloadType: 'Configuration',
    PayloadUUID: randomUUID(),
    PayloadVersion: 1
  });
}
