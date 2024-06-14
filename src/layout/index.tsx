import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { isAuthenticated } from "../features/auth/authSlice";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useProviderContext } from "../constants";
import { Sidebar } from "../components/sidebar";
import Navbar from "../components/global/navbar";
import { useScrollIntoView } from "../utils/scroll-into-view";


const DashboardLayout = () => {
  const loggedIn = useSelector((state: RootState) => isAuthenticated(state));
  const { active } = useProviderContext();
  // const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [scrollTargetRef, scrollTo] = useScrollIntoView(); // Call the custom hook

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
    scrollTo();
  }, []); 

  return (
    <div>
      {loggedIn ? (
        <div>
          <p>Welcome,!</p>
          <button>Logout</button>
        </div>
      ) : (
        <div className="grid bg-[#F5F5F7] font-poppins grid-cols-12  h-screen overflow-hidden">
          <Navbar />
          <div className="col-span-12 flex flex-col overflow-hidden">
            <div className="grid-cols-sidebar-outlet flex flex-grow overflow-hidden">
              <Sidebar />

              <div className="h-full  overflow-y-auto pt-3 px-6" ref={scrollTargetRef}>
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
