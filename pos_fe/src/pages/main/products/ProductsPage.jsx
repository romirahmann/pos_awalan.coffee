import { FaPlus } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { TableProduct } from "../../../components/main/products/TableProduct";

export function ProductsPage() {
  return (
    <>
      <div className="w-full p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-800">
            <MdFastfood className="text-primary" /> Products
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition bg-blue-900 hover:bg-blue-700">
            <FaPlus /> Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
          <TableProduct data={[]} />
        </div>
      </div>
    </>
  );
}
