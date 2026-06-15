const orderService =
require("../services/orderService");

const getOrders = (req,res)=>{
    res.json(
        orderService.getOrders()
    );
};

const createOrder = (req,res)=>{

    orderService.createOrder(
        req.body
    );

    res.json({
        message:"Order Placed"
    });
};

const getOrderDetails =
(req,res)=>{

    res.json(
        orderService.getOrderDetails()
    );
};

const updateOrder = (req,res)=>{

    const order =
        orderService.updateOrder(
            req.params.id,
            req.body
        );

    if(!order){
        return res.status(404).json({
            message:"Order Not Found"
        });
    }

    res.json({
        message:"Order Updated",
        order
    });
};

const deleteOrder = (req,res)=>{

    const deleted =
        orderService.deleteOrder(
            req.params.id
        );

    if(!deleted){
        return res.status(404).json({
            message:"Order Not Found"
        });
    }

    res.json({
        message:"Order Deleted"
    });
};

module.exports = {
    getOrders,
    createOrder,
    getOrderDetails,
    updateOrder,
    deleteOrder
};