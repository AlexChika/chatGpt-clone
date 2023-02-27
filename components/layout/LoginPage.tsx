"use client";
import { signIn } from "next-auth/react";
import { ChatGptIcon } from "../../lib/icons";

const LoginPage = () => {
  return (
    <div className="bg-[#11a37f] h-screen flex flex-col items-center justify-center text-center ">
      <ChatGptIcon class="h-24 w-24" />

      <button
        onClick={() => signIn(`google`)}
        className="text-white font-bold text-3xl animate-pulse"
      >
        Sign in to use ChatGPT
      </button>
    </div>
  );
};

export default LoginPage;
