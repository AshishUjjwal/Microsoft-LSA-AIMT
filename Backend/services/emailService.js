import { transporter } from '../src/db/mailer.js';

export const sendVerificationEmail = async (email, verificationLink) => {
  try {
    const mailOptions = {
      from: `"MLSA AIMT Support" <${process.env.EMAIL_USER}>`, // Sender address
      to: email, // Recipient
      subject: "Verify Your Email", // Subject
      html: `
        <h1>Email Verification</h1>
        <p>Thank you for registering with MLSA AIMT.</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link is valid for 24 hours.</p>
      `, // Email content (HTML format)
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    throw new Error("Failed to send verification email.");
  }
};
