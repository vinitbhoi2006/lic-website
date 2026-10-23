import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for LIC Insurance Advisory Services...');

  // 1. Clear existing seed data safely if any
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.consentRecord.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.enquiryStatusHistory.deleteMany();
  await prisma.enquiry.deleteMany();
  await prisma.insuranceProduct.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Default Admin & Customer Users
  const adminPasswordHash = await bcrypt.hash('AdminPassword@2026', 10);
  const customerPasswordHash = await bcrypt.hash('CustomerPassword@2026', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@licadvisory.in',
      name: 'Dnyaneshwar Yedu Bhoi',
      phone: '9923835939',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      isEmailVerified: true,
      isActive: true,
    },
  });

  const demoCustomer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: 'Rahul Sharma',
      phone: '9820123456',
      passwordHash: customerPasswordHash,
      role: 'CUSTOMER',
      isEmailVerified: true,
      isActive: true,
    },
  });

  console.log('✅ Created initial users: Admin & Demo Customer');

  // 3. Create Verified LIC Product Categories
  const verifiedProducts = [
    {
      slug: 'lic-digi-term',
      category: 'TERM_INSURANCE',
      title: 'LIC Digi Term / Yuva Term',
      tagline: 'Pure Financial Protection for Your Family at Affordable Rates',
      description: 'A non-linked, non-participating, individual pure risk premium life insurance plan that provides financial protection to the insured’s family in case of unfortunate demise during the policy term.',
      intendedAudience: 'Working professionals, breadwinners, young individuals seeking high sum assured coverage.',
      keyFeaturesJson: JSON.stringify([
        'Pure risk life cover with attractive high sum assured rebates',
        'Special lower premium rates for non-smokers and women',
        'Optional Accidental Death Benefit Rider available',
        'Flexible policy term options ranging up to 40 years',
        'Transparent tax benefits under prevailing Section 80C'
      ]),
      officialSourceUrl: 'https://licindia.in/web/guest/term-assurance-plans',
      lastVerifiedDate: new Date('2026-03-01'),
      isPublished: true,
      isDiscontinued: false,
    },
    {
      slug: 'lic-jeevan-umang',
      category: 'WHOLE_LIFE',
      title: 'LIC Jeevan Umang (Table 945)',
      tagline: '100 Years of Life Cover with 8% Guaranteed Annual Income',
      description: 'A non-linked, with-profits whole life assurance plan that offers annual survival benefits from the end of the premium paying term till age 99, along with a lump sum payment at maturity or death.',
      intendedAudience: 'Individuals seeking lifelong regular income post-premium term plus heritage estate planning.',
      keyFeaturesJson: JSON.stringify([
        'Annual survival benefit equal to 8% of Basic Sum Assured paid yearly',
        'Life cover continues up to 100 years of age',
        'Loan facility available after payment of 2 full years of premiums',
        'Simple Reversionary Bonuses and Final Additional Bonus on maturity/death'
      ]),
      officialSourceUrl: 'https://licindia.in/web/guest/whole-life-plans',
      lastVerifiedDate: new Date('2026-03-01'),
      isPublished: true,
      isDiscontinued: false,
    },
    {
      slug: 'lic-jeevan-labh',
      category: 'ENDOWMENT',
      title: 'LIC Jeevan Labh (Table 936)',
      tagline: 'Limited Premium Paying High Return Savings & Protection Plan',
      description: 'A limited premium paying, non-linked, with-profits endowment plan that provides financial support for the family in case of unfortunate demise of the policyholder before maturity and a handsome lump sum at maturity.',
      intendedAudience: 'Salaried and self-employed individuals targeting disciplined savings for medium to long-term goals.',
      keyFeaturesJson: JSON.stringify([
        'Pay premiums for fewer years than policy term (e.g., pay 16 years for 25-year term)',
        'Attractive bonus addition rates',
        'Choice of premium paying terms: 10, 15, or 16 years',
        'Riders available for disability, accidental death, and critical illness'
      ]),
      officialSourceUrl: 'https://licindia.in/web/guest/endowment-plans',
      lastVerifiedDate: new Date('2026-03-01'),
      isPublished: true,
      isDiscontinued: false,
    },
    {
      slug: 'lic-new-money-back-20-years',
      category: 'MONEY_BACK',
      title: 'LIC New Money Back Plan - 20 Years (Table 920)',
      tagline: 'Periodic Liquidity at Key Milestones with Full Death Benefit',
      description: 'A participating non-linked plan offering periodic survival benefits during the term along with full life protection against death throughout the policy term.',
      intendedAudience: 'Individuals who require planned cash inflows at 5th, 10th, and 15th policy years.',
      keyFeaturesJson: JSON.stringify([
        '20% of Basic Sum Assured paid at the end of 5th, 10th, and 15th year',
        'Balance 40% of Basic Sum Assured plus accrued bonuses paid at 20th year maturity',
        'Full Sum Assured paid on death irrespective of previously paid survival amounts'
      ]),
      officialSourceUrl: 'https://licindia.in/web/guest/money-back-plans',
      lastVerifiedDate: new Date('2026-03-01'),
      isPublished: true,
      isDiscontinued: false,
    },
    {
      slug: 'lic-amritbaal',
      category: 'CHILD_FOCUSED',
      title: 'LIC Amritbaal (Table 874)',
      tagline: 'Guaranteed Additions for Your Child’s Higher Education and Future',
      description: 'An individual, savings, life insurance plan specifically designed to build an attractive corpus for funding higher education and milestone needs of your child.',
      intendedAudience: 'Parents and grandparents planning for higher studies or marriage corpus of young children.',
      keyFeaturesJson: JSON.stringify([
        'Guaranteed Additions of ₹80 per thousand Basic Sum Assured at the end of each policy year',
        'Minimum entry age: 30 days; Maximum entry age: 13 years',
        'Flexible premium paying terms (Single, 5, 6, or 7 years)',
        'Option for settlement of maturity benefit in monthly/annual installments'
      ]),
      officialSourceUrl: 'https://licindia.in/web/guest/childrens-plans',
      lastVerifiedDate: new Date('2026-03-01'),
      isPublished: true,
      isDiscontinued: false,
    },
    {
      slug: 'lic-saral-pension',
      category: 'RETIREMENT_PENSION',
      title: 'LIC Saral Pension (Table 862)',
      tagline: 'Guaranteed Lifelong Annuity from Day One with 100% Return of Purchase Price',
      description: 'A standard immediate annuity plan offering guaranteed pension rates for life with full return of purchase price to nominees upon demise.',
      intendedAudience: 'Retirees, senior citizens, and VRS beneficiaries seeking risk-free monthly income.',
      keyFeaturesJson: JSON.stringify([
        'Single premium immediate annuity with guaranteed payout rates for life',
        'Choice of single life annuity or joint life annuity (for spouse)',
        '100% Return of Purchase Price (ROP) to nominees upon death',
        'Loan facility available after 6 months of policy commencement'
      ]),
      officialSourceUrl: 'https://licindia.in/web/guest/pension-plans',
      lastVerifiedDate: new Date('2026-03-01'),
      isPublished: true,
      isDiscontinued: false,
    },
    {
      slug: 'lic-siip-ulip',
      category: 'ULIP',
      title: 'LIC SIIP (Table 852)',
      tagline: 'Systematic Market-Linked Wealth Creation with Life Protection',
      description: 'A unit-linked, non-participating, regular premium individual life insurance plan that combines investment in capital markets with life insurance protection.',
      intendedAudience: 'Tech-savvy investors comfortable with market risks and seeking long-term capital appreciation.',
      keyFeaturesJson: JSON.stringify([
        'Guaranteed Additions added to fund value at specific durations',
        'Refund of Mortality Charges upon policy maturity',
        'Choice of 4 funds (Bond, Secured, Balanced, and Growth)',
        'Statutory Disclaimer: Market risk borne by policyholder'
      ]),
      officialSourceUrl: 'https://licindia.in/web/guest/unit-linked-plans',
      lastVerifiedDate: new Date('2026-03-01'),
      isPublished: true,
      isDiscontinued: false,
    },
    {
      slug: 'lic-group-term-insurance',
      category: 'GROUP_INSURANCE',
      title: 'LIC Group Term Insurance Scheme',
      tagline: 'Cost-Effective Life Protection for Employee Groups and Associations',
      description: 'Provides substantial life insurance cover to members of a group or employees at highly economical group rates, strengthening employee benefits and security.',
      intendedAudience: 'Corporate HRs, SMEs, cooperatives, and registered trade associations.',
      keyFeaturesJson: JSON.stringify([
        'Simple annual renewable term assurance for homogeneous groups',
        'Economical group premium rates deductible as business expenses',
        'Simple enrollment process with simplified health declarations',
        'Prompt claim settlement assistance managed through advisor office'
      ]),
      officialSourceUrl: 'https://licindia.in/web/guest/group-schemes',
      lastVerifiedDate: new Date('2026-03-01'),
      isPublished: true,
      isDiscontinued: false,
    },
  ];

  for (const product of verifiedProducts) {
    await prisma.insuranceProduct.create({ data: product });
  }

  console.log(`✅ Seeded ${verifiedProducts.length} verified LIC product categories`);

  // 4. Create Sample Enquiries
  const sampleEnquiry1 = await prisma.enquiry.create({
    data: {
      referenceNumber: 'LIC-ENQ-2026-00101',
      userId: demoCustomer.id,
      fullName: 'Rahul Sharma',
      mobileNumber: '9820123456',
      email: 'customer@example.com',
      city: 'Pune',
      category: 'TERM_INSURANCE',
      preferredTime: 'Evening (5 PM - 8 PM)',
      preferredLanguage: 'Marathi',
      message: 'I am 34 years old looking for a 1 Crore term cover for my family. Please guide on Digi Term vs Yuva Term eligibility.',
      status: 'CONSULTATION_SCHEDULED',
      internalNotes: 'Client contacted via phone on 10 Oct. Scheduled video consultation on Saturday 4 PM.',
      assignedTo: 'Dnyaneshwar Yedu Bhoi',
      consentGiven: true,
      consentVersion: 'v1.0-2026',
    },
  });

  const sampleEnquiry2 = await prisma.enquiry.create({
    data: {
      referenceNumber: 'LIC-ENQ-2026-00102',
      userId: null,
      fullName: 'Sunita Patil',
      mobileNumber: '9890123456',
      email: 'sunita.patil@outlook.com',
      city: 'Nashik',
      category: 'CHILD_FOCUSED',
      preferredTime: 'Morning (10 AM - 1 PM)',
      preferredLanguage: 'Marathi',
      message: 'Interested in LIC Amritbaal for my 4-year-old daughter. Want to understand guaranteed additions calculation.',
      status: 'NEW',
      internalNotes: 'Fresh lead from website contact form.',
      assignedTo: null,
      consentGiven: true,
      consentVersion: 'v1.0-2026',
    },
  });

  const sampleEnquiry3 = await prisma.enquiry.create({
    data: {
      referenceNumber: 'LIC-ENQ-2026-00103',
      userId: null,
      fullName: 'Vikramaditya Deshmukh',
      mobileNumber: '9765432100',
      email: 'vikram.deshmukh@gmail.com',
      city: 'Mumbai',
      category: 'WHOLE_LIFE',
      preferredTime: 'Afternoon (1 PM - 5 PM)',
      preferredLanguage: 'Hindi',
      message: 'Need advice on Jeevan Umang for pension planning post age 55.',
      status: 'FOLLOW_UP_REQUIRED',
      internalNotes: 'Initial call completed. Sent policy brochure. Need follow-up call on Monday regarding premium options.',
      assignedTo: 'Dnyaneshwar Yedu Bhoi',
      consentGiven: true,
      consentVersion: 'v1.0-2026',
    },
  });

  // Status History
  await prisma.enquiryStatusHistory.create({
    data: {
      enquiryId: sampleEnquiry1.id,
      fromStatus: 'NEW',
      toStatus: 'CONTACTED',
      changedBy: 'Dnyaneshwar Yedu Bhoi',
      note: 'Initial phone conversation completed. Verified client requirements.',
    },
  });
  await prisma.enquiryStatusHistory.create({
    data: {
      enquiryId: sampleEnquiry1.id,
      fromStatus: 'CONTACTED',
      toStatus: 'CONSULTATION_SCHEDULED',
      changedBy: 'Dnyaneshwar Yedu Bhoi',
      note: 'Consultation confirmed for weekend.',
    },
  });

  // Scheduled Consultation
  await prisma.consultation.create({
    data: {
      enquiryId: sampleEnquiry1.id,
      userId: demoCustomer.id,
      requestedTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // in 2 days
      mode: 'Phone',
      status: 'CONFIRMED',
      staffNotes: 'Review family income and outstanding home loan before call.',
    },
  });

  // Consent Records
  await prisma.consentRecord.create({
    data: {
      enquiryId: sampleEnquiry1.id,
      ipAddress: '127.0.0.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      consentText: 'I agree to be contacted by LIC Advisor Dnyaneshwar Yedu Bhoi for insurance guidance.',
      consentPurpose: 'Insurance Consultation Lead',
    },
  });

  // Initial Audit Log
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      actorName: 'System Bootstrap',
      action: 'SYSTEM_SEEDED',
      entityType: 'System',
      entityId: 'SEED-INITIAL',
      metadata: JSON.stringify({ note: 'Initial synthetic seed data populated successfully.' }),
    },
  });

  // Notification Log
  await prisma.notification.create({
    data: {
      recipient: 'licdybhoi@gmail.com',
      channel: 'EMAIL',
      templateName: 'NEW_ENQUIRY_ALERT',
      subject: 'New Insurance Enquiry Received: LIC-ENQ-2026-00101',
      body: 'Enquiry from Rahul Sharma for Term Insurance.',
      status: 'SIMULATED_DEV',
      providerRef: 'DEV-MOCK-LOG-001',
    },
  });

  console.log('✅ Created sample enquiries, consultations, consent records, and audit logs');
  console.log('🎉 Seeding successfully finished!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
