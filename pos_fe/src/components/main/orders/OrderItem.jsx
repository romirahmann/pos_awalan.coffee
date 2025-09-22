/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";

export default function OrderItems({ items = [], total }) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  const list = useMemo(() => {
    return items.filter((i) => {
      const statusMatch =
        filterStatus === "All" ? true : i.status === filterStatus;
      const categoryMatch =
        filterCategory === "All" ? true : i.categoryName === filterCategory;
      return statusMatch && categoryMatch;
    });
  }, [filterStatus, filterCategory, items]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Making":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Pending":
        return "bg-gray-100 text-gray-700 border border-gray-300";
      case "Cancelled":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const getCategoryColor = (cat) => {
    return cat === "Food"
      ? "bg-orange-100 text-orange-700 border border-orange-300"
      : "bg-blue-100 text-blue-700 border border-blue-300";
  };

  // Dummy order info
  const orderInfo = {
    orderId: "ORD-20250915-001",
    customerName: "John Doe",
    orderType: "Dine-In",
    status: "Paid",
    createdAt: "2025-09-15 10:00",
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
        <h2 className="text-xl sm:text-2xl font-bold">Order Items</h2>
      </div>

      {/* Order Info */}
      <div className="grid sm:grid-cols-2 gap-3 p-4 border rounded-xl bg-gray-50 text-sm sm:text-base">
        <div>
          <span className="font-medium text-gray-600">Order ID:</span>{" "}
          <span className="font-semibold text-gray-900">
            {orderInfo.orderId}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Customer:</span>{" "}
          <span className="font-semibold text-gray-900">
            {orderInfo.customerName}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Type:</span>{" "}
          <span className="font-semibold text-gray-900">
            {orderInfo.orderType}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Status:</span>{" "}
          <span
            className={`px-2 py-0.5 rounded-full font-medium text-xs sm:text-sm ${getStatusColor(
              orderInfo.status
            )}`}
          >
            {orderInfo.status}
          </span>
        </div>
        <div className="sm:col-span-2">
          <span className="font-medium text-gray-600">Created At:</span>{" "}
          <span className="text-gray-800">{orderInfo.createdAt}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        {/* Status Filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-600">Status:</span>
          {["All", "Pending", "Making", "Ready", "Cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
                filterStatus === s
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-600">Category:</span>
          {["All", "Food", "Drink"].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCategory(c)}
              className={`px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${
                filterCategory === c
                  ? "bg-purple-600 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* List Items */}
      <div className="space-y-4">
        {list.map((i) => (
          <div
            key={i.orderItemId || `${i.productId}-${i.status}`}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-2xl p-4 bg-gray-50 hover:shadow-lg transition"
          >
            {/* LEFT */}
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-gray-900 text-base sm:text-lg">
                  {i.productName}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(
                    i.categoryName
                  )}`}
                >
                  {i.categoryName}
                </span>
              </div>

              <span className="text-sm text-gray-600">
                {i.quantity} × Rp {i.price.toLocaleString("id-ID")}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {i.date && (
                  <span className="text-xs text-gray-400">{i.date}</span>
                )}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                    i.status
                  )}`}
                >
                  {i.status}
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="mt-3 md:mt-0 flex flex-col items-end gap-2 min-w-[100px] sm:min-w-[120px]">
              <span className="font-bold text-green-600 text-base sm:text-lg">
                Rp {(i.quantity * i.price).toLocaleString("id-ID")}
              </span>

              {i.status !== "Ready" && i.status !== "Cancelled" && (
                <button
                  onClick={() => console.log("Mark Ready:", i.productName)}
                  className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Mark Ready
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {list.length === 0 && (
          <p className="text-center text-gray-500 py-6 text-sm sm:text-base">
            No items found for <strong>{filterStatus}</strong> status and{" "}
            <strong>{filterCategory}</strong> category
          </p>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-lg sm:text-xl border-t pt-4">
        <span>Total</span>
        <span>
          Rp{" "}
          {(
            total || items.reduce((acc, i) => acc + i.price * i.quantity, 0)
          ).toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );
}
