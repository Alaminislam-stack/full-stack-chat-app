import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/SideBar";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket } from "../../store/silce/sockit/sockit.silce";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const {isAuthenticated,userProfile} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
     if(!isAuthenticated) return
     dispatch(initializeSocket({userId: userProfile?.id}));
  },[dispatch, isAuthenticated, userProfile])

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 justify-center items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 m-2 absolute top-2 left-2 z-20 rounded-md"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
