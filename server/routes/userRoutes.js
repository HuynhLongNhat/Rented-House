const { Router } = require("express"); // Correct CommonJS import
const userController = require("../controllers/userController.js");

const router = Router();

/* GET TRIP LIST */
router.get("/:userId/trips", userController.getTrips);

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", userController.addToWishlist);

/* GET PROPERTY LIST */
router.get("/:userId/properties", userController.getProperties);

/* GET RESERVATION LIST */
router.get("/:userId/reservations", userController.getReservations);

module.exports = router;
