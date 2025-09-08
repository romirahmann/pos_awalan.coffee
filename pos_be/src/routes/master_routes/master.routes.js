var express = require("express");
var router = express.Router();

const UserController = require("../../controllers/master_controllers/UserController");

// USERS
router.get("/users", UserController.getUsers);
router.post("/register", UserController.createUser);
router.put("/user/:username", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

// ROLES

// POSITIONS

module.exports = router;
