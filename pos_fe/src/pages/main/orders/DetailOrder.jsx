/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaPlus,
  FaMinus,
  FaTrashAlt,
  FaCreditCard,
  FaUser,
  FaHashtag,
  FaClock,
  FaListUl,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useSearch, useNavigate } from "@tanstack/react-router";
import { useAlert } from "../../../store/AlertContext";
import api from "../../../services/axios.service";
import moment from "moment";
import { baseApi, baseUrl } from "../../../services/api.service";

export function DetailOrder() {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // ✅ ambil query param dari /orders/detail?orderId=123
  const { orderId } = useSearch({});
  const [products, setProduct] = useState([]);
  const [orderDetail, setOrderDetail] = useState({});
  const [cart, setCart] = useState([]);

  // Dummy data produk
  // const products = [
  //   { id: 1, name: "Americano", price: 25000, image: "☕" },
  //   { id: 2, name: "Latte", price: 30000, image: "🥛" },
  //   { id: 3, name: "Cappuccino", price: 28000, image: "🍶" },
  //   { id: 4, name: "Espresso", price: 20000, image: "⚡" },
  //   { id: 5, name: "Mocha", price: 32000, image: "🍫" },
  //   { id: 6, name: "Matcha Latte", price: 35000, image: "🍵" },
  // ];

  // ✅ Fetch order detail saat orderId berubah
  useEffect(() => {
    if (!orderId) {
      showAlert("error", "Params not found!");
      navigate({ to: "/orders" });
      return;
    }
    fetchOrderDetail(orderId);
  }, [orderId]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchOrderDetail = async (id) => {
    try {
      let res = await api.get(`/master/order/${id}`);
      setOrderDetail(res.data.data);
    } catch (error) {
      console.error("❌ Fetch order failed:", error);
      showAlert("error", "Failed to load order detail!");
    }
  };

  const fetchProducts = async () => {
    try {
      let res = await api.get(`/master/products`);
      console.log(res.data.data);
      setProduct(res.data.data);
    } catch (error) {
      console.error("❌ Fetch order failed:", error);
      showAlert("error", "Failed to load order detail!");
    }
  };

  // Cart Functions
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="w-full p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* HEADER WITH BACK BUTTON */}
      <div className="flex items-center gap-4">
        <Link to="/orders">
          <button className="p-3 bg-white rounded-full shadow-md text-gray-600 hover:bg-gray-100 transition-colors">
            <FaArrowLeft />
          </button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Order Detail</h1>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: ORDER INFO & MENU */}
        <div className="lg:col-span-2 space-y-8">
          {/* ORDER INFO */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <FaListUl className="text-blue-600" /> Order Information
              </h2>
              {orderDetail?.status && (
                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold uppercase ${
                    orderDetail.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : orderDetail.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {orderDetail.status}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <FaHashtag className="text-gray-400" />
                <span className="font-semibold">Code:</span>{" "}
                {orderDetail.orderCode || "-"}
              </p>
              <p className="flex items-center gap-2">
                <FaUser className="text-gray-400" />
                <span className="font-semibold">Customer:</span>{" "}
                {orderDetail.customerName || "-"}
              </p>
              <p className="flex items-center gap-2">
                <FaShoppingCart className="text-gray-400" />
                <span className="font-semibold">Type:</span>{" "}
                {orderDetail.orderType || "-"}
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-gray-400" />
                <span className="font-semibold">Date:</span>{" "}
                {moment(orderDetail.createdAt).format("DD/MM/YYYY HH:ss") ||
                  "-"}
              </p>
            </div>
          </div>

          {/* MENU */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Select Menu
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col items-center text-center cursor-pointer"
                  onClick={() => addToCart(p)}
                >
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full text-5xl mb-4">
                    <img
                      src={`${baseApi}/master/get-image/${p.fileName}`}
                      alt="product"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Rp {p.price.toLocaleString("id-ID")}
                  </p>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                    <FaPlus /> Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: CART */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <FaShoppingCart /> Cart
          </h2>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                <FaShoppingCart size={40} className="mb-4" />
                <p>No items in the cart yet.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-3 border-b border-gray-100"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg text-xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="min-w-[20px] text-center font-medium">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <FaPlus size={12} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrashAlt size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER & CHECKOUT */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between font-bold text-xl text-gray-900">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
            <button
              disabled={cart.length === 0}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <FaCreditCard /> Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
