"use client";

import useSWR from "swr";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { addMessage } from "../../lib/firebase";
import toast from "react-hot-toast";
import query from "../../lib/api/query";

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });
  const formInputRef = useRef<null | HTMLDivElement>(null);

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    const input = prompt.trim();
    if (!input) return;

    const userMessage: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    let notification: string;

    try {
      notification = toast.loading("Clone is asking ChatGPT");

      await addMessage(session?.user?.email!, chatId, userMessage);

      setPrompt("");
      /*
    //   ASSUMING WE WERE USING THE ASK QUSTION API ROUTTE. we didnt use the api because vercel edge function kept timing out at 10secs
      const response = await fetch("/api/askQuestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          chatId,
          model,
          session,
        }),
      });
     const data = await response.json();
     const text = data.answer
       */

      const text = await query(input, model);
      const gptMessage: Message = {
        text: text!,
        createdAt: serverTimestamp(),
        user: {
          _id: "ChatGPT",
          name: "ChatGPT",
          avatar: "ChatGptIcon",
        },
      };

      await addMessage(session?.user?.email!, chatId, gptMessage);

      toast.success("ChatGPT just replied clone", {
        id: notification!,
      });
    } catch (error) {
      toast.error("Unexpected error", {
        id: notification!,
      });
    }
  }

  useEffect(() => {
    if (formInputRef.current) {
      formInputRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "nearest",
        block: "start",
      });
    }
  }, [formInputRef.current]);

  return (
    <div
      ref={formInputRef}
      className="relative text-gray-400 text-sm py-5 flex items-center justify-center h-20"
    >
      <form
        onSubmit={sendMessage}
        className="bg-gray-700/50 border border-gray-700/50 px-5 py-2 space-x-5 flex rounded w-[95%] sm:w-[80%] min-w-[300px] mx-auto z-50 absolute "
      >
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="type your message here..."
          className="bg-transparent focus:outline-none flex-1"
        />

        <button
          disabled={!prompt || !session}
          type="submit"
          className={`bg-[#11A37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed`}
        >
          <PaperAirplaneIcon className="h-4 w-4 rotate-45" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;

// <div className="absolute h-20 bottom-0 left-0 right-0 bg-primary box_shadow"></div>;
