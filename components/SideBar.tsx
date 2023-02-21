"use client"

import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore"
import { getChatRef } from "../firebase";
import ChatRow from "./ChatRow";
import NewChat from "./NewChat"

const SideBar = ({ showModal }: { showModal: boolean }) => {

    const { data: session } = useSession();
    const [chats, loading, error] = useCollection(
        session && getChatRef(session.user?.email!)
    )

    console.log(chats);



    return (
        <nav className={`fixed md:sticky top-0 bottom-0 left-0 bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[15rem] lg:w-full p-2 flex flex-col transition-transform duration-200 ease-linear z-10 md:translate-x-0 ${showModal ? "translate-x-0" : "-translate-x-full"}`}>

            <div className="flex-1 overflow-y-auto">
                <div>
                    {/* new chat */}
                    <NewChat />

                    <div>
                        {/* module selection */}
                    </div>

                    {/* map through Chart rows*/}
                    {chats?.docs.map((chat) => {
                        return <ChatRow key={chat.id} id={chat.id} />
                    })}
                </div>


            </div>

            {
                session && <img onClick={() => signOut()} className="min-h-12 h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50" src={session.user?.image!} alt={`${session.user?.name!}'s profile picture`} />
            }

        </nav>
    )
}

export default SideBar