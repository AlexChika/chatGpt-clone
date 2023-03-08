"use client";

import { orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { getChatRef } from "../../lib/firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";

const SideBar = ({ showModal }: { showModal: boolean }) => {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(getChatRef(session.user?.email!), orderBy("createdAt", "desc"))
  );

  return (
    <nav
      className={`fixed md:sticky top-0 bottom-0 left-0 bg-[#202123] max-w-[15rem] lg:max-w-[300px] h-screen overflow-y-auto min-w-[15rem] lg:w-full p-2 flex flex-col transition-transform duration-200 ease-linear z-10 md:translate-x-0 ${
        showModal ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex-1 overflow-y-auto">
        <div>
          {/* new chat */}
          <NewChat />

          <div>
            <ModelSelection />
          </div>

          {/* map through Chart rows*/}
          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading chats</p>
              </div>
            )}

            {chats?.docs.map((chat) => {
              return <ChatRow key={chat.id} id={chat.id} />;
            })}
          </div>
        </div>
      </div>

      {session && (
        <div
          onClick={() => signOut()}
          className="flex space-x-3 items-center justify-center text-white cursor-pointer hover:opacity-50 mb-2 p-1 bg-primary text-gray-500 w-full rounded"
        >
          <img
            className="min-h-6 h-6 w-6 rounded-full cursor-pointer"
            src={session.user?.image!}
            alt={`${session.user?.name!}'s profile picture`}
          />

          <p className="text-lg font-bold">Log Out</p>
        </div>
      )}
    </nav>
  );
};

export default SideBar;
