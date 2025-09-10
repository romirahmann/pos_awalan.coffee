/* Topbar.jsx */
import { useState } from "react";
import { FaBell, FaSignOutAlt, FaUserCircle, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { useAuth } from "../store/useAuth";
import { useRouterState, Link } from "@tanstack/react-router";
import { menuItems } from "./Sidebar"; // 🔑 ambil daftar menu dari Sidebar

// 🔎 helper: flatten menuItems biar gampang cari path valid
function getAllPaths(items) {
  let paths = [];
  items.forEach((item) => {
    if (item.path) {
      paths.push(item.path);
    }
    if (item.children) {
      paths = [...paths, ...getAllPaths(item.children)];
    }
  });
  return paths;
}
const validPaths = getAllPaths(menuItems);

export function Topbar({ openSidebar }) {
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState("");
  const { logout, user } = useAuth();
  const { location } = useRouterState();

  const handleSearch = (e) => setSearch(e.target.value);

  // === Breadcrumb generator ===
  const pathParts = location.pathname.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const to = "/" + pathParts.slice(0, index + 1).join("/");
    const label = part.charAt(0).toUpperCase() + part.slice(1);
    const isValid = validPaths.includes(to);
    return { label, to, isValid };
  });

  return (
    <>
      {/* Topbar utama */}
      <div className="w-full bg-midnight-navy shadow-md px-2 md:px-6 py-3 flex items-center ">
        {/* tombol sidebar mobile */}
        <button
          onClick={() => openSidebar()}
          className="sm:hidden me-5 text-white"
        >
          <GiHamburgerMenu />
        </button>

        {/* search */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="relative lg:w-[28em]">
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

        {/* user menu + notif */}
        <div className="flex ms-auto items-center gap-4 relative">
          <button className="relative p-2 rounded-full hover:bg-gray-700 transition">
            <FaBell className="text-gray-100 w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

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
                  onClick={() => logout()}
                  className="flex items-center gap-2 px-4 py-2 text-gray-100 hover:bg-gray-700 w-full"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="secondTop w-full bg-gray-300 p-2">
        <div className="breadcrumb text-gray-700 text-sm flex gap-1">
          <Link to="/" className="hover:underline">
            Dashboard
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex gap-1 items-center">
              <span>/</span>
              {idx === breadcrumbs.length - 1 || !crumb.isValid ? (
                <span className="font-semibold">{crumb.label}</span>
              ) : (
                <Link to={crumb.to} className="hover:underline">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
