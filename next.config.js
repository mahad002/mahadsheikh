/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      { protocol: 'https', hostname: 'majorwerks.s3.us-east-2.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 'i0.wp.com', pathname: '/**' },
      { protocol: 'https', hostname: '1000logos.net', pathname: '/**' },
      { protocol: 'https', hostname: 'southernqueenstown.co.nz', pathname: '/**' },
      { protocol: 'https', hostname: 'sazgarpk.s3.ap-southeast-1.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 'brandlogos.net', pathname: '/**' },
      { protocol: 'https', hostname: 'inspirovix.s3.us-east-2.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn-icons-png.flaticon.com', pathname: '/**' },
      { protocol: 'https', hostname: 'emoti-verse.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: 'www.gwm-pakistan.com', pathname: '/**' },
      { protocol: 'https', hostname: 'guruisonline.com', pathname: '/**' },
      { protocol: 'https', hostname: 'execchauffeurgroup.co.uk', pathname: '/**' },
      { protocol: 'https', hostname: 'www.housingdisrepaircompensations.co.uk', pathname: '/**' },
      { protocol: 'https', hostname: 'djphncgl0uau7.cloudfront.net', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;