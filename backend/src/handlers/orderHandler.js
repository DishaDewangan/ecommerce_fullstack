const {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  getOrdersByUserIdService,
  updateOrderService,
  deleteOrderService,
} = require("../services/orderService");

// Create Order
const createOrderHandler = async (req, res) => {
  try {
    const result = await createOrderService(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders
const getAllOrdersHandler = async (req, res) => {
  try {
    const orders = await getAllOrdersService();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Order By Id
const getOrderByIdHandler = async (req, res) => {
  try {
    const order = await getOrderByIdService(req.params.id);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Orders By User Id
const getOrdersByUserIdHandler = async (req, res) => {
  try {
    const orders = await getOrdersByUserIdService(req.params.userId);

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order
const updateOrderHandler = async (req, res) => {
  try {
    const result = await updateOrderService(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Order
const deleteOrderHandler = async (req, res) => {
  try {
    const result = await deleteOrderService(req.params.id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  getOrdersByUserIdHandler,
  updateOrderHandler,
  deleteOrderHandler,
};
