const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const orderRoutes = require("./routes/orderRoutes");
const { API_ENDPOINTS } = require("./config/APIconfig");
const { constants } = require("./config/constantsConfig");

const PORT = process.env.PORT || constants.PORT;
const app = express();
const server = http.createServer(app);

// CORS Options
const corsOptions = {
  origin: "https://bigbrew-app.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json()); // Parse JSON bodies

// Initialize Pusher with your credentials
const pusher = new Pusher({
  appId: "1888068",
  key: "a8f6e6479ccbf226115c",
  secret: "fe1203825f03aa366a92",
  cluster: "ap1",
  useTLS: true,
});

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URL ||
      "mongodb+srv://bms:QoAQEpD0XfeVBrNj@cluster0.mbzgw.mongodb.net/mbs?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    server.listen(PORT, () => {
      console.log(`${constants.SUCCESS.SERVER} ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`${constants.ERROR.CONNECTION_FAILED}`, error);
  });

// Register the order routes
app.use(API_ENDPOINTS.MAIN.DEFAULT, orderRoutes);

// // Example of triggering an event with Pusher
// app.post('/api/order', (req, res) => {
//   const orderData = req.body;

//   // Here you would save your order data to the database

//   // Trigger the event to notify clients
//   pusher.trigger('orders', 'new-order', {
//     orderData: orderData
//   });

//   res.status(200).send("Order created successfully.");
// });
