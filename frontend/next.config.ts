import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	output: 'standalone',
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.BACKEND_INTERNAL_URL || 'http://localhost:8080'}/api/:path*`,
			},
		];
	},
};

export default nextConfig;
