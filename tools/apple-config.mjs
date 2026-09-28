#!/usr/bin/env node
import fs from 'node:fs/promises';
import process from 'node:process';

import {
  validateAppleSource,
  generateMobileconfig,
  generateDeclarationsJson,
  generateDeclarationsProfile,
  generateMdmCommand
} from '../targets/apple/index.mjs';

const [, , command, inputPath, outputPath, extra] = process.argv;

if (!command || !inputPath) {
  console.error('Usage: node tools/apple-config.mjs <validate|mobileconfig|declarations|declarations-profile|mdm-command> <source.json> [output] [index]');
  process.exit(2);
}

const source = JSON.parse(await fs.readFile(inputPath, 'utf8'));

if (command === 'validate') {
  const result = validateAppleSource(source);
  console.log(JSON.stringify(result, null, 2));
  process.exit(result.valid ? 0 : 1);
}

const generators = {
  mobileconfig: () => generateMobileconfig(source),
  declarations: () => generateDeclarationsJson(source),
  'declarations-profile': () => generateDeclarationsProfile(source),
  'mdm-command': () => generateMdmCommand(source, Number(extra ?? 0))
};

if (!generators[command]) {
  console.error(`Unknown command: ${command}`);
  process.exit(2);
}

const output = generators[command]();
if (outputPath) await fs.writeFile(outputPath, output);
else process.stdout.write(output);
