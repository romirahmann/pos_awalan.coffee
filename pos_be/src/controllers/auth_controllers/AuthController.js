const authModel = require("../../models/auth.model");
const { verifyPassword } = require("../../services/auth.service");
const api = require("../../tools/common");

const login = async (req, res) => {
  let { username, password } = req.body;
  try {
    if (!username || !password)
      return api.error(res, "Username & Password Required!", 401);

    const user = await authModel.login(username);
    if (!user) return api.error(res, "User Not Found!", 404);

    const passwordIsMatch = await verifyPassword(password, user.password);
    if (!passwordIsMatch) return api.error(res, "Incorrect Password!", 401);

    const userData = {
      userId: user.userId,
      username: user.username,
      fullname: user.fullname,
      roleId: user.roleId,
      email: user.email,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
      roleId: user.roleId,
      roleName: user.roleName,
      positionId: user.positionId,
      positionName: user.positionName,
    };

    return api.success(res, userData);
  } catch (error) {
    console.log(error);
    return api.error(res, "Login Failed!", 500);
  }
};

module.exports = {
  login,
};
