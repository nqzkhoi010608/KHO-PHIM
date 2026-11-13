import { describe, expect, it } from 'vitest';
import { createOtp, hashOtp, isOtpUsable, otpExpiresAt } from '../src/lib/security/otp';
import { can } from '../src/lib/security/roles';

describe('security contracts', () => {
  it('creates a six digit hashable OTP', () => {
    const otp = createOtp();
    expect(otp).toMatch(/^\d{6}$/);
    expect(hashOtp(otp)).not.toBe(otp);
  });

  it('expires and limits OTP usage', () => {
    expect(isOtpUsable({ expiresAt: otpExpiresAt(), attempts: 0 })).toBe(true);
    expect(isOtpUsable({ expiresAt: new Date(Date.now() - 1), attempts: 0 })).toBe(false);
    expect(isOtpUsable({ expiresAt: otpExpiresAt(), attempts: 5 })).toBe(false);
  });

  it('keeps role permissions narrow', () => {
    expect(can('viewer', 'movies:read')).toBe(true);
    expect(can('viewer', 'movies:write')).toBe(false);
    expect(can('super_admin', 'settings:write')).toBe(true);
  });
});
