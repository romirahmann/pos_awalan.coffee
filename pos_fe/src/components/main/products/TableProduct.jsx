/* eslint-disable no-unused-vars */
/* src/components/main/products/TableProduct.jsx */
import moment from "moment/moment";
import { Table } from "../../../shared/Table";
import {
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
} from "react-icons/fa";
import { Modal } from "../../../shared/Modal";
import { DeleteModal } from "../../../shared/DeletedComponent";
import { useState } from "react";
import api from "../../../services/axios.service";
import { useAlert } from "../../../store/AlertContext";
import { baseApi } from "../../../services/api.service";
import { FormEditProduct } from "./FormEditProduct";

export function TableProduct({ data = [], filter = {}, categories }) {
  const [openModal, setOpenModal] = useState({
    detail: false,
    edit: false,
    deleted: false,
  });
  const [selectedData, setSelectedData] = useState(null);
  const { showAlert } = useAlert();

  const columns = [
    { header: "No", key: "no" },
    {
      header: "Image",
      key: "fileName",
      render: (val) => (
        <img
          src={`${baseApi}/master/get-image/${val}`}
          alt="product"
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    { header: "Category", key: "categoryName" },
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
      render: (val) => `RP ${new Intl.NumberFormat("id-ID").format(val ?? 0)}`,
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
            setOpenModal((prev) => ({ ...prev, edit: true }));
          }}
          className="px-2 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded"
        >
          <FaEdit />
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
        isOpen={openModal.edit}
        title="Edit Product"
        onClose={() => setOpenModal((prev) => ({ ...prev, edit: false }))}
      >
        <FormEditProduct data={selectedData} categories={categories} />
      </Modal>

      <Modal
        isOpen={openModal.detail}
        title="Product Detail"
        onClose={() => setOpenModal((prev) => ({ ...prev, detail: false }))}
      >
        {selectedData && (
          <div className="space-y-6 text-sm">
            {/* Image + Title */}
            <div className="flex flex-col items-center text-center space-y-3">
              <img
                src={`${baseApi}/master/get-image/${selectedData.fileName}`}
                alt={selectedData.productName}
                className="w-40 h-40 rounded-xl object-cover shadow-md border"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedData.productName}
              </h3>
              <p className="text-gray-500">{selectedData.description}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Product ID</p>
                <p className="font-medium">{selectedData.productId}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-medium">{selectedData.categoryName}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Available</p>
                <p
                  className={`font-medium ${
                    selectedData.isAvailable ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {selectedData.isAvailable ? "Yes" : "No"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-semibold text-blue-600">
                  RP {selectedData.price?.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Created At</p>
                <p className="font-medium">
                  {moment(selectedData.createdAt).format("DD-MM-YYYY HH:mm")}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Updated At</p>
                <p className="font-medium">
                  {moment(selectedData.updatedAt).format("DD-MM-YYYY HH:mm")}
                </p>
              </div>
            </div>
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
