import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // or simply dotenv.config() if it's in root

console.log('[DEBUG] SMTP_USER:', process.env.SMTP_USER);
console.log('[DEBUG] SMTP_PASS:', process.env.SMTP_PASS ? '✅ Loaded' : '❌ MISSING');



const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // should be smtp-relay.brevo.com
  port: parseInt(process.env.SMTP_PORT), // 587
  secure: false, // use STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP connection failed:', err);
  } else {
    console.log('✅ SMTP transporter is ready');
  }
});

export default transporter;
