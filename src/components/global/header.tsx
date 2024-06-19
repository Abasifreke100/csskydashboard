import { ChevronLeft } from "lucide-react";

const Header = ({ title, icon }: { title: string; icon?: boolean }) => {
  return (
    <p
      className={`text-md font-medium mt-5 ${
        icon && "flex items-center  gap-1 cursor-pointer"
      }`}
      onClick={() => window.history.back()}
    >
      {" "}
      {icon && <ChevronLeft />}
      {title}
    </p>
  );
};

export default Header;
