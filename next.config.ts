import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.creazilla.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
    ],
  },
}

export default nextConfig;
