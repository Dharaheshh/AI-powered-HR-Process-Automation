const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: process.env.SMTP_FROM || `"${process.env.SMTP_USER}" <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  const info = await transporter.sendMail(message);
  console.log('Email sent: %s to %s', info.messageId, options.email);
};

const sendStatusEmail = async (candidate, jobOpening, newStatus, applicationData = null) => {
  if (!candidate || !candidate.email) return;

  let subject = '';
  let html = '';
  const candidateName = candidate.name || 'Candidate';
  const roleTitle = jobOpening.title || 'the role';

  switch (newStatus) {
    case 'shortlisted':
      subject = `Update on your application for ${roleTitle} - Shortlisted!`;
      html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4ade80;">Congratulations, ${candidateName}!</h2>
          <p>We are thrilled to inform you that your application for the <strong>${roleTitle}</strong> position has been shortlisted.</p>
          <p>Our team was very impressed with your background and we will be reaching out soon with the next steps regarding the interview process.</p>
          <p>Thank you for your interest in joining our team!</p>
          <p>Best regards,<br/>The Hiring Team</p>
        </div>
      `;
      break;
    case 'interview':
      const interviewDateStr = applicationData?.interviewDate ? new Date(applicationData.interviewDate).toLocaleString() : 'TBD';
      const interviewLinkStr = applicationData?.interviewLink ? `<a href="${applicationData.interviewLink}">${applicationData.interviewLink}</a>` : 'Will be provided shortly';
      
      subject = `Interview Invitation: ${roleTitle}`;
      html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #22d3ee;">Interview Invitation</h2>
          <p>Hi ${candidateName},</p>
          <p>We are excited to invite you to an interview for the <strong>${roleTitle}</strong> position.</p>
          <div style="background: #f8fafc; padding: 15px; border-left: 4px solid #22d3ee; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Date & Time:</strong> ${interviewDateStr}</p>
            <p style="margin: 0;"><strong>Meeting Link / Location:</strong> ${interviewLinkStr}</p>
          </div>
          <p>Please prepare any questions you might have for our team.</p>
          <p>We look forward to speaking with you!</p>
          <p>Best regards,<br/>The Hiring Team</p>
        </div>
      `;
      break;
    case 'rejected':
      subject = `Update on your application for ${roleTitle}`;
      html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Update on Your Application</h2>
          <p>Dear ${candidateName},</p>
          <p>Thank you for taking the time to apply for the <strong>${roleTitle}</strong> position.</p>
          <p>While we were impressed with your qualifications, we have decided to move forward with other candidates who more closely align with our current needs for this particular role.</p>
          <p>We will keep your resume on file for future opportunities.</p>
          <p>We wish you the best of luck in your job search.</p>
          <p>Sincerely,<br/>The Hiring Team</p>
        </div>
      `;
      break;
    default:
      return; // Do not send email for other statuses
  }

  try {
    await sendEmail({
      email: candidate.email,
      subject,
      html,
    });
  } catch (error) {
    console.error('Error sending status email:', error.message);
  }
};

module.exports = { sendStatusEmail };
