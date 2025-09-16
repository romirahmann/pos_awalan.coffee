/* eslint-disable no-unused-vars */
/* ProductsPage.jsx */
import { useEffect, useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import api from "../../../services/axios.service";
import { Modal } from "../../../shared/Modal";
import { TableProduct } from "../../../components/main/products/TableProduct";
import { FormAddProduct } from "../../../components/main/products/FormAddProduct";
import { useAlert } from "../../../store/AlertContext";
import { listenToUpdate } from "../../../services/socket.service";

export function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]); // simpan data asli
  const [products, setProducts] = useState([]); // data yang ditampilkan (hasil filter)
  const [categories, setCategory] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const { showAlert } = useAlert();
  const [filters, setFilters] = useState({
    isOpen: false,
    status: "",
    type: "",
  });

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

  // 🔹 Handle Filter Frontend
  const handleFilter = () => {
    let filtered = [...allProducts];

    // Filter berdasarkan kategori
    if (filters.status) {
      filtered = filtered.filter(
        (p) => String(p.categoryId) === String(filters.status)
      );
    }

    // Filter berdasarkan stock (contoh logika)
    if (filters.type === "1") {
      filtered = filtered.filter((p) => p.isAvailable > 0);
    } else if (filters.type === "0") {
      filtered = filtered.filter((p) => p.isAvailable === 0);
    }

    setProducts(filtered);
  };

  const fetchProducts = async () => {
    try {
      const result = await api.get("/master/products");
      setAllProducts(result.data.data);
      setProducts(result.data.data); // default tampil semua
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

  // 🔹 Auto jalankan filter kalau filters berubah
  useEffect(() => {
    handleFilter();
  }, [filters, allProducts]);

  return (
    <>
      <div className="w-full p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-800">
            <MdFastfood className="text-primary" /> Manage Products
          </h2>
          <div className="btnAction flex gap-2">
            <button
              onClick={() => setOpenModalAdd(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaPlus /> Add Product
            </button>
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, isOpen: !prev.isOpen }))
              }
              className="flex items-center gap-2 px-4 py-2 text-midnight-navy bg-gray-50 border border-midnight-navy rounded-lg hover:bg-blue-700 hover:text-white transition"
            >
              <FaFilter /> Filters
            </button>
          </div>
        </div>

        {/* Filter Section */}
        {filters.isOpen && (
          <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-gray-700">
              <FaFilter /> Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Category
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">All Category</option>
                  {categories.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">
                  Stock
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="1">Available</option>
                  <option value="0">Sold</option>
                </select>
              </div>
            </div>
          </div>
        )}

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
