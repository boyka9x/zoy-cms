/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['@mui/material', '@mui/x-date-pickers', '@mui/x-date-pickers-pro'],
  },
};

export default nextConfig;
