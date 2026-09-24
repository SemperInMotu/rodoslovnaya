export const BEL_ORIGIN = 'https://xn--80adf2alcbbnn3n.xn--90ais';
export const COM_ORIGIN = 'https://heritavia.com';

const BEL_HOSTS = new Set([
  'xn--80adf2alcbbnn3n.xn--90ais',
  'родословная.бел',
  'localhost',
  '127.0.0.1',
]);

export function hostnameOf(host) {
  return (host || '').split(':')[0].toLowerCase();
}

export function isBelHost(host) {
  return BEL_HOSTS.has(hostnameOf(host));
}
