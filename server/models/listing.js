"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Listing.init(
    {
      creator: DataTypes.INTEGER,
      category: DataTypes.STRING,
      type: DataTypes.STRING,
      streetAddress: DataTypes.STRING,
      aptSuite: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      country: DataTypes.STRING,
      guestCount: DataTypes.INTEGER,
      bedroomCount: DataTypes.INTEGER,
      bedCount: DataTypes.INTEGER,
      bathroomCount: DataTypes.INTEGER,
      amenities: DataTypes.JSON,
      listingPhotoPaths: DataTypes.JSON,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      highlight: DataTypes.STRING,
      highlightDesc: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Listing",
    }
  );
  return Listing;
};
