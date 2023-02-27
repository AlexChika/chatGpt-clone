"use client";

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
    <div className="flex-1">
      {messages?.docs.map((message) => {
        return <Message key={message.id} message={message.data()} />;
      })}
    </div>
  );
};

export default ChatPage;
