import nodemailer from 'nodemailer';

export async function POST(req) {
 const {
  name, email, phone,
  selectedRooms = [], checkIn, checkOut, adults, children,
  totalAmountUSD
} = await req.json();

  // Build room summary
const roomDetails = selectedRooms.map(r => `- ${r.type} x ${r.count}`).join('\n');

  // Setup email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to Admin (you)
  const adminMailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_TO,
  subject: 'New Booking Request',
  text: `
New Booking Received:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Rooms:
${roomDetails}

Check-In: ${checkIn}
Check-Out: ${checkOut}
Guests: ${adults} Adults, ${children} Children
Total Amount: $${totalAmountUSD} USD
  `.trim(),
};

  // Confirmation email to User
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Booking Confirmation - Thank You!',
    text: `
Dear ${name},

Thank you for your booking at our hotel.

Here are your booking details:
${roomDetails ? `Rooms:\n${roomDetails}` : '- Room not specified'}

Check-In: ${checkIn}
Check-Out: ${checkOut}
Guests: ${adults} Adults, ${children} Children
Total Amount: $${totalAmountUSD} USD

We will contact you soon to confirm your booking.

Best regards,  
Hotel Management Team
    `.trim(),
  };

  try {
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return new Response(JSON.stringify({ success: true }));
  } catch (err) {
    console.error('Email sending error:', err);
    return new Response(JSON.stringify({ error: 'Email failed to send' }), { status: 500 });
  }
}
