const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const orderRoutes = require("./routes/orderRoutes"); // Ensure the path is correct
const { API_ENDPOINTS } = require("./config/APIconfig");
const { constants } = require("./config/constantsConfig");

const PORT = process.env.PORT || constants.PORT; // Use a port from environment variable or constants
const app = express();
const server = http.createServer(app); // Create HTTP server instance

// Initialize Socket.IO with CORS options
const io = new Server(server, {
  cors: {
    origin: "https://bigbrew-app.vercel.app", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow specific methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  },
});

// Middleware
app.use(cors()); // Use CORS middleware
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // Start the server only after MongoDB connection is established
    server.listen(PORT, () => {
      console.log(${constants.SUCCESS.SERVER} ${PORT});
    });
  })
  .catch((error) => {
    console.error(${constants.ERROR.CONNECTION_FAILED}, error);
  });

// Middleware to attach io instance to request
app.use((req, res, next) => {
  req.io = io; // Attach the Socket.IO instance to the request object
  next();
});

// Register the order routes
app.use(API_ENDPOINTS.MAIN.DEFAULT, orderRoutes);

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id); // Log when a user connects

  // Emit an event to the client confirming the connection
  socket.emit("connectionStatus", { status: "connected" });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id); // Log when a user disconnects
  });
});
