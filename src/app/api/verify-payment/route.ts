import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return Response.json(
        { error: "Missing session_id parameter" },
        { status: 400 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return Response.json(
        { error: "Stripe is not configured" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2026-05-27.dahlia",
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return Response.json(
        { error: "Payment has not been completed" },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      booking: {
        id: session.id,
        serviceName: session.metadata?.serviceName || "Unknown Service",
        date: session.metadata?.date || "",
        timeSlot: session.metadata?.timeSlot || "",
        customerName: session.metadata?.customerName || "",
        customerEmail: session.metadata?.customerEmail || session.customer_email || "",
        guests: parseInt(session.metadata?.guests || "1"),
        amountPaid: (session.amount_total || 0) / 100,
        specialRequests: session.metadata?.specialRequests || "",
      },
    });
  } catch (err) {
    console.error("Payment verification error:", err);

    if (err instanceof Stripe.errors.StripeError) {
      return Response.json(
        { error: err.message },
        { status: err.statusCode || 500 }
      );
    }

    return Response.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
