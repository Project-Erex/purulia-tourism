/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        pathname: "**",
      },
    ],
    domains: ["res.cloudinary.com"],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/distance",
        destination: "https://maps.googleapis.com/maps/api/distancematrix/json", // Proxy to Google Maps API
      },
      {
        source: "/api/nearestLocation",
        destination: "https://maps.googleapis.com/maps/api/directions/json", // Proxy to Google Maps API
      },
    ];
  },
};

export default nextConfig;
