import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu";
  
  interface InsightDropdownProps {
    selectedItem: string;
    handleMenuItemClick: (item: string) => void;
  }
  
  const InsightDropdown: React.FC<InsightDropdownProps> = ({
    selectedItem,
    handleMenuItemClick,
  }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="border-transparent outline-none">
          <div className="cursor-pointer outline-none flex items-center border rounded-2xl  border-[#F5F5F7] justify-center ">
            <span className="mr-1 text-xs ">{selectedItem}</span>
            <svg
              className="w-4 h-4 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#8F8F8F"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 8.293a1 1 0 011.414 0L10 10.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414zM10 5a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5} align="start">
          <DropdownMenuLabel className="font-medium">Select an Option</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleMenuItemClick("This Year")}>
            This Year
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("Weekly")}>
            Weekly
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("Monthly")}>
            Monthly
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("Yearly")}>
            Yearly
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default InsightDropdown;
  