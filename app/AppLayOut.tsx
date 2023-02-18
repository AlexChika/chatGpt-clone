"use client"
import { useState } from "react"
import React from 'react'
import SideBar from "../components/SideBar"
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid"

const AppLayOut = ({ children }: { children: React.ReactNode }) => {
    const [showModal, setShowModal] = useState(false)


    return <div className="flex bg-primary">

        <SideBar showModal={showModal} />


        <main className="relative flex-1">

            {children}

            {/* float button */}
            <button onClick={() => setShowModal(!showModal)} className={`absolute text-white top-[20px] md:hidden ${showModal ? "left-[180px]" : "left-[20px]"}`}>
                <Bars3CenterLeftIcon className="h-9 w-9 animate-bounce pointer-events-none" />
            </button>
        </main>
    </div>
}

export default AppLayOut