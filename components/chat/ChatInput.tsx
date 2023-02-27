"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { addMessage } from "../../lib/firebase";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const model = "text-davinci-003";

  async function sendMessage(e: FormEvent) {
    e.preventDefault();
    const input = prompt.trim();
    if (!input) return;

    const message: Message = {
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
      notification = toast.loading("ChatGPT is gathering resources...");

      await addMessage(session?.user?.email!, chatId, message);

      await fetch("/api/askQuestion", {
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

      toast.success("ChatGPT just responded", {
        id: notification!,
      });
    } catch (error) {
      toast.error("Unexpected error", {
        id: notification!,
      });
    }
  }

  return (
    <div className="bg-gray-700/50 text-gray-400 text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
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

      <div></div>
    </div>
  );
};

export default ChatInput;
