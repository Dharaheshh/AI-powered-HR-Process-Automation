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
  
  // Data for transparency
  const matchScore = applicationData?.matchScore ? applicationData.matchScore + '%' : 'Pending Evaluation';
  const appliedDate = applicationData?.appliedAt ? new Date(applicationData.appliedAt).toLocaleDateString() : 'N/A';
  
  // Extract latest notes to show transparency to candidate
  const notes = applicationData?.recruiterNotes || [];
  const latestNote = notes.length > 0 ? notes[notes.length - 1].text : 'No specific feedback provided.';

  switch (newStatus) {
    case 'shortlisted':
      subject = `[HireFlow AI] Update on your application for ${roleTitle} - Shortlisted!`;
      html = `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #003fb1; margin-top: 0;">Application Status Update</h2>
          <p>Dear <strong>${candidateName}</strong>,</p>
          <p>We are thrilled to inform you that your application for the <strong>${roleTitle}</strong> position has been <strong>shortlisted</strong>.</p>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0; border: 1px solid #e8eaed;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Transparency Report</h3>
            <p style="margin: 0 0 8px;"><strong>Applied On:</strong> ${appliedDate}</p>
            <p style="margin: 0 0 8px;"><strong>AI Fit Score:</strong> ${matchScore}</p>
            <p style="margin: 0;"><strong>Recruiter Feedback:</strong> You passed our initial screening based on your strong alignment with our core requirements.</p>
          </div>

          <p>Our team will be reaching out soon with the next steps regarding the interview process.</p>
          <p>Best regards,<br/><strong>The Hiring Team</strong></p>
        </div>
      `;
      break;
    case 'interview':
      const interviewDateStr = applicationData?.interviewDate ? new Date(applicationData.interviewDate).toLocaleString() : 'TBD';
      const interviewLinkStr = applicationData?.interviewLink ? `<a href="${applicationData.interviewLink}" style="color: #003fb1; font-weight: bold;">Join Meeting</a>` : 'Will be provided shortly';
      
      subject = `[HireFlow AI] Interview Invitation: ${roleTitle}`;
      html = `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #003fb1; margin-top: 0;">Interview Invitation</h2>
          <p>Hi <strong>${candidateName}</strong>,</p>
          <p>We are excited to invite you to an interview for the <strong>${roleTitle}</strong> position.</p>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #003fb1; margin: 20px 0;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #1e293b;">Interview Details</h3>
            <p style="margin: 0 0 8px;"><strong>Date & Time:</strong> ${interviewDateStr}</p>
            <p style="margin: 0 0 8px;"><strong>Location / Link:</strong> ${interviewLinkStr}</p>
          </div>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0; border: 1px solid #e8eaed;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #64748b; text-transform: uppercase;">Why We Selected You</h3>
            <p style="margin: 0 0 8px;"><strong>AI Profile Match:</strong> ${matchScore}</p>
            <p style="margin: 0;"><strong>Preliminary Feedback:</strong> Your resume and skills strongly aligned with our expectations for this role. We would like to discuss your experience further.</p>
          </div>

          <p>Please prepare any questions you might have for our team.</p>
          <p>Best regards,<br/><strong>The Hiring Team</strong></p>
        </div>
      `;
      break;
    case 'offered':
      subject = `[HireFlow AI] Offer Extended: ${roleTitle}`;
      html = `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #10b981; margin-top: 0;">Congratulations! Offer Extended</h2>
          <p>Dear <strong>${candidateName}</strong>,</p>
          <p>After careful consideration and a successful interview, we are delighted to formally offer you the position of <strong>${roleTitle}</strong>!</p>
          
          <div style="background: #f0fdf4; padding: 16px; border-radius: 6px; margin: 20px 0; border: 1px solid #bbf7d0;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #166534; text-transform: uppercase;">Closing Assessment</h3>
            <p style="margin: 0 0 8px;"><strong>AI Fit Score:</strong> ${matchScore}</p>
            <p style="margin: 0;"><strong>Interview Feedback:</strong> ${latestNote}</p>
          </div>

          <p>We were highly impressed with your skills and cultural fit. HR will contact you shortly with the official offer letter and compensation details.</p>
          <p>We can't wait to welcome you to the team!</p>
          <p>Sincerely,<br/><strong>The Hiring Team</strong></p>
        </div>
      `;
      break;
    case 'rejected':
      subject = `[HireFlow AI] Application Update: ${roleTitle}`;
      html = `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #475569; margin-top: 0;">Update on Your Application</h2>
          <p>Dear <strong>${candidateName}</strong>,</p>
          <p>Thank you for taking the time to apply for the <strong>${roleTitle}</strong> position.</p>
          <p>While we were impressed with your qualifications, we have decided to move forward with other candidates whose backgrounds more closely align with our current needs.</p>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin: 20px 0; border: 1px solid #e8eaed;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #64748b; text-transform: uppercase;">Application Transparency Report</h3>
            <p style="margin: 0 0 8px;"><strong>Role Analyzed:</strong> ${roleTitle}</p>
            <p style="margin: 0 0 8px;"><strong>AI Profile Match:</strong> ${matchScore}</p>
            <p style="margin: 0;"><strong>Final Feedback:</strong> ${latestNote}</p>
          </div>

          <p>We are a transparent organization and believe in sharing constructive feedback. We will keep your profile on file should a better-matching role open up in the future.</p>
          <p>We wish you the absolute best in your career search.</p>
          <p>Sincerely,<br/><strong>The Hiring Team</strong></p>
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
