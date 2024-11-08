const { Booking } = require("../models/index.js"); // Adjust the import path based on your project structure

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;

    // Create a new booking instance using the provided data
    const newBooking = await Booking.create({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });

    // Send the created booking as a response
    res.status(200).json(newBooking);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Failed to create a new booking!",
      error: err.message,
    });
  }
};

// Export the function
module.exports = { createBooking };
