import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { prisma } from '../config/db';
import { logger } from '../utils/logger';

interface SendNotificationOptions {
  recipient: string;
  templateName: string;
  subject: string;
  body: string;
  channel?: 'EMAIL' | 'WHATSAPP';
}

export class NotificationService {
  private static transporter: nodemailer.Transporter | null = null;

  private static getTransporter() {
    if (!this.transporter && env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_PORT === 465,
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
    }
    return this.transporter;
  }

  public static async send(options: SendNotificationOptions) {
    const channel = options.channel || 'EMAIL';
    const transporter = this.getTransporter();

    // Persist notification log
    const notification = await prisma.notification.create({
      data: {
        recipient: options.recipient,
        channel,
        templateName: options.templateName,
        subject: options.subject,
        body: options.body,
        status: 'PENDING',
      },
    });

    // If real email credentials are not configured, log simulated email safely
    if (!transporter) {
      logger.info('📧 [DEV NOTIFICATION SIMULATION] SMTP not configured. Simulating delivery:', {
        to: options.recipient,
        subject: options.subject,
        template: options.templateName,
      });

      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          status: 'SIMULATED_DEV',
          providerRef: `DEV-SIMULATED-${Date.now()}`,
        },
      });

      return {
        success: true,
        delivered: false,
        isSimulated: true,
        message: 'Notification logged in development mode. Configure SMTP credentials for live delivery.',
      };
    }

    try {
      const info = await transporter.sendMail({
        from: env.SMTP_FROM,
        to: options.recipient,
        subject: options.subject,
        html: options.body,
      });

      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          status: 'SENT',
          providerRef: info.messageId,
        },
      });

      logger.info(`✅ Email dispatched successfully to ${options.recipient}`, { messageId: info.messageId });
      return { success: true, delivered: true, isSimulated: false, messageId: info.messageId };
    } catch (err: any) {
      logger.error(`❌ Failed to send email to ${options.recipient}`, { error: err.message });

      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          status: 'FAILED',
          errorMessage: err.message,
          retryCount: { increment: 1 },
        },
      });

      return { success: false, delivered: false, error: err.message };
    }
  }

  public static async notifyAdvisorOfNewEnquiry(enquiry: any) {
    const subject = `🔔 [New Enquiry] ${enquiry.referenceNumber} - ${enquiry.fullName} (${enquiry.category})`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
        <h2 style="color: #102A43; margin-top: 0;">New Insurance Advisory Enquiry</h2>
        <p>A new customer inquiry has been received through the LIC Advisory Portal.</p>
        <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 16px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 140px;">Ref Number:</td><td>${enquiry.referenceNumber}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Full Name:</td><td>${enquiry.fullName}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Mobile:</td><td>${enquiry.mobileNumber}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td>${enquiry.email}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">City:</td><td>${enquiry.city}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Category:</td><td>${enquiry.category}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Preferred Time:</td><td>${enquiry.preferredTime || 'Anytime'}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Preferred Lang:</td><td>${enquiry.preferredLanguage || 'English'}</td></tr>
        </table>
        <h4 style="margin-top: 16px; margin-bottom: 8px;">Customer Message:</h4>
        <div style="background-color: #F8FAFC; padding: 12px; border-left: 4px solid #174EA6; border-radius: 4px;">
          ${enquiry.message}
        </div>
        <p style="margin-top: 20px; font-size: 13px; color: #64748B;">
          Advisor: Dnyaneshwar Yedu Bhoi | Phone: 9923835939 / 7972131176
        </p>
      </div>
    `;

    return this.send({
      recipient: env.ADVISOR_EMAIL,
      templateName: 'NEW_ENQUIRY_ADVISOR_NOTIFICATION',
      subject,
      body,
    });
  }

  public static async sendEnquiryAcknowledgement(enquiry: any) {
    const subject = `Acknowledgement: We have received your LIC inquiry (${enquiry.referenceNumber})`;
    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
        <h2 style="color: #174EA6; margin-top: 0;">Thank you, ${enquiry.fullName}</h2>
        <p>Your insurance inquiry has been registered with LIC Insurance Advisory Services.</p>
        <div style="background-color: #F0FDF4; border: 1px solid #BBF7D0; padding: 12px; border-radius: 6px; margin: 16px 0;">
          <p style="margin: 0; color: #166534; font-weight: bold;">Your Reference Number: ${enquiry.referenceNumber}</p>
        </div>
        <p>Advisor <strong>Dnyaneshwar Yedu Bhoi</strong> will review your requirements and reach out to you during your preferred time window (${enquiry.preferredTime || 'soon'}).</p>
        <p>If you need immediate assistance, you may reach out directly via WhatsApp or phone at <strong>9923835939</strong> or <strong>7972131176</strong>.</p>
        <hr style="border: 0; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748B;">
          <strong>Compliance Disclaimer:</strong> This portal is operated by an authorized independent insurance advisor and is not the official corporate website of Life Insurance Corporation of India. Policy terms, bonuses, and claim decisions are subject to official insurer guidelines.
        </p>
      </div>
    `;

    return this.send({
      recipient: enquiry.email,
      templateName: 'ENQUIRY_ACKNOWLEDGEMENT_CUSTOMER',
      subject,
      body,
    });
  }
}
