"use client";
import {NavLink} from "@/data/header";
import ErexMainLogo from "@/public/svg/ErexMainLogo";
import Link from "next/link";
import React, {useState} from "react";
// import {ToggleDarkMode} from "../ui/toggle/toggleDarkMode";
import {cn} from "@/utils/cn";
import {HoveredLink, Menu, MenuItem} from "@/components/aceternity/navbar-menu";
import Humberger from "@/public/svg/Humburger";
import Section from "../section/Section";
import {AnimatePresence, motion} from "framer-motion";

import DropDownIcon from "../../public/svg/home-page/Header/DropDown";

export default function Header() {
  const [mobMenu, setMobMenu] = useState(false);
  const [openItem, setOpenItem] = useState(1);

  const toggleAccordion = (item) => {
    setOpenItem((prevItem) => (prevItem === item ? null : item));
  };

  const closeMenu = () => setMobMenu(false);
  return (
    <>
      <header className="z-[999] w-full flex flex-col items-center justify-center fixed ">
        <Section
          className=" overflow-visible  !bg-transparent backdrop-blur-lg "
          type="paddingX">
          <div className="w-full h-auto flex items-center   justify-between">
            <div className="pt-2 pb-3">
              <Link onClick={closeMenu} href="/">
                <figure>
                  <ErexMainLogo className="w-24" />
                </figure>
              </Link>
            </div>
            <div className="flex items-center  ">
              <Navbar className="hidden lg:flex" />
              {/* <ToggleDarkMode /> */}

              <button
                onClick={() => {
                  setMobMenu(!mobMenu);
                }}>
                <Humberger className="flex w-7 fill-heading lg:hidden dark:fill-heading-dark" />
              </button>
            </div>
          </div>
        </Section>

        {/* Mobile Navbar */}

        {/* <AnimatePresence>
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
        </AnimatePresence> */}

        <AnimatePresence>
          {mobMenu && (
            <>
              <motion.div className="z-50 flex justify-end w-full h-svh">
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
                  <div className="flex items-center w-full gap-2 mb-3 cursor-pointer select-none">
                    <Link
                      onClick={closeMenu}
                      href="/"
                      className="text-heading dark:text-heading-dark hover:text-primary dark:hover:text-primary font-Satoshi text-[24px] font-bold ">
                      Home
                    </Link>
                  </div>
                  <div
                    className="flex items-center w-full gap-2 cursor-pointer select-none"
                    onClick={() => toggleAccordion(1)}>
                    <h1 className="text-heading dark:text-heading-dark hover:text-primary dark:hover:text-primary font-Satoshi text-[24px] font-bold ">
                      Package
                    </h1>
                    <DropDownIcon className="pt-1 fill-subheading dark:fill-subheading-dark w-7" />
                  </div>

                  <AnimatePresence>
                    {openItem === 1 && (
                      <motion.div className="flex flex-col ">
                        <div className="flex flex-col items-start grid-cols-1 gap-3 pt-3 pb-5">
                          <Link
                            rel="canonical"
                            onClick={closeMenu}
                            href="/comingsoon"
                            className="text-subheading dark:text-subheading-dark hover:text-primary dark:hover:text-primary font-Satoshi text-[20px] font-semibold  ">
                            Package
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div
                    className="flex items-center w-full gap-2 mt-3 cursor-pointer select-none"
                    onClick={() => toggleAccordion(2)}>
                    <h1 className="text-heading dark:text-heading-dark hover:text-primary dark:hover:text-primary font-Satoshi text-[24px] font-bold ">
                      Destination
                    </h1>
                    <DropDownIcon className="pt-1 fill-subheading dark:fill-subheading-dark w-7" />
                  </div>
                  <AnimatePresence>
                    {openItem === 2 && (
                      <motion.div viewport="once" className="flex flex-col ">
                        <div className="flex flex-col items-start grid-cols-1 gap-3 pt-3 pb-5">
                          <Link
                            onClick={closeMenu}
                            href="/destination"
                            className="text-subheading dark:text-subheading-dark hover:text-primary dark:hover:text-primary font-Satoshi text-[20px] font-semibold  ">
                            Destination
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div
                    className="flex items-center w-full gap-2 mt-3 cursor-pointer select-none"
                    onClick={() => toggleAccordion(3)}>
                    <h1 className="text-heading dark:text-heading-dark hover:text-primary dark:hover:text-primary font-Satoshi text-[24px] font-bold ">
                      Itinerary
                    </h1>
                    <DropDownIcon className="pt-1 fill-subheading dark:fill-subheading-dark w-7" />
                  </div>
                  <AnimatePresence>
                    {openItem === 3 && (
                      <motion.div viewport="once" className="flex flex-col ">
                        <div className="flex flex-col items-start grid-cols-1 gap-3 pt-3 pb-5">
                          <Link
                            onClick={closeMenu}
                            href="/itinerary"
                            className="text-subheading dark:text-subheading-dark hover:text-primary dark:hover:text-primary font-Satoshi text-[20px] font-bold ">
                            Itinerary
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center w-full gap-2 mt-3 cursor-pointer select-none">
                    <Link
                      onClick={closeMenu}
                      href="/about"
                      className="text-heading dark:text-heading-dark hover:text-primary dark:hover:text-primary font-Satoshi text-[24px] font-bold ">
                      About
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function Navbar({className}) {
  const [active, setActive] = useState(null);
  return (
    <div className={cn("z-50", className)}>
      <Menu setActive={setActive}>
        <Link
          onMouseEnter={() => {
            setActive(null);
          }}
          href="/"
          className="text-heading dark:text-heading-dark hover:text-primary dark:hover:text-primary font-OpenSans text-base font-normal ">
          Home
        </Link>
        <MenuItem setActive={setActive} active={active} item="Package">
          <div className="flex flex-col space-y-4 ">
            <HoveredLink href="/comingsoon">Package</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Destination">
          <div className="flex flex-col space-y-4 ">
            <HoveredLink href="/destination">Destination</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Itinerary">
          <div className="flex flex-col space-y-4 ">
            <HoveredLink href="/itinerary">Itinerary</HoveredLink>
          </div>
        </MenuItem>

        <Link
          onMouseEnter={() => {
            setActive(null);
          }}
          href="/about"
          className="text-heading dark:text-heading-dark hover:text-primary dark:hover:text-primary font-OpenSans text-base font-normal ">
          About
        </Link>
      </Menu>
    </div>
  );
}
