"use client";
import {NavLink} from "@/data/header";
import ErexMainLogo from "@/public/svg/ErexMainLogo";
import Link from "next/link";
import React, {useState} from "react";
import {ToggleDarkMode} from "../ui/toggle/toggleDarkMode";
import Humberger from "@/public/svg/Humburger";
import Section from "../section/Section";
import {AnimatePresence, motion} from "framer-motion";

export default function Header() {
  const [mobMenu, setMobMenu] = useState(false);

  const closeMenu = () => setMobMenu(false);
  return (
    <>
      <header className="z-[999] w-full flex flex-col items-center justify-center fixed ">
        <Section
          className="overflow-visible border-b dark:border-subheading-light border-subheading-dark"
          type="paddingX">
          <div className="w-full h-auto flex items-center   justify-between">
            <div className="pt-2 pb-3">
              <Link onClick={closeMenu} href="/">
                <figure>
                  <ErexMainLogo className="w-24" />
                </figure>
              </Link>
            </div>
            <div className=" lg:flex hidden gap-14">
              {NavLink.map((item, index) => {
                return (
                  <div key={index}>
                    <Link
                      className="font-DMSans font-normal text-heading dark:text-heading-dark"
                      href={item.id}>
                      {item.title}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-5 ">
              <ToggleDarkMode />
              <Link
                onClick={closeMenu}
                href="/contact-us"
                className="bg-primary xl:flex hidden hover:bg-opacity-80 text-[16px] px-6 py-3 rounded-full text-background font-DMSans ">
                Contact
              </Link>
              <button
                onClick={() => {
                  setMobMenu(!mobMenu);
                }}>
                <Humberger className="flex w-7 fill-heading xl:hidden dark:fill-heading-dark" />
              </button>
            </div>
          </div>
        </Section>

        {/* Mobile Navbar */}

        <AnimatePresence>
          {mobMenu && (
            <motion.div className="z-50 flex justify-end w-full h-svh bg-white/25 dark:bg-black/25 ">
              <motion.div
                initial={{opacity: 0, x: 100}}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {duration: 0.5, ease: "easeInOut"},
                }}
                exit={{
                  opacity: 0,
                  x: 100,
                }}
                className="w-full h-full gap-3 px-5 py-5 shadow-2xl md:w-96 bg-background dark:bg-background-dark">
                <div className="flex flex-col  w-full gap-5 mt-3 cursor-pointer select-none">
                  {NavLink.map((item, index) => {
                    return (
                      <div onClick={closeMenu} key={index}>
                        <Link
                          className="text-heading dark:text-heading-dark hover:text-primary dark:hover:text-primary font-Satoshi text-[24px] font-bold "
                          href={item.id}>
                          {item.title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
