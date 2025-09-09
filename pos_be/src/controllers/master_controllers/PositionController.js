const PositionModel = require("../../models/position.model");
const api = require("../../tools/common");
const socket = require("../../services/socket.service");

// ✅ Get all positions
const getPositions = async (req, res) => {
  try {
    const positions = await PositionModel.getAllPositions();
    return api.success(res, positions);
  } catch (error) {
    console.error("❌ Error in getPositions:", error);
    return api.error(res, "Error fetching positions", 500);
  }
};

// ✅ Get position by ID
const getPositionById = async (req, res) => {
  try {
    const { id } = req.params;
    const position = await PositionModel.getPositionById(id);
    if (!position) {
      return api.error(res, "Position not found", 404);
    }
    return api.success(res, position);
  } catch (error) {
    console.error("❌ Error in getPositionById:", error);
    return api.error(res, "Error fetching position", 500);
  }
};

// ✅ Create new position
const createPosition = async (req, res) => {
  try {
    const data = req.body;
    await PositionModel.insertPosition(data);

    // 🔔 Emit ke semua client
    socket.emit("position:created", data);

    return api.success(res, "Position created successfully");
  } catch (error) {
    console.error("❌ Error in createPosition:", error);
    return api.error(res, "Error creating position", 500);
  }
};

// ✅ Update position
const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await PositionModel.updatePosition(id, data);

    // 🔔 Emit ke semua client
    socket.emit("position:updated", { id, ...data });

    return api.success(res, "Position updated successfully");
  } catch (error) {
    console.error("❌ Error in updatePosition:", error);
    return api.error(res, "Error updating position", 500);
  }
};

// ✅ Delete position
const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    await PositionModel.deletePosition(id);

    // 🔔 Emit ke semua client
    socket.emit("position:deleted", { id });

    return api.success(res, "Position deleted successfully");
  } catch (error) {
    console.error("❌ Error in deletePosition:", error);
    return api.error(res, "Error deleting position", 500);
  }
};

module.exports = {
  getPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition,
};
