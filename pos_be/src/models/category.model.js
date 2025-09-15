const db = require("../database/db.config");

// ✅ Get all categories
const getAllCategories = async () =>
  await db("categories").select("categoryId", "categoryName", "description");

// ✅ Get category by ID
const getCategoryById = async (categoryId) =>
  await db("categories")
    .select("categoryId", "categoryName", "description")
    .where({ categoryId })
    .first();

// ✅ Insert new category
const insertCategory = async (data) => await db("categories").insert(data);

// ✅ Update category by ID
const updateCategory = async (categoryId, data) =>
  await db("categories").where({ categoryId }).update(data);

// ✅ Delete category by ID
const deleteCategory = async (categoryId) =>
  await db("categories").where({ categoryId }).del();

module.exports = {
  getAllCategories,
  getCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
};
