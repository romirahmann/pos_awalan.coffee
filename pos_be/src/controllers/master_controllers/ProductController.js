const ProductModel = require("../../models/product.model");
const api = require("../../tools/common");
const socket = require("../../services/socket.service");
const path = require("path");
const fs = require("fs");

// ✅ Get all products
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.getAllProducts();
    return api.success(res, products);
  } catch (error) {
    console.error("❌ Error in getProducts:", error);
    return api.error(res, "Error fetching products", 500);
  }
};

// ✅ Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.getProductById(id);
    if (!product) return api.error(res, "Product not found", 404);
    return api.success(res, product);
  } catch (error) {
    console.error("❌ Error in getProductById:", error);
    return api.error(res, "Error fetching product", 500);
  }
};

// ✅ Create new product
const createProduct = async (req, res) => {
  try {
    const image = req.file;
    const data = req.body;
    console.log(image, data);

    let metaData = {
      categoryId: data.categoryId,
      productName: data.productName,
      description: data.description,
      imageUrl: image.path,
      fileName: image.filename,
      price: data.price,
    };
    const productId = await ProductModel.insertProduct(metaData);

    // 🔔 Emit event ke semua client
    socket.emit("product:created", { productId, ...data });

    return api.success(res, { productId, fileName: metaData.fileName });
  } catch (error) {
    console.error("❌ Error in createProduct:", error);
    return api.error(res, "Error creating product", 500);
  }
};

// ✅ Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Update timestamp
    data.updatedAt = new Date();

    await ProductModel.updateProduct(id, data);

    // 🔔 Emit event
    socket.emit("product:updated", { id, ...data });

    return api.success(res, "Product updated successfully");
  } catch (error) {
    console.error("❌ Error in updateProduct:", error);
    return api.error(res, "Error updating product", 500);
  }
};

// ✅ Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModel.deleteProduct(id);

    // 🔔 Emit event
    socket.emit("product:deleted", { id });

    return api.success(res, "Product deleted successfully");
  } catch (error) {
    console.error("❌ Error in deleteProduct:", error);
    return api.error(res, "Error deleting product", 500);
  }
};

const getFile = (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.resolve(
      __dirname,
      "../../../uploads/images",
      filename
    );

    console.log("DEBUG → filePath:", filePath);

    if (!fs.existsSync(filePath)) {
      return api.error(res, "File Not Found!", 404);
    }

    return res.sendFile(filePath);
  } catch (err) {
    console.error("❌ Error in getFile:", err);
    return api.error(res, "Error fetching image", 500);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFile,
};
