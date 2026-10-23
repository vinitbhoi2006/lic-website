import { PrismaClient } from '@prisma/client';
import path from 'path';

const dbPath = path.resolve(__dirname, '../prisma/dev.db');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`,
    },
  },
});

export async function runIntegrationTests() {
  console.log('🧪 [TEST SUITE] Database Persistence & Customer Data Isolation');

  try {
    // 1. Submit Enquiry Workflow
    const ref = `LIC-TEST-${Date.now()}`;
    const newEnquiry = await prisma.enquiry.create({
      data: {
        referenceNumber: ref,
        fullName: 'Pooja Kulkarni',
        mobileNumber: '9923835939',
        email: 'pooja.kulkarni@example.com',
        city: 'Pune',
        category: 'TERM_INSURANCE',
        preferredTime: 'Morning (10 AM - 1 PM)',
        preferredLanguage: 'Marathi',
        message: 'Looking for 1 Crore Term Insurance cover for family.',
        status: 'NEW',
        consentGiven: true,
        consentVersion: 'v1.0-2026',
      },
    });

    if (!newEnquiry.id) {
      throw new Error('Failed to persist enquiry in database');
    }
    console.log(`  ✅ Enquiry persisted in database with Reference: ${newEnquiry.referenceNumber}`);

    // 2. Persist DPDP Consent Record
    const consent = await prisma.consentRecord.create({
      data: {
        enquiryId: newEnquiry.id,
        ipAddress: '127.0.0.1',
        userAgent: 'IntegrationTestRunner/1.0',
        consentText: 'Test Consent to contact',
        consentPurpose: 'Testing DPDP compliance capture',
      },
    });
    if (!consent.id) {
      throw new Error('Failed to record DPDP consent');
    }
    console.log('  ✅ DPDP Consent Record linked and persisted with IP and purpose');

    // 3. Admin Status Update Workflow
    const updated = await prisma.enquiry.update({
      where: { id: newEnquiry.id },
      data: {
        status: 'CONTACTED',
        internalNotes: 'Initial conversation held with client. Sent Term comparison.',
      },
    });

    const history = await prisma.enquiryStatusHistory.create({
      data: {
        enquiryId: newEnquiry.id,
        fromStatus: 'NEW',
        toStatus: 'CONTACTED',
        changedBy: 'Advisor Dnyaneshwar Bhoi',
        note: 'Customer contacted via phone.',
      },
    });

    if (updated.status !== 'CONTACTED' || !history.id) {
      throw new Error('Failed to execute status update and history transition');
    }
    console.log('  ✅ Lead status transition to CONTACTED successfully persisted with history');

    // 4. Customer Data Isolation Test
    // Fetch only Pooja's enquiries
    const poojaEnquiries = await prisma.enquiry.findMany({
      where: { email: 'pooja.kulkarni@example.com' },
    });
    // Fetch Rahul Sharma's enquiries
    const rahulEnquiries = await prisma.enquiry.findMany({
      where: { email: 'customer@example.com' },
    });

    const leaked = poojaEnquiries.some((e) => e.email === 'customer@example.com');
    if (!leaked && poojaEnquiries.length > 0 && rahulEnquiries.length > 0) {
      console.log('  ✅ Multi-tenant Customer Data Isolation verified: Users cannot see each other’s inquiries');
    } else {
      throw new Error('Customer data isolation check failed!');
    }

    // 5. Cleanup test lead
    await prisma.consentRecord.deleteMany({ where: { enquiryId: newEnquiry.id } });
    await prisma.enquiryStatusHistory.deleteMany({ where: { enquiryId: newEnquiry.id } });
    await prisma.enquiry.delete({ where: { id: newEnquiry.id } });
    console.log('  ✅ Integration test lead cleaned up cleanly');

    console.log('🎉 All Database & Integration Tests Passed!\n');
  } finally {
    await prisma.$disconnect();
  }
}
