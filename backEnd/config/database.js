// config/database.js

const { Sequelize } = require("sequelize");
//add the IP adress for postgrest in docker
const sequelize = new Sequelize("ReGovDatabase", "postgres", "12345", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

//check connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to postgreSQL has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the postgreSQL database:", error);
  });

//this code to create database if not exist

async function createDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database created successfully!");
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    sequelize.close(); // Close the connection when done.
  }
}

createDatabase();

module.exports = sequelize;
