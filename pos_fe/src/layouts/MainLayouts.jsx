/* MainLayout.jsx */
import { Outlet } from "@tanstack/react-router";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar"; // cukup 1 komponen Sidebar
import { useState } from "react";

export function MainLayout() {
  const [openSidebarMobile, setOpenSidebarMobile] = useState(false);

  return (
    <div className="flex relative h-screen bg-gray-100 font-poppins">
      {/* Sidebar desktop */}
      <div className="hidden md:block">
        <Sidebar variant="desktop" />
      </div>

      {/* Sidebar mobile */}
      {openSidebarMobile && (
        <Sidebar variant="mobile" onClose={() => setOpenSidebarMobile(false)} />
      )}

      {/* Main content */}
      <div className="flex flex-col  flex-1 overflow-hidden">
        <Topbar openSidebar={() => setOpenSidebarMobile(true)} />
        <div className="flex-1  overflow-auto p-6 bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
