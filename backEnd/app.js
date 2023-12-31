//app.js
const db = require("./config/database");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const errorHandler = require("./middleware/errorHandler");
// Set EJS as the view engine
app.set("view engine", "ejs");
try {
  app.get("/", (req, res) => {
    const data = { name: "Mohammed Ba Khadher" };
    res.render("index", data);
    console.log("Connection to server has been established successfully.");
    // console.log(mod);
  });
} catch (error) {
  console.error("Unable to connect to the server:", error);
}

// routes
app.use("/users", require("./routes/userRoutes"));
app.use("/reviews", require("./routes/reviewRoutes"));
//Error handler
app.use(errorHandler);

app.listen(PORT, console.log(`Server running on port ${PORT}`));
module.exports = PORT;
module.exports = app;
