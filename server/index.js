const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/dbConnnection");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./routes/auth"));

app.use("/api", require("./routes/property"));

app.use("/api/interests", require("./routes/buyer"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
