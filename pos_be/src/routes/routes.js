var express = require("express");
var router = express.Router();
const path = require("path");
const { verifyToken, accessControl } = require("../services/auth.service");

const authRoutes = require("../routes/utility_routes/auth.routes");
const masterRoutes = require("../routes/master_routes/master.routes");

router.use("/auth", authRoutes);
router.use("/master", masterRoutes);

module.exports = router;
