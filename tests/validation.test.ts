import { createEnquirySchema } from '../server/src/validators/enquiry.validator';
import { registerSchema } from '../server/src/validators/auth.validator';

export function runValidationTests() {
  console.log('🧪 [TEST SUITE] Request Schema & Indian Phone Validation');

  // Test 1: Valid Indian Mobile Numbers
  const validMobiles = ['9923835939', '7972131176', '9820123456', '8888888888', '6234567890'];
  for (const phone of validMobiles) {
    const res = createEnquirySchema.safeParse({
      fullName: 'Test User',
      mobileNumber: phone,
      email: 'user@test.com',
      city: 'Pune',
      category: 'TERM_INSURANCE',
      message: 'Need 1 Crore pure term cover for family.',
      consentGiven: true,
    });
    if (!res.success) {
      throw new Error(`Valid Indian phone ${phone} failed validation: ${JSON.stringify(res.error.format())}`);
    }
  }
  console.log('  ✅ Validated valid Indian 10-digit mobile numbers (starting with 6,7,8,9)');

  // Test 2: Invalid Phone Numbers
  const invalidMobiles = ['1234567890', '0992383593', '99238359', '992383593999', 'abcdefghij', '5551234567'];
  for (const phone of invalidMobiles) {
    const res = createEnquirySchema.safeParse({
      fullName: 'Test User',
      mobileNumber: phone,
      email: 'user@test.com',
      city: 'Pune',
      category: 'TERM_INSURANCE',
      message: 'Need 1 Crore pure term cover for family.',
      consentGiven: true,
    });
    if (res.success) {
      throw new Error(`Invalid phone ${phone} should have been rejected by schema!`);
    }
  }
  console.log('  ✅ Successfully rejected invalid mobile phone formats and foreign prefixes');

  // Test 3: Consent Checkbox Enforcement (DPDP Compliance)
  const consentMissing = createEnquirySchema.safeParse({
    fullName: 'Test User',
    mobileNumber: '9923835939',
    email: 'user@test.com',
    city: 'Pune',
    category: 'TERM_INSURANCE',
    message: 'Need 1 Crore pure term cover for family.',
    consentGiven: false as any,
  });
  if (consentMissing.success) {
    throw new Error('DPDP consent requirement must reject consentGiven=false');
  }
  console.log('  ✅ DPDP Compliance: Inquiries lacking explicit consent strictly rejected');

  console.log('🎉 All Validation Tests Passed!\n');
}
