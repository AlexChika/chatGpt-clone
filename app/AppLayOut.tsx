"use client";
import { useState } from "react";
import React from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import SideBar from "../components/sidebar/SideBar";

const AppLayOut = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex bg-primary mx-auto max-w-screen-2xl">
      <SideBar showModal={showModal} />

      <main className="relative flex-1">
        {children}

        {/* float button */}
        <button
          onClick={() => setShowModal(!showModal)}
          className={`absolute z-10 text-white top-[20px] md:hidden ${
            showModal ? "left-[250px]" : "left-[20px]"
          }`}
        >
          <Bars3CenterLeftIcon className="h-9 w-9 animate-bounce pointer-events-none" />
        </button>
      </main>
    </div>
  );
};

export default AppLayOut;
