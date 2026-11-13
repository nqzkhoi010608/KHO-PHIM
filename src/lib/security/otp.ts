import { createHash, randomInt } from 'crypto';

export function createOtp() { return String(randomInt(100000, 1000000)); }
export function hashOtp(otp: string) { return createHash('sha256').update(otp).digest('hex'); }
export function otpExpiresAt(minutes = 5) { return new Date(Date.now() + minutes * 60_000); }

export function isOtpUsable(input: { expiresAt: Date; attempts: number; maxAttempts?: number; usedAt?: Date | null }) {
  return !input.usedAt && input.expiresAt.getTime() > Date.now() && input.attempts < (input.maxAttempts ?? 5);
}
