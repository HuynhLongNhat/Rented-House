const { Router } = require("express");
const multer = require("multer");
const listingController = require("../controllers/listingController.js"); // Import controller

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

const router = Router();

// Route for creating a listing
router.post(
  "/create",
  upload.array("listingPhotos"),
  listingController.createListing
);

// Route for getting listings by category
router.get("/", listingController.getListingsByCategory);

// Route for searching listings
router.get("/search/:search", listingController.searchListings);

// Route for getting a specific listing by ID
router.get("/:listingId", listingController.getListingDetails);

module.exports = router;
