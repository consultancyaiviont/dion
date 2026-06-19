import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface BookingDetails {
  confirmationNumber: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  guests: number;
  amountPaid: number;
  specialRequests?: string;
}

export async function sendCustomerConfirmation(booking: BookingDetails) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>",
      to: [booking.customerEmail],
      subject: `Booking Confirmed - ${booking.serviceName}`,
      html: getCustomerEmailHTML(booking),
    });

    if (error) {
      console.error("Error sending customer confirmation:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send customer confirmation:", error);
    return { success: false, error };
  }
}

export async function sendBusinessNotification(booking: BookingDetails) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>",
      to: ["diondixon100@gmail.com"],
      subject: `🎉 New Booking - ${booking.serviceName}`,
      html: getBusinessEmailHTML(booking),
    });

    if (error) {
      console.error("Error sending business notification:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send business notification:", error);
    return { success: false, error };
  }
}

function getCustomerEmailHTML(booking: BookingDetails): string {
  const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">✓ Booking Confirmed!</h1>
              <p style="margin: 10px 0 0 0; color: #e0f2fe; font-size: 16px;">Get ready for an amazing adventure</p>
            </td>
          </tr>

          <!-- Confirmation Number -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center; border-bottom: 2px solid #f1f5f9;">
              <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Confirmation Number</p>
              <p style="margin: 0; color: #0f172a; font-size: 24px; font-weight: bold; letter-spacing: 1px;">${booking.confirmationNumber}</p>
            </td>
          </tr>

          <!-- Booking Details -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 20px; font-weight: 600;">Booking Details</h2>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Activity</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <span style="color: #0f172a; font-size: 14px; font-weight: 600;">${booking.serviceName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Date</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <span style="color: #0f172a; font-size: 14px; font-weight: 600;">${formattedDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Time</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <span style="color: #0f172a; font-size: 14px; font-weight: 600;">${booking.timeSlot}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Number of Guests</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <span style="color: #0f172a; font-size: 14px; font-weight: 600;">${booking.guests}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #64748b; font-size: 14px;">Total Paid</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right;">
                    <span style="color: #0ea5e9; font-size: 18px; font-weight: bold;">$${booking.amountPaid.toFixed(2)}</span>
                  </td>
                </tr>
              </table>

              ${
                booking.specialRequests
                  ? `
              <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0ea5e9;">
                <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Special Requests</p>
                <p style="margin: 0; color: #0f172a; font-size: 14px;">${booking.specialRequests}</p>
              </div>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Important Info -->
          <tr>
            <td style="padding: 30px; background-color: #f8fafc;">
              <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">📍 Location & Check-In</h3>
              <p style="margin: 0 0 12px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                <strong>Miami Lifestyle Watersports</strong><br>
                123 Marina Boulevard<br>
                Miami, FL 33139
              </p>

              <h3 style="margin: 24px 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">⏰ What to Know</h3>
              <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
                <li>Please arrive 15 minutes before your scheduled time</li>
                <li>Bring a valid ID and your confirmation number</li>
                <li>Wear swimwear and bring sunscreen</li>
                <li>Life jackets and safety equipment provided</li>
                <li>Lockers available for personal belongings</li>
              </ul>

              <h3 style="margin: 24px 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">📞 Need Help?</h3>
              <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">
                Phone: <a href="tel:+13055551234" style="color: #0ea5e9; text-decoration: none;">(305) 555-1234</a><br>
                Email: <a href="mailto:info@miamilifestylewatersports.com" style="color: #0ea5e9; text-decoration: none;">info@miamilifestylewatersports.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #0f172a;">
              <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 14px;">Miami Lifestyle Watersports</p>
              <p style="margin: 0; color: #64748b; font-size: 12px;">© ${new Date().getFullYear()} All rights reserved</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getBusinessEmailHTML(booking: BookingDetails): string {
  const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Alert</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🎉 New Booking!</h1>
              <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 16px;">You have a new customer booking</p>
            </td>
          </tr>

          <!-- Booking Summary -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #0f172a; font-size: 20px; font-weight: 600;">Booking Details</h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Confirmation #</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <span style="color: #0f172a; font-size: 14px; font-weight: 700;">${booking.confirmationNumber}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Activity</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <span style="color: #0f172a; font-size: 14px; font-weight: 600;">${booking.serviceName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Date & Time</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <span style="color: #0f172a; font-size: 14px; font-weight: 600;">${formattedDate} at ${booking.timeSlot}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Guests</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <span style="color: #0f172a; font-size: 14px; font-weight: 600;">${booking.guests}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #64748b; font-size: 14px;">Amount Paid</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right;">
                    <span style="color: #10b981; font-size: 18px; font-weight: bold;">$${booking.amountPaid.toFixed(2)}</span>
                  </td>
                </tr>
              </table>

              <h3 style="margin: 24px 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">Customer Information</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Name</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <span style="color: #0f172a; font-size: 14px; font-weight: 600;">${booking.customerName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">
                    <span style="color: #64748b; font-size: 14px;">Email</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; text-align: right;">
                    <a href="mailto:${booking.customerEmail}" style="color: #0ea5e9; font-size: 14px; text-decoration: none;">${booking.customerEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #64748b; font-size: 14px;">Phone</span>
                  </td>
                  <td style="padding: 12px 0; text-align: right;">
                    <a href="tel:${booking.customerPhone}" style="color: #0ea5e9; font-size: 14px; text-decoration: none;">${booking.customerPhone || "Not provided"}</a>
                  </td>
                </tr>
              </table>

              ${
                booking.specialRequests
                  ? `
              <div style="margin-top: 24px; padding: 16px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0 0 8px 0; color: #92400e; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">⚠️ Special Requests</p>
                <p style="margin: 0; color: #78350f; font-size: 14px;">${booking.specialRequests}</p>
              </div>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #f8fafc;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">This is an automated notification from your booking system</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
