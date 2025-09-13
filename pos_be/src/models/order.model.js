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

module.exports = {
  getAllOrders,
  getOrderById,
  insertOrder,
  updateOrder,
  deleteOrder,
};
