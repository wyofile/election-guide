const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'build',
    // assetPrefix: isProd ? 'https://d3lx8jcxdlqvo0.cloudfront.net/election-guide-2024/' : undefined,
    basePath: '/election-guide-2024',
    trailingSlash: true,
    compiler: {
        emotion: true,
    },
};

export default nextConfig;