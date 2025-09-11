import { useState } from "react";

export function FormAddUser({ onSubmit, roles = [], positions = [] }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    roleId: "",
    positionId: "",
    isActive: 1, // ✅ default active
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
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
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
          placeholder="Enter username"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
          placeholder="Enter email"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
          placeholder="Enter fullname"
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="roleId"
          value={formData.roleId}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">-- Select Role --</option>
          {roles.map((role) => (
            <option key={role.roleId} value={role.roleId}>
              {role.roleName}
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
          required
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">-- Select Position --</option>
          {positions.map((pos) => (
            <option key={pos.positionId} value={pos.positionId}>
              {pos.positionName}
            </option>
          ))}
        </select>
      </div>

      {/* Button Submit (full width, bawah) */}
      <div className="md:col-span-2 pt-4">
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-primary/90 transition"
        >
          Add User
        </button>
      </div>
    </form>
  );
}
