const { Router } = require("express");
const multer = require("multer");
const authController = require("../controllers/authController.js");

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = Router();

// Routes for user registration and login
router.post(
  "/register",
  upload.single("profileImage"),
  authController.registerUser
);
router.post("/login", authController.loginUser);

module.exports = router; // Export the router in CommonJS format
