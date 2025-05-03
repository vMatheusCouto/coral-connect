import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

module.exports = {
  images: {
    remotePatterns: [new URL('https://cdn.creazilla.com/**')],
  },
}

export default nextConfig;
