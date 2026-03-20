import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

const CSV_PATH = path.join(process.cwd(), "data", "leads.csv");

function ensureCSV() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, "timestamp,name,email,weddingDate,phone\n");
  }
}

function appendToCSV(data: {
  name: string;
  email: string;
  weddingDate: string;
  phone: string;
}) {
  ensureCSV();
  const row = [
    new Date().toISOString(),
    `"${data.name.replace(/"/g, '""')}"`,
    `"${data.email.replace(/"/g, '""')}"`,
    `"${data.weddingDate}"`,
    `"${(data.phone || "").replace(/"/g, '""')}"`,
  ].join(",");
  fs.appendFileSync(CSV_PATH, row + "\n");
}

const NOTIFY_EMAIL = "lisbonfirstdance@gmail.com";

async function sendEmailNotification(data: {
  name: string;
  email: string;
  weddingDate: string;
  phone: string;
}) {
  // Set SMTP_USER and SMTP_PASS in Vercel environment variables.
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
      <table>
        <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Wedding Date:</strong></td><td>${data.weddingDate}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${data.phone || "—"}</td></tr>
        <tr><td><strong>Submitted:</strong></td><td>${new Date().toLocaleString()}</td></tr>
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

    // Sanitise
    const data = {
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 300),
      weddingDate: String(weddingDate).slice(0, 20),
      phone: String(phone || "").slice(0, 50),
    };

    appendToCSV(data);
    await sendEmailNotification(data);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
