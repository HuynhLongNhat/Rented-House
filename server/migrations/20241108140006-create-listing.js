"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Listings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      creator: {
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      streetAddress: {
        type: Sequelize.STRING,
      },
      aptSuite: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      province: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      guestCount: {
        type: Sequelize.INTEGER,
      },
      bedroomCount: {
        type: Sequelize.INTEGER,
      },
      bedCount: {
        type: Sequelize.INTEGER,
      },
      bathroomCount: {
        type: Sequelize.INTEGER,
      },
      amenities: {
        type: Sequelize.JSON,
      },
      listingPhotoPaths: {
        type: Sequelize.JSON,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      highlight: {
        type: Sequelize.STRING,
      },
      highlightDesc: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Listings");
  },
};
