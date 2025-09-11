/* eslint-disable no-unused-vars */
import { useState } from "react";

export function FormAddRole({ onSubmit }) {
  const [formData, setFormData] = useState({
    roleName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      {/* Role Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Role Name
        </label>
        <input
          type="text"
          name="roleName"
          value={formData.roleName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-slate-blue focus:ring focus:ring-slate-blue/50 
                     p-2.5 text-sm"
          placeholder="Enter role name..."
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

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="px-5 py-2.5 bg-slate-blue text-white text-sm font-medium 
                     rounded-lg shadow hover:bg-midnight-navy 
                     focus:ring-2 focus:ring-offset-2 focus:ring-slate-blue 
                     transition"
        >
          Add Role
        </button>
      </div>
    </form>
  );
}
