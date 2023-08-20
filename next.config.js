/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
        port: "",
        pathname: "/f/**",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
        port: "",
        pathname: "/**",
      },
      {
        protocol : "https",
        hostname : "img.clerk.com",
        port : "",
        pathname : "/**"
      },
      {
        protocol : "https",
        hostname : "utfs.io",
        port : "",
        pathname : "/f/**"
      }

    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
