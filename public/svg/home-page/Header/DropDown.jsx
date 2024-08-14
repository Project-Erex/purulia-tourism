import React from "react";
import {twMerge} from "tailwind-merge";

function DropDownIcon({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 24 24"
      className={twMerge("w-6 h-auto", className)}>
      <path d="M18.71 8.21a1 1 0 00-1.42 0l-4.58 4.58a1 1 0 01-1.42 0L6.71 8.21a1 1 0 00-1.42 0 1 1 0 000 1.41l4.59 4.59a3 3 0 004.24 0l4.59-4.59a1 1 0 000-1.41z"></path>
    </svg>
  );
}

export default DropDownIcon;
