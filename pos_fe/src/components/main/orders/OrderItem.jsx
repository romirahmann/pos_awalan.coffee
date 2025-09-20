export default function OrderItems({ items = [], total }) {
  // Dummy jika items kosong
  const dummyItems = [
    {
      orderItemId: 1,
      productName: "Nasi Goreng Spesial",
      qty: 1,
      price: 25000,
      status: "Proses",
      date: "20 Sep 2025",
      categoryName: "Food",
    },
    {
      orderItemId: 2,
      productName: "Es Kopi Susu Gula Aren",
      qty: 2,
      price: 18000,
      status: "Proses",
      date: "20 Sep 2025",
      categoryName: "Drink",
    },
    {
      orderItemId: 3,
      productName: "Matcha Latte",
      qty: 1,
      price: 22000,
      status: "Selesai",
      date: "19 Sep 2025",
      categoryName: "Drink",
    },
  ];

  const list = items.length > 0 ? items : dummyItems;

  const getStatusColor = (status) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "Proses":
        return "bg-yellow-100 text-yellow-700";
      case "Batal":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (cat) => {
    return cat === "Food"
      ? "bg-orange-100 text-orange-700"
      : "bg-blue-100 text-blue-700";
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-bold mb-4">Order Items</h2>

      {list.map((i) => (
        <div
          key={i.orderItemId}
          className="flex flex-col md:flex-row justify-between items-start md:items-center border rounded-xl p-4 bg-gray-50 hover:shadow-md transition"
        >
          {/* LEFT */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">
                {i.productName}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(
                  i.categoryName
                )}`}
              >
                {i.categoryName}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {i.qty} x Rp {i.price.toLocaleString("id-ID")}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{i.date}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${getStatusColor(
                  i.status
                )}`}
              >
                {i.status}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="mt-3 md:mt-0 flex flex-col items-end gap-2">
            <span className="font-bold text-green-600 text-lg">
              Rp {(i.qty * i.price).toLocaleString("id-ID")}
            </span>

            {/* DONE button hanya tampil jika status belum selesai */}
            {i.status !== "Selesai" && (
              <button
                onClick={() => console.log("Done:", i.productName)}
                className="px-4 py-1.5 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              >
                Done
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="flex justify-between font-bold text-lg border-t pt-4">
        <span>Total</span>
        <span>
          Rp{" "}
          {(
            total || list.reduce((acc, i) => acc + i.price * i.qty, 0)
          ).toLocaleString("id-ID")}
        </span>
      </div>
    </div>
  );
}
