const db = require("../database/db.config");

const login = async (username) =>
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
      "u.updateAt",
      "u.positionId",
      "r.roleName",
      "p.positionName"
    )
    .from("users as u")
    .innerJoin("roles as r", "r.roleId", "u.roleId")
    .innerJoin("positions as p", "p.positionId", "u.positionId")
    .where("username", username)
    .first();

module.exports = {
  login,
};
