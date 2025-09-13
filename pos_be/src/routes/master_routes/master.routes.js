var express = require("express");
var router = express.Router();

const UserController = require("../../controllers/master_controllers/UserController");
const RoleController = require("../../controllers/master_controllers/RoleController");
const PositionController = require("../../controllers/master_controllers/PositionController");
const OrderController = require("../../controllers/master_controllers/OrderController");

// USERS
router.get("/users", UserController.getUsers);
router.post("/register", UserController.createUser);
router.put("/user/:username", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

// ROLES
router.get("/roles", RoleController.getRoles);
router.get("/role/:id", RoleController.getRoleById);
router.post("/role", RoleController.createRole);
router.put("/role/:id", RoleController.updateRole);
router.delete("/role/:id", RoleController.deleteRole);

// POSITIONS
router.get("/positions", PositionController.getPositions);
router.get("/position/:id", PositionController.getPositionById);
router.post("/position", PositionController.createPosition);
router.put("/position/:id", PositionController.updatePosition);
router.delete("/position/:id", PositionController.deletePosition);

// ORDERS
router.get("/orders", OrderController.getOrders);
router.get("/order/:id", OrderController.getOrderById);
router.post("/order", OrderController.createOrder);
router.put("/order/:id", OrderController.updateOrder);
router.delete("/order/:id", OrderController.deleteOrder);

module.exports = router;
