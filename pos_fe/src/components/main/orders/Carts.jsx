import { FaShoppingCart, FaCreditCard } from "react-icons/fa";
import CartItem from "./CartItem";
import { useState } from "react";
import { useSearch } from "@tanstack/react-router";

export default function Cart({
  items,
  total,
  onInc,
  onDec,
  onRemove,
  onCheckout,
}) {
  const { orderId } = useSearch({});
  // State untuk form checkout
  const [checkoutInfo, setCheckoutInfo] = useState({
    orderId,
    customerName: "",
    orderType: "Dine-In",
    discount: 0,
    paymentMethod: "",
  });

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Kirim ke parent
  const handleSubmit = () => {
    onCheckout({ ...checkoutInfo, items, total });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col h-full">
      {/* Header */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
        <FaShoppingCart className="text-blue-600" /> Cart
      </h2>

      {/* Cart Items */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-400 py-10 text-center">
            <FaShoppingCart size={40} className="mb-3" />
            <p className="font-medium">Keranjang kosong</p>
            <p className="text-sm">Silakan pilih menu terlebih dahulu.</p>
          </div>
        ) : (
          items.map((i) => (
            <CartItem
              key={i.productId}
              item={i}
              onIncrease={() => onInc(i.productId)}
              onDecrease={() => onDec(i.productId)}
              onRemove={() => onRemove(i.productId)}
            />
          ))
        )}
      </div>

      {/* Form & Checkout */}
      <div className="pt-6 mt-6 border-t border-gray-200 space-y-4">
        {/* Input Customer */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Nama Customer
          </label>
          <input
            type="text"
            name="customerName"
            value={checkoutInfo.customerName}
            onChange={handleChange}
            placeholder="Masukkan nama customer"
            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        {/* Order Type */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Tipe Order
          </label>
          <select
            name="orderType"
            value={checkoutInfo.orderType}
            onChange={handleChange}
            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          >
            <option value="Dine-In">Dine-In</option>
            <option value="Takeaway">Takeaway</option>
          </select>
        </div>

        {/* Discount */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Diskon (%)
          </label>
          <input
            type="number"
            name="discount"
            value={checkoutInfo.discount}
            onChange={handleChange}
            min="0"
            max="100"
            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">
            Metode Pembayaran
          </label>
          <select
            name="paymentMethod"
            value={checkoutInfo.paymentMethod}
            onChange={handleChange}
            className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          >
            <option value="">-- Pilih --</option>
            <option value="Cash">Cash</option>
            <option value="QRIS">QRIS</option>
            <option value="Debit">Debit</option>
            <option value="Credit Card">Credit Card</option>
          </select>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center font-bold text-lg text-gray-900 pt-4 border-t border-gray-100">
          <span>Total</span>
          <span>
            Rp{" "}
            {(total - (total * checkoutInfo.discount) / 100).toLocaleString(
              "id-ID"
            )}
          </span>
        </div>

        {/* Checkout Button */}
        <button
          disabled={items.length === 0 || !checkoutInfo.paymentMethod}
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <FaCreditCard /> Checkout
        </button>
      </div>
    </div>
  );
}
