/** @type {import('next').NextConfig} */

import EventEmitter from 'events';

EventEmitter.setMaxListeners(20);

const nextConfig = {
    experimental: {
      ppr: 'incremental',
    },
    images: {
      // unoptimized: true,  ]
      deviceSizes: [320, 420, 768, 1024, 1200],
      minimumCacheTTL: 31536000, 
    },
};

export default nextConfig;
