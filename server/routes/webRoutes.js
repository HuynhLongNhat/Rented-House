const express = require("express");
const userRoutes = require("./userRoutes.js");
const bookingRoutes = require("./bookingRoutes.js");
const listingRoutes = require("./listingRoutes.js");
const authRoutes = require("./authRoutes.js");

const router = express.Router();

// Sử dụng các routes cho các đường dẫn cụ thể
router.use("/users", userRoutes); // Dùng cho các route liên quan đến user
router.use("/bookings", bookingRoutes); // Dùng cho các route liên quan đến booking
router.use("/listings", listingRoutes); // Dùng cho các route liên quan đến listing
router.use("/auth", authRoutes); // Dùng cho các route liên quan đến authentication

module.exports = router;
