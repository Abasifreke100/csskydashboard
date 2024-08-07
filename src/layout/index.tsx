import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { isAuthenticated } from "../features/auth/authSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    if (!loggedIn) {
      navigate(Cssky_Dashboard_Routes.signIn);
    }
  }, [loggedIn, navigate]);

  return (
    <div>
      {loggedIn && (
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
