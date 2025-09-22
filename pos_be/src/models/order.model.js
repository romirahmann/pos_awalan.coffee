const db = require("../database/db.config");

// 🔹 Generate order code berdasarkan tanggal dan counter
const generateOrderCode = async (trx) => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const prefix = "AWLN";

  // Ambil counter hari ini
  let counterRow = await db("counters")
    .transacting(trx)
    .where({ counter_date: today })
    .first();

  let sequence = 1;
  if (!counterRow) {
    await db("counters")
      .transacting(trx)
      .insert({ counter_date: today, counter_value: 1 });
  } else {
    sequence = counterRow.counter_value + 1;
    await db("counters")
      .transacting(trx)
      .where({ counter_date: today })
      .update({ counter_value: sequence });
  }

  return `${prefix}-${today.replace(/-/g, "")}-${String(sequence).padStart(
    3,
    "0"
  )}`;
};

// ✅ Get all orders
const getAllOrders = async () =>
  await db("orders").select(
    "orderId",
    "orderCode",
    "userId",
    "customerName",
    "status",
    "orderType",
    "totalAmount",
    "finalAmount",
    "discount",
    "notes",
    "createdAt",
    "updatedAt"
  );

// ✅ Get order by ID
const getOrderById = async (orderId) =>
  await db("orders")
    .select(
      "orderId",
      "orderCode",
      "userId",
      "customerName",
      "status",
      "orderType",
      "totalAmount",
      "finalAmount",
      "discount",
      "notes",
      "createdAt",
      "updatedAt"
    )
    .where({ orderId })
    .first();

// ✅ Insert new order with transaction
const insertOrder = async (data) => {
  return await db.transaction(async (trx) => {
    try {
      const orderCode = await generateOrderCode(trx);
      const orderData = {
        ...data,
        orderCode,
        status: data.status || "pending",
      };

      const [orderId] = await db("orders").transacting(trx).insert(orderData);
      return orderId;
    } catch (error) {
      throw error; // trx otomatis rollback jika error
    }
  });
};

// ✅ Update order by ID
const updateOrder = async (orderId, data) =>
  await db("orders")
    .where({ orderId })
    .update({ ...data, updatedAt: new Date() });

// ✅ Delete order by ID
const deleteOrder = async (orderId) =>
  await db("orders").where({ orderId }).del();

// ✅ Create Detail Order
const checkout = async (dataSubItem, dataOrder, orderId) => {
  return await db.transaction(async (trx) => {
    try {
      await db("order_items").transacting(trx).insert(dataSubItem);

      await db("orders").transacting(trx).where({ orderId }).update(dataOrder);
    } catch (error) {
      throw error;
    }
  });
};

// ✅ getItemByOrderId
const getItemById = async (id) =>
  await db("order_items as oi")
    .select(
      "oi.orderId",
      "oi.productId",
      "oi.quantity",
      "oi.subtotal",
      "oi.createdAt",
      "oi.updatedAt",
      "o.orderCode",
      "o.userId",
      "o.customerName",
      "o.status",
      "o.orderType",
      "o.totalAmount",
      "o.finalAmount",
      "o.discount",
      "p.productName",
      "p.description",
      "p.imageUrl",
      "p.isAvailable",
      "p.price",
      "p.costPrice",
      "p.fileName",
      "c.categoryName",
      "c.subCategoryId",
      "sc.subCategoryName"
    )
    .join("orders as o", "o.orderId", "oi.orderId")
    .leftJoin("products as p", "p.productId", "oi.productId")
    .leftJoin("categories as c", "c.categoryId", "p.categoryId")
    .leftJoin("sub_categories as sc", "sc.subCategoryId", "p.subCategoryId")
    .where("oi.orderId", id);

module.exports = {
  getAllOrders,
  getOrderById,
  insertOrder,
  updateOrder,
  deleteOrder,
  checkout,
  getItemById,
};
