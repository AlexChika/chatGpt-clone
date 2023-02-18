"use client"
import { useState } from "react"


import React from 'react'
import SideBar from "../components/SideBar"
import HomePage from "../components/HomePage"

const Home = () => {
    const [showModal, setShowModal] = useState(false)
    console.log(showModal);


    return <main className="flex">
        <SideBar showModal={showModal} />

        {/* client provider  */}

        <HomePage setShowModal={setShowModal} showModal={showModal} />

    </main>
}

export default Home