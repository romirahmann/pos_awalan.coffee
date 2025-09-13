/* eslint-disable no-unused-vars */
/* ConfirmNewOrder.jsx */
import { FaPlusCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function ConfirmNewOrder({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg w-80 max-w-xs p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Icon */}
            <div className="flex items-center justify-center mb-4 text-blue-900">
              <FaPlusCircle className="w-14 h-14 animate-pulse" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center mb-2">
              New Order
            </h2>

            {/* Message */}
            <p className="text-center text-sm text-gray-600 mb-6">
              Are you sure you want to create a{" "}
              <span className="font-medium">new order</span>?
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition flex items-center gap-2"
              >
                <FaPlusCircle /> Create
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
