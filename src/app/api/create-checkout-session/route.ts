import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      serviceId,
      serviceName,
      price,
      guests,
      date,
      timeSlot,
      customerName,
      customerEmail,
      customerPhone,
      specialRequests,
    } = body;

    // Validate required fields
    if (
      !serviceId ||
      !serviceName ||
      !price ||
      !guests ||
      !date ||
      !timeSlot ||
      !customerName ||
      !customerEmail
    ) {
      return Response.json(
        { error: "Missing required booking information" },
        { status: 400 }
      );
    }

    // Validate price is a positive integer
    if (!Number.isInteger(price) || price <= 0) {
      return Response.json({ error: "Invalid price" }, { status: 400 });
    }

    // Validate guests
    if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
      return Response.json(
        { error: "Invalid number of guests" },
        { status: 400 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return Response.json(
        { error: "Stripe is not configured. Please add your Stripe secret key to environment variables." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2026-05-27.dahlia",
    });

    const totalAmount = price * guests;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceName,
              description: `${guests} guest${guests > 1 ? "s" : ""} on ${new Date(date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at ${timeSlot}`,
              metadata: {
                serviceId,
                date,
                timeSlot,
                guests: guests.toString(),
              },
            },
            unit_amount: totalAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/book?service=${serviceId}`,
      customer_email: customerEmail,
      metadata: {
        serviceId,
        serviceName,
        date,
        timeSlot,
        customerName,
        customerEmail,
        customerPhone: customerPhone || "",
        specialRequests: specialRequests || "",
        guests: guests.toString(),
      },
    });

    return Response.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);

    if (err instanceof Stripe.errors.StripeError) {
      return Response.json(
        { error: err.message },
        { status: err.statusCode || 500 }
      );
    }

    return Response.json(
      { error: "An unexpected error occurred while creating your checkout session" },
      { status: 500 }
    );
  }
}
