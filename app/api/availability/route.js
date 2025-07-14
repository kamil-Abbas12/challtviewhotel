import connectToDB from "@/lib/mongodb";
import Booking from "@/models/Booking"; // if file is Booking.js
import { NextResponse } from "next/server";
// import { connectToDB } from "@/utils/mongo";

export async function POST(req) {
  const { checkIn, checkOut } = await req.json();

  if (!checkIn || !checkOut) {
    return NextResponse.json({ error: "Missing check-in or check-out date." }, { status: 400 });
  }

  await connectToDB();

  // Total rooms in hotel
  const TOTAL_ROOMS = {
    family: 4,
    double: 10,
    single: 2,
  };

  // Get bookings that overlap with selected dates
  const overlappingBookings = await Booking.find({
    $or: [
      { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } }
    ],
  });

  // Count how many rooms are already booked
  const bookedCount = { family: 0, double: 0, single: 0 };

  overlappingBookings.forEach((b) => {
    for (const type in bookedCount) {
return NextResponse.json({
  success: true,
  availableRooms,
});
    }
  });

  // Available = Total - Booked
  const availableRooms = {
    family: TOTAL_ROOMS.family - bookedCount.family,
    double: TOTAL_ROOMS.double - bookedCount.double, // mapped to "luxury"
    single: TOTAL_ROOMS.single - bookedCount.single,
  };

  return NextResponse.json({ availableRooms }); // Match expected shape
}
