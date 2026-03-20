import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const NOTIFY_EMAIL = "lisbonfirstdance@gmail.com";

async function sendEmailNotification(data: {
  name: string;
  email: string;
  weddingDate: string;
  phone: string;
}) {
  // Add SMTP_USER and SMTP_PASS in Vercel → Settings → Environment Variables.
  // Use lisbonfirstdance@gmail.com + a Gmail App Password for SMTP_PASS.
  const { SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("SMTP_USER / SMTP_PASS not set — skipping email notification.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Lisbon First Dance" <${SMTP_USER}>`,
    to: NOTIFY_EMAIL,
    subject: `💃 New Lead: ${data.name}`,
    html: `
      <h2>New Wedding Dance Inquiry</h2>
      <table cellpadding="6" style="border-collapse:collapse;">
        <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Wedding Date:</strong></td><td>${data.weddingDate}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${data.phone || "—"}</td></tr>
        <tr><td><strong>Submitted:</strong></td><td>${new Date().toLocaleString("pt-PT", { timeZone: "Europe/Lisbon" })}</td></tr>
      </table>
    `,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, weddingDate, phone } = body;

    if (!name || !email || !weddingDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const data = {
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 300),
      weddingDate: String(weddingDate).slice(0, 20),
      phone: String(phone || "").slice(0, 50),
    };

    await sendEmailNotification(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
