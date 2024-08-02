/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://puruliatour.com/",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/about", "/destination", "/contact-us", "/itinerary"],
  transform: async (config, url) => {
    // Default properties for all URLs
    let priority = 0.5; // default priority

    // Set different priority for specific links
    if (url === "/") {
      priority = 1.0; // highest priority for homepage
    } else if (url.startsWith("/itinerary/create")) {
      priority = 0.9; // medium priority for blog pages
    }

    return {
      loc: url, // required
      changefreq: "weekly", // or 'weekly', 'monthly', etc.
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // "/pricing",
          // "/blog-create",
          // "/admin",
          // "/privacy-policy",
          // "/terms-of-use",
        ],
      },
    ],
  },
};
