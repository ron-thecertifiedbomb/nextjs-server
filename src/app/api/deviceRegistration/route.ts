import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { tokenCode, phone, isRegistered, dateRegistered, bearerToken } =
    req.body;

  if (!tokenCode || !phone || !dateRegistered || !bearerToken) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "ronan.ramos.sibunga@gmail.com",
      to: "ronan.sibunga@gmail.com", // hardcoded or dynamic if you want
      subject: "📲 FCM Token Submission",
      text: `
📲 FCM Token Code: ${tokenCode}
📞 Phone: ${phone}
🟢 Is Registered: ${isRegistered}
📅 Date Registered: ${dateRegistered}
🔐 Bearer Token: ${bearerToken}
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ FCM details sent via email.`);
    return res
      .status(200)
      .json({ message: "FCM details emailed successfully" });
  } catch (error: any) {
    console.error("❌ Failed to send email:", error);
    return res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
}
