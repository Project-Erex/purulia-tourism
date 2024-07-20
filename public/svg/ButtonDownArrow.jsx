import React from "react";
import {twMerge} from "tailwind-merge";

function ButtonDownArrowIcon({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={twMerge("w-16 text-center h-auto", className)}>
      <g
        className="dark:fill-heading fill-heading-dark"
        fill="#F6FFF8"
        fillRule="evenodd"
        clipPath="url(#clip0_159_76)"
        clipRule="evenodd">
        <path d="M13.447 23.375V1.5h-1.875v21.875h1.875z"></path>
        <path d="M11.572 22.438c0-4.41 3.878-8.012 8.013-8.012h.937V16.3h-.937c-3.139 0-6.138 2.802-6.138 6.137v.937h-1.875v-.937z"></path>
        <path d="M13.45 22.438c0-4.41-3.878-8.012-8.013-8.012H4.5V16.3h.937c3.14 0 6.138 2.802 6.138 6.137v.937h1.875v-.937z"></path>
      </g>
      <defs>
        <clipPath id="clip0_159_76">
          <path
            className="dark:fill-heading fill-heading-dark"
            fill="#fff"
            d="M0 0H24V24H0z"
            transform="rotate(-180 12 12)"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default ButtonDownArrowIcon;
