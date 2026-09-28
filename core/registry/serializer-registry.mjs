/**
 * Serializer Registry Engine (Mechanism Layer)
 *
 * Normative source: core/contracts/contract-v2.1.d.ts
 * Validator: validators/contract-validator.mjs
 *
 * This component stores SerializerRegistryEntry metadata/references only.
 * It does not execute serializers, generators, adapters, or artifact creation.
 */

import { validateSerializerEntry } from '../../validators/contract-validator.mjs';

export class SerializerRegistry {
  constructor() {
    /** @type {Map<string, Object>} */
    this._entries = new Map();
  }

  /**
   * Registers a SerializerRegistryEntry after Contract v2.1 shape validation.
   *
   * Duplicate policy is intentionally unconstrained because it is outside
   * the frozen Contract v2.1 baseline.
   *
   * @param {Object} entry
   * @returns {{ success: boolean, diagnostics: Array }}
   */
  register(entry) {
    const validation = validateSerializerEntry(entry);

    if (!validation.valid) {
      return {
        success: false,
        diagnostics: validation.diagnostics
      };
    }

    this._entries.set(entry.serializerId, entry);

    return {
      success: true,
      diagnostics: []
    };
  }

  /**
   * Retrieves a registered entry by serializerId.
   *
   * @param {string} serializerId
   * @returns {Object|undefined}
   */
  get(serializerId) {
    return this._entries.get(serializerId);
  }

  /**
   * Checks whether a serializerId is registered.
   *
   * @param {string} serializerId
   * @returns {boolean}
   */
  has(serializerId) {
    return this._entries.has(serializerId);
  }

  /**
   * Retrieves registered serializers for an output format.
   *
   * includeDeprecated is an API mechanism helper, not a Contract v2.1 rule.
   *
   * @param {string} format
   * @param {{ includeDeprecated?: boolean }} [options]
   * @returns {Array}
   */
  getByFormat(format, options = { includeDeprecated: true }) {
    const results = [];
    const includeDeprecated = options?.includeDeprecated ?? true;

    for (const entry of this._entries.values()) {
      if (entry.format === format && (includeDeprecated || !entry.isDeprecated)) {
        results.push(entry);
      }
    }

    return results;
  }

  /**
   * Lists all registered entries.
   *
   * @returns {Array}
   */
  listAll() {
    return Array.from(this._entries.values());
  }

  /**
   * Returns the current number of registered entries.
   *
   * @returns {number}
   */
  get size() {
    return this._entries.size;
  }
}
