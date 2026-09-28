#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const result = spawnSync(
  process.execPath,
  ['--test', 'tests/unit/core-model.test.mjs'],
  { stdio: 'inherit' }
);

process.exit(result.status ?? 1);
