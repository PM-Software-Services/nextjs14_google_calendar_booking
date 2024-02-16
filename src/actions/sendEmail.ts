import sendMail from "@/lib/email";

const SUBJECT = `Your meeting request 📅`;

function ConfirmationEmail(sessionDetails: any) {
  // Convert the start and end times to Date objects
  const startTime = new Date(sessionDetails.startTime);
  const endTime = new Date(sessionDetails.endTime);

  let body = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto;">
    <h2 style="color: #4CAF50;">Meeting Request Confirmation</h2>
    <p>Hi there 👋,</p>
    <p>Just confirming that your request for a meeting with the following details has been received:</p>
    <ul style="list-style-type: none;">
      <li><strong>Start Time:</strong> ${startTime.toLocaleString()}</li>
      <li><strong>End Time:</strong> ${endTime.toLocaleString()}</li>
      <li><strong>Deposit Amount Paid:</strong> $${sessionDetails.amount}</li>
    </ul>
    <p>If there are any problems with your booking, we will contact you. 📝</p>
    <p>If you have any questions, please contact ${process.env.CONTACT_NAME} at ${process.env.CONTACT_EMAIL} or ${process.env.CONTACT_NUMBER}</p>
    <p>Thanks! 🙏</p>
    <p style="color: #777;">From the ${process.env.CONTACT_NAME} Team</p>
  </div>`

  return { subject: SUBJECT, body }
}

export async function sendBookingConfirmationEmail(to: string, sessionDetails: any) {
  const emailContent = ConfirmationEmail(sessionDetails);

  await sendMail({ to, subject: emailContent.subject, body: emailContent.body });
}