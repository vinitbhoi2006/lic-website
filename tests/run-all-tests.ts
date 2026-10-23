import { runCalculatorTests } from './calculator.test';
import { runValidationTests } from './validation.test';
import { runAuthTests } from './auth.test';
import { runIntegrationTests } from './integration.test';

async function runAll() {
  console.log('===============================================================');
  console.log('🚀 RUNNING COMPREHENSIVE AUTOMATED TEST SUITE: LIC ADVISORY PORTAL');
  console.log('===============================================================\n');

  try {
    runCalculatorTests();
    runValidationTests();
    await runAuthTests();
    await runIntegrationTests();

    console.log('===============================================================');
    console.log('🌟 ALL 4 TEST SUITES PASSED FLAWLESSLY (100% SUCCESS RATE)!');
    console.log('===============================================================');
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ A test failed:', error.message);
    process.exit(1);
  }
}

runAll();
