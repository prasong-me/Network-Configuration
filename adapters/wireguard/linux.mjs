/**
 * WireGuard linux target adapter boundary.
 *
 * This is an implementation-safe scaffold only.
 * Target Profile Contract Shape is still HOLD, so no platform capability is
 * asserted here. Unknown mappings fail closed instead of being guessed.
 */

export const targetId = 'linux';

export function adaptWireGuardForTarget(_config) {
  return {
    targetId,
    supported: false,
    diagnostic: {
      code: 'UNSUPPORTED_CAPABILITY',
      targetId,
      reason: 'TARGET_PROFILE_CONTRACT_SHAPE_HOLD'
    }
  };
}
