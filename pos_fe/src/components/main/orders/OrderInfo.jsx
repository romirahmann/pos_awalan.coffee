import { FaHashtag, FaUser, FaShoppingCart, FaClock } from "react-icons/fa";
import moment from "moment";

export default function OrderInfo({ detail }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-4">Order Information</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <Info label="Code" value={detail.orderCode} icon={<FaHashtag />} />
        <Info label="Customer" value={detail.customerName} icon={<FaUser />} />
        <Info label="Type" value={detail.orderType} icon={<FaShoppingCart />} />
        <Info
          label="Date"
          value={moment(detail.createdAt).format("DD MMM YYYY, HH:mm")}
          icon={<FaClock />}
        />
      </div>
    </div>
  );
}

const Info = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-400">{icon}</span>
    <span>
      <strong>{label}:</strong> {value || "-"}
    </span>
  </div>
);
