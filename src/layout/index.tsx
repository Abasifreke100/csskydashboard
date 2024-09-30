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
        document.title = "Cssky Dashboard | Inactive";
      } else {
        // Tab is active
        document.title = `Cssky Dashboard | ${active}`;
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
          <div className="border-red-500 overflow-hidden  flex-1">
            <div className="w-full h-full flex   overflow-hidden">
              <Sidebar />

              <div
                ref={outletRef}
                className="h-full w-full overflow-y-auto flex-1 pt-3 px-6"
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
