const express = require("express");
const router = express.Router();
const orderService = require("../services/orderService");
const { API_ENDPOINTS } = require("../config/APIconfig");
const { body, validationResult } = require("express-validator");
const Pusher = require("pusher");

// Initialize Pusher
const pusher = new Pusher({
  appId: "1888068",
  key: "a8f6e6479ccbf226115c",
  secret: "fe1203825f03aa366a92",
  cluster: "ap1",
  useTLS: true,
});

// Create Order route
router.post(API_ENDPOINTS.ORDER.CREATE, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const order = await orderService.createOrder(req.body);
    // Trigger new order event to Pusher
    pusher.trigger("orders", "new-order", {
      orderData: order,
    });
    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

// Get All Orders route
router.get(API_ENDPOINTS.ORDER.GET_ALL, async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

// Update Order route
router.put(API_ENDPOINTS.ORDER.UPDATE_STATUS, async (req, res) => {
  const { orderNumber } = req.params;
  const { items, totalPrice, status } = req.body;

  try {
    const updatedOrder = await orderService.updateOrder(orderNumber, {
      items,
      totalPrice,
      status,
    });

    // Trigger event if order status updated
    pusher.trigger("orders", "order-updated", {
      orderData: updatedOrder,
    }); // Notify clients of the updated order

    return res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

// Export the router
module.exports = router;
