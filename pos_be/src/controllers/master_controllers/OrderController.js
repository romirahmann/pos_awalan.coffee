const OrderModel = require("../../models/order.model");
const api = require("../../tools/common");
const socket = require("../../services/socket.service");

// ✅ Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.getAllOrders();
    return api.success(res, orders);
  } catch (error) {
    console.error("❌ Error in getOrders:", error);
    return api.error(res, "Error fetching orders", 500);
  }
};

// ✅ Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.getOrderById(id);
    if (!order) return api.error(res, "Order not found", 404);
    return api.success(res, order);
  } catch (error) {
    console.error("❌ Error in getOrderById:", error);
    return api.error(res, "Error fetching order", 500);
  }
};

// ✅ Create new order
const createOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const data = {
      customerName: "Customer",
      notes: "",
      status: "pending",
      userId: userId,
    };

    const orderId = await OrderModel.insertOrder(data);

    // 🔔 Emit ke semua client
    socket.emit("order:created", { orderId, ...data });

    return api.success(res, orderId);
  } catch (error) {
    console.error("❌ Error in createOrder:", error);
    return api.error(res, "Error creating order", 500);
  }
};

// ✅ Update order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    await OrderModel.updateOrder(id, data);

    // 🔔 Emit ke semua client
    socket.emit("order:updated", { id, ...data });

    return api.success(res, "Order updated successfully");
  } catch (error) {
    console.error("❌ Error in updateOrder:", error);
    return api.error(res, "Error updating order", 500);
  }
};

// ✅ Delete order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderModel.deleteOrder(id);

    // 🔔 Emit ke semua client
    socket.emit("order:deleted", { id });

    return api.success(res, "Order deleted successfully");
  } catch (error) {
    console.error("❌ Error in deleteOrder:", error);
    return api.error(res, "Error deleting order", 500);
  }
};

// ✅ Create Detail Order
const checkout = async (req, res) => {
  try {
    let data = req.body;
    let orderId = data.orderId;
    let dataOrder = {
      customerName: data.customerName,
      orderType: data.orderType,
      status: "paid",
      totalAmount: data.total,
      discount: (data.total * parseInt(data.discount)) / 100,
      finalAmount: data.total - (data.total * parseInt(data.discount)) / 100,
    };
    let dataSubOrder = data.items.map((item) => ({
      orderId: orderId,
      productId: item.productId,
      quantity: item.qty,
      subTotal: item.price * item.qty,
    }));
    await OrderModel.checkout(dataSubOrder, dataOrder, orderId);
    // 🔔 Emit ke semua client
    socket.emit("checkout:created", "Checkout Successfully!");
    return api.success(res, { dataOrder, dataSubOrder });
  } catch (error) {
    console.log(error);
    return api.error(res, "Internal Server Error", 500);
  }
};

// ✅ Get all item
const getAllItemById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await OrderModel.getItemById(id);
    return api.success(res, data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  checkout,
  getAllItemById,
};
