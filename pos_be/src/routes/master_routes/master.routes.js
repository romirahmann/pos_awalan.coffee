var express = require("express");
var router = express.Router();

const upload = require("../../services/upload.service");
const UserController = require("../../controllers/master_controllers/UserController");
const RoleController = require("../../controllers/master_controllers/RoleController");
const PositionController = require("../../controllers/master_controllers/PositionController");
const OrderController = require("../../controllers/master_controllers/OrderController");
const ProductController = require("../../controllers/master_controllers/ProductController");
const CategoryController = require("../../controllers/master_controllers/CategoryController");

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

// PRODUCTS
router.get("/products", ProductController.getProducts);
router.get("/product/:id", ProductController.getProductById);
router.post(
  "/product",
  upload.single("image"),
  ProductController.createProduct
);
router.put("/product/:id", ProductController.updateProduct);
router.put(
  "/img-product/:id",
  upload.single("image"),
  ProductController.updateProductImg
);
router.delete("/product/:id", ProductController.deleteProduct);
router.get("/get-image/:filename", ProductController.getFile);

// CATEGORIES
router.get("/categories", CategoryController.getCategories);
router.get("/category/:id", CategoryController.getCategoryById);
router.post("/category", CategoryController.createCategory);
router.put("/category/:id", CategoryController.updateCategory);
router.delete("/category/:id", CategoryController.deleteCategory);

module.exports = router;
