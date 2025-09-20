import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { baseApi } from "../../../services/api.service";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b last:border-0">
      <img
        src={`${baseApi}/master/get-image/${item.fileName}`}
        alt={item.productName}
        className="w-12 h-12 rounded object-cover"
      />
      <div className="flex-1">
        <p className="font-medium">{item.productName}</p>
        <p className="text-xs text-gray-500">
          Rp {(item.price * item.qty).toLocaleString("id-ID")}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onDecrease} className="p-1 hover:bg-gray-200 rounded">
          <FaMinus size={10} />
        </button>
        <span className="px-2">{item.qty}</span>
        <button onClick={onIncrease} className="p-1 hover:bg-gray-200 rounded">
          <FaPlus size={10} />
        </button>
      </div>
      <button onClick={onRemove} className="text-red-500 hover:text-red-700">
        <FaTrashAlt size={12} />
      </button>
    </div>
  );
}
