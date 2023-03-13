"use client";
import { signIn } from "next-auth/react";
import { ChatGptIcon } from "../../lib/icons";

const LoginPage = () => {
  return (
    <div className="bg-primary h-screen flex flex-col items-center justify-center text-center ">
      <ChatGptIcon class="h-24 w-24" />

      <button
        onClick={() => signIn(`google`)}
        className="bg-neutral-600 rounded text-white font-bold text-xl animate-bounce p-3 mt-10 hover:bg-[#11a37f] transition-colors duration-150"
      >
        Sign in to use ChatGPT
      </button>
    </div>
  );
};

export default LoginPage;

//  bg-[#11a37f]
