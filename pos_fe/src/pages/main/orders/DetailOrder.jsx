/* eslint-disable no-unused-vars */
import { useState } from "react";
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
} from "react-icons/fa";

export function DetailOrder() {
  // Dummy data order detail
  const orderDetail = {
    orderCode: "AWLN-20250913-001",
    customerName: "John Doe",
    orderType: "Dine-In",
    status: "Pending",
    createdAt: new Date().toLocaleString("id-ID"),
  };

  // Dummy data produk
  const products = [
    { id: 1, name: "Americano", price: 25000, image: "☕" },
    { id: 2, name: "Latte", price: 30000, image: "🥛" },
    { id: 3, name: "Cappuccino", price: 28000, image: "🍶" },
    { id: 4, name: "Espresso", price: 20000, image: "⚡" },
    { id: 5, name: "Mocha", price: 32000, image: "🍫" },
    { id: 6, name: "Matcha Latte", price: 35000, image: "🍵" },
  ];

  const [cart, setCart] = useState([]);

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
    <div className="w-full p-6 space-y-6">
      {/* ORDER INFO */}
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
            <FaListUl className="text-blue-600" /> Order Detail
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 mt-2 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <FaHashtag className="text-gray-500" />{" "}
              <span className="font-medium">Code:</span> {orderDetail.orderCode}
            </p>
            <p className="flex items-center gap-2">
              <FaUser className="text-gray-500" />{" "}
              <span className="font-medium">Customer:</span>{" "}
              {orderDetail.customerName}
            </p>
            <p className="flex items-center gap-2">
              <FaShoppingCart className="text-gray-500" />{" "}
              <span className="font-medium">Type:</span> {orderDetail.orderType}
            </p>
            <p className="flex items-center gap-2">
              <FaClock className="text-gray-500" />{" "}
              <span className="font-medium">Date:</span> {orderDetail.createdAt}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-center">
          <span
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              orderDetail.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : orderDetail.status === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {orderDetail.status}
          </span>
        </div>
      </div>

      {/* MENU + CART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Menu */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Pilih Menu
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full text-3xl mb-4">
                  {p.image}
                </div>
                <h3 className="font-medium text-gray-800">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-3">
                  Rp {p.price.toLocaleString("id-ID")}
                </p>
                <button
                  onClick={() => addToCart(p)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  <FaPlus /> Tambah
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Keranjang */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <FaShoppingCart /> Keranjang
          </h2>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center mt-10">Belum ada item</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      Rp {(item.price * item.qty).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-2">{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="mt-6 border-t pt-4 space-y-3">
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
            <button
              disabled={cart.length === 0}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
            >
              <FaCreditCard /> Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
