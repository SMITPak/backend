import nodemailer from "nodemailer";
import  'dotenv/config'

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "smitwebandapp@gmail.com",
    pass: process.env.Nodemailer_Key,
  },
});

export const GenarteOtp = () => {
    const otp = Math.ceil(Math.random() * 10000)
    return otp
}
