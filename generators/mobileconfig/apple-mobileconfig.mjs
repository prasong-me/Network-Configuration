import { randomUUID } from 'node:crypto';
import { normalizeAppleSource } from '../../targets/apple/apple-model.mjs';
import { validateAppleSource } from '../../targets/apple/apple-validation.mjs';
import { plistXml } from './apple-plist.mjs';

function requireValid(source) {
  const normalized = normalizeAppleSource(source);
  const validation = validateAppleSource(normalized);
  if (!validation.valid) {
    const message = validation.diagnostics
      .filter(item => item.severity === 'error')
      .map(item => `${item.path}: ${item.message}`)
      .join('; ');
    throw new Error(`Apple source validation failed: ${message}`);
  }
  return normalized;
}

function payloadFromSource(payload) {
  return {
    ...payload.Content,
    PayloadType: payload.PayloadType,
    PayloadIdentifier: payload.PayloadIdentifier,
    PayloadUUID: payload.PayloadUUID,
    PayloadVersion: payload.PayloadVersion ?? 1
  };
}

export function buildMobileconfigObject(source) {
  const normalized = requireValid(source);
  const profile = normalized.profile;
  return {
    PayloadContent: profile.payloads.map(payloadFromSource),
    PayloadDisplayName: profile.PayloadDisplayName,
    PayloadIdentifier: profile.PayloadIdentifier,
    PayloadType: 'Configuration',
    PayloadUUID: profile.PayloadUUID,
    PayloadVersion: 1,
    ...(profile.PayloadDescription !== undefined ? { PayloadDescription: profile.PayloadDescription } : {}),
    ...(profile.PayloadOrganization !== undefined ? { PayloadOrganization: profile.PayloadOrganization } : {}),
    ...(profile.PayloadRemovalDisallowed !== undefined ? { PayloadRemovalDisallowed: profile.PayloadRemovalDisallowed } : {}),
    ...(profile.TargetDeviceType !== undefined ? { TargetDeviceType: profile.TargetDeviceType } : {}),
    ...(profile.PayloadScope !== undefined ? { PayloadScope: profile.PayloadScope } : {})
  };
}

export function generateMobileconfig(source) {
  return plistXml(buildMobileconfigObject(source));
}

export function createProfileIds({ identifier = `com.network-configuration.apple.${randomUUID()}` } = {}) {
  return {
    PayloadIdentifier: identifier,
    PayloadUUID: randomUUID()
  };
}
