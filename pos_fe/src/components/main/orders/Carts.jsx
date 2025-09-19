import { useState } from "react";
import { baseApi } from "../../../services/api.service";
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
/* eslint-disable no-unused-vars */
export function Cart() {
  const [cart, setCart] = useState([]);

  // Cart Functions
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.productId === product.productId);
      if (exists) {
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.productId !== id));
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const onSubmit = () => {
    console.log(cart);
  };
  return (
    <>
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
              <div className="md:w-12 md:h-12 flex items-center justify-center bg-gray-100 rounded-lg text-xl">
                <img
                  src={`${baseApi}/master/get-image/${item.fileName}`}
                  alt="product"
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {item.productName}
                </p>
                <p className="text-gray-500 text-sm">
                  Rp {(item.price * item.qty).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <button
                  onClick={() => decreaseQty(item.productId)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <FaMinus size={12} />
                </button>
                <span className="min-w-[20px] text-center font-medium">
                  {item.qty}
                </span>
                <button
                  onClick={() => increaseQty(item.productId)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  <FaPlus size={12} />
                </button>
                <button
                  onClick={() => removeFromCart(item.productId)}
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
        <div className="inputOrder flex flex-col gap-2 mt-3">
          <div className="grid grid-cols-4 items-center font-bold  text-gray-900">
            <p className="text-sm col-span-2">Type Order :</p>
            <select
              name="orderType"
              id="orderType"
              className="border border-gray-400 px-3 py-1 rounded-xl"
            >
              <option value="dine-in">Dine-In</option>
              <option value="takeaway">Takeaway</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center font-bold  text-gray-900">
            <p className="text-sm col-span-2">Customer Name :</p>
            <input
              type="text"
              name="customer"
              placeholder="Customer Name..."
              onChange={handleChange}
              className="mt-1 w-full border-b border-gray-500  
                       focus:border-slate-blue focus:ring focus:ring-slate-blue/50 
                       p-2.5 text-sm col-span-2"
            />
          </div>
        </div>
        <button
          disabled={cart.length === 0}
          onClick={() => onSubmit()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <FaCreditCard /> Checkout
        </button>
      </div>
    </>
  );
}
