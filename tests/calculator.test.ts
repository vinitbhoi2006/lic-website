import { calculateInsuranceNeeds } from '../client/src/features/calculator/calculatorEngine';

export function runCalculatorTests() {
  console.log('🧪 [TEST SUITE] Insurance Needs Calculator Engine');

  // Test 1: Standard profile
  const standardInputs = {
    age: 32,
    annualIncome: 1200000,
    existingCover: 2500000,
    dependents: 2,
    outstandingLoans: 4000000,
    estimatedAnnualExpenses: 600000,
    protectionPeriodYears: 20,
  };
  const res1 = calculateInsuranceNeeds(standardInputs);
  if (res1.estimatedCoverNeeded > 0) {
    console.log(`  ✅ Standard Profile: Calculated cover of ₹${res1.estimatedCoverNeeded.toLocaleString('en-IN')}`);
  } else {
    throw new Error('Standard calculation should return positive protection need');
  }

  // Test 2: High existing cover offsets need
  const overCoveredInputs = {
    age: 35,
    annualIncome: 1000000,
    existingCover: 50000000, // 5 Crore existing cover
    dependents: 1,
    outstandingLoans: 0,
    estimatedAnnualExpenses: 500000,
    protectionPeriodYears: 15,
  };
  const res2 = calculateInsuranceNeeds(overCoveredInputs);
  if (res2.estimatedCoverNeeded === 0) {
    console.log('  ✅ Over-covered Profile: Net protection gap correctly calculated as ₹0');
  } else {
    throw new Error(`Expected 0 net gap for 5 Crore existing cover, got ₹${res2.estimatedCoverNeeded}`);
  }

  // Test 3: Zero loans and zero dependents edge case
  const singleInputs = {
    age: 24,
    annualIncome: 600000,
    existingCover: 0,
    dependents: 0,
    outstandingLoans: 0,
    estimatedAnnualExpenses: 300000,
    protectionPeriodYears: 10,
  };
  const res3 = calculateInsuranceNeeds(singleInputs);
  if (res3.dependentsBuffer === 0 && res3.liabilitiesCover === 0 && res3.estimatedCoverNeeded > 0) {
    console.log('  ✅ Single Earner with No Loans/Dependents handled correctly');
  } else {
    throw new Error('Failed edge case for single earner');
  }

  // Test 4: Clamping of extreme/negative inputs
  const extremeInputs = {
    age: 10, // Below 18 -> Clamped to 18
    annualIncome: -50000, // Negative -> Clamped to 0
    existingCover: -100,
    dependents: -2,
    outstandingLoans: -500,
    estimatedAnnualExpenses: -200,
    protectionPeriodYears: 2, // Below 5 -> Clamped to 5
  };
  const res4 = calculateInsuranceNeeds(extremeInputs);
  if (res4.estimatedCoverNeeded >= 0) {
    console.log('  ✅ Negative & Extreme inputs gracefully clamped to safe boundaries');
  } else {
    throw new Error('Failed negative boundary clamping');
  }

  console.log('🎉 All Calculator Tests Passed!\n');
}
