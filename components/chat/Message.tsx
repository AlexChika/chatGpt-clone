import { DocumentData } from "firebase/firestore";
import React from "react";
import { ChatGptIcon } from "../../lib/icons";

const Message = ({ message }: { message: DocumentData }) => {
  const isChatGpt = message.user.avatar === "ChatGptIcon";

  return (
    <div className={`py-5 text-white ${isChatGpt && "bg-[#434654]"}`}>
      <div className="flex px-5 sm:px-10 space-x-5 max-w-2xl mx-auto">
        {isChatGpt ? (
          <span className="block min-w-8 min-h-8">
            <ChatGptIcon class="h-8 w-8" />
          </span>
        ) : (
          <img
            className="h-8 w-8"
            src={message.user.avatar}
            alt={message.user.name + "'s" + " avatar"}
          />
        )}

        <p className="pt-1 text-sm">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
