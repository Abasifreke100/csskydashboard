import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Separator } from "../ui/separator";
import {
  useMarkAllAsRead,
  useNotificationById,
  useNotifications,
} from "../../hooks/useNotifications";
import { FetchLoadingAndEmptyState } from "../shared/FetchLoadingAndEmptyState";
import NotificationSkeleton from "../notification/NotificationSkeleton";
import NotificationEmptyState from "../notification/NotificationEmptyState";
import getNotificationSVG from "../../store/notification";
import { formatTimeAgo } from "../../utils/date";
  
const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState<
    string | null
  >(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalNotifications, setTotalNotifications] = useState<number>(0);

  // Fetch list of notifications based on the current page
  const { data: notifications, isLoading } = useNotifications({
    page: currentPage,
    size: 10,
  });

  // Fetch a single notification when an ID is selected
  const { data: singleNotification, isLoading: isSingleLoading } =
    useNotificationById(selectedNotificationId || "");

  const { mutate: markAllAsRead } = useMarkAllAsRead();

  useEffect(() => {
    if (notifications) {
      setTotalNotifications(notifications.length);
    }
  }, [notifications]);

  // Request permission for desktop notifications when the component mounts
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  }, []);

  // Show a browser notification for only unread notifications
  useEffect(() => {
    if (notifications && notifications.length > 0) {
      const unreadNotifications = notifications.filter(
        (notification) => !notification.markAsRead
      );
      if (unreadNotifications.length > 0) {
        const latestNotification = unreadNotifications[0];
        showBrowserNotification(
          latestNotification?.title,
          latestNotification?.description
        );
      }
    }
  }, [notifications]);

  const showBrowserNotification = (title: string, message: string) => {
    if (Notification.permission === "granted") {
      new Notification(title || "New Notification", {
        body: message || "You have a new task assigned!",
        icon: "/notification-icon.png",
      });
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevent going to negative pages
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="relative">
        <IoIosNotificationsOutline className="text-[28px]" />
        {notifications?.filter((notification) => !notification.markAsRead)
          .length !== 0 && (
          <div className="w-4 h-4 bg-[#FF7F00] text-white text-[9px] flex items-center justify-center rounded-full absolute right-0.5 top-0">
            {
              notifications?.filter((notification) => !notification.markAsRead)
                .length
            }
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent align="center" alignOffset={5}>
        <div className="flex justify-between items-center font-poppins">
          <p className="text-primary text-sm">Notifications</p>
          <button
            className="text-xs text-gray-300 cursor-pointer"
            onClick={() => markAllAsRead()}
          >
            Mark all as read
          </button>
        </div>
        <Separator />

        {/* Render list of notifications */}
        <FetchLoadingAndEmptyState
          isLoading={isLoading}
          numberOfSkeleton={1}
          skeleton={<NotificationSkeleton length={3} />}
          emptyState={<NotificationEmptyState />}
          data={notifications?.length} // Show total notifications instead of unread
        >
          <div className="max-h-[200px] overflow-y-auto">
            {notifications?.map((notification) => (
              <div
                key={notification?._id}
                className={`flex justify-between items-center mt-4 font-poppins cursor-pointer ${
                  notification.markAsRead ? "text-gray-500" : "text-black"
                }`}
                onClick={() => setSelectedNotificationId(notification?._id)}
              >
                <div className="flex items-center gap-1">
                  {getNotificationSVG("ticket")}
                  <div className="text-xs">
                    <p className="font-semibold w-32 truncate">
                      {notification?.title}
                    </p>
                    <p className="text-gray-400 truncate w-[128px]">
                      {notification?.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[9px] text-gray-300 truncate">
                    {formatTimeAgo(notification?.createdAt)}
                  </p>
                  {notification.markAsRead && (
                    <div className="text-blue-500 text-xs flex items-center">
                      <span>✓✓</span>{" "}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-2">
            <button
              onClick={handlePreviousPage}
              className="text-xs text-blue-500 disabled:opacity-50 disabled:text-gray-300"
              disabled={currentPage === 1}
            >
              Back
            </button>
            <button
              onClick={handleNextPage}
              className="text-xs text-blue-500 disabled:opacity-50 disabled:text-gray-300"
              disabled={totalNotifications < 10} // Assuming 10 is the size
            >
              Next
            </button>
          </div>
        </FetchLoadingAndEmptyState>

        {selectedNotificationId && (
          <div className="">
            <button
              className=" mt-2 flex text-end gap-2 items-center text-blue-500 text-xs"
              onClick={() => setSelectedNotificationId(null)}
              aria-label="Close notification details"
            >
              Close notification details
            </button>
            {isSingleLoading ? (
              <NotificationSkeleton length={1} />
            ) : (
              singleNotification && (
                <div className="font-poppins">
                  <h2 className="font-bold text-sm">
                    {singleNotification.title}
                  </h2>
                  <p className="text-gray-500 text-xs">
                    {singleNotification.description}
                  </p>
                  <p className="text-[9px] text-gray-300 truncate mt-2">
                    {formatTimeAgo(singleNotification.createdAt)}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;
