import {BreadcrumbComponent} from "@/components/BreadcrumbComponent";
import {DropdownMenu} from "@/components/DropdownMenu";
import {TopBanner} from "@/components/TopBanner";
import {BentoGridDemo} from "@/container/destination-page/main-grids";
import {PaginationComponent} from "@/container/destination-page/PaginationComponent";
import React from "react";

export default function Destination() {
  return (
    <div className="w-full h-full  flex items-center  justify-center bg-background dark:bg-background-dark pt-36 pb-10">
      <div>
        <TopBanner />
        <BentoGridDemo />
      </div>
    </div>
  );
}
