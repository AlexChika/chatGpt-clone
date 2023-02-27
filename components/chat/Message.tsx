import { DocumentData } from "firebase/firestore";
import React from "react";
import { ChatGptIcon } from "../../lib/icons";

const Message = ({ message }: { message: DocumentData }) => {
  return (
    <div>
      <div className="flex space-x-5 max-w-2xl mx-auto">
        {message.user.avatar === "ChatGptIcon" ? (
          <ChatGptIcon class="h--8 w-8" />
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
