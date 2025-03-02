const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const diaryRoutes = require("./routes/diaryRoutes");
const { API_ENDPOINTS } = require("./config/apiConfig");

// Middleware
app.use(
  cors({
    origin: ["https://ojt-app-rho.vercel.app"], // Ensure this matches exactly
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
   
  })
);

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use(API_ENDPOINTS.MAIN.DEFAULT, userRoutes);
app.use(API_ENDPOINTS.MAIN.DEFAULT, diaryRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
