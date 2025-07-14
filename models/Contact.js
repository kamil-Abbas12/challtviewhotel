// models/Contact.js
import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String,
}, { timestamps: true })

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema)
