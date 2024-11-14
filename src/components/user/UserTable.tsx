import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";
import { truncateText } from "../../utils/text";
import { getInitials } from "../../utils/getInitials";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { userTableHeaders } from "../store/data/user";
import { renderUserCellContent, UserStatus } from "../store/data/task";
import { useNavigate } from "react-router-dom";
import { Cssky_Dashboard_Routes } from "../store/data";

const users = [
  {
    _id: "1",
    firstName: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    tier: "premium",
    status: "Active",
    createdAt: new Date("2022-01-01T12:00:00Z"),
    isActive: true,
  },
  // Sample user data
];

const UserTable = () => {
    const navigate = useNavigate()
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]); // Track selected users

  const handleSelectUser = (userId: string) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUserIds.length === users.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(users.map((user) => user._id));
    }
  };

  const renderTableHeaders = (
    <TableRow className="border-none py-[9px] hover:bg-transparent">
      <TableHead className="h-[18px] py-2">
        <Checkbox
          checked={selectedUserIds.length === users.length}
          onCheckedChange={handleSelectAll}
          aria-label="Select all users"
        />
      </TableHead>
      {userTableHeaders.map((header) => (
        <TableHead className="h-[18px] py-2 whitespace-nowrap" key={header}>
          {header}
        </TableHead>
      ))}
    </TableRow>
  );

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border rounded-lg">
      <Table>
        <TableHeader>{renderTableHeaders}</TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {users?.map((user) => {
            const { _id, firstName, email, status } = user;
            const isChecked = selectedUserIds.includes(_id);
            const initials = getInitials(firstName ?? "");

            return (
              <TableRow
                    key={_id}
                    onClick={() => navigate(`${Cssky_Dashboard_Routes.users}/${_id}`)}
                className="border group py-2 border-b cursor-pointer transition-colors hover:bg-muted/50"
              >
                <TableCell className="py-2">
                  <Checkbox
                    checked={isChecked}
                    className="mt-2"
                    onCheckedChange={() => handleSelectUser(_id)}
                    aria-label={`Select ${firstName}`}
                  />
                </TableCell>
                <TableCell className="py-2 flex items-center">
                  <Avatar className="h-10 w-10 mr-1">
                    <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm whitespace-nowrap">
                      {truncateText(firstName ?? " ", 13)}
                    </p>
                    <p className="text-xs whitespace-nowrap">
                      {truncateText(email ?? " ", 13)}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">{_id}</TableCell>
                <TableCell>
                  {(status && renderUserCellContent(status as UserStatus)) ||
                    "N/A"}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 ">
                  {format(user?.createdAt ?? "", "MM/dd/yyyy")}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 ">
                  {format(user?.createdAt ?? "", "MM/dd/yyyy")}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2 ">
                  {format(user?.createdAt ?? "", "MM/dd/yyyy")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
