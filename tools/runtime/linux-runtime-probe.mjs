#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const contractVersion = '2.1';

function run(name, command, args = []) {
  try {
    const output = execFileSync(command, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 10000,
    });
    return { name, status: 'AVAILABLE', output: output.trim().split('\n')[0] };
  } catch (error) {
    return { name, status: 'UNAVAILABLE', error: error?.message ?? String(error) };
  }
}

function diagnostic(code, message, impact, recovery) {
  return { code, message, source: 'linux-runtime-probe', impact, recovery };
}

const backendResults = [
  ['iproute2', 'ip', ['-V']],
  ['NetworkManager', 'nmcli', ['--version']],
  ['systemd-resolved', 'resolvectl', ['--version']],
  ['nftables', 'nft', ['--version']],
  ['WireGuard', 'wg', ['--version']],
  ['OpenVPN', 'openvpn', ['--version']],
].map(([name, command, args]) => run(name, command, args));

const tun = run('/dev/net/tun', 'test', ['-c', '/dev/net/tun']);
const interfaces = run('interfaces', 'ip', ['-brief', 'link']);
const routes = run('routes', 'ip', ['route', 'show']);
const rules = run('routing-policy', 'ip', ['rule', 'show']);
const dns = run('dns', 'resolvectl', ['status']);
const nft = run('nftables-runtime', 'nft', ['list', 'ruleset']);

const diagnostics = [];
for (const result of backendResults) {
  if (result.status !== 'AVAILABLE') {
    diagnostics.push(diagnostic(
      'MISSING_LINUX_BACKEND',
      `${result.name} backend is unavailable in the execution environment.`,
      'HIGH',
      `Install/provision the ${result.name} runtime backend and rerun the probe.`,
    ));
  }
}
if (tun.status !== 'AVAILABLE') {
  diagnostics.push(diagnostic(
    'MISSING_TUN',
    '/dev/net/tun is unavailable; VPN tunnel runtime cannot be verified.',
    'CRITICAL',
    'Provision /dev/net/tun with CAP_NET_ADMIN access and rerun the probe.',
  ));
}

const blocked = diagnostics.some((item) => item.impact === 'CRITICAL' || item.impact === 'HIGH');
const status = blocked ? 'BLOCKED' : 'SUCCESS';

const representation = {
  platform: 'linux',
  backends: backendResults,
  tun,
  interfaces,
  routes,
  routingPolicy: rules,
  dns,
  nftables: nft,
};

const checksum = createHash('sha256')
  .update(JSON.stringify(representation))
  .digest('hex');

const report = {
  status,
  representation,
  diagnostics,
  metadata: {
    contractVersion,
    timestamp: new Date().toISOString(),
    targetId: 'linux-runtime',
    checksum,
  },
};

if (!Object.hasOwn(report, 'representation')) {
  throw new Error('Contract violation: representation is missing');
}

process.stdout.write(JSON.stringify(report, null, 2) + '\n');
if (status === 'BLOCKED') process.exitCode = 2;
