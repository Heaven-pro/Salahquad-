/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // SÃ©curitÃ© : en-tÃªtes HTTP durcis (protection XSS, clickjacking, MIME sniffing)
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; media-src 'self' https://interactive-examples.mdn.mozilla.net; connect-src 'self'; frame-src 'self' https://www.google.com https://www.instagram.com https://instagram.com; object-src 'none'; base-uri 'self'" },
      ],
    }];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(mov|MOV)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

export default nextConfig;

