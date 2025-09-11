/* eslint-disable no-unused-vars */
/* DeleteModal.jsx */
import { FaTrashAlt, FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg w-96 max-w-sm p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Icon */}
            <div className="flex items-center justify-center mb-4 text-red-600">
              <FaExclamationTriangle className="w-12 h-12" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center mb-2">
              Delete Confirmation
            </h2>

            {/* Message */}
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{itemName}</span>? This action
              cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
