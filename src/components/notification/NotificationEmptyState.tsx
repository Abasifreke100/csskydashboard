import notificationAnime from "../../assets/notification-anime.mp4";

const NotificationEmptyState = () => {
  return (
    <div className="flex flex-col items-center  justify-center">
      <video
        src={notificationAnime}
        autoPlay
        loop
        muted
        className="w-56 h-56" // Adjust the width and height as needed
      />
    </div>
  );
};

export default NotificationEmptyState;
