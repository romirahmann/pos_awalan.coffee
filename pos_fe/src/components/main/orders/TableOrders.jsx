/* src/components/TableOrders.jsx */
import moment from "moment/moment";
import { Table } from "../../../shared/Table";
import { FaTrash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { DeleteModal } from "../../../shared/DeletedComponent";
import api from "../../../services/axios.service";
import { useAlert } from "../../../store/AlertContext";
import { Link } from "@tanstack/react-router";

// ✅ Helper buat kasih warna status & type
const getStatusColor = (status) => {
  switch (status) {
    case "pending":
    case "pending payment":
      return "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs font-medium";
    case "completed":
      return "text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-medium";
    case "canceled":
      return "text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-medium";
    default:
      return "text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium";
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case "dine-in":
      return "text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium";
    case "takeaway":
      return "text-purple-600 bg-purple-100 px-2 py-1 rounded-full text-xs font-medium";
    case "online":
      return "text-pink-600 bg-pink-100 px-2 py-1 rounded-full text-xs font-medium";
    default:
      return "text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium";
  }
};

export function TableOrders({ data = [], filter = {} }) {
  const [openModal, setOpenModal] = useState({ detail: false, deleted: false });
  const [selectedData, setSelectedData] = useState(null);
  const { showAlert } = useAlert();

  const columns = [
    { header: "No", key: "no" },
    { header: "Order Code", key: "orderCode" },
    { header: "Customer", key: "customerName" },
    {
      header: "Type",
      key: "orderType",
      render: (val) => (
        <span className={getTypeColor(val)}>{val.toUpperCase()}</span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (val) => (
        <span className={getStatusColor(val)}>{val.toUpperCase()}</span>
      ),
    },
    {
      header: "Total Amount",
      key: "totalAmount",
      render: (val) => `Rp ${val?.toLocaleString("id-ID")}`,
    },
    {
      header: "Final Amount",
      key: "finalAmount",
      render: (val) => `Rp ${val?.toLocaleString("id-ID")}`,
    },
    { header: "Discount", key: "discount" },
    {
      header: "Created At",
      key: "createdAt",
      render: (val) => moment(val).format("DD-MM-YYYY HH:mm"),
    },
    {
      header: "Updated At",
      key: "updatedAt",
      render: (val) => moment(val).format("DD-MM-YYYY HH:mm"),
    },
    { header: "Action", key: "action" },
  ];

  const handleDeleted = async () => {
    try {
      await api.delete(`/master/order/${selectedData.orderId}`);
      showAlert("success", "Delete Order Successfully!");
      setOpenModal((prev) => ({ ...prev, deleted: false }));
    } catch (error) {
      console.error(error);
      showAlert("error", "Delete Order Failed!");
    }
  };

  const formattedData = data.map((row, index) => ({
    ...row,
    no: index + 1,
    action: (
      <div className="flex gap-2">
        <Link
          to={`/orders/detail`}
          search={{ orderId: row.orderId }}
          className="px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
        >
          <FaEye />
        </Link>

        <button
          onClick={() => {
            setSelectedData(row);
            setOpenModal((prev) => ({ ...prev, deleted: true }));
          }}
          className="px-2 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded"
        >
          <FaTrash />
        </button>
      </div>
    ),
  }));

  return (
    <>
      <Table
        data={formattedData}
        columns={columns}
        rowsPerPage={filter.perPage || 10}
      />

      <DeleteModal
        isOpen={openModal.deleted}
        itemName={`Order ${selectedData?.orderCode || ""}`}
        onClose={() => setOpenModal((prev) => ({ ...prev, deleted: false }))}
        onConfirm={handleDeleted}
      />
    </>
  );
}
