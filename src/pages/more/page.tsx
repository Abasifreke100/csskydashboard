import React, { useState } from "react";
import Header from "../../components/global/header";
import { Card, CardContent } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import EditIcon from "../../lib/icons/edit-icon";
import LegalIcon from "../../lib/icons/legal-icon";
import HeadsetIcon from "../../lib/icons/headset-icon";
import { DocumentationIcon } from "../../lib/icons/document-icon";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getInitials } from "../../utils/getInitials";
import { formatTier } from "../../utils/text";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "../../components/ui/dialog";
import ProfileForm from "../../components/more/Profile";
import SupportForm from "../../components/more/Support";
import { Button } from "../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { UserService } from "../../service/user";
import { errorToast, successToast } from "../../utils/toast";

const moreCard = [
  {
    icon: HeadsetIcon,
    title: "Support",
  },
  {
    icon: DocumentationIcon,
    title: "Documentation",
  },
  {
    icon: LegalIcon,
    title: "Legal",
  },
];

const More = () => {
  const [avatarSrc, setAvatarSrc] = useState("https://github.com/shadcn.png");
  const data = useSelector((state: RootState) => state.auth);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openSupportDialog, setOpenSupportDialog] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleCardClick = (title: string) => {
    if (title === "Documentation") {
      window.open(
        "https://documenter.getpostman.com/view/7257932/2sA2r82Pmm",
        "_blank"
      );
    } else if (title === "Support") {
      setOpenSupportDialog(true);
    }
  };
  const fullName = `${data?.user?.firstName ?? ""} ${
    data?.user?.lastName ?? ""
  }`;
  const initials = getInitials(
    fullName !== " " ? fullName : (data?.user?.role as string)
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => UserService.deleteUser(userId),
    onSuccess: () => {
      successToast({
        title: "User deleted successfully",
        message: "Your account has been deleted successfully.",
      });
      setDeleteModalOpen(false); // Close the delete modal
    },
    onError: (error) => {
      console.error(error.message);
      errorToast({
        title: "Error deleting user",
        message: "Failed to delete your account. Please try again.",
      });
    },
  });

  const handleDeleteUser = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  return (
    <div className="md:h-screen mb-16 lg:mb-0">
      <Header title="More Options" />
      <div className="grid grid-cols-12 gap-5 mt-4">
        {/* Profile Dialog */}
        <Dialog
          open={openProfileDialog}
          onOpenChange={(open) => setOpenProfileDialog(open)}
        >
          <DialogTrigger className="col-span-12 md:col-span-6 lg:col-span-4">
            <Card className="w-full h-44 flex py-4 items-center justify-center shadow-md">
              <CardContent className="flex flex-col items-center justify-center">
                <Avatar className="w-14 h-14 rounded-full overflow-hidden">
                  <AvatarImage
                    src={avatarSrc}
                    alt="@shadcn"
                    className="w-full h-full object-cover"
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col mt-3 items-center">
                  <p className="text-md font-medium flex items-center gap-3">
                    My Profile{" "}
                    <span className="text-grey">
                      <EditIcon />
                    </span>
                  </p>
                  <Badge className="bg-[#FFFAEF] mt-2 hover:bg-[#FFFAEF] hover:text-primary hidden md:block text-[#FF7F00]">
                    {formatTier(data?.user?.tier ?? "N/A")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-h-[550px] max-w-[450px] overflow-scroll">
            <DialogHeader>
              <DialogTitle>
                <div className="flex gap-4">
                  <div className="flex gap-x-3">
                    <Avatar className="w-16 h-16 rounded-full overflow-hidden">
                      <AvatarImage
                        src={avatarSrc}
                        alt="@shadcn"
                        className="w-full h-full object-cover"
                      />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex gap-1 mt-2">
                        <p className="text-md">{fullName}</p>
                        <Badge className="bg-[#FFFAEF] hover:bg-[#FFFAEF] hover:text-primary hidden md:block text-[#FF7F00]">
                          {formatTier(data?.user?.tier ?? "N/A")}
                        </Badge>
                      </div>
                      <p className="text-xs">{data?.user?.email ?? ""}</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="change_photo"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="change_photo"
                    className="text-xs font-medium text-grey bg-gray-200 h-fit px-2 py-1 rounded-xl cursor-pointer"
                  >
                    Change Photo
                  </label>
                </div>
              </DialogTitle>
            </DialogHeader>
            <ProfileForm
              user={data?.user ?? undefined}
              setDeleteModalOpen={setDeleteModalOpen}
              setOpenProfileDialog={setOpenProfileDialog}
            />
          </DialogContent>
        </Dialog>

        {moreCard.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className={`${
                card.title === "Documentation" ? "cursor-pointer" : ""
              } col-span-12 py-6 h-44 md:col-span-6 lg:col-span-4 shadow-md`}
              onClick={() => handleCardClick(card.title)}
            >
              <CardContent className="flex flex-col items-center justify-center mt-2">
                <div className="bg-[#FFF7EF] w-fit p-3 rounded-md flex items-center justify-center text-[#FF7F00]">
                  <Icon />
                </div>
                <p className="text-md font-semibold mt-5">{card.title}</p>
              </CardContent>
            </Card>
          );
        })}

        {/* Support Dialog */}
        <Dialog
          open={openSupportDialog}
          onOpenChange={(open) => setOpenSupportDialog(open)}
        >
          <DialogContent className="max-h-[550px] max-w-[450px] overflow-scroll">
            <DialogHeader>
              <DialogTitle>
                <p className="text-xs uppercase font-medium text-primary">
                  Contact Admin Support
                </p>
                <p>How may we help you ?</p>
              </DialogTitle>
              <p className="text-gray-400 text-sm font-normal">
                Having difficult or need guidance in navigating the system ,
                Send us a message now ?
              </p>
            </DialogHeader>
            <SupportForm user={data?.user ?? null} /> {/* Render the SupportForm component */}
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          open={deleteModalOpen}
          onOpenChange={(open) => setDeleteModalOpen(open)}
        >
          <DialogContent className="max-h-[550px] max-w-[450px] overflow-scroll">
            <DialogHeader>
              <DialogTitle>
                <p>Are you sure you want to delete your account?</p>
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={() => handleDeleteUser(data?.user?._id ?? "")}
              >
                Delete Account
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default More;
