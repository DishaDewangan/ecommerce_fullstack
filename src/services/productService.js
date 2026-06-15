const products =
require("../models/productModel");

const getProducts = () => products;

const getProductById = (id) =>
    products.find(p => p.id == id);

const createProduct = (product) =>
    products.push(product);

const updateProduct = (id, data) => {

    const product = products.find(
        p => p.id == id
    );

    if (!product) return null;

    product.name =
        data.name || product.name;

    product.price =
        data.price || product.price;

    return product;
};

const deleteProduct = (id) => {

    const index = products.findIndex(
        p => p.id == id
    );

    if (index === -1) return false;

    products.splice(index, 1);

    return true;
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};