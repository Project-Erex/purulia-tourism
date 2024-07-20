"use client";

import Image from "next/image";

import {AspectRatio} from "@/components/ui/aspect-ratio";
import {FloatingWhatsApp} from "react-floating-whatsapp";

export function TopBanner() {
  return (
    <AspectRatio ratio={16 / 4} className="bg-muted mb-5">
      <Image
        src="/bannerImage.jpg"
        alt="Photo by Drew Beamer"
        // height={100}
        // width={100}
        fill
        className="rounded-md object-cover"
      />
      {/* <div className="absolute bottom-3 left-3"> */}
      <FloatingWhatsApp phoneNumber={+918918335468} accountName={"Nayan"} />
      {/* </div> */}
    </AspectRatio>
  );
}
