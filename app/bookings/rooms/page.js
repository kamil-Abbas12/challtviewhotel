'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CancellationPolicyTooltip from '@/components/CancellationPolicyTooltip';

const rooms = [
  {
    id: 1,
    name: 'Single Room',
    description: 'A spacious deluxe room with mountain view.',
    price: 2000,
    image: '/rooma.jpg',
    maxAdults: 1,
    maxChildren: 0,
    totalAvailable: 2,
  },
  {
    id: 2,
    name: 'Double Room',
    description: 'Comfortable and budget-friendly room.',
    price: 3500,
    image: '/pres.jpg',
    maxAdults: 2,
    maxChildren: 0,
    totalAvailable: 10,
  },
  {
    id: 3,
    name: 'Family Room',
    description: 'Luxury suite with king-size 2 double beds and balcony.',
    price: 5000,
    image: '/familyroom.jpeg',
    maxAdults: 3,
    maxChildren: 2,
    totalAvailable: 4,
  },
];

export default function RoomSelectionPage() {
  const [usdRate, setUsdRate] = useState(278);
  const router = useRouter();
  const searchParams = useSearchParams();
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const adults = parseInt(searchParams.get('adults')) || 1;
  const children = parseInt(searchParams.get('children')) || 0;

  const [stayLength, setStayLength] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState({});
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest?base=PKR&symbols=USD')
      .then(res => res.json())
      .then(data => {
        if (data?.rates?.USD) {
          setUsdRate(1 / data.rates.USD);
        }
      })
      .catch(err => {
        console.error('Failed to fetch exchange rate:', err);
      });
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
      setStayLength(diff);
    }
  }, [checkIn, checkOut]);

  const handleSelectRoom = (roomId, count) => {
    setSelectedRooms((prev) => ({ ...prev, [roomId]: parseInt(count) }));
  };

  const totalAmount = Object.entries(selectedRooms).reduce((total, [roomId, count]) => {
    const room = rooms.find((r) => r.id === parseInt(roomId));
    return total + (room ? room.price * count * stayLength : 0);
  }, 0);

  const totalUSD = (usdRate && totalAmount ? (totalAmount / usdRate).toFixed(2) : '0.00');
  const hasSelectedRooms = Object.values(selectedRooms).some((count) => count > 0);

  const handleGlobalBookNow = () => {
    const selected = Object.entries(selectedRooms)
      .filter(([_, count]) => count > 0)
      .map(([roomId, count]) => {
        const room = rooms.find((r) => r.id === parseInt(roomId));
        return `roomId=${roomId}&roomType=${encodeURIComponent(room.name)}&rooms=${count}`;
      })
      .join('&');

    const query = `${selected}&checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`;
    router.push(`/bookings/rooms/form?${query}`);
  };

  return (
<div className="min-h-screen pt-[80px] md:mt-3 bg-[#f5f5f5] px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="flex flex-col">
        <div className="bg-white p-6 rounded-xl shadow-md space-y-2 md:col-span-1">
          <h2 className="text-xl font-semibold text-[#7b0f1c]">Chalt View Hotel</h2>
          <p><strong>Check In:</strong> <span className="text-green-600">{checkIn}</span></p>
          <p><strong>Check Out:</strong> <span className="text-green-600">{checkOut}</span></p>
          <p><strong>Total length of stay:</strong> {stayLength} {stayLength === 1 ? 'Night' : 'Nights'}</p>
          <p><strong>Guest(s):</strong> {adults} Adults - {children} Children</p>

          {hasSelectedRooms ? (
            <div className="mt-4 text-center">
              <p className="font-semibold text-lg">Total: USD {totalUSD}</p>
              <p className="text-xs text-gray-500 mt-1">+ taxes and charges</p>
              <button
                onClick={handleGlobalBookNow}
                className="mt-3 w-full cursor-pointer bg-[#7b0f1c] text-white py-2 rounded hover:bg-[#5e0c16] "
              >
                Book Now
              </button>
            </div>
          ) : (
            <div className="mt-4 bg-[#ab8a62] text-center text-white font-semibold p-2 rounded">
              PLEASE SELECT NUMBER OF ROOMS REQUIRED
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md mt-4">
          <h3 className="text-lg font-semibold text-[#7b0f1c] mb-2">Hotel Location</h3>
          <div className="w-full h-48 rounded overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3217.499330347358!2d74.32013597566156!3d36.25165447240856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e629a5488da065%3A0x4d30ebb55a1e2d49!2sChalt%20View%20Hotel%20%26%20Restaurant!5e0!3m2!1sen!2sus!4v1747765672499!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="md:col-span-3 space-y-6">
        {rooms.map((room) => {
          const isSuitable = room.maxAdults >= adults && room.maxChildren >= children;
          const roomUSD = usdRate ? (room.price / usdRate).toFixed(2) : '0.00';

          return (
            <div
              key={room.id}
              className={`bg-white rounded-lg shadow overflow-hidden ${!isSuitable ? 'opacity-40 pointer-events-none' : ''}`}
            >
<div className="flex flex-col md:flex-row">
<div className="w-full md:w-1/4 h-48 md:h-auto">
<img src={room.image} alt={room.name} className="w-full h-full object-cover rounded-t md:rounded-l md:rounded-t-none" />
                </div>
<div className="w-full md:w-3/4 p-4 space-y-2">
                  <h3 className="text-xl font-bold text-[#7b0f1c]">{room.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    Max Guest:&nbsp;
                    <span className="flex space-x-1">
                      {Array.from({ length: room.maxAdults }, (_, i) => (
                        <span key={`a${i}`}>👤</span>
                      ))}
                      {Array.from({ length: room.maxChildren }, (_, i) => (
                        <span key={`c${i}`}>🧒</span>
                      ))}
                    </span>
                  </div>
                  <p className="text-gray-700">{room.description}</p>

                  <div className="grid grid-cols-4 items-center text-sm mt-4 border-t pt-3">
                    <div><strong>Guest(s):</strong> {adults + children}</div>
                    <div className="relative group inline-block">
                      <button className="text-blue-600 underline cursor-pointer text-sm ">View Details</button>
                      <div className="absolute hidden group-hover:block">
                        <CancellationPolicyTooltip />
                      </div>
                    </div>
                    <div>
                      <p><strong>USD {roomUSD}</strong> per night</p>
                      <p className="text-xs text-gray-500">+ taxes and charges</p>
                    </div>
                    <div>
                      <select
                        className="border border-gray-300 rounded px-2 py-1 w-full"
                        value={selectedRooms[room.id] || '0'}
                        onChange={(e) => handleSelectRoom(room.id, e.target.value)}
                      >
                        <option value="0">0</option>
                        {[...Array(room.totalAvailable)].map((_, idx) => (
                          <option key={idx + 1} value={idx + 1}>{idx + 1}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {!isSuitable && (
                    <p className="text-red-500 text-sm mt-2">Not suitable for your group size</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
