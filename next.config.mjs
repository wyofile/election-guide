const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'build',
    assetPrefix: isProd ? 'https://projects.wyofile.com/election-guide-2024' : undefined,
    basePath: '/election-guide-2024',
    trailingSlash: true,
    compiler: {
        emotion: true,
    },
    // images: {
    //     unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'projects.wyofile.com',
                port: '',
                pathname: '/maps/legislative-districts/**',
            }
        ]
    // },
};

export default nextConfig;