import React from "react";

import Section from "../section/Section";
import GridList from "../aceternity/Grid-list";
import ErexMainLogo from "../aceternity/Erex-main-logo";
import NormalLink from "../aceternity/Normal-link";
import SocialMediaDemo from "../aceternity/Social-media";
function Footer() {
  return (
    <Section type="paddingXY" id="footer" className="relative pt-5 mt-10 bg-background">
      <div className="flex flex-col items-start justify-between w-full lg:flex-row">
        <GridList className="grid-cols-1 md:gap-10 gap-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2">
          <div className="flex flex-col col-span-1 gap-6  ">
            <ErexMainLogo className="w-32" />
            <h1 className="text-heading dark:text-heading-dark text-[16px] gap-3 flex flex-col font-Unbounded font-normal">
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
          <div className="flex flex-col col-span-1 gap-4 ">
            <h1 className="text-business text-[24px] font-Satoshi font-medium pb-3">
              SOLUTIONS
            </h1>
            <div>
              <NormalLink path="/services/business">Business</NormalLink>
            </div>
            <div>
              <NormalLink path="/services/software">Software</NormalLink>
            </div>
            <div>
              <NormalLink path="/services/design">Design</NormalLink>
            </div>
          </div>
          <div className="flex flex-col flex-wrap col-span-1 gap-4">
            <h1 className="text-business text-[24px] font-Satoshi font-medium pb-3">
              ABOUT
            </h1>
            <div>
              <NormalLink path="/about/about-us">About Us</NormalLink>
            </div>
            <div>
              <NormalLink path="/about/our-team">Our Team</NormalLink>
            </div>
            <div>
              <NormalLink path="/about/career">Career</NormalLink>
            </div>
          </div>
          <div className="flex flex-col flex-wrap  col-span-1 gap-4 md:col-span-1">
            <h1 className="text-business text-[24px] font-Satoshi font-medium pb-3">
              QUICK LINK
            </h1>
            <div>
              <NormalLink path="/work/our-work">Work</NormalLink>
            </div>
            <div>
              <NormalLink path="/our-clients">Clients</NormalLink>
            </div>
            {/* <div>
              <NormalLink path="/blog"> Blog</NormalLink>
            </div> */}
            <div>
              <NormalLink path="/contact-us"> Reach Us</NormalLink>
            </div>
            <div>
              <NormalLink path="/add-your-business">Add Your Business</NormalLink>
            </div>
          </div>
        </GridList>
      </div>

      <div className="flex flex-col justify-between w-full gap-3 mt-10 md:gap-0 md:items-center lg:flex-row ">
        <div className="flex gap-5 flex-col md:flex-row">
          <NormalLink path="/privacy-policy">Privacy policy</NormalLink>
          <NormalLink path="/terms-of-use">Terms of Use</NormalLink>
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
