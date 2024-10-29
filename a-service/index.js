const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const orderRoutes = require("./routes/orderRoutes");
const { API_ENDPOINTS } = require("./config/APIconfig");
const { constants } = require("./config/constantsConfig");

const PORT = process.env.PORT || constants.PORT;
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS options
const io = new Server(server, {
  cors: {
    origin: "https://bigbrew-app.vercel.app", // Allow requests from this origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware for CORS with options
app.use(cors({
  origin: "https://bigbrew-app.vercel.app",
  methods: ["GET", "POST"],
  credentials: true, // Allow credentials
}));

app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`${constants.SUCCESS.SERVER} ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`${constants.ERROR.CONNECTION_FAILED}`, error);
  });

// Middleware to attach io instance to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Register the order routes
app.use(API_ENDPOINTS.MAIN.DEFAULT, orderRoutes);

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Emit an event to the client confirming the connection
  socket.emit("connectionStatus", { status: "connected" });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
