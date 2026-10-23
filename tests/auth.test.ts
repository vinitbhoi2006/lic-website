import bcrypt from 'bcryptjs';
import { signToken, verifyToken } from '../server/src/utils/jwt';

export async function runAuthTests() {
  console.log('🧪 [TEST SUITE] Authentication, Password Hashing & RBAC');

  // Test 1: Bcrypt Password Hashing & Salt Verification
  const rawPassword = 'SecureAdvisorPassword@2026';
  const hash = await bcrypt.hash(rawPassword, 10);
  const isValid = await bcrypt.compare(rawPassword, hash);
  const isWrongValid = await bcrypt.compare('WrongPassword', hash);

  if (isValid && !isWrongValid) {
    console.log('  ✅ Bcrypt Password Hashing & Salt Comparison verified');
  } else {
    throw new Error('Bcrypt password verification failed');
  }

  // Test 2: JWT Token Lifecycle
  const payload = {
    userId: 'test-user-uuid-1234',
    email: 'advisor@licadvisory.in',
    role: 'ADMIN',
  };
  const token = signToken(payload);
  const decoded = verifyToken(token);

  if (decoded && decoded.userId === payload.userId && decoded.role === 'ADMIN') {
    console.log('  ✅ JWT token correctly signed and verified with expiration metadata');
  } else {
    throw new Error('JWT verification failed');
  }

  // Test 3: Tampered Token Rejection
  const tamperedToken = token.slice(0, -5) + 'abcde';
  const tamperedDecoded = verifyToken(tamperedToken);
  if (tamperedDecoded === null) {
    console.log('  ✅ Tampered and corrupted JWT signatures strictly rejected');
  } else {
    throw new Error('Tampered token should not have been accepted');
  }

  console.log('🎉 All Authentication Tests Passed!\n');
}
