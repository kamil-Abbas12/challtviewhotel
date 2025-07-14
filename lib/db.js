import connectToDB from './mongodb';

// Get user by email
export const getUserByEmail = async (email) => {
  try {
    const client = await clientPromise;
    // Extract database name from URI or use environment variable
    const dbName = process.env.MONGODB_DB || "hotelApp";
    const db = client.db(dbName);
    
    return await db.collection('users').findOne({ email });
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw new Error('Database error when fetching user');
  }
}

// Create new user
export const createUser = async (userData) => {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "hotelApp";
    const db = client.db(dbName);
    
    // Add timestamp for user creation
    const userWithTimestamp = {
      ...userData,
      createdAt: new Date()
    };
    
    return await db.collection('users').insertOne(userWithTimestamp);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database error when creating user');
  }
}

// Save booking
export const createBooking = async (bookingData) => {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "hotelApp";
    const db = client.db(dbName);
    
    // Add timestamps and status to booking
    const bookingWithMetadata = {
      ...bookingData,
      status: 'pending',
      createdAt: new Date()
    };
    
    return await db.collection('bookings').insertOne(bookingWithMetadata);
  } catch (error) {
    console.error('Error creating booking:', error);
    throw new Error('Database error when creating booking');
  }
}

// Get bookings for a specific user
export const getBookingsByUserId = async (userId) => {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "hotelApp";
    const db = client.db(dbName);
    
    return await db.collection('bookings')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Database error when fetching bookings');
  }
}

// Export the connectToDB function from mongodb.js
export { connectToDB } from './mongodb';
