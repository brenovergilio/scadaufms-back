import { isIPv4 } from 'net';

export function isValidIPv4(ip: string): boolean {
  return isIPv4(ip);
}
