import React from "react";
import {  TicketConversation } from "../../types/ticket";
import { formatTimeAgo } from "../../utils/date";
import { getInitials } from "../../utils/getInitials";
import { truncateText } from "../../utils/text";
import { Avatar, AvatarFallback } from "../ui/avatar";

// Define the props for the Conversation component
interface ConversationProps {
    messages: TicketConversation[];
    title?: string;
}

const Conversation: React.FC<ConversationProps> = ({ messages , title }) => {
  if (!messages || messages.length === 0) {
    return null; // Early return if no messages
  }

  return (
    <div className="mt-2">
      {title && (
        <p className="font-medium text-sm text-gray-400">
          {title ?? "Conversations"}
        </p>
      )}
      <div className="mt-4 max-h-[100px] overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className="flex items-start w-full justify-between mt-2"
          >
            <div className="flex items-start w-full">
              <Avatar className="mr-1">
                <AvatarFallback className="group-hover:bg-gray-300 group-hover:text-black">
                  {getInitials(message.sender_name)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-1 flex-1">
                <div className="font-medium text-gray-400 text-sm whitespace-nowrap">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-0.5">
                      <p className="text-xs text-black">
                        {truncateText(message.sender_name, 13)}
                      </p>
                    </div>
                    <p className="text-[10px] font-medium">
                      {formatTimeAgo(message.created)}
                    </p>
                  </div>
                  <p
                    className="text-xs mt-0.5 w-full leading-tight whitespace-normal"
                    dangerouslySetInnerHTML={{ __html: message.ticket_message }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversation;
