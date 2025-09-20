import moment from "moment/moment";
import { baseApi } from "../../../services/api.service";

export function DetailProduct({ selectedData }) {
  return (
    <>
      <div className="space-y-6 text-sm">
        {/* Image + Title */}
        <div className="flex flex-col items-center text-center space-y-3">
          <img
            src={`${baseApi}/master/get-image/${selectedData.fileName}`}
            alt={selectedData.productName}
            className="w-40 h-40 rounded-xl object-cover shadow-md border"
          />
          <h3 className="text-xl font-semibold text-gray-800">
            {selectedData.productName}
          </h3>
          <p className="text-gray-500">{selectedData.description}</p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Category</p>
            <p className="font-medium">{selectedData.categoryName}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Available</p>
            <p
              className={`font-medium ${
                selectedData.isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {selectedData.isAvailable ? "Yes" : "No"}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Cost Price</p>
            <p className="font-medium text-red-500">
              RP{" "}
              {new Intl.NumberFormat("id-ID").format(
                selectedData.costPrice ?? 0
              )}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Price</p>
            <p className="font-semibold text-blue-600">
              RP{" "}
              {new Intl.NumberFormat("id-ID").format(selectedData.price ?? 0)}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Created At</p>
            <p className="font-medium">
              {moment(selectedData.createdAt).format("DD-MM-YYYY HH:mm")}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-xs text-gray-500">Updated At</p>
            <p className="font-medium">
              {moment(selectedData.updatedAt).format("DD-MM-YYYY HH:mm")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
