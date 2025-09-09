/* eslint-disable react-hooks/rules-of-hooks */
/* Sidebar.jsx */
import { useState } from "react";
import {
  FaHome,
  FaCashRegister,
  FaBoxOpen,
  FaChartLine,
  FaUsers,
  FaCog,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { Link, useMatch } from "@tanstack/react-router";
import { Tooltip } from "react-tooltip";

const menuItems = [
  { name: "Dashboard", icon: <FaHome />, path: "/" },
  { name: "Orders", icon: <FaCashRegister />, path: "/order" },
  { name: "Inventory", icon: <FaBoxOpen />, path: "/inventory" },
  { name: "Reports", icon: <FaChartLine />, path: "/reports" },
  { name: "Customers", icon: <FaUsers />, path: "/customers" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 shadow-lg transition-width duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo / Collapse */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-gray-700">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img src="/icons/latte-art.png" alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-lg">AWALAN POS</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-700 transition"
        >
          {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto mt-4">
        {menuItems.map((item) => {
          const isActive = useMatch(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 p-3 mx-2 my-1 rounded-lg transition-colors hover:bg-gray-700 ${
                isActive ? "bg-gray-700 font-semibold shadow-inner" : ""
              }`}
              data-tooltip-id={collapsed ? "sidebar-tooltip" : undefined}
              data-tooltip-content={collapsed ? item.name : undefined}
            >
              <span className="w-5 h-5">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400 text-center">
          © 2025 AWALAN COFFEE
        </div>
      )}

      {/* Tooltip */}
      {collapsed && <Tooltip id="sidebar-tooltip" place="right" />}
    </div>
  );
}
