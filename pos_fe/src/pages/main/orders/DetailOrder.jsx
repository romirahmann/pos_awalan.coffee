/* eslint-disable no-unused-vars */
import { useEffect, useState, useMemo } from "react";
import { Link, useSearch, useNavigate } from "@tanstack/react-router";
import { FaArrowLeft } from "react-icons/fa";
import { useAlert } from "../../../store/AlertContext";

import OrderInfo from "../../../components/main/orders/OrderInfo";
import OrderItems from "../../../components/main/orders/OrderItem";
import ProductCard from "../../../components/main/orders/ProductChart";
import Cart from "../../../components/main/orders/Carts";
import api from "../../../services/axios.service";

export function DetailOrder() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { orderId } = useSearch({});

  const [products, setProducts] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // filter state
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterSub, setFilterSub] = useState("All");

  useEffect(() => {
    if (!orderId) {
      showAlert("error", "Order ID tidak ditemukan!");
      navigate({ to: "/orders" });
      return;
    }
    loadData(orderId);
  }, [orderId]);

  const loadData = async (id) => {
    setLoading(true);
    try {
      const [orderRes, productsRes, orderItemsRes] = await Promise.all([
        api.get(`/master/order/${id}`),
        api.get(`/master/products`),
        api.get(`/master/order-detail/${id}`),
      ]);

      console.log(orderItemsRes.data.data);

      setOrderDetail(orderRes.data.data);
      setOrderItems(orderItemsRes.data.data);
      setProducts(productsRes.data.data);
    } catch (error) {
      showAlert("error", "Gagal memuat data!");
    } finally {
      setLoading(false);
    }
  };

  // LOGIKA CART
  const addToCart = (p) =>
    setCart((prev) => {
      const exists = prev.find((i) => i.productId === p.productId);
      return exists
        ? prev.map((i) =>
            i.productId === p.productId ? { ...i, qty: i.qty + 1 } : i
          )
        : [...prev, { ...p, qty: 1 }];
    });

  const updateQty = (id, type) =>
    setCart((prev) =>
      prev
        .map((i) =>
          i.productId === id
            ? { ...i, qty: type === "inc" ? i.qty + 1 : i.qty - 1 }
            : i
        )
        .filter((i) => i.qty > 0)
    );

  const removeItem = (id) =>
    setCart((prev) => prev.filter((i) => i.productId !== id));

  const total = useMemo(
    () =>
      (orderItems.length > 0 ? orderItems : cart).reduce(
        (acc, i) => acc + i.price * i.qty,
        0
      ),
    [cart, orderItems]
  );

  // filter produk
  const filteredProducts = products.filter((p) => {
    // contoh: p.category = "Food" / "Drink"
    // p.subCategory = "Coffee" / "Non Coffee"
    if (filterCategory !== "All" && p.categoryName !== filterCategory)
      return false;
    if (
      filterCategory === "Drink" &&
      filterSub !== "All" &&
      p.subCategory !== filterSub
    )
      return false;
    return true;
  });

  const handleCheckout = async (val) => {
    if (!val) return showAlert("warning", "Items not found!");

    try {
      await api.post("/master/checkout", val);
      showAlert("success", "Checkout successfully");
    } catch (error) {
      console.log(error);
      showAlert("error", "Checkout Failure!");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-full mx-auto p-1 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/orders">
          <button className="p-3 bg-white rounded-full shadow hover:bg-gray-100">
            <FaArrowLeft />
          </button>
        </Link>
        <h1 className="text-2xl font-bold">Order Detail</h1>
      </div>
      {orderItems.length > 0 ? (
        <OrderItems items={orderItems} total={total} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kiri → Info + Produk */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <OrderInfo detail={orderDetail} />

            {/* Produk */}
            <div>
              <h2 className="text-xl font-bold mb-4">Select Menu</h2>

              {/* Filter */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {/* kategori utama */}
                {["All", "Food", "Drink"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilterCategory(cat);
                      setFilterSub("All"); // reset sub
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      filterCategory === cat
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* subkategori muncul kalau drink */}
              {filterCategory === "Drink" && (
                <div className="flex flex-wrap items-center gap-2 mb-4 ml-2">
                  {["All", "Coffee", "Non Coffee"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setFilterSub(sub)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        filterSub === sub
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.productId}
                    product={p}
                    onAdd={addToCart}
                  />
                ))}
                {filteredProducts.length === 0 && (
                  <p className="col-span-full text-gray-500 text-center py-4">
                    Tidak ada produk sesuai filter
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Kanan → Cart */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Cart
                items={cart}
                total={total}
                onInc={(id) => updateQty(id, "inc")}
                onDec={(id) => updateQty(id, "dec")}
                onRemove={removeItem}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
