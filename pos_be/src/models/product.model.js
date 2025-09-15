const db = require("../database/db.config");

// ✅ Get all products
const getAllProducts = async () =>
  await db("products")
    .select(
      "p.productId",
      "p.categoryId",
      "p.productName",
      "p.description",
      "p.imageUrl",
      "p.isAvailable",
      "p.price",
      "p.createdAt",
      "p.updatedAt",
      "p.fileName",
      "c.categoryName"
    )
    .from("products as p", "p.categoryId", "c.categoryId")
    .join("categories as c", "c.categoryId", "p.categoryId");

// ✅ Get product by ID
const getProductById = async (productId) =>
  await db("products")
    .select(
      "p.productId",
      "p.categoryId",
      "p.productName",
      "p.description",
      "p.imageUrl",
      "p.isAvailable",
      "p.price",
      "p.createdAt",
      "p.updatedAt",
      "p.fileName",
      "c.categoryName"
    )
    .from("products as p", "p.categoryId", "c.categoryId")
    .join("categories as c", "c.categoryId", "p.categoryId")
    .where({ productId })
    .first();

// ✅ Insert new product
const insertProduct = async (data) => await db("products").insert(data);

// ✅ Update product by ID
const updateProduct = async (productId, data) =>
  await db("products").where({ productId }).update(data);

// ✅ Delete product by ID
const deleteProduct = async (productId) =>
  await db("products").where({ productId }).del();

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
