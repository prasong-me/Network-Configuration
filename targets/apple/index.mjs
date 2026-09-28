export {
  APPLE_PLATFORMS,
  APPLE_OUTPUTS,
  normalizeAppleSource
} from './apple-model.mjs';

export {
  validateAppleSource,
  assertAppleOutput
} from './apple-validation.mjs';

export {
  buildMobileconfigObject,
  generateMobileconfig,
  createProfileIds
} from '../../generators/mobileconfig/apple-mobileconfig.mjs';

export {
  generateDeclarationsJson,
  generateDeclarationsProfile
} from '../../generators/mobileconfig/apple-declarations.mjs';

export {
  generateMdmCommand,
  generateApplicationConfigurationCommand
} from '../../generators/mobileconfig/apple-mdm-command.mjs';
