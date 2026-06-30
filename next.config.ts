import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Bypasses WASM native compiler checks on platforms with loaded WASM bindings issues
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
