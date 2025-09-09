const RoleModel = require("../../models/roles.model");
const api = require("../../tools/common");
const socket = require("../../services/socket.service");

// ✅ Get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await RoleModel.getAllRoles();
    return api.success(res, roles);
  } catch (error) {
    console.error("❌ Error in getRoles:", error);
    return api.error(res, "Error fetching roles", 500);
  }
};

// ✅ Get role by ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await RoleModel.getRoleById(id);
    if (!role) {
      return api.error(res, "Role not found", 404);
    }
    return api.success(res, role);
  } catch (error) {
    console.error("❌ Error in getRoleById:", error);
    return api.error(res, "Error fetching role", 500);
  }
};

// ✅ Create new role
const createRole = async (req, res) => {
  try {
    const data = req.body;
    await RoleModel.insertRole(data);

    // 🔔 Emit ke semua client
    socket.emit("role:created", data);

    return api.success(res, "Role created successfully");
  } catch (error) {
    console.error("❌ Error in createRole:", error);
    return api.error(res, "Error creating role", 500);
  }
};

// ✅ Update role
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await RoleModel.updateRole(id, data);

    // 🔔 Emit ke semua client
    socket.emit("role:updated", { id, ...data });

    return api.success(res, "Role updated successfully");
  } catch (error) {
    console.error("❌ Error in updateRole:", error);
    return api.error(res, "Error updating role", 500);
  }
};

// ✅ Delete role
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await RoleModel.deleteRole(id);

    // 🔔 Emit ke semua client
    socket.emit("role:deleted", { id });

    return api.success(res, "Role deleted successfully");
  } catch (error) {
    console.error("❌ Error in deleteRole:", error);
    return api.error(res, "Error deleting role", 500);
  }
};

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
