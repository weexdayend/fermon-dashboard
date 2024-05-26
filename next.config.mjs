/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['admin.greatjbb.com'],
        remotePatterns: [
            {
            protocol: "https",
            hostname: "raw.githubusercontent.com",
            }
        ]
    }
};

export default nextConfig;
