const db = require("../database/db.config");

const getAllUsers = async () =>
  await db
    .select(
      "u.userId",
      "u.username",
      "u.email",
      "u.password",
      "u.roleId",
      "u.fullname",
      "u.isActive",
      "u.createdAt",
      "u.updatedAt",
      "u.positionId",
      "r.roleName",
      "p.positionName"
    )
    .from("users as u")
    .innerJoin("roles as r", "r.roleId", "u.roleId")
    .innerJoin("positions as p", "p.positionId", "u.positionId");

const getUserByUsername = async (username) =>
  await db("users").where({ username }).first();

const insert = async (data) => await db("users").insert(data);

// ✅ Update user berdasarkan userId
const updateUser = async (username, data) =>
  await db("users")
    .where({ username })
    .update({
      ...data,
      updatedAt: db.fn.now(),
    });

// ✅ Delete user berdasarkan userId
const deleteUser = async (userId) => await db("users").where({ userId }).del();

module.exports = {
  getAllUsers,
  insert,
  updateUser,
  deleteUser,
  getUserByUsername,
};
