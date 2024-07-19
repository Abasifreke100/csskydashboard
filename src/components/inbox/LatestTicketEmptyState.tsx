import { FaEnvelopeOpenText } from "react-icons/fa";

const LatestTicketEmptyState = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-24 ">
      <div className=" text-orange-400 h-20 w-fit relative  flex items-center  justify-center text-7xl rounded-full">
        <FaEnvelopeOpenText className="z-20 absolute  " />
        <div className="w-20 h-20 bg-orange-200 animate-ping absolute top-0 bottom-0 rounded-full" />
      </div>
      <p className="mt-10 text-md font-medium font-poppins">
        No messages available at the moment
      </p>
    </div>
  );
};

export default LatestTicketEmptyState;
