import { NextRequest } from "next/server";
import { sendRescheduleRequest } from "@/lib/emails";

interface RescheduleBody {
  confirmationNumber: string;
  name: string;
  email: string;
  originalDate: string;
  preferredDate: string;
  preferredTime: string;
  reason?: string;
}

export async function POST(request: NextRequest) {
  try {
    let body: RescheduleBody;

    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { confirmationNumber, name, email, originalDate, preferredDate, preferredTime } = body;

    // Validate required fields
    if (!confirmationNumber?.trim()) {
      return Response.json({ error: "Confirmation number is required" }, { status: 400 });
    }
    if (!name?.trim()) {
      return Response.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!email?.trim() || !email.includes("@")) {
      return Response.json({ error: "A valid email address is required" }, { status: 400 });
    }
    if (!originalDate) {
      return Response.json({ error: "Original booking date is required" }, { status: 400 });
    }
    if (!preferredDate) {
      return Response.json({ error: "Preferred new date is required" }, { status: 400 });
    }
    if (!preferredTime?.trim()) {
      return Response.json({ error: "Preferred new time is required" }, { status: 400 });
    }

    // Format dates for emails
    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr + "T12:00:00"); // noon prevents timezone day shifts
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const rescheduleData = {
      confirmationNumber: confirmationNumber.trim(),
      customerName: name.trim(),
      customerEmail: email.trim(),
      originalDate: formatDate(originalDate),
      preferredDate: formatDate(preferredDate),
      preferredTime: preferredTime.trim(),
      reason: body.reason?.trim() || undefined,
    };

    // If RESEND_API_KEY is not configured, skip email and return success
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured — skipping reschedule emails");
      return Response.json({ success: true });
    }

    const result = await sendRescheduleRequest(rescheduleData);

    if (!result.success) {
      console.error("Failed to send reschedule emails:", result);
      // Still return 200 — the request was received even if email fails
      return Response.json({ success: true, emailWarning: "Email delivery issue" });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Reschedule API error:", err);
    return Response.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
