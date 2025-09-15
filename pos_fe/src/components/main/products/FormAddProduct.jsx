/* eslint-disable no-unused-vars */
import { useState } from "react";

export function FormAddProduct({ onSubmit, categories = [] }) {
  const [formData, setFormData] = useState({
    categoryId: "",
    productName: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);

    setFormData({
      categoryId: "",
      productName: "",
      description: "",
      price: "",
      image: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-slate-blue focus:ring focus:ring-slate-blue/50 
                     p-2.5 text-sm"
          required
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-slate-blue focus:ring focus:ring-slate-blue/50 
                     p-2.5 text-sm"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-slate-blue focus:ring focus:ring-slate-blue/50 
                     p-2.5 text-sm"
          placeholder="Enter description..."
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-slate-blue focus:ring focus:ring-slate-blue/50 
                     p-2.5 text-sm"
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block w-full text-sm text-gray-700 
                     file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 
                     file:text-sm file:font-semibold 
                     file:bg-slate-blue file:text-white 
                     hover:file:bg-midnight-navy"
          required
        />
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="px-5 py-2.5 bg-slate-blue text-white text-sm font-medium 
                     rounded-lg shadow hover:bg-midnight-navy 
                     focus:ring-2 focus:ring-offset-2 focus:ring-slate-blue 
                     transition"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
