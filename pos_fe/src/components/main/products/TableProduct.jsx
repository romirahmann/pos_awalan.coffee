/* src/components/main/products/TableProduct.jsx */
import moment from "moment/moment";
import { Table } from "../../../shared/Table";
import { FaTrash, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Modal } from "../../../shared/Modal";
import { DeleteModal } from "../../../shared/DeletedComponent";
import { useState } from "react";
import api from "../../../services/axios.service";
import { useAlert } from "../../../store/AlertContext";

export function TableProduct({ data = [], filter = {} }) {
  const [openModal, setOpenModal] = useState({ detail: false, deleted: false });
  const [selectedData, setSelectedData] = useState(null);
  const { showAlert } = useAlert();

  const columns = [
    { header: "No", key: "no" },
    {
      header: "Image",
      key: "imageUrl",
      render: (val) => (
        <img
          src={val || "https://via.placeholder.com/60"}
          alt="product"
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    { header: "Category Name", key: "categoryName" },
    { header: "Product Name", key: "productName" },
    { header: "Description", key: "description" },

    {
      header: "Available",
      key: "isAvailable",
      render: (val) =>
        val ? (
          <span className="flex items-center gap-1 text-green-500">
            <FaCheckCircle /> Available
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-500">
            <FaTimesCircle /> Sold Out
          </span>
        ),
    },
    {
      header: "Price",
      key: "price",
      render: (val) => `Rp ${val?.toLocaleString("id-ID")}`,
    },
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
      await api.delete(`/master/product/${selectedData.productId}`);
      showAlert("success", "Delete Product Successfully!");
      setOpenModal((prev) => ({ ...prev, deleted: false }));
    } catch (error) {
      console.error(error);
      showAlert("error", "Delete Product Failed!");
    }
  };

  const formattedData = data.map((row, index) => ({
    ...row,
    no: index + 1,
    action: (
      <div className="flex gap-2">
        <button
          onClick={() => {
            setSelectedData(row);
            setOpenModal((prev) => ({ ...prev, detail: true }));
          }}
          className="px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
        >
          <FaEye />
        </button>

        <button
          onClick={() => {
            setSelectedData(row);
            setOpenModal((prev) => ({ ...prev, deleted: true }));
          }}
          className="px-2 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
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

      <Modal
        isOpen={openModal.detail}
        title="Product Detail"
        onClose={() => setOpenModal((prev) => ({ ...prev, detail: false }))}
      >
        {selectedData && (
          <div className="space-y-3 text-sm">
            <p>
              <strong>Product ID:</strong> {selectedData.productId}
            </p>
            <p>
              <strong>Category ID:</strong> {selectedData.categoryId}
            </p>
            <p>
              <strong>Name:</strong> {selectedData.productName}
            </p>
            <p>
              <strong>Description:</strong> {selectedData.description}
            </p>
            <p>
              <strong>Image:</strong>{" "}
              <img
                src={selectedData.imageUrl || "https://via.placeholder.com/60"}
                alt="product"
                className="w-24 h-24 rounded-lg object-cover"
              />
            </p>
            <p>
              <strong>Available:</strong>{" "}
              {selectedData.isAvailable ? "Yes" : "No"}
            </p>
            <p>
              <strong>Price:</strong> Rp{" "}
              {selectedData.price?.toLocaleString("id-ID")}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {moment(selectedData.createdAt).format("DD-MM-YYYY HH:mm")}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {moment(selectedData.updatedAt).format("DD-MM-YYYY HH:mm")}
            </p>
          </div>
        )}
      </Modal>

      <DeleteModal
        isOpen={openModal.deleted}
        itemName={`Product ${selectedData?.productName || ""}`}
        onClose={() => setOpenModal((prev) => ({ ...prev, deleted: false }))}
        onConfirm={handleDeleted}
      />
    </>
  );
}
