import React from "react";

import Section from "../section/Section";
import GridList from "../aceternity/Grid-list";
import ErexMainLogo from "@/public/svg/ErexMainLogo";
import NormalLink from "../aceternity/Normal-link";
import SocialMediaDemo from "../aceternity/Social-media";
function Footer() {
  return (
    <Section type="paddingXY" id="footer" className="relative  bg-background">
      <div className="flex flex-col items-start justify-between w-full lg:flex-row">
        <GridList className="grid-cols-1 md:gap-2 gap-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2">
          <div className="flex flex-col col-span-1 gap-1  ">
            <ErexMainLogo className="w-32" />
            <h1 className="text-heading dark:text-heading-dark text-[16px] gap-2 flex flex-col font-Unbounded font-normal">
              Purulia, West Bengal, India
              <NormalLink
                openInNewTab={true}
                path={`tel:+919064504565`}
                className="text-heading dark:text-heading-dark text-[16px] font-Unbounded font-normal">
                +91 9064504565
              </NormalLink>
              <NormalLink
                openInNewTab={true}
                className="text-heading dark:text-heading-dark text-[16px] font-Unbounded font-normal"
                path="mailto:support@erex.in">
                support@erex.in
              </NormalLink>
            </h1>

            <SocialMediaDemo />
          </div>

          <div className="flex flex-col flex-wrap col-span-1 gap-1">
            <h1 className="text-business text-[24px] font-Satoshi font-medium pb-3">
              Help
            </h1>
            <div>
              <NormalLink path="https://erexstudio.com/about/about-us">
                About Us
              </NormalLink>
            </div>
            <div>
              <NormalLink path="/comingsoon">Add a Destination</NormalLink>
            </div>
          </div>
        </GridList>
      </div>

      <div className="flex flex-col justify-between w-full gap-2 mt-10 md:gap-0 md:items-center lg:flex-row ">
        <div className="flex gap-2 flex-col md:flex-row">
          <NormalLink path="/sitemap.xml">Sitemap</NormalLink>
        </div>
        <div>
          <p className="text-heading dark:text-heading-dark text-[16px] lg:mt-0 mt-3 font-Unbounded font-normal">
            © 2024, All Rights Reserved
          </p>
        </div>
      </div>
    </Section>
  );
}

export default Footer;
