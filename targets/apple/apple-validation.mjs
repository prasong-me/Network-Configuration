import { APPLE_OUTPUTS, APPLE_PLATFORMS } from './apple-model.mjs';

const REQUIRED_PROFILE_KEYS = [
  'PayloadDisplayName',
  'PayloadIdentifier',
  'PayloadType',
  'PayloadUUID',
  'PayloadVersion'
];

export function validateAppleSource(source) {
  const diagnostics = [];
  const error = (path, message) => diagnostics.push({ severity: 'error', path, message });
  const warning = (path, message) => diagnostics.push({ severity: 'warning', path, message });

  if (!source || source.target !== 'apple') {
    error('target', 'target must be "apple"');
    return { valid: false, diagnostics };
  }

  if (!Array.isArray(source.platforms) || source.platforms.length === 0) {
    error('platforms', 'at least one Apple platform is required');
  } else {
    for (const platform of source.platforms) {
      if (!APPLE_PLATFORMS.has(platform)) error('platforms', `unsupported platform: ${platform}`);
    }
  }

  const profile = source.profile ?? {};
  const profilePayloads = profile.payloads ?? [];

  for (const key of REQUIRED_PROFILE_KEYS) {
    if (profile[key] === undefined) error(`profile.${key}`, 'required');
  }

  if (profile.PayloadType !== undefined && profile.PayloadType !== 'Configuration') {
    error('profile.PayloadType', 'must be "Configuration"');
  }
  if (profile.PayloadVersion !== undefined && profile.PayloadVersion !== 1) {
    error('profile.PayloadVersion', 'must be 1');
  }

  if (!Array.isArray(profilePayloads)) {
    error('profile.payloads', 'must be an array');
  } else {
    profilePayloads.forEach((payload, index) => {
      const p = `profile.payloads[${index}]`;
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
        error(p, 'must be an object');
        return;
      }
      for (const key of ['PayloadType', 'PayloadIdentifier', 'PayloadUUID', 'PayloadVersion']) {
        if (payload[key] === undefined) error(`${p}.${key}`, 'required');
      }
      if (payload.PayloadVersion !== undefined && payload.PayloadVersion !== 1) {
        error(`${p}.PayloadVersion`, 'must be 1');
      }
      if (payload.PayloadType === 'Configuration') {
        error(`${p}.PayloadType`, 'nested payload cannot use Configuration');
      }
      if (payload.Content !== undefined && (typeof payload.Content !== 'object' || payload.Content === null || Array.isArray(payload.Content))) {
        error(`${p}.Content`, 'must be a dictionary');
      }
    });
  }

  for (const [index, declaration] of (source.declarations ?? []).entries()) {
    const p = `declarations[${index}]`;
    if (!declaration || typeof declaration !== 'object' || Array.isArray(declaration)) {
      error(p, 'must be an object');
      continue;
    }
    for (const key of ['Type', 'Identifier', 'Payload']) {
      if (declaration[key] === undefined) error(`${p}.${key}`, 'required');
    }
    if (typeof declaration.Type === 'string' && !declaration.Type.startsWith('com.apple.')) {
      warning(`${p}.Type`, 'non-Apple declaration type; verify target ownership/evidence');
    }
  }

  for (const [index, command] of (source.mdmCommands ?? []).entries()) {
    const p = `mdmCommands[${index}]`;
    if (!command || typeof command !== 'object' || Array.isArray(command)) {
      error(p, 'must be an object');
      continue;
    }
    if (typeof command.RequestType !== 'string') error(`${p}.RequestType`, 'required');
    if (command.CommandUUID !== undefined && typeof command.CommandUUID !== 'string') {
      error(`${p}.CommandUUID`, 'must be a string');
    }
  }

  return {
    valid: !diagnostics.some(item => item.severity === 'error'),
    diagnostics
  };
}

export function assertAppleOutput(output) {
  if (!APPLE_OUTPUTS.has(output)) throw new Error(`Unsupported Apple output: ${output}`);
  return true;
}
