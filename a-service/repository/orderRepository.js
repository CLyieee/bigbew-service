// repository/orderRepository.js

const Order = require("../models/orderModel");

// Create a new order in the database
const createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

// Find all orders
const findAllOrders = async () => {
  return await Order.find(); // Fetch all orders
};

// Find an order by its order number
const findByOrderNumber = async (orderNumber) => {
  return await Order.findOne({ orderNumber });
};

// Update the order
const updateOrder = async (orderNumber, updateData) => {
  return await Order.findOneAndUpdate(
    { orderNumber },
    updateData,
    { new: true } // Return the updated document
  );
};

// Export repository functions
module.exports = {
  createOrder,
  findAllOrders,
  findByOrderNumber,
  updateOrder, // Add this line
};
