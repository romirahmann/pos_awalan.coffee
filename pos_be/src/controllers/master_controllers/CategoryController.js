const CategoryModel = require("../../models/category.model");
const api = require("../../tools/common");
const socket = require("../../services/socket.service");

// ✅ Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.getAllCategories();
    return api.success(res, categories);
  } catch (error) {
    console.error("❌ Error in getCategories:", error);
    return api.error(res, "Error fetching categories", 500);
  }
};

// ✅ Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.getCategoryById(id);
    if (!category) return api.error(res, "Category not found", 404);
    return api.success(res, category);
  } catch (error) {
    console.error("❌ Error in getCategoryById:", error);
    return api.error(res, "Error fetching category", 500);
  }
};

// ✅ Create new category
const createCategory = async (req, res) => {
  try {
    const data = req.body;
    const categoryId = await CategoryModel.insertCategory(data);

    socket.emit("category:created", { categoryId, ...data });

    return api.success(res, categoryId);
  } catch (error) {
    console.error("❌ Error in createCategory:", error);
    return api.error(res, "Error creating category", 500);
  }
};

// ✅ Update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    await CategoryModel.updateCategory(id, data);

    socket.emit("category:updated", { id, ...data });

    return api.success(res, "Category updated successfully");
  } catch (error) {
    console.error("❌ Error in updateCategory:", error);
    return api.error(res, "Error updating category", 500);
  }
};

// ✅ Delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await CategoryModel.deleteCategory(id);

    socket.emit("category:deleted", { id });

    return api.success(res, "Category deleted successfully");
  } catch (error) {
    console.error("❌ Error in deleteCategory:", error);
    return api.error(res, "Error deleting category", 500);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
