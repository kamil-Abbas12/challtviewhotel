 'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function BookingFormPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [roomPrices, setRoomPrices] = useState({});
  const [totalUSD, setTotalUSD] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');

  // Watch for searchParams and update selectedRooms + total
  useEffect(() => {
    const roomIds = searchParams.getAll('roomId');
    const roomTypes = searchParams.getAll('roomType');
    const roomCounts = searchParams.getAll('rooms');

    const parsedRooms = roomIds.map((id, index) => ({
      id,
      type: roomTypes[index],
      count: roomCounts[index],
    }));

    setSelectedRooms(parsedRooms);

    const fetchPricesAndCalculateTotal = async () => {
      try {
        const res = await fetch('/api/room-prices');
        const priceMap = await res.json();
        setRoomPrices(priceMap);

        const checkInDate = new Date(checkIn);
const checkOutDate = new Date(checkOut);
const nights = Math.max(1, Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));

let total = 0;
parsedRooms.forEach(({ type, count }) => {
  const normalizedType = type?.trim().toLowerCase();
  const matchedKey = Object.keys(priceMap).find(
    key => key.trim().toLowerCase() === normalizedType
  );
  const price = priceMap[matchedKey] || 0;
  total += price * Number(count) * nights;
});

setTotalUSD(total);

      } catch (err) {
        console.error('Error fetching room prices:', err);
      }
    };

    if (parsedRooms.length > 0) {
      fetchPricesAndCalculateTotal();
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const errors = [];
    if (!formData.name.trim()) errors.push('Full name is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push('Valid email is required');

    if (errors.length > 0) {
      setError({ title: 'Validation Error', message: errors.join(', '), isCritical: false });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedRooms,
          totalAmountUSD: totalUSD,
          checkIn,
          checkOut,
          adults,
          children,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '' });
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError({ title: 'Error', message: err.message || 'Unexpected error occurred', isCritical: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md  my-35 mx-auto p-6  bg-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Booking Summary</h2>
        {selectedRooms.map((r, index) => (
          <p key={index}><strong>{r.count}x</strong> {r.type}</p>
        ))}
        <p><strong>Check-in:</strong> {checkIn || 'Not specified'}</p>
        <p><strong>Check-out:</strong> {checkOut || 'Not specified'}</p>
        <p><strong>Guests:</strong> {adults || 0} Adults, {children || 0} Children</p>
        <p className="text-sm text-gray-600"><strong>Total (USD):</strong> ${totalUSD}</p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
          <h3 className="font-bold">Booking Submitted!</h3>
          <p className="mt-1">We will contact you soon to confirm your booking.</p>
        </div>
      )}

      {error && (
        <div className={`mb-6 p-4 rounded ${error.isCritical ? 'bg-red-100 border-red-400 text-red-700' : 'bg-yellow-100 border-yellow-400 text-yellow-700'}`}>
          <h3 className="font-bold">{error.title}</h3>
          <p className="mt-1">{error.message}</p>
        </div>
      )}

      {!success && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={loading} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={loading} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={loading} className="w-full border p-2 rounded" />
          </div>

          <button type="submit" disabled={loading} className={`w-full py-3 rounded  cursor-pointer font-medium ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
            {loading ? 'Submitting...' : 'Submit Booking'}
          </button>
        </form>
      )}
    </div>
  );
}
