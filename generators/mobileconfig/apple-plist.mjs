function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function key(value) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new TypeError('plist dictionary keys must be non-empty strings');
  }
  return `<key>${escapeXml(value)}</key>`;
}

function render(value, depth = 0) {
  if (value === null || value === undefined) {
    throw new TypeError('null/undefined are not valid plist values');
  }
  if (typeof value === 'string') return `<string>${escapeXml(value)}</string>`;
  if (typeof value === 'boolean') return value ? '<true/>' : '<false/>';
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new TypeError('plist numbers must be finite');
    return Number.isInteger(value) ? `<integer>${value}</integer>` : `<real>${value}</real>`;
  }
  if (value instanceof Date) return `<date>${value.toISOString()}</date>`;
  if (value instanceof Uint8Array) {
    return `<data>\n${Buffer.from(value).toString('base64')}\n</data>`;
  }
  if (Array.isArray(value)) {
    return `<array>\n${value.map(item => '  '.repeat(depth + 1) + render(item, depth + 1)).join('\n')}\n${'  '.repeat(depth)}</array>`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    return `<dict>\n${entries.map(([k, v]) => '  '.repeat(depth + 1) + key(k) + render(v, depth + 1)).join('\n')}\n${'  '.repeat(depth)}</dict>`;
  }
  throw new TypeError(`Unsupported plist value type: ${typeof value}`);
}

export function plistXml(value) {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    render(value),
    '</plist>',
    ''
  ].join('\n');
}
