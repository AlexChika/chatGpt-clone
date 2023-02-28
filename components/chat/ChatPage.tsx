"use client";

import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
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

  const chatPageRef = useRef<null | HTMLDivElement>(null);

  function isMessageNew(time: any) {
    let isNew = true;

    if (time === null) {
      return isNew;
    }

    const _time = new Date(time.toDate()).getTime();
    const currentTime = new Date().getTime();
    const remainingTime = currentTime - _time;

    isNew = remainingTime < 10_000 ? true : false;

    return isNew;
  }

  useEffect(() => {
    if (chatPageRef.current) {
      chatPageRef.current.scrollTo(0, Number(chatPageRef.current.scrollHeight));
    }
  }, [messages]);

  return (
    <div
      ref={chatPageRef}
      className="flex-1 overflow-y-auto hide__scroll__bar mb-20"
    >
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started
          </p>
          <ArrowDownCircleIcon className="h-10 w-10 mt-5 mx-auto text-white animate-bounce" />
        </>
      )}

      {messages?.docs.map((message, index) => {
        return (
          <Message
            key={message.id}
            message={message.data()}
            last={
              index + 1 === messages.docs.length &&
              message.data().user.avatar === "ChatGptIcon" &&
              isMessageNew(message.data().createdAt)
            }
          />
        );
      })}
    </div>
  );
};

export default ChatPage;
