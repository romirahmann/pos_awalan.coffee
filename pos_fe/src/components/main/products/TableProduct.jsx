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
import { DetailProduct } from "./DetailProduct";

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
      header: "Cost Price",
      key: "costPrice",
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

  const handleEdit = async (val) => {
    const formData = new FormData();
    Object.keys(val).forEach((key) => {
      formData.append(key, val[key]);
    });

    if (!val.image) {
      try {
        await api.put(`/master/product/${selectedData.productId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showAlert("success", "Update Data Product Successfully!");
        setOpenModal({ ...openModal, edit: false });
        return;
      } catch (error) {
        showAlert("error", "Update Data Product Failed!");
        console.log(error);
        return;
      }
    }

    try {
      await api.put(`/master/img-product/${selectedData.productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showAlert("success", "Update Data Product Successfully!");
      setOpenModal({ ...openModal, edit: false });
    } catch (error) {
      showAlert("error", "Update Data Product Failed!");
      console.log(error);
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
        <FormEditProduct
          data={selectedData}
          categories={categories}
          onSubmit={handleEdit}
        />
      </Modal>

      <Modal
        isOpen={openModal.detail}
        title="Product Detail"
        onClose={() => setOpenModal((prev) => ({ ...prev, detail: false }))}
      >
        {selectedData && <DetailProduct selectedData={selectedData} />}
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
