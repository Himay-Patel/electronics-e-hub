/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:3001",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ibb.co"
            },
            {
                protocol: "https",
                hostname: "demo-vue-electric01.storehippo.com"
            },
            {
                protocol: "https",
                hostname: "icon-library.com"
            }
        ]
    }
};

export default nextConfig;
