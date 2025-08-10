import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

async function sendMail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.APP_USER,
      to: to,
      subject: subject,
      html: html,
    });
    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Failed to send mail:", err);
  }
}
export default sendMail;
