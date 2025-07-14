export async function POST(req) {
  const { checkout_id } = await req.json();
  
  // Log failed payment in your database
  await prisma.paymentAttempt.create({
    data: {
      checkout_id,
      status: 'FAILED',
      timestamp: new Date()
    }
  });

  return new Response(null, { status: 200 });
}