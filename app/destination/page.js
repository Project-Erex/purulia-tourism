"use client";
import {BreadcrumbComponent} from "@/components/BreadcrumbComponent";
import {DropdownMenu} from "@/components/DropdownMenu";
import {TopBanner} from "@/components/TopBanner";
import {BentoGridDemo} from "@/container/destination-page/main-grids";
import {PaginationComponent} from "@/container/destination-page/PaginationComponent";
import React from "react";
import {FloatingWhatsApp} from "react-floating-whatsapp";

export default function Destination() {
  return (
    <div className="items-center  justify-center bg-background dark:bg-background-dark pt-24 pb-10">
      <div>
        <div className="mx-auto max-w-7xl">
          <TopBanner />
        </div>
        <BentoGridDemo />
        <FloatingWhatsApp
          statusMessage="online"
          phoneNumber={+919064504565}
          allowClickAway={true}
          accountName={"Purulia Tourism"}
          avatar="/bannerImage.jpg"
        />
      </div>
    </div>
  );
}
