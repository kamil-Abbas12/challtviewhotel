export async function GET() {
  const pricesUSD = {
    'Family Room': 18,
    'Double Room': 13,
    'Single Room': 7,
    
  };

  return new Response(JSON.stringify(pricesUSD), {
    headers: { 'Content-Type': 'application/json' },
  });
}
