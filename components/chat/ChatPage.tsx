"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { getMessageRef } from "../../lib/firebase";
import Message from "./Message";

type Props = {
  chatId: string;
};
const ChatPage = ({ chatId }: Props) => {
  const { data: session } = useSession();
  const [messages, loading, error] = useCollection(
    query(
      getMessageRef(session?.user?.email!, chatId),
      orderBy("createdAt", "asc")
    )
  );

  return (
    <div className="flex-1 overflow-y-auto hide__scroll__bar pb-32">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mt-5 mx-auto text-white animate-bounce" />
        </>
      )}

      {messages?.docs.map((message) => {
        return <Message key={message.id} message={message.data()} />;
      })}
    </div>
  );
};

export default ChatPage;
