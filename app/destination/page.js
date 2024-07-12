import {BentoGridDemo} from "@/container/destination-page/main-grids";
import React from "react";

export default function Destination() {
  return (
    <div className="w-full h-full  flex items-center  justify-center bg-background dark:bg-background-dark pt-36">
      <div className="">
        <BentoGridDemo />
      </div>
    </div>
  );
}
