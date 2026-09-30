/**
 * WireGuard protocol model helpers.
 *
 * Scope:
 * - Encodes only the evidence-backed WireGuard interface/peer semantics.
 * - Does not encode iOS, Android, Windows, macOS, or Linux client behavior.
 * - Does not implement wg-quick extensions such as Address, DNS, MTU, Table,
 *   hooks, or SaveConfig.
 * - Does not execute an adapter, serializer, or artifact generator.
 *
 * Secrets:
 * - privateKey / presharedKey values are accepted as opaque strings so callers
 *   can supply credentials at runtime.
 * - No real credentials belong in repository fixtures, evidence, or tests.
 */

const REQUIRED_INTERFACE_FIELDS = ['privateKey'];
const REQUIRED_PEER_FIELDS = ['publicKey', 'allowedIPs'];

const OPTIONAL_INTERFACE_FIELDS = ['listenPort'];
const OPTIONAL_PEER_FIELDS = ['presharedKey', 'endpoint', 'persistentKeepalive'];

const ALLOWED_INTERFACE_FIELDS = new Set([
  ...REQUIRED_INTERFACE_FIELDS,
  ...OPTIONAL_INTERFACE_FIELDS
]);

const ALLOWED_PEER_FIELDS = new Set([
  ...REQUIRED_PEER_FIELDS,
  ...OPTIONAL_PEER_FIELDS
]);

function isNonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString);
}

function isOptionalPort(value) {
  return value === undefined || (
    Number.isInteger(value) && value >= 0 && value <= 65535
  );
}

function isOptionalKeepalive(value) {
  return value === undefined || (
    Number.isInteger(value) && value >= 0
  );
}

/**
 * Validate the evidence-backed protocol model.
 *
 * @param {unknown} config
 * @returns {{valid: boolean, errors: Array<{path: string, code: string, message: string}>}}
 */
export function validateWireGuardModel(config) {
  const errors = [];

  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    return {
      valid: false,
      errors: [{
        path: '',
        code: 'INVALID_MODEL',
        message: 'WireGuard configuration must be an object.'
      }]
    };
  }

  const interfaceConfig = config.interface;
  if (!interfaceConfig || typeof interfaceConfig !== 'object' || Array.isArray(interfaceConfig)) {
    errors.push({
      path: 'interface',
      code: 'REQUIRED_FIELD',
      message: 'interface must be an object.'
    });
  } else {
    for (const field of REQUIRED_INTERFACE_FIELDS) {
      if (!isNonEmptyString(interfaceConfig[field])) {
        errors.push({
          path: `interface.${field}`,
          code: 'REQUIRED_FIELD',
          message: `${field} must be a non-empty string.`
        });
      }
    }

    if (!isOptionalPort(interfaceConfig.listenPort)) {
      errors.push({
        path: 'interface.listenPort',
        code: 'INVALID_VALUE',
        message: 'listenPort must be an integer from 0 through 65535 when provided.'
      });
    }

    for (const field of Object.keys(interfaceConfig)) {
      if (!ALLOWED_INTERFACE_FIELDS.has(field)) {
        errors.push({
          path: `interface.${field}`,
          code: 'UNSUPPORTED_FIELD',
          message: `Interface field "${field}" is outside the evidence-backed WireGuard protocol model.`
        });
      }
    }
  }

  if (!Array.isArray(config.peers)) {
    errors.push({
      path: 'peers',
      code: 'REQUIRED_FIELD',
      message: 'peers must be an array.'
    });
  } else {
    config.peers.forEach((peer, index) => {
      const base = `peers[${index}]`;

      if (!peer || typeof peer !== 'object' || Array.isArray(peer)) {
        errors.push({
          path: base,
          code: 'INVALID_MODEL',
          message: 'Each peer must be an object.'
        });
        return;
      }

      for (const field of REQUIRED_PEER_FIELDS) {
        const valid = field === 'allowedIPs'
          ? isStringArray(peer[field])
          : isNonEmptyString(peer[field]);

        if (!valid) {
          errors.push({
            path: `${base}.${field}`,
            code: 'REQUIRED_FIELD',
            message: field === 'allowedIPs'
              ? 'allowedIPs must be a non-empty array of strings.'
              : `${field} must be a non-empty string.`
          });
        }
      }

      if (peer.endpoint !== undefined && !isNonEmptyString(peer.endpoint)) {
        errors.push({
          path: `${base}.endpoint`,
          code: 'INVALID_VALUE',
          message: 'endpoint must be a non-empty string when provided.'
        });
      }

      if (peer.presharedKey !== undefined && !isNonEmptyString(peer.presharedKey)) {
        errors.push({
          path: `${base}.presharedKey`,
          code: 'INVALID_VALUE',
          message: 'presharedKey must be a non-empty string when provided.'
        });
      }

      if (!isOptionalKeepalive(peer.persistentKeepalive)) {
        errors.push({
          path: `${base}.persistentKeepalive`,
          code: 'INVALID_VALUE',
          message: 'persistentKeepalive must be a non-negative integer when provided.'
        });
      }

      for (const field of Object.keys(peer)) {
        if (!ALLOWED_PEER_FIELDS.has(field)) {
          errors.push({
            path: `${base}.${field}`,
            code: 'UNSUPPORTED_FIELD',
            message: `Peer field "${field}" is outside the evidence-backed WireGuard protocol model.`
          });
        }
      }
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Return a shallowly normalized copy after validation.
 * No defaults are invented and no target-specific fields are added.
 *
 * @param {unknown} config
 * @returns {object}
 * @throws {TypeError} when the protocol model is invalid
 */
export function normalizeWireGuardModel(config) {
  const validation = validateWireGuardModel(config);

  if (!validation.valid) {
    const error = new TypeError('Invalid WireGuard protocol model.');
    error.validation = validation;
    throw error;
  }

  return {
    interface: { ...config.interface },
    peers: config.peers.map((peer) => ({ ...peer }))
  };
}
