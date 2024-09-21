import { truncateText } from "../../utils/text";
import { useForm, Controller } from "react-hook-form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upgradeUserToAdmin } from "../../hooks/useFetchAdmin";
import { errorToast, successToast } from "../../utils/toast";
import { QueryKeys } from "../../models/query";
import CustomCompulsoryInputStar from "../task/CustomCompulsoryInputStar";
import CustomButton from "../shared/CustomButton";
import { adminTableHeaders } from "../store/data/admin";
import { User } from "../../types";
import { UserService } from "../../service/user";

interface AdminTableProps {
  users: User[];
}

const AdminTable = ({ users }: AdminTableProps) => {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      tier: "tier-1", // Default tier value
    },
  });

  const onSubmit = (data: { userId: string; tier: string }) => {
    upgradeUser.mutate({ userId: data.userId, tier: data.tier });
  };

  const upgradeUser = useMutation({
    mutationFn: (data: { userId: string; tier: string }) =>
      upgradeUserToAdmin(data.userId, data.tier),
    onSuccess: () => {
      successToast({
        title: "User Upgraded",
        message: `Upgrade done successfully.`,
      });
      setActiveUserId(null);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Get_All_Users, 1, 10],
      });
    },
    onError: (error) => {
      errorToast({
        title: "Upgrade Error",
        message: `An error occurred while upgrading the user: ${error.message}`,
      });
      setActiveUserId(null);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => UserService.deleteUser(userId),
    onSuccess: () => {
      successToast({
        title: "User deleted successfully",
        message: "Your account has been deleted successfully.",
      });
      setDeleteUserId(null); // Close the delete modal
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Get_All_Users, 1, 10],
      });
    },
    onError: () => {
      errorToast({
        title: "Error deleting user",
        message: "Failed to delete the account. Please try again.",
      });
    },
  });

  const handleDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  const renderTableHeaders = adminTableHeaders.map((header) => (
    <TableHead className="h-[18px] py-2" key={header}>
      {header}
    </TableHead>
  ));

  return (
    <div className="relative mt-8 lg:mt-2 overflow-x-auto shadow-md border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="border-none py-[9px] hover:bg-transparent">
            {renderTableHeaders}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white hover:bg-white">
          {users?.map((user) => {
            const { _id, firstName, email, isTierRequest } = user;
            const isDialogOpen = activeUserId === _id;
            const isDeleteDialogOpen = deleteUserId === _id;
            console.log("user", user);
            return (
              <TableRow
                key={_id}
                className="border group py-2 border-b cursor-pointer transition-colors hover:bg-muted/50"
              >
                <TableCell className="py-2">
                  <p className="text-sm whitespace-nowrap">
                    {truncateText(_id ?? " ", 13)}
                  </p>
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">
                  {truncateText(firstName ?? " ", 20)}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">
                  {email}
                </TableCell>
                <TableCell className="whitespace-nowrap py-2">
                  <Dialog
                    open={isDialogOpen}
                    onOpenChange={(isOpen) =>
                      setActiveUserId(isOpen ? _id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        disabled={!isTierRequest || user.tier === "tier-4"}
                        className={`${
                          isTierRequest
                            ? "bg-blue-500 hover:bg-blue-400"
                            : "bg-gray-200 hover:bg-gray-200 "
                        } text-white px-4 py-2 rounded  ${
                          user?.tier === "tier-4" &&
                          "bg-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        Upgrade Tier
                      </Button>
                    </DialogTrigger>
                    <DialogContent className=" w-[340px] rounded-md  md:w-[400px]">
                      <DialogHeader>
                        <DialogTitle>Upgrade Tier</DialogTitle>
                        <DialogDescription>
                          <form
                            onSubmit={handleSubmit((data) =>
                              onSubmit({ ...data, userId: _id })
                            )}
                            className="space-y-8"
                          >
                            <div>
                              <label>
                                Tier
                                <CustomCompulsoryInputStar />
                              </label>
                              <Controller
                                name="tier"
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger className="bg-gray-200 outline-none border-none focus:ring-0 focus:ring-ring focus:ring-offset-0">
                                      <SelectValue placeholder="Select a tier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="tier-1">
                                        Tier 1
                                      </SelectItem>
                                      <SelectItem value="tier-2">
                                        Tier 2
                                      </SelectItem>
                                      <SelectItem value="tier-3">
                                        Tier 3
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <CustomButton
                                label="Update"
                                variant="primary"
                                type="submit"
                                loadingText="Updating Tier"
                                isLoading={upgradeUser.isPending}
                              />
                            </div>
                          </form>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                {user?.tier !== "tier-4" ? (
                  <TableCell className="whitespace-nowrap py-2">
                    <Dialog
                      open={isDeleteDialogOpen}
                      onOpenChange={(isOpen) =>
                        setDeleteUserId(isOpen ? _id : null)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded">
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[550px] max-w-[350px] rounded-md overflow-scroll">
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this user?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. The user account will
                            be permanently deleted.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => setDeleteUserId(null)}
                            className="text-grey bg-gray-200 hover:bg-gray-200"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteUser(_id)}
                          >
                            {deleteUserMutation.isPending
                              ? "Deleting"
                              : "Delete Account"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                ) : (
                  <TableCell className="whitespace-nowrap py-2" />
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTable;
