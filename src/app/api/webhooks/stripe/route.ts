import { NextRequest } from "next/server";
import Stripe from "stripe";
import {
  sendCustomerConfirmation,
  sendBusinessNotification,
} from "@/lib/emails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return Response.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return Response.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Only process if payment was successful
      if (session.payment_status === "paid") {
        const bookingDetails = {
          confirmationNumber: session.id.slice(-8).toUpperCase(),
          serviceName: session.metadata?.serviceName || "Unknown Service",
          date: session.metadata?.date || "",
          timeSlot: session.metadata?.timeSlot || "",
          customerName: session.metadata?.customerName || "",
          customerEmail:
            session.metadata?.customerEmail || session.customer_email || "",
          customerPhone: session.metadata?.customerPhone || "",
          guests: parseInt(session.metadata?.guests || "1"),
          amountPaid: (session.amount_total || 0) / 100,
          specialRequests: session.metadata?.specialRequests || "",
          paymentType: session.metadata?.paymentType || "full",
          totalPrice: parseInt(session.metadata?.totalPrice || "0"),
          balanceDue: parseInt(session.metadata?.balanceDue || "0"),
        };

        // Send emails in parallel
        const [customerResult, businessResult] = await Promise.allSettled([
          sendCustomerConfirmation(bookingDetails),
          sendBusinessNotification(bookingDetails),
        ]);

        // Log results
        if (customerResult.status === "fulfilled") {
          console.log("Customer confirmation sent:", customerResult.value);
        } else {
          console.error("Failed to send customer confirmation:", customerResult.reason);
        }

        if (businessResult.status === "fulfilled") {
          console.log("Business notification sent:", businessResult.value);
        } else {
          console.error("Failed to send business notification:", businessResult.reason);
        }
      }
    }

    return Response.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return Response.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
