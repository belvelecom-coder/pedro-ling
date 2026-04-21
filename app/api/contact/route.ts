import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const NOTIFY_EMAIL = "lisbonfirstdance@gmail.com";

// ─── Google Sheets ───────────────────────────────────────────────────────────

async function appendToSheet(data: {
  name: string;
  email: string;
  weddingDate: string;
  phone: string;
  preferredLanguage: string;
}) {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID } =
    process.env;

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    console.warn("Google Sheets env vars not set — skipping sheet append.");
    return;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Vercel stores \n literally — replace back to real newlines
      private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Date().toLocaleString("pt-PT", {
    timeZone: "Europe/Lisbon",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: "A:F",
    valueInputOption: "RAW",
    requestBody: {
      values: [[
        timestamp,
        data.name,
        data.email,
        data.weddingDate,
        data.phone || "—",
        data.preferredLanguage || "—",
      ]],
    },
  });
}

// ─── Email ───────────────────────────────────────────────────────────────────

async function sendEmailNotification(data: {
  name: string;
  email: string;
  weddingDate: string;
  phone: string;
  preferredLanguage: string;
}) {
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
        <tr><td><strong>Preferred Language:</strong></td><td>${data.preferredLanguage || "—"}</td></tr>
        <tr><td><strong>Submitted:</strong></td><td>${new Date().toLocaleString("pt-PT", { timeZone: "Europe/Lisbon" })}</td></tr>
      </table>
    `,
  });
}

// ─── Route handler ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, weddingDate, phone, preferredLanguage } = body;

    if (!name || !email || !weddingDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const data = {
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 300),
      weddingDate: String(weddingDate).slice(0, 20),
      phone: String(phone || "").slice(0, 50),
      preferredLanguage: String(preferredLanguage || "").slice(0, 30),
    };

    // Run sheet append and email in parallel — neither failure blocks the response
    const [sheetResult, emailResult] = await Promise.allSettled([
      appendToSheet(data),
      sendEmailNotification(data),
    ]);

    if (sheetResult.status === "rejected") {
      console.error("Google Sheets append failed:", sheetResult.reason);
    }
    if (emailResult.status === "rejected") {
      console.error("Email notification failed:", emailResult.reason);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
