const withPWA = require('next-pwa')({
  dest: 'public',
  swSrc: 'service-worker.js',
});

const securityHeaders = [
  {
    key: 'Service-Worker-Allowed',
    value: '/'
  },
  {
    key:'Content-Type',
    value:'application/javascript'
  }
];

module.exports = withPWA({
  env: {
    API_KEY: process.env.SHOPIFY_API_KEY,
    HOST: process.env.HOST,
  },

  async headers() {
    return [
      {
        source: '/sw\.js',
        headers: securityHeaders,
      },
    ]
  },

  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/api/shopify/auth",

        // Set this to true if you're sure you'll never use the /auth page (beware, permanent redirects as they are difficult to invalidate in clients)
        permanent: false,
      },
    ];
  },
});
