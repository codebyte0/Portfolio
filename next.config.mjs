import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withSentryConfig(nextConfig, {
  org: "code-byte",
  project: "javascript-nextjs",
  
  // Optionally, include these if you need them
  // silent: !process.env.CI,
  // reactComponentAnnotation: { enabled: false },
  // tunnelRoute: "/monitoring",
  // disableLogger: true,
  // automaticVercelMonitors: true,
});
