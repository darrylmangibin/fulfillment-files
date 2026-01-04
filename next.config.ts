import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/", // Incoming request path
        destination: "/dashboard", // Destination path
        permanent: true, // Use 308 for permanent, 307 for temporary
      },
    ];
  },
};

export default nextConfig;
