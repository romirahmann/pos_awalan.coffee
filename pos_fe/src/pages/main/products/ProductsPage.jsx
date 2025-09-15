/* eslint-disable no-unused-vars */
/* ProductsPage.jsx */
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import api from "../../../services/axios.service";
import { Modal } from "../../../shared/Modal";
import { TableProduct } from "../../../components/main/products/TableProduct";
import { FormAddProduct } from "../../../components/main/products/FormAddProduct";
import { useAlert } from "../../../store/AlertContext";
import { listenToUpdate } from "../../../services/socket.service";

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategory] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    // Pasang socket listener
    const unsubscribeCreated = listenToUpdate("product:created", fetchProducts);
    const unsubscribeUpdated = listenToUpdate("product:updated", fetchProducts);
    const unsubscribeDeleted = listenToUpdate("product:deleted", fetchProducts);

    // Cleanup listener saat unmount
    return () => {
      unsubscribeCreated?.();
      unsubscribeUpdated?.();
      unsubscribeDeleted?.();
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const result = await api.get("/master/products");
      console.log(result.data.data);
      setProducts(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await api.get("/master/categories");
      setCategory(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (val) => {
    try {
      // khusus kalau ada upload file, pakai FormData
      const formData = new FormData();
      Object.keys(val).forEach((key) => {
        formData.append(key, val[key]);
      });

      await api.post("/master/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      showAlert("success", "Add Product Successfully!");
      setOpenModalAdd(false);
    } catch (error) {
      console.error(error);
      showAlert("error", "Add Product Failed!");
    }
  };

  return (
    <>
      <div className="w-full p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-800">
            <MdFastfood className="text-primary" /> Manage Products
          </h2>
          <button
            onClick={() => setOpenModalAdd(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
          <TableProduct data={products} categories={categories} />
        </div>
      </div>

      {/* Modal Add Product */}
      <Modal
        isOpen={openModalAdd}
        title="Add Product"
        onClose={() => setOpenModalAdd(false)}
      >
        <FormAddProduct categories={categories} onSubmit={handleAdd} />
      </Modal>
    </>
  );
}
