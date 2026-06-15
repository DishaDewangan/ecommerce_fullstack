const orders =
require("../models/orderModel");

const users =
require("../models/userModel");

const products =
require("../models/productModel");

const getOrders = () => orders;

const createOrder = (order) =>
    orders.push(order);

const getOrderDetails = () => {

    return orders.map(order => {

        const user = users.find(
            u => u.id == order.userId
        );

        const product = products.find(
            p => p.id == order.productId
        );

        return {
            orderId: order.id,
            customer: user?.name,
            product: product?.name,
            quantity: order.quantity,
            totalPrice:
                product?.price * order.quantity
        };
    });
};

const updateOrder = (id, data) => {

    const order = orders.find(
        o => o.id == id
    );

    if (!order) return null;

    order.quantity =
        data.quantity || order.quantity;

    return order;
};

const deleteOrder = (id) => {

    const index = orders.findIndex(
        o => o.id == id
    );

    if (index === -1) return false;

    orders.splice(index, 1);

    return true;
};

module.exports = {
    getOrders,
    createOrder,
    getOrderDetails,
    updateOrder,
    deleteOrder
};