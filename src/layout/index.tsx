import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { isAuthenticated } from "../features/auth/authSlice";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useProviderContext } from "../constants";
import Navbar from "../components/global/navbar";
import { Sidebar } from "../components/sidebar";
import { Cssky_Dashboard_Routes } from "../components/store/data";

const DashboardLayout = () => {
  const loggedIn = useSelector((state: RootState) => isAuthenticated(state));
  const { active } = useProviderContext();
  const location = useLocation();
  const outletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is inactive
        document.title = "Am lonely. Please click me!";
      } else {
        // Tab is active
        document.title = active;
      }
    };
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [active]);

  useEffect(() => {
    if (outletRef.current) {
      outletRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!loggedIn) {
        window.location.href = Cssky_Dashboard_Routes.signIn;
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId); // Cleanup timeout on component unmount
    };
  }, [loggedIn]);

  return (
    <div>
      {!loggedIn ? (
        <div className="grid h-screen place-items-center bg-white px-4">
          <div className="grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-16 h-16 text-gray-700 mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Uh-oh!
            </h1>

            <p className="mt-4 text-gray-500">
              Your session has expired. You have been logged out and will be
              redirected to the login screen shortly.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col  bg-[#F5F5F7] font-poppins  h-screen overflow-hidden">
          <Navbar />
          <div className=" flex flex-col overflow-hidden  flex-1">
            <div className="grid-cols-sidebar-outlet  h-full flex flex-grow overflow-hidden">
              <Sidebar />

              <div
                ref={outletRef}
                className="h-full  overflow-y-auto pt-3 px-6"
              >
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
