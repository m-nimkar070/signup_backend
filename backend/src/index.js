const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");


mongoose.connect(config.mongoose.url)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start the Express app
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

  module.exports = app;