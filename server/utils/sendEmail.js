import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "himay.glsbca20@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
});

const sendEmail = async (
  toEmail,
  verificationCode,
  username = null,
  isResetOtp = false
) => {
  const loginVerificationMessage = `<p>Hello ${username},</p>

    <p>You've requested to log in to your account. To ensure the security of your account, please use the following verification code:</p>
    
    <p>Verification Code: <b>${verificationCode}.</b></p>
    
    <p>Please enter this code in the login form to proceed. This code is valid for 10 minutes.<p/>
    
    <p>If you did not request this verification, please ignore this email.</p>
    
    <p>Thank you,
    Electronic E-Hub</p>`;

  const resetPasswordMessage = `<p>Dear User,</p>

    <p>You recently requested to reset your password. To complete the process, please enter the following One-Time Password (OTP) within the next 10 minutes:,</p>
    
    <p>OTP: <b>${verificationCode}</b></p>
    
    <p>If you did not request this password reset, please ignore this email. Your account security may be compromised if someone else has access to your email address.</p>
    
    <p>Thank you,</p>
    Electronic E-Hub`;
  const mailOption = {
    from: "Electronic E-Hub <himay.glsbca20@gmail.com>",
    to: toEmail,
    subject: isResetOtp ? "Password Reset OTP" : "Login Varification",
    html: isResetOtp ? resetPasswordMessage : loginVerificationMessage,
  };

  await transpoter.sendMail(mailOption);
};

export default sendEmail;
