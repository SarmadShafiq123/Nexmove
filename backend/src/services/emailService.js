import createTransporter from '../config/email.js';
import { generateLeadEmailTemplate } from '../utils/emailTemplates.js';
import { AppError } from '../utils/appError.js';

class EmailService {
  async sendLeadNotification(lead) {
    try {
      const transporter = createTransporter();

      const htmlContent = generateLeadEmailTemplate(lead);

      const mailOptions = {
        from: `"NEXMOVE Dispatch System" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: 'New Carrier Lead Received',
        html: htmlContent,
        text: this.generatePlainTextEmail(lead)
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`✓ Email sent: ${info.messageId}`);
      
      return info;
    } catch (error) {
      console.error('✗ Email sending failed:', error.message);
      throw new AppError('Failed to send email notification', 500);
    }
  }

  generatePlainTextEmail(lead) {
    return `
NEW CARRIER LEAD RECEIVED

Name: ${lead.fullName}
Company: ${lead.companyName}
Email: ${lead.email}
Phone: ${lead.phone}
Truck Type: ${lead.truckType}
MC Number: ${lead.mcNumber}
DOT Number: ${lead.dotNumber}

Message:
${lead.message}

Submission Time: ${new Date(lead.createdAt).toLocaleString('en-US', {
  dateStyle: 'full',
  timeStyle: 'long'
})}

Lead ID: ${lead._id}
    `.trim();
  }

  async sendWelcomeEmail(lead) {
    try {
      const transporter = createTransporter();

      const mailOptions = {
        from: `"NEXMOVE Dispatch" <${process.env.EMAIL_USER}>`,
        to: lead.email,
        subject: 'Thank You for Your Interest in NEXMOVE',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank You, ${lead.fullName}!</h2>
            <p>We have received your information and one of our dispatch specialists will contact you shortly.</p>
            <p>In the meantime, if you have any questions, please don't hesitate to reach out.</p>
            <p>Best regards,<br><strong>NEXMOVE Dispatch Team</strong></p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`✓ Welcome email sent to: ${lead.email}`);
    } catch (error) {
      console.error('✗ Welcome email failed:', error.message);
    }
  }
}

export default new EmailService();
