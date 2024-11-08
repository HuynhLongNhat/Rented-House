// authController.js
const multer = require("multer");
const { Sequelize } = require("sequelize"); // Ensure Sequelize is imported for query operators
const { Listing, User } = require("../models/index.js"); // Adjust the import path according to your project structure

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
const createListing = async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded.");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    // Create a new listing instance using the provided data
    const newListing = await Listing.create({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    res.status(200).json(newListing);
  } catch (err) {
    console.error(err);
    res
      .status(409)
      .json({ message: "Fail to create Listing", error: err.message });
  }
};

/* GET LISTINGS BY CATEGORY */
const getListingsByCategory = async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.findAll({
        where: { category: qCategory },
        include: User,
      });
    } else {
      listings = await Listing.findAll({ include: User });
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
  }
};

/* GET LISTINGS BY SEARCH */
const searchListings = async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.findAll({ include: User });
    } else {
      listings = await Listing.findAll({
        where: {
          [Sequelize.Op.or]: [
            { category: { [Sequelize.Op.like]: `%${search}%` } },
            { title: { [Sequelize.Op.like]: `%${search}%` } },
          ],
        },
        include: User,
      });
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
  }
};

/* LISTING DETAILS */
const getListingDetails = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findByPk(listingId, { include: User });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found!" });
    }

    res.status(200).json(listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Listing cannot be found!", error: err.message });
  }
};

module.exports = {
  createListing,
  getListingsByCategory,
  searchListings,
  getListingDetails,
  upload, // Export upload middleware for use in routes
};
