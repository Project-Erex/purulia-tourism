import Image from "next/image";
import React from "react";
import {Spain} from "../../../public/images/About-Page";

export default function AboutTopBanner() {
  return (
    <>
      <Image
        src={Spain}
        alt="Spain"
        width={0}
        height={0}
        className="w-full max-h-[368px] 
         object-cover "
      />
    </>
  );
}
