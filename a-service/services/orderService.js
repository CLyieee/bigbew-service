// services/orderService.js

const orderRepository = require("../repository/orderRepository");

// Create a new order
const createOrder = async (orderData) => {
  try {
    return await orderRepository.createOrder(orderData); // Call repository function to create an order
  } catch (error) {
    throw new Error("Failed to create order: " + error.message);
  }
};

// Fetch all orders
const getAllOrders = async () => {
  try {
    return await orderRepository.findAllOrders(); // Fetch all orders
  } catch (error) {
    throw new Error("Failed to fetch orders: " + error.message);
  }
};

// Update an order
const updateOrder = async (orderNumber, updateData) => {
  try {
    const order = await orderRepository.findByOrderNumber(orderNumber);

    // Check if the order exists and if its status is "Pending"
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status !== "Pending") {
      throw new Error(
        "Order cannot be updated because its status is not 'Pending'"
      );
    }

    const updatedOrder = await orderRepository.updateOrder(
      orderNumber,
      updateData
    );
    return updatedOrder;
  } catch (error) {
    throw new Error("Failed to update order: " + error.message);
  }
};

// Export the order service functions
module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
};
