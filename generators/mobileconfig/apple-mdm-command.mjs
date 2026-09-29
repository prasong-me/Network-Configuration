import { randomUUID } from 'node:crypto';
import { normalizeAppleSource, APPLE_OUTPUTS } from '../../targets/apple/apple-model.mjs';
import { plistXml } from './apple-plist.mjs';

export function generateMdmCommand(source, index = 0) {
  const normalized = normalizeAppleSource(source);
  if (!Array.isArray(normalized.mdmCommands) || !normalized.mdmCommands[index]) {
    throw new Error(`mdmCommands[${index}] not found`);
  }

  const command = normalized.mdmCommands[index];
  const body = {
    CommandUUID: command.CommandUUID ?? randomUUID(),
    Command: {
      RequestType: command.RequestType,
      ...command.Command
    }
  };

  return plistXml(body);
}

export function generateApplicationConfigurationCommand({
  bundleIdentifier,
  configuration,
  commandUUID = randomUUID()
}) {
  if (typeof bundleIdentifier !== 'string' || !bundleIdentifier) throw new TypeError('bundleIdentifier is required');
  if (!configuration || typeof configuration !== 'object' || Array.isArray(configuration)) {
    throw new TypeError('configuration must be a dictionary');
  }

  return plistXml({
    CommandUUID: commandUUID,
    Command: {
      RequestType: 'Settings',
      Settings: [{
        Item: 'ApplicationConfiguration',
        Identifier: bundleIdentifier,
        Configuration: configuration
      }]
    }
  });
}

export { APPLE_OUTPUTS };
