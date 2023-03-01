"use client";
import { useState } from "react";
import React from "react";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import SideBar from "../components/sidebar/SideBar";
import { Toaster } from "react-hot-toast";

const AppLayOut = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex bg-primary mx-auto max-w-screen-2xl overflow-hidden">
      <SideBar showModal={showModal} />

      <main
        onClick={(e: any) => {
          if (e.target?.dataset?.role === "nav_button") return;
          setShowModal(false);
        }}
        className="relative w-full"
      >
        <Toaster position="top-right" />

        {children}

        {/* float button */}
        <button
          data-role="nav_button"
          onClick={() => setShowModal(!showModal)}
          className={`fixed z-20 text-white top-[12px] md:hidden pointer_none ${
            showModal ? "left-[250px]" : "left-[20px]"
          }`}
        >
          <Bars3CenterLeftIcon className="h-9 w-9" />
        </button>
      </main>
    </div>
  );
};

export default AppLayOut;
