import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  checkIn: Date,
  checkOut: Date,
  selectedRooms: {
    family: { type: Number, default: 0 },
    double: { type: Number, default: 0 },
    single: { type: Number, default: 0 },
  },
  amount: Number,
  paid: Boolean,
});

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
