const express = require("express");

const router = express.Router();

const orderHandler =
require("../handlers/orderHandler");

router.get("/",
orderHandler.getOrders);

router.post("/",
orderHandler.createOrder);

router.get("/details/all",
orderHandler.getOrderDetails);

router.put("/:id",
orderHandler.updateOrder);

router.delete("/:id",
orderHandler.deleteOrder);

module.exports = router;