const { Router } = require("express");
const bookController = require("../controllers/bookingController.js"); // Import bookController

const router = Router();

// Route for creating a booking
router.post("/create", bookController.createBooking);

module.exports = router;
