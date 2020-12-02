const withSourceMaps = require('@zeit/next-source-maps')();

const nextConfig = {
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
    },
    webpack(config, opts) {
        config.resolve.modules.push('src');
        config.resolve.modules.push('public');
        config.resolve.modules.push('static');
        config.module.rules.push(
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'astroturf/loader',
                    options: {
                        extension: '.module.css',
                    },
                },
            },
            {
                test: /\.(otf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                    },
                },
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        );


        return config;
    },
    experimental: {
        // https://nextjs.org/blog/next-9-1#module--nomodule
        modern: true,
        reactRefresh: true,
        async rewrites() {
            return [
                {
                    source: '/service-worker.js',
                    destination: '/_next/static/service-worker.js',
                },
            ];
        },
    },
};

module.exports = withSourceMaps(nextConfig);
