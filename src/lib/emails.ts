import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "placeholder");
}

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
  paymentType?: string;
  totalPrice?: number;
  balanceDue?: number;
}

export async function sendCustomerConfirmation(booking: BookingDetails) {
  try {
    const { data, error } = await getResend().emails.send({
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
    const { data, error } = await getResend().emails.send({
      from: "Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>",
      to: ["diondixon100@gmail.com"],
      subject: `New Booking - ${booking.serviceName}`,
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

export async function sendRescheduleRequest(data: {
  confirmationNumber: string;
  customerName: string;
  customerEmail: string;
  originalDate: string;
  preferredDate: string;
  preferredTime: string;
  reason?: string;
}) {
  try {
    const [businessResult, customerResult] = await Promise.all([
      getResend().emails.send({
        from: "Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>",
        to: ["diondixon100@gmail.com"],
        subject: `Reschedule Request - Confirmation #${data.confirmationNumber}`,
        html: getRescheduleBusinessEmailHTML(data),
      }),
      getResend().emails.send({
        from: "Miami Lifestyle Watersports <bookings@miamilifestylewatersports.com>",
        to: [data.customerEmail],
        subject: `Reschedule Request Received - #${data.confirmationNumber}`,
        html: getRescheduleCustomerEmailHTML(data),
      }),
    ]);

    if (businessResult.error) {
      console.error("Error sending reschedule business notification:", businessResult.error);
    }
    if (customerResult.error) {
      console.error("Error sending reschedule customer confirmation:", customerResult.error);
    }

    const success = !businessResult.error && !customerResult.error;
    return { success, businessResult, customerResult };
  } catch (error) {
    console.error("Failed to send reschedule request emails:", error);
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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0A0A0B;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0B; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111113; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.6);">

          <!-- Header -->
          <tr>
            <td style="border-top: 3px solid; border-image: linear-gradient(90deg, #FF1493, #00FFFF, #FF6B35) 1; background: linear-gradient(135deg, #1A0B2E 0%, #0D0520 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 1px;">Booking Confirmed</h1>
              <p style="margin: 10px 0 0 0; color: #00FFFF; font-size: 16px; letter-spacing: 0.5px;">Get ready for an amazing adventure</p>
            </td>
          </tr>

          <!-- Confirmation Number -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0 0 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px;">Confirmation Number</p>
              <div style="display: inline-block; border: 2px solid #FF1493; background: rgba(255,20,147,0.1); border-radius: 8px; padding: 12px 28px;">
                <span style="color: #FF1493; font-size: 22px; font-weight: bold; letter-spacing: 2px;">${booking.confirmationNumber}</span>
              </div>
            </td>
          </tr>

          <!-- Booking Details -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">Booking Details</h2>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px; border-radius: 4px 0 0 4px;">
                    <span style="color: #888; font-size: 14px;">Activity</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right; border-radius: 0 4px 4px 0;">
                    <span style="color: #e2e2e2; font-size: 14px; font-weight: 600;">${booking.serviceName}</span>
                  </td>
                </tr>
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Date</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #00FFFF; font-size: 14px; font-weight: bold;">${formattedDate}</span>
                  </td>
                </tr>
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Time</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #00FFFF; font-size: 14px; font-weight: bold;">${booking.timeSlot}</span>
                  </td>
                </tr>
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Number of Guests</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #00FFFF; font-size: 14px; font-weight: bold;">${booking.guests}</span>
                  </td>
                </tr>
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px; ${booking.paymentType === 'deposit' ? '' : 'border-radius: 0 0 0 4px;'}">
                    <span style="color: #888; font-size: 14px;">${booking.paymentType === 'deposit' ? 'Deposit Paid' : 'Total Paid'}</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right; ${booking.paymentType === 'deposit' ? '' : 'border-radius: 0 0 4px 0;'}">
                    <span style="color: #00FFFF; font-size: 18px; font-weight: bold;">$${booking.amountPaid.toFixed(2)}</span>
                  </td>
                </tr>
                ${
                  booking.paymentType === "deposit" && booking.balanceDue
                    ? `
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px; border-radius: 0 0 0 4px;">
                    <span style="color: #888; font-size: 14px;">Balance Due on Arrival</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right; border-radius: 0 0 4px 0;">
                    <span style="color: #FF6B35; font-size: 18px; font-weight: bold;">$${((booking.balanceDue) / 100).toFixed(2)}</span>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>

              ${
                booking.specialRequests
                  ? `
              <div style="margin-top: 20px; padding: 16px; background: rgba(255,107,53,0.1); border-left: 4px solid #FF6B35; border-radius: 0 6px 6px 0;">
                <p style="margin: 0 0 8px 0; color: #FF6B35; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Special Requests</p>
                <p style="margin: 0; color: #e2e2e2; font-size: 14px;">${booking.specialRequests}</p>
              </div>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Important Info -->
          <tr>
            <td style="padding: 30px; background-color: #0E0E10; border-top: 1px solid rgba(255,255,255,0.06);">
              <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">Location &amp; Check-In</h3>
              <div style="background: rgba(255,107,53,0.1); border-left: 4px solid #FF6B35; border-radius: 0 6px 6px 0; padding: 14px 16px; margin-bottom: 24px;">
                <p style="margin: 0; color: #e2e2e2; font-size: 14px; line-height: 1.7;">
                  <strong style="color: #ffffff;">Miami Lifestyle Watersports</strong><br>
                  123 Marina Boulevard<br>
                  Miami, FL 33139
                </p>
              </div>

              <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">What to Know</h3>
              <ul style="margin: 0 0 24px 0; padding-left: 20px; color: #e2e2e2; font-size: 14px; line-height: 2;">
                <li>Please arrive 15 minutes before your scheduled time</li>
                ${
                  booking.paymentType === "deposit" && booking.balanceDue
                    ? `<li style="color: #FF6B35;"><strong>Bring $${((booking.balanceDue) / 100).toFixed(2)} for remaining balance (cash or card accepted)</strong></li>`
                    : ""
                }
                <li>Bring a valid ID and your confirmation number</li>
                <li>Wear swimwear and bring sunscreen</li>
                <li>Life jackets and safety equipment provided</li>
                <li>Lockers available for personal belongings</li>
              </ul>

              <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">Need Help?</h3>
              <p style="margin: 0; color: #e2e2e2; font-size: 14px; line-height: 1.8;">
                Phone: <a href="tel:+13055551234" style="color: #00FFFF; text-decoration: none;">(305) 555-1234</a><br>
                Email: <a href="mailto:info@miamilifestylewatersports.com" style="color: #00FFFF; text-decoration: none;">info@miamilifestylewatersports.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; text-align: center; background-color: #080809; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0 0 6px 0; color: #555; font-size: 13px;">Miami Lifestyle Watersports</p>
              <p style="margin: 0; color: #555; font-size: 12px;">&copy; ${new Date().getFullYear()} All rights reserved</p>
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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0A0A0B;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0B; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111113; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.6);">

          <!-- Header -->
          <tr>
            <td style="border-top: 3px solid; border-image: linear-gradient(90deg, #FF1493, #00FFFF, #FF6B35) 1; background: linear-gradient(135deg, #1A0B2E 0%, #0D0520 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 1px;">New Booking</h1>
              <p style="margin: 10px 0 0 0; color: #00FFFF; font-size: 16px; letter-spacing: 0.5px;">You have a new customer booking</p>
            </td>
          </tr>

          <!-- Booking Details -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">Booking Details</h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Confirmation #</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #FF1493; font-size: 14px; font-weight: 700; letter-spacing: 1px;">${booking.confirmationNumber}</span>
                  </td>
                </tr>
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Activity</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #e2e2e2; font-size: 14px; font-weight: 600;">${booking.serviceName}</span>
                  </td>
                </tr>
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Date &amp; Time</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #00FFFF; font-size: 14px; font-weight: bold;">${formattedDate} at ${booking.timeSlot}</span>
                  </td>
                </tr>
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Guests</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #00FFFF; font-size: 14px; font-weight: bold;">${booking.guests}</span>
                  </td>
                </tr>
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px; ${booking.paymentType === 'deposit' ? '' : 'border-radius: 0 0 0 4px;'}">
                    <span style="color: #888; font-size: 14px;">${booking.paymentType === 'deposit' ? 'Deposit Received' : 'Amount Paid'}</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right; ${booking.paymentType === 'deposit' ? '' : 'border-radius: 0 0 4px 0;'}">
                    <span style="color: #00FFFF; font-size: 18px; font-weight: bold;">$${booking.amountPaid.toFixed(2)}</span>
                  </td>
                </tr>
                ${
                  booking.paymentType === "deposit" && booking.balanceDue
                    ? `
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px; border-radius: 0 0 0 4px;">
                    <span style="color: #888; font-size: 14px;">Balance Due on Arrival</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right; border-radius: 0 0 4px 0;">
                    <span style="color: #FF6B35; font-size: 18px; font-weight: bold;">$${((booking.balanceDue) / 100).toFixed(2)}</span>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>

              <h3 style="margin: 0 0 16px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">Customer Information</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Name</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #e2e2e2; font-size: 14px; font-weight: 600;">${booking.customerName}</span>
                  </td>
                </tr>
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Email</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <a href="mailto:${booking.customerEmail}" style="color: #00FFFF; font-size: 14px; text-decoration: none;">${booking.customerEmail}</a>
                  </td>
                </tr>
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Phone</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <a href="tel:${booking.customerPhone}" style="color: #00FFFF; font-size: 14px; text-decoration: none;">${booking.customerPhone || "Not provided"}</a>
                  </td>
                </tr>
              </table>

              ${
                booking.specialRequests
                  ? `
              <div style="margin-top: 24px; padding: 16px; background: rgba(255,107,53,0.1); border-left: 4px solid #FF6B35; border-radius: 0 6px 6px 0;">
                <p style="margin: 0 0 8px 0; color: #FF6B35; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Special Requests</p>
                <p style="margin: 0; color: #e2e2e2; font-size: 14px;">${booking.specialRequests}</p>
              </div>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; text-align: center; background-color: #080809; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0; color: #555; font-size: 12px;">Automated notification from your booking system</p>
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

function getRescheduleBusinessEmailHTML(data: {
  confirmationNumber: string;
  customerName: string;
  customerEmail: string;
  originalDate: string;
  preferredDate: string;
  preferredTime: string;
  reason?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reschedule Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0A0A0B;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0B; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111113; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.6);">

          <!-- Header -->
          <tr>
            <td style="border-top: 3px solid; border-image: linear-gradient(90deg, #FF1493, #00FFFF, #FF6B35) 1; background: linear-gradient(135deg, #1A0B2E 0%, #0D0520 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 1px;">Reschedule Request</h1>
              <p style="margin: 10px 0 0 0; color: #FF6B35; font-size: 16px; letter-spacing: 0.5px;">A customer has requested to reschedule their booking</p>
            </td>
          </tr>

          <!-- Confirmation Number -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0 0 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px;">Confirmation Number</p>
              <div style="display: inline-block; border: 2px solid #FF1493; background: rgba(255,20,147,0.1); border-radius: 8px; padding: 12px 28px;">
                <span style="color: #FF1493; font-size: 22px; font-weight: bold; letter-spacing: 2px;">${data.confirmationNumber}</span>
              </div>
            </td>
          </tr>

          <!-- Details -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">Customer Information</h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Name</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #e2e2e2; font-size: 14px; font-weight: 600;">${data.customerName}</span>
                  </td>
                </tr>
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Email</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <a href="mailto:${data.customerEmail}" style="color: #00FFFF; font-size: 14px; text-decoration: none;">${data.customerEmail}</a>
                  </td>
                </tr>
              </table>

              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">Schedule Changes</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Original Date</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #e2e2e2; font-size: 14px; font-weight: 600;">${data.originalDate}</span>
                  </td>
                </tr>
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Preferred New Date</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #00FFFF; font-size: 14px; font-weight: bold;">${data.preferredDate}</span>
                  </td>
                </tr>
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Preferred New Time</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #00FFFF; font-size: 14px; font-weight: bold;">${data.preferredTime}</span>
                  </td>
                </tr>
              </table>

              ${
                data.reason
                  ? `
              <div style="margin-top: 24px; padding: 16px; background: rgba(255,107,53,0.1); border-left: 4px solid #FF6B35; border-radius: 0 6px 6px 0;">
                <p style="margin: 0 0 8px 0; color: #FF6B35; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Reason for Reschedule</p>
                <p style="margin: 0; color: #e2e2e2; font-size: 14px;">${data.reason}</p>
              </div>
              `
                  : ""
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; text-align: center; background-color: #080809; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0; color: #555; font-size: 12px;">Automated notification from your booking system</p>
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

function getRescheduleCustomerEmailHTML(data: {
  confirmationNumber: string;
  customerName: string;
  customerEmail: string;
  originalDate: string;
  preferredDate: string;
  preferredTime: string;
  reason?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reschedule Request Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0A0A0B;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0B; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111113; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.6);">

          <!-- Header -->
          <tr>
            <td style="border-top: 3px solid; border-image: linear-gradient(90deg, #FF1493, #00FFFF, #FF6B35) 1; background: linear-gradient(135deg, #1A0B2E 0%, #0D0520 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 1px;">Request Received</h1>
              <p style="margin: 10px 0 0 0; color: #00FFFF; font-size: 16px; letter-spacing: 0.5px;">We've received your reschedule request</p>
            </td>
          </tr>

          <!-- Confirmation Number -->
          <tr>
            <td style="padding: 30px 30px 20px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0 0 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px;">Confirmation Number</p>
              <div style="display: inline-block; border: 2px solid #FF1493; background: rgba(255,20,147,0.1); border-radius: 8px; padding: 12px 28px;">
                <span style="color: #FF1493; font-size: 22px; font-weight: bold; letter-spacing: 2px;">${data.confirmationNumber}</span>
              </div>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 24px 0; color: #e2e2e2; font-size: 15px; line-height: 1.7;">
                Hi ${data.customerName}, we've received your request to reschedule your booking. Our team will review your request and reach out shortly to confirm the new date and time.
              </p>

              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">Your Request Details</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Original Date</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #e2e2e2; font-size: 14px; font-weight: 600;">${data.originalDate}</span>
                  </td>
                </tr>
                <tr style="background-color: #111113;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Requested New Date</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #00FFFF; font-size: 14px; font-weight: bold;">${data.preferredDate}</span>
                  </td>
                </tr>
                <tr style="background-color: #161618;">
                  <td style="padding: 12px 14px;">
                    <span style="color: #888; font-size: 14px;">Requested New Time</span>
                  </td>
                  <td style="padding: 12px 14px; text-align: right;">
                    <span style="color: #00FFFF; font-size: 14px; font-weight: bold;">${data.preferredTime}</span>
                  </td>
                </tr>
              </table>

              <div style="margin-top: 28px; padding: 16px; background: rgba(255,107,53,0.1); border-left: 4px solid #FF6B35; border-radius: 0 6px 6px 0;">
                <p style="margin: 0; color: #e2e2e2; font-size: 14px; line-height: 1.7;">
                  Please note that reschedule requests are subject to availability. If your preferred date or time is not available, we will work with you to find the best alternative.
                </p>
              </div>

              <h3 style="margin: 28px 0 12px 0; color: #ffffff; font-size: 16px; font-weight: 600; border-left: 3px solid #FF1493; padding-left: 12px;">Need to Reach Us?</h3>
              <p style="margin: 0; color: #e2e2e2; font-size: 14px; line-height: 1.8;">
                Phone: <a href="tel:+13055551234" style="color: #00FFFF; text-decoration: none;">(305) 555-1234</a><br>
                Email: <a href="mailto:info@miamilifestylewatersports.com" style="color: #00FFFF; text-decoration: none;">info@miamilifestylewatersports.com</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 30px; text-align: center; background-color: #080809; border-top: 1px solid rgba(255,255,255,0.06);">
              <p style="margin: 0 0 6px 0; color: #555; font-size: 13px;">Miami Lifestyle Watersports</p>
              <p style="margin: 0; color: #555; font-size: 12px;">&copy; ${new Date().getFullYear()} All rights reserved</p>
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
