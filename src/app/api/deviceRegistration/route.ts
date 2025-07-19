import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const basicAuth = (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) return false;

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  const validUsername = process.env.BASIC_AUTH_USERNAME;
  const validPassword = process.env.BASIC_AUTH_PASSWORD;

  return username === validUsername && password === validPassword;
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!basicAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    tokenCode,
    phone,
    isRegistered,
    dateRegistered,
    user_id,
    device_model,
    device_platform,
  } = body;

  if (!tokenCode || !phone || !dateRegistered || !user_id) {
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
🧑 User ID: ${user_id}
📞 Phone: ${phone}
🟢 Is Registered: ${isRegistered}
📅 Date Registered: ${dateRegistered}
📱 Device Model: ${device_model}
💻 Device Platform: ${device_platform}
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
