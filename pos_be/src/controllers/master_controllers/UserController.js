const UserModel = require("../../models/user.model");
const { hashPasword } = require("../../services/auth.service");
const api = require("../../tools/common");
const socket = require("../../services/socket.service");

// ✅ Get all users
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    return api.success(res, users);
  } catch (error) {
    console.error("❌ Error in getUsers:", error);
    return api.error(res, "Error fetching users", 500);
  }
};

// ✅ Create new user
const createUser = async (req, res) => {
  try {
    let data = req.body;

    let hashedPassword = await hashPasword(data.password);

    if (!hashedPassword) {
      console.error("❌ Password hashing failed!");
      return api.error(res, "Hashed Failure!", 500);
    }

    data.password = hashedPassword;

    const existingUser = await UserModel.getUserByUsername(data.username);
    if (existingUser) {
      return api.error(res, "Username already exists", 400);
    }

    await UserModel.insert(data);

    // 🔔 Emit event ke semua client
    socket.emit("user:created", { username: data.username });

    return api.success(res, "User created successfully");
  } catch (error) {
    console.error("❌ Error in createUser:", error);
    return api.error(res, "Error creating user", 500);
  }
};

// ✅ Update user
const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const data = req.body;

    await UserModel.updateUser(username, data);

    // 🔔 Emit event ke semua client
    socket.emit("user:updated", { username, data });

    return api.success(res, "User updated successfully");
  } catch (error) {
    console.error("❌ Error in updateUser:", error);
    return api.error(res, "Error updating user", 500);
  }
};

// ✅ Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await UserModel.deleteUser(id);

    // 🔔 Emit event ke semua client
    socket.emit("user:deleted", { id });

    return api.success(res, "User deleted successfully");
  } catch (error) {
    console.error("❌ Error in deleteUser:", error);
    return api.error(res, "Error deleting user", 500);
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
