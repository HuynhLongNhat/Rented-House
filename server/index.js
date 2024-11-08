const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const webRoutes = require("./routes/webRoutes.js"); // CommonJS require

const app = express();

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/", webRoutes);

app.listen(PORT, () => {
  console.log("jwt backend is running on the port = " + PORT);
});
