const {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
} = require("../models/orderModel");
const { getProductById, updateProduct } = require("../models/productModel");

/**
 * orderData expected shape:
 * {
 *   userId: string,
 *   items: [{ productId: string, quantity: number }],
 *   shippingAddress?: string,
 * }
 */
const createOrderService = async (orderData) => {
  if (!orderData.userId) {
    throw new Error("User ID is required");
  }

  if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
    throw new Error("At least one product with quantity is required");
  }

  // Validate items and compute total
  let totalAmount = 0
  const populatedItems = []

  for (const it of orderData.items) {
    const { productId, quantity } = it
    const qty = parseInt(quantity, 10) || 0

    if (!productId) throw new Error('productId is required for each item')
    if (qty <= 0) throw new Error('Quantity must be at least 1 for each item')

    const product = await getProductById(productId)
    if (!product) throw new Error(`Product not found: ${productId}`)

    const available = parseInt(product.quantity || 0, 10)
    if (available < qty) throw new Error(`Insufficient stock for product ${product.name}. Available: ${available}, requested: ${qty}`)

    const price = parseFloat(product.price || 0)
    totalAmount += price * qty

    populatedItems.push({
      productId,
      name: product.name,
      price,
      quantity: qty,
    })
  }

  if (totalAmount < 0) throw new Error('Total amount must be positive')

  // Create order
  const orderPayload = {
    userId: orderData.userId,
    items: populatedItems,
    totalAmount,
    status: orderData.status || 'pending',
    shippingAddress: orderData.shippingAddress || '',
    createdAt: new Date(),
  }

  const result = await createOrder(orderPayload)

  // Decrement stock for each product (best-effort; not transactional)
  for (const it of populatedItems) {
    const product = await getProductById(it.productId)
    const newQty = Math.max(0, (parseInt(product.quantity || 0, 10) - it.quantity))
    await updateProduct(it.productId, { quantity: newQty })
  }

  return result
}

const getAllOrdersService = async () => {
  return await getAllOrders();
};

const getOrderByIdService = async (id) => {
  if (!id) {
    throw new Error("Order id is required");
  }

  return await getOrderById(id);
};

const getOrdersByUserIdService = async (userId) => {
  if (!userId) {
    throw new Error("User id is required");
  }

  return await getOrdersByUserId(userId);
};

const updateOrderService = async (id, orderData) => {
  if (!id) {
    throw new Error("Order id is required");
  }

  return await updateOrder(id, orderData);
};

const deleteOrderService = async (id) => {
  if (!id) {
    throw new Error("Order id is required");
  }

  return await deleteOrder(id);
};

module.exports = {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  getOrdersByUserIdService,
  updateOrderService,
  deleteOrderService,
};
