import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTitleUpdater = (pathTitleMap: { [key: string]: string }) => {
  const location = useLocation();

  useEffect(() => {
    const title = pathTitleMap[location.pathname];
    if (title) {
      document.title = title;
    }
  }, [location.pathname, pathTitleMap]);
};

export default useTitleUpdater;
