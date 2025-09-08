const db = require("../database/db.config");

// ✅ Get all positions
const getAllPositions = async () =>
  await db("positions").select("positionId", "positionName", "description");

// ✅ Get position by ID
const getPositionById = async (positionId) =>
  await db("positions")
    .select("positionId", "positionName", "description")
    .where({ positionId })
    .first();

// ✅ Insert new position
const insertPosition = async (data) => await db("positions").insert(data);

// ✅ Update position by ID
const updatePosition = async (positionId, data) =>
  await db("positions").where({ positionId }).update(data);

// ✅ Delete position by ID
const deletePosition = async (positionId) =>
  await db("positions").where({ positionId }).del();

module.exports = {
  getAllPositions,
  getPositionById,
  insertPosition,
  updatePosition,
  deletePosition,
};
