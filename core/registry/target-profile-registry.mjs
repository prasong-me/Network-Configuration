/**
 * Target Profile Registry Engine (Phase F Mechanism Layer)
 *
 * Phase F Gate Baseline:
 * - Target Profile Contract Shape: HOLD / PENDING NORMATIVE SOURCE.
 * - Registry Mechanism: APPROVED / BOUNDARY LOCKED.
 *
 * This registry is intentionally schema-independent. It stores an opaque
 * profile value under a caller-supplied targetId key and provides container
 * and lookup mechanics only.
 *
 * It does not define or validate Target Profile fields, capabilities,
 * constraints, mappings, versions, matching rules, default targets,
 * duplicate policy, compatibility policy, adapters, generators, or artifacts.
 *
 * Protected boundaries are not referenced or modified here:
 * - Apple Adapter
 * - DNS Runtime
 * - PR #15
 */

export class TargetProfileRegistry {
  constructor() {
    /** @type {Map<string, unknown>} */
    this._profiles = new Map();
  }

  /**
   * Stores an opaque profile value under the supplied targetId key.
   *
   * targetId is a registry lookup key only. This method does not assert that
   * targetId is a field of the stored profile or part of a Target Profile
   * Contract Shape.
   *
   * No duplicate policy is imposed; Map#set provides the container's ordinary
   * replacement behavior without elevating it to a normative policy.
   *
   * @param {string} targetId
   * @param {unknown} profile
   * @returns {void}
   */
  register(targetId, profile) {
    this._profiles.set(targetId, profile);
  }

  /**
   * Retrieves the opaque profile value for a targetId key.
   *
   * @param {string} targetId
   * @returns {unknown}
   */
  get(targetId) {
    return this._profiles.get(targetId);
  }

  /**
   * Checks whether a targetId key is registered.
   *
   * @param {string} targetId
   * @returns {boolean}
   */
  has(targetId) {
    return this._profiles.has(targetId);
  }

  /**
   * Lists registry entries without interpreting profile contents.
   *
   * @returns {Array<{ targetId: string, profile: unknown }>}
   */
  listAll() {
    return Array.from(this._profiles, ([targetId, profile]) => ({
      targetId,
      profile
    }));
  }

  /**
   * Returns the number of registered entries.
   *
   * @returns {number}
   */
  get size() {
    return this._profiles.size;
  }
}
