/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaShoppingCart, FaFilter, FaPlus } from "react-icons/fa";
import { TableOrders } from "../../../components/main/orders/TableOrders";
import api from "../../../services/axios.service";
import { Modal } from "../../../shared/Modal";
import { ConfirmNewOrder } from "../../../components/main/orders/CreateOrderForm";
import { useAlert } from "../../../store/AlertContext";
import { useAuth } from "../../../store/useAuth";
import { listenToUpdate } from "../../../services/socket.service";
import { useNavigate } from "@tanstack/react-router";

export function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    dateFrom: "",
    dateTo: "",
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const { showAlert } = useAlert();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  useEffect(() => {
    // Corrected `useEffect` cleanup function.
    const unsubscribeOrderCreated = listenToUpdate(
      "order:created",
      fetchOrders
    );
    const unsubscribeOrderUpdated = listenToUpdate(
      "order:updated",
      fetchOrders
    );
    const unsubscribeOrderDeleted = listenToUpdate(
      "order:deleted",
      fetchOrders
    );

    return () => {
      unsubscribeOrderCreated();
      unsubscribeOrderUpdated();
      unsubscribeOrderDeleted();
    };
  }, []);

  const fetchOrders = async () => {
    try {
      let res = await api.get("/master/orders", { params: filters });
      setOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddOrder = async () => {
    try {
      let res = await api.post("/master/order", { userId: user.userId });
      let id = res.data.data;
      showAlert("success", "Create Order Successfully!");
      setOpenAddModal(false);
      navigate({
        to: "/orders/detail", // ✅ Navigasi ke path yang benar
        search: { orderId: id },
      });
    } catch (error) {
      console.log(error);
      showAlert("error", "Create Order Failed!");
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-800">
          <FaShoppingCart className="text-primary" /> Orders
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 text-midnight-navy bg-gray-50 border border-midnight-navy rounded-lg hover:bg-blue-700 hover:text-white transition"
          >
            <FaFilter /> Filters
          </button>
          {user.positionName !== "Barista" ||
          user.positionName !== "Citchen" ||
          user.positionName ? (
            <button
              onClick={() => setOpenAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition bg-blue-900 hover:bg-blue-700"
            >
              <FaPlus /> New Order
            </button>
          ) : null}
        </div>
      </div>

      {/* Filter Section */}
      {filtersOpen && (
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-700">
            <FaFilter /> Filters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Status */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>

            {/* Order Type */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Order Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, type: e.target.value }))
                }
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">All Types</option>
                <option value="dine-in">Dine-In</option>
                <option value="takeaway">Takeaway</option>
                <option value="online">Online</option>
              </select>
            </div>

            {/* Date From */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Date From
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
                }
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Date To */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Date To
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
                }
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
        <TableOrders data={orders} filter={{ perPage: 10 }} />
      </div>

      {/* Modal Add Order */}
      <ConfirmNewOrder
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onConfirm={handleAddOrder}
      />
    </div>
  );
}
