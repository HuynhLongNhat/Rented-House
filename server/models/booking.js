"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init(
    {
      customerId: DataTypes.INTEGER,
      hostId: DataTypes.INTEGER,
      listingId: DataTypes.INTEGER,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
      totalPrice: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
