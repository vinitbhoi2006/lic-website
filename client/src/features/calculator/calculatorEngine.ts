export interface CalculatorInputs {
  age: number;
  annualIncome: number;
  existingCover: number;
  dependents: number;
  outstandingLoans: number;
  estimatedAnnualExpenses: number;
  protectionPeriodYears: number;
}

export interface CalculatorOutputs {
  estimatedCoverNeeded: number;
  incomeReplacementCover: number;
  liabilitiesCover: number;
  dependentsBuffer: number;
  existingCoverDeducted: number;
  netProtectionGap: number;
  humanLifeValueEstimate: number;
  expenseProtectionEstimate: number;
  assumptions: string[];
  explanation: string;
  discussionPoints: string[];
}

export function calculateInsuranceNeeds(inputs: CalculatorInputs): CalculatorOutputs {
  const age = Math.max(18, Math.min(75, inputs.age || 30));
  const annualIncome = Math.max(0, inputs.annualIncome || 0);
  const existingCover = Math.max(0, inputs.existingCover || 0);
  const dependents = Math.max(0, inputs.dependents || 0);
  const outstandingLoans = Math.max(0, inputs.outstandingLoans || 0);
  const annualExpenses = Math.max(0, inputs.estimatedAnnualExpenses || 0);
  const protectionYears = Math.max(5, Math.min(45, inputs.protectionPeriodYears || 20));

  // Method 1: Needs-Based Approach
  // Protection of family living expenses over desired horizon (discounted real rate roughly 5%)
  // Plus debt payoff + dependent education/marriage buffer
  const dependentEducationBuffer = dependents * 1000000; // Illustrative ₹10 Lakh per dependent for milestone education
  const totalExpenseReplacement = annualExpenses * protectionYears * 0.75; // Assuming 75% expenditure replacement
  const totalNeeds = totalExpenseReplacement + outstandingLoans + dependentEducationBuffer;

  // Method 2: Human Life Value (HLV) approximation
  // HLV = Annual Income * working years remaining * dependency factor (70%)
  const workingYearsRemaining = Math.max(5, Math.min(35, 60 - age));
  const hlvMultiplier = Math.min(25, workingYearsRemaining * 0.7);
  const hlvEstimate = annualIncome * hlvMultiplier;

  // Blended recommended cover (weighted between needs and HLV)
  const grossRecommended = Math.max(totalNeeds, hlvEstimate * 0.85);

  // Net Protection Gap after deducting existing active life cover
  const netProtectionGap = Math.max(0, grossRecommended - existingCover);

  // Round to nearest ₹50,000 for clean financial figures
  const roundedNetCover = Math.ceil(netProtectionGap / 50000) * 50000;

  return {
    estimatedCoverNeeded: roundedNetCover,
    incomeReplacementCover: Math.round(totalExpenseReplacement),
    liabilitiesCover: Math.round(outstandingLoans),
    dependentsBuffer: Math.round(dependentEducationBuffer),
    existingCoverDeducted: Math.round(existingCover),
    netProtectionGap: Math.round(netProtectionGap),
    humanLifeValueEstimate: Math.round(hlvEstimate),
    expenseProtectionEstimate: Math.round(totalNeeds),
    assumptions: [
      'Educational illustrative model based on standard expense replacement and Human Life Value (HLV) guidelines.',
      'Assumes a working retirement age of 60 years and realistic cost-of-living continuity for dependents.',
      'Includes an illustrative allocation of ₹10,00,000 per dependent for education and life milestones.',
      'Existing active term and life policies are deducted from the gross liability to avoid double-insuring.',
    ],
    explanation:
      'This calculation balances two established actuarial principles: replacing family living expenses throughout your protection horizon, and liquidating existing debts (such as home loans) so your dependents do not inherit financial liabilities.',
    discussionPoints: [
      'Compare Pure Term Insurance (e.g., LIC Digi Term / Yuva Term) for high cost-effective sum assured.',
      'Explore combining Term Assurance with guaranteed savings (e.g., LIC Jeevan Labh or Amritbaal for child education).',
      'Discuss Accidental Death and Disability Riders to protect income during unforeseen health events.',
      'Plan regular policy reviews every 3 to 5 years as income increases or new loans are undertaken.',
    ],
  };
}
