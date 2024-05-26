/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['admin.greatjbb.com', 'utfs.io', 'raw.githubusercontent.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "admin.greatjbb.com",
            },
            {
                protocol: "https",
                hostname: "utfs.io",
            }   
        ]
    }
};

export default nextConfig;
