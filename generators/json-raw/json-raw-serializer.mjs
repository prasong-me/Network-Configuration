/**
 * JSON_RAW serializer.
 *
 * This is a target-neutral serialization utility. It does not select targets,
 * infer capabilities, mutate configuration semantics, or execute adapters.
 */

/**
 * Serialize an already-normalized representation as JSON_RAW.
 *
 * @param {unknown} representation
 * @returns {string}
 */
export function serializeJsonRaw(representation) {
  const serialized = JSON.stringify(representation, null, 2);

  if (serialized === undefined) {
    throw new TypeError('JSON_RAW serialization requires a JSON-serializable value');
  }

  return serialized + '\\n';
}
