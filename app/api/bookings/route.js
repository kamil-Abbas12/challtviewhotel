// app/api/safepay-session/route.js

export async function POST(req) {
  const { name, email, amount } = await req.json();

  const response = await fetch('https://sandbox.api.getsafepay.com/checkout/v1/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.SAFEPAY_SECRET_KEY,     // SECRET key
      'x-account-id': process.env.SAFEPAY_ACCOUNT_ID,  // ACCOUNT ID
    },
    body: JSON.stringify({
      customer: {
        name,
        email,
      },
      order: {
        amount: parseInt(amount), // amount in PKR, make sure it's a number
        currency: 'PKR',
        items: [
          {
            name: 'Hotel Room Booking',
            quantity: 1,
            amount: parseInt(amount),
          },
        ],
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ error: data }), { status: response.status });
  }

return new Response(JSON.stringify({ checkout_id: data.data.token }), { status: 200 });
}
