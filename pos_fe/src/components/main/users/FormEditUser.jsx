import { useState, useEffect } from "react";

export function FormEditUser({
  data = {},
  roles = [],
  positions = [],
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
    roleId: "",
    positionId: "",
    isActive: true,
  });

  // Prefill kalau ada data
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        username: data.username || "",
        email: data.email || "",
        fullname: data.fullname || "",
        roleId: data.roleId || "",
        positionId: data.positionId || "",
        isActive: data.isActive ?? true,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, userId: data.userId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 ">
      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-slate-blue focus:ring focus:ring-slate-blue/50 p-2.5 text-sm"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-slate-blue focus:ring focus:ring-slate-blue/50 p-2.5 text-sm"
          required
        />
      </div>

      {/* Fullname */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fullname
        </label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-slate-blue focus:ring focus:ring-slate-blue/50 p-2.5 text-sm"
          required
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-slate-blue focus:ring focus:ring-slate-blue/50 p-2.5 text-sm"
          required
        >
          <option value="">-- Select Role --</option>
          {roles.map((r) => (
            <option key={r.roleId} value={r.roleId}>
              {r.roleName}
            </option>
          ))}
        </select>
      </div>

      {/* Position */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Position
        </label>
        <select
          name="positionId"
          value={formData.positionId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-slate-blue focus:ring focus:ring-slate-blue/50 p-2.5 text-sm"
          required
        >
          <option value="">-- Select Position --</option>
          {positions.map((p) => (
            <option key={p.positionId} value={p.positionId}>
              {p.positionName}
            </option>
          ))}
        </select>
      </div>

      {/* Active */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
          className="h-4 w-4 text-slate-blue focus:ring-slate-blue border-gray-300 rounded"
        />
        <label className="text-sm text-gray-700">Active</label>
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="px-5 py-2.5 bg-slate-blue text-white text-sm font-medium rounded-lg shadow hover:bg-midnight-navy focus:ring-2 focus:ring-offset-2 focus:ring-slate-blue transition"
        >
          Update User
        </button>
      </div>
    </form>
  );
}
