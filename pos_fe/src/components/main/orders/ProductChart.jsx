import { FaPlus } from "react-icons/fa";
import { baseApi } from "../../../services/api.service";

export default function ProductCard({ product, onAdd }) {
  return (
    <div
      onClick={() => onAdd(product)}
      className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-lg"
    >
      <img
        src={`${baseApi}/master/get-image/${product.fileName}`}
        alt={product.productName}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <h3 className="font-semibold">{product.productName}</h3>
      <p className="text-sm text-gray-500">
        Rp {product.price.toLocaleString("id-ID")}
      </p>
      <button className="mt-2 w-full flex items-center justify-center gap-2 py-1 bg-blue-100 text-blue-600 rounded font-bold text-sm hover:bg-blue-600 hover:text-white">
        <FaPlus size={12} /> Add
      </button>
    </div>
  );
}
