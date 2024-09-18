/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        // API_URL: "https://white-wood-21807.pktriot.net",
        API_URL: "http://localhost:3001",
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'white-wood-21807.pktriot.net',
            },
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
            },
            {
                protocol: "http",
                hostname: "localhost"
            }
        ]
    }
};

export default nextConfig;
