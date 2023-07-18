/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com'
            }
        ]
    }
}

const withNextIntl = require('next-intl/plugin')('./src/app/i18n.ts')

module.exports = withNextIntl(nextConfig)
