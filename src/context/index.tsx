import { createContext, useState, ReactNode } from "react";
import { MyContextProps } from "../types";

const defaultContextValue: MyContextProps = {
  active: " ",
  setActive: () => {},
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
};

const MyContext = createContext<MyContextProps>(defaultContextValue);

// Destructure children from props
const MyProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<string>("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <MyContext.Provider
      value={{
        active,
        setActive,
        isSidebarOpen,
        setIsSidebarOpen,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
