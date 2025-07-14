 "use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckInPage() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

 const handleNext = async () => {
  if (!checkIn || !checkOut) {
    alert("Please select both check-in and check-out dates.");
    return;
  }

  if (new Date(checkOut) <= new Date(checkIn)) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  if (adults > 3 || children > 2) {
    alert("A maximum of 3 adults and 2 children is allowed.");
    return;
  }

  try {
    const res = await fetch("/api/availability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkIn, checkOut }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server error:", errorText);
      alert("Error checking room availability.");
      return;
    }

    const data = await res.json();

    if (
      data.availableRooms.family <= 0 &&
      data.availableRooms.double <= 0 &&
      data.availableRooms.single <= 0
    ) {
      alert("Sorry, no rooms are available for these dates.");
      return;
    }

    alert(`Available rooms:\nFamily: ${data.availableRooms.family}\nDouble: ${data.availableRooms.double}\nSingle: ${data.availableRooms.single}`);

    router.push(
      `/bookings/rooms?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`
    );
  } catch (error) {
    console.error("Availability check failed:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="min-h-screen flex items-center md:mt-3 justify-center bg-[#f5f5f5] px-2 md:px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4">
        <h1 className="text-3xl font-semibold text-center">Check Availability</h1>

        <div className="flex flex-col gap-3">
          <label className="text-gray-700">Check-In Date</label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border px-4 py-2 rounded"
          />

          <label className="text-gray-700">Check-Out Date</label>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border px-4 py-2 rounded"
          />

          <label className="text-gray-700">Number of Adults (Max 3)</label>
          <input
            type="number"
            min="1"
            max="3"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="border px-4 py-2 rounded"
          />

          <label className="text-gray-700">Number of Children (Max 2)</label>
          <input
            type="number"
            min="0"
            max="2"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="border px-4 py-2 rounded"
          />

          <button
            onClick={handleNext}
            className="mt-4 bg-[#bca282] text-white px-6 py-2 rounded hover:bg-[#a88f6e] cursor-pointer"
          >
            Next: Select Room
          </button>
        </div>
      </div>
    </div>
  );
}
