const DataTypes = require("sequelize");
const db = require("../config/database");

const Review = sequelize.define("review", {
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
Review.sync();
module.exports = Review;
