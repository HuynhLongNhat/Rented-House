const { User, Listing, Booking } = require("../models/index");

/* GET TRIP LIST */
const getTrips = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.findAll({
      where: { customerId: userId },
      include: [
        { model: User, as: "customer" },
        { model: User, as: "host" },
        { model: Listing, as: "listing" },
      ],
    });
    res.status(200).json(trips);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find trips!", error: err.message });
  }
};

/* ADD LISTING TO WISHLIST */
const addToWishlist = async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findByPk(userId);
    const listing = await Listing.findByPk(listingId);

    if (!user || !listing) {
      return res.status(404).json({ message: "User or listing not found!" });
    }

    const favoriteListing = user.wishList.find((item) => item.id === listingId);

    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item.id !== listingId);
      await user.save();
      res.status(200).json({
        message: "Listing is removed from wish list",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "Listing is added to wish list",
        wishList: user.wishList,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
};

/* GET PROPERTY LIST */
const getProperties = async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.findAll({
      where: { creator: userId },
      include: [{ model: User, as: "creator" }],
    });
    res.status(200).json(properties);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find properties!", error: err.message });
  }
};

/* GET RESERVATION LIST */
const getReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.findAll({
      where: { hostId: userId },
      include: [
        { model: User, as: "customer" },
        { model: User, as: "host" },
        { model: Listing, as: "listing" },
      ],
    });
    res.status(200).json(reservations);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find reservations!", error: err.message });
  }
};

// Export the functions as a module
module.exports = {
  getTrips,
  addToWishlist,
  getProperties,
  getReservations,
};
