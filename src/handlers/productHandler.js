const productService =
require("../services/productService");

const getProducts = (req,res)=>{
    res.json(
        productService.getProducts()
    );
};

const getProductById = (req,res)=>{
    res.json(
        productService.getProductById(
            req.params.id
        )
    );
};

const createProduct = (req,res)=>{

    productService.createProduct(
        req.body
    );

    res.json({
        message:"Product Added"
    });
};

const updateProduct = (req,res)=>{

    const product =
        productService.updateProduct(
            req.params.id,
            req.body
        );

    if(!product){
        return res.status(404).json({
            message:"Product Not Found"
        });
    }

    res.json({
        message:"Product Updated",
        product
    });
};

const deleteProduct = (req,res)=>{

    const deleted =
        productService.deleteProduct(
            req.params.id
        );

    if(!deleted){
        return res.status(404).json({
            message:"Product Not Found"
        });
    }

    res.json({
        message:"Product Deleted"
    });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};