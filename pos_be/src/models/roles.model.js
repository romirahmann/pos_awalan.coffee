const db = require("../database/db.config");

// ✅ Get all roles
const getAllRoles = async () =>
  await db("roles").select("roleId", "roleName", "description");

// ✅ Get role by ID
const getRoleById = async (roleId) =>
  await db("roles")
    .select("roleId", "roleName", "description")
    .where({ roleId })
    .first();

// ✅ Insert new role
const insertRole = async (data) => await db("roles").insert(data);

// ✅ Update role by ID
const updateRole = async (roleId, data) =>
  await db("roles").where({ roleId }).update(data);

// ✅ Delete role by ID
const deleteRole = async (roleId) => await db("roles").where({ roleId }).del();

module.exports = {
  getAllRoles,
  getRoleById,
  insertRole,
  updateRole,
  deleteRole,
};
