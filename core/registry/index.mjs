/**
 * Core Registry Public API
 *
 * Centralized public export surface for registry mechanisms.
 *
 * Normative boundary:
 * - Registry implementations remain mechanism layers.
 * - Contract v2.1 remains the authoritative shape/invariant source.
 * - No registry policy or Contract v2.1 field is introduced here.
 */

export { SerializerRegistry } from './serializer-registry.mjs';
export { TargetProfileRegistry } from './target-profile-registry.mjs';
