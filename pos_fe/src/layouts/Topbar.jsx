/* eslint-disable no-unused-vars */

import { useState } from "react";
import {
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useAuth } from "../store/useAuth";

export function Topbar({ username = "Admin", onLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const { logout, user } = useAuth();

  const handleSearch = (e) => {
    // setSearch(e.target.value);
    console.log(user);
  };

  return (
    <div className="w-full bg-midnight-navy shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
            className="pl-10 w-full bg-gray-200 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-900"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Right Section: Notifications + User */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-700 transition">
          <FaBell className="text-gray-100 w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaUserCircle className="w-7 h-7 text-gray-100" />
            <span className="text-gray-100 font-medium">{user.fullname}</span>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-full bg-gray-800 rounded-md shadow-lg py-2 z-50 cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 text-gray-100 hover:bg-gray-700 ">
                <FaUserCircle />
                <p>Profile</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 text-gray-100 hover:bg-gray-700 ">
                <IoMdSettings />
                <p>Setting</p>
              </div>
              <hr className="text-gray-50" />
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-100 hover:bg-gray-700 w-full"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
