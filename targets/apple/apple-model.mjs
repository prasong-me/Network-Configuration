/**
 * Apple Configuration Source Model
 *
 * Canonical source format for Apple platform configuration generation.
 * This layer intentionally does not invent Apple payload keys: payload content
 * is passed through after common envelope validation and can be backed by
 * evidence from Apple's Device Management documentation.
 */

export const APPLE_PLATFORMS = new Set([
  'ios', 'ipados', 'macos', 'tvos', 'visionos', 'watchos'
]);

export const APPLE_OUTPUTS = new Set([
  'mobileconfig',
  'declarations',
  'mdm-command'
]);

export function normalizeAppleSource(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('Apple source must be an object');
  }

  const source = structuredClone(input);
  source.schemaVersion ??= 'apple-source.v1';
  source.target ??= 'apple';
  source.platforms ??= ['ios', 'ipados'];

  if (source.target !== 'apple') {
    throw new Error('target must be "apple"');
  }
  if (!Array.isArray(source.platforms) || source.platforms.length === 0) {
    throw new TypeError('platforms must be a non-empty array');
  }
  for (const platform of source.platforms) {
    if (!APPLE_PLATFORMS.has(platform)) {
      throw new Error(`Unsupported Apple platform: ${platform}`);
    }
  }

  source.profile ??= {};
  source.profile.payloads ??= [];
  source.declarations ??= [];
  source.mdmCommands ??= [];

  if (!Array.isArray(source.profile.payloads)) {
    throw new TypeError('profile.payloads must be an array');
  }
  if (!Array.isArray(source.declarations)) {
    throw new TypeError('declarations must be an array');
  }
  if (!Array.isArray(source.mdmCommands)) {
    throw new TypeError('mdmCommands must be an array');
  }

  return source;
}
