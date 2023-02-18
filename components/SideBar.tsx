"use client"
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid"
import NewChat from "./NewChat"

const SideBar = ({ showModal }: { showModal: boolean }) => {
    return (
        <nav className={`fixed md:sticky top-0 bottom-0 left-0 bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[15rem] lg:w-full p-2 flex flex-col transition-transform duration-200 ease-linear z-10 md:translate-x-0 ${showModal ? "translate-x-0 md:translate-x-0" : "-translate-x-full"}`}>

            <div className="flex-1">
                <div>
                    {/* new chat */}
                    <NewChat />

                    <div>
                        {/* module selection */}
                    </div>

                    {/* map through Chart rows*/}
                </div>


            </div>

        </nav>
    )
}

export default SideBar
