const orderRepository = require("../repository/orderRepository");

// Create a new order
const createOrder = async (orderData) => {
  try {
    // Check if the orderNumber already exists
    const existingOrder = await orderRepository.findByOrderNumber(orderData.orderNumber);
    
    if (existingOrder) {
      throw new Error("Order number already exists");
    }

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

// Fetch an order by order number
const getOrderByNumber = async (orderNumber) => {
  try {
    const order = await orderRepository.findByOrderNumber(orderNumber); // Call repository function to find by order number

    if (!order) {
      throw new Error("Order not found");
    }

    return order; // Return the found order
  } catch (error) {
    throw new Error("Failed to fetch order: " + error.message);
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
  getOrderByNumber, // Add the new function to the exports
  updateOrder,
};
