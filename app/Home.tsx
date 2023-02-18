"use client"
import { useState } from "react"
import React from 'react'
import SideBar from "../components/SideBar"
import HomePage from "../components/HomePage"

const Home = () => {
    const [showModal, setShowModal] = useState(false)


    return <main className="flex">

        <SideBar showModal={showModal} />

        <HomePage setShowModal={setShowModal} showModal={showModal} />

    </main>
}

export default Home