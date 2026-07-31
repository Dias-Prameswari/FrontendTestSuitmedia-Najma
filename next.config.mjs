/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://suitmedia-backend.suitdev.com/api/:path*', // Proxy to Backend
            },
        ];
    },
};
    
export default nextConfig;
