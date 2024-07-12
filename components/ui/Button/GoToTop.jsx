"use client";
import DownArrowIcon from "@/components/UI/icon/DownArrow";
import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";

const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  };

  const listenToScroll = () => {
    let heightToHidden = 100;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  const transition = {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop",
  };

  return (
    <div className="relative flex items-center z-[1000] justify-center ">
      {isVisible && (
        <div
          className=" w-14 h-14 rounded-full md:flex justify-center pt-[7px]  cursor-pointer bg-primary fixed xl:bottom-10 lg:right-10 right-5 bottom-5 hidden  lg:bottom-14 z-[999] "
          onClick={goToBtn}>
          <motion.div
            className="text-4xl "
            animate={{
              y: [0, 8, 0],
            }}
            transition={transition}>
            <DownArrowIcon className="w-8 rotate-180 " />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GoToTop;
