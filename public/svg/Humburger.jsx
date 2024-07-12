import React from "react";
import {twMerge} from "tailwind-merge";

function Humberger({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 24 24"
      className={twMerge("w-6 h-auto", className)}>
      <path d="M4.5 17.5H2a2 2 0 00-2 2V22a2 2 0 002 2h2.5a2 2 0 002-2v-2.5a2 2 0 00-2-2zm0 4.5H2v-2.5h2.5zM22 17.5h-2.5a2 2 0 00-2 2V22a2 2 0 002 2H22a2 2 0 002-2v-2.5a2 2 0 00-2-2zm0 4.5h-2.5v-2.5H22zM4.5 8.75H2a2 2 0 00-2 2v2.5a2 2 0 002 2h2.5a2 2 0 002-2v-2.5a2 2 0 00-2-2zm0 4.5H2v-2.5h2.5zM22 8.75h-2.5a2 2 0 00-2 2v2.5a2 2 0 002 2H22a2 2 0 002-2v-2.5a2 2 0 00-2-2zm0 4.5h-2.5v-2.5H22zM4.5 0H2a2 2 0 00-2 2v2.5a2 2 0 002 2h2.5a2 2 0 002-2V2a2 2 0 00-2-2zm0 4.5H2V2h2.5zM13.25 17.5h-2.5a2 2 0 00-2 2V22a2 2 0 002 2h2.5a2 2 0 002-2v-2.5a2 2 0 00-2-2zm0 4.5h-2.5v-2.5h2.5zM13.25 8.75h-2.5a2 2 0 00-2 2v2.5a2 2 0 002 2h2.5a2 2 0 002-2v-2.5a2 2 0 00-2-2zm0 4.5h-2.5v-2.5h2.5zM13.25 0h-2.5a2 2 0 00-2 2v2.5a2 2 0 002 2h2.5a2 2 0 002-2V2a2 2 0 00-2-2zm0 4.5h-2.5V2h2.5zM22 0h-2.5a2 2 0 00-2 2v2.5a2 2 0 002 2H22a2 2 0 002-2V2a2 2 0 00-2-2zm0 4.5h-2.5V2H22z"></path>
    </svg>
  );
}

export default Humberger;
