const db = require("../database/db.config");

// ✅ Get all products
const getAllProducts = async () =>
  await db("products as p")
    .select(
      "p.productId",
      "p.categoryId",
      "p.subCategoryId",
      "p.productName",
      "p.description",
      "p.imageUrl",
      "p.isAvailable",
      "p.price",
      "p.costPrice",
      "p.createdAt",
      "p.updatedAt",
      "p.fileName",
      "c.categoryName",
      "sc.subCategoryName"
    )
    .join("categories as c", "c.categoryId", "p.categoryId")
    .leftJoin("sub_categories as sc", "sc.subCategoryId", "p.subCategoryId");

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
      "p.costPrice",
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
