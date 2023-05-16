/** @type {import('next').NextConfig} */
// const nextConfig = {
//    reactStrictMode: true,
//   images:{
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'cloudfront.net',
//         port: '',
//         pathname: '/d2lu4u8gmcbypf/**',
//       },
//     ],
//   }
// }

// module.exports = nextConfig
module.exports = {
  images: {
    domains: ['d1dp5nanfre15g.cloudfront.net'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
