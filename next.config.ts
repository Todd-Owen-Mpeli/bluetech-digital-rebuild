import type {NextConfig} from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	poweredByHeader: false,
	// All routes edge network caching
	async headers() {
		return [
			{
				source: "/(.*)", // Match all routes (adjust as necessary)
				headers: [
					// Force HTTPS
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					// Prevent MIME-type sniffing
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					// Prevent clickjacking
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					// Prevent reflected XSS attacks
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					// Content Security Policy (CSP) Configured in middleware.ts
					// Referrer Policy
					{
						key: "Referrer-Policy",
						value: "no-referrer",
					},
					// Permissions-Policy to restrict features like microphone, geolocation, etc.
					{
						key: "Permissions-Policy",
						value: "geolocation=(), microphone=(), camera=(), payment=()",
					},
					// Certificate Transparency (Expect-CT)
					{
						key: "Expect-CT",
						value: "max-age=86400, enforce",
					},
				],
			},
			{
				source: "/",
				headers: [
					{
						key: "Cache-Control",
						value: "s-maxage=1, stale-while-revalidate=86400",
					},
				],
			},
			{
				source: "/[slug]",
				headers: [
					{
						key: "Cache-Control",
						value: "s-maxage=1, stale-while-revalidate=259200",
					},
				],
			},
			{
				source: "/contact",
				headers: [
					{
						key: "Cache-Control",
						value: "s-maxage=1, stale-while-revalidate=259200",
					},
				],
			},
			{
				source: "/_next/image",
				headers: [
					{
						key: "Cache-Control",
						value: "s-maxage=1, stale-while-revalidate=259200",
					},
				],
			},
		];
	},
	async redirects() {
		if (process.env.NODE_ENV !== "production") {
			return [];
		}
		return [
			{
				source: "/(.*)",
				has: [
					{
						type: "header",
						key: "x-forwarded-proto",
						value: "http",
					},
				],
				permanent: true,
				destination: `${process.env.SITE_URL}/$1`,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: `${process.env.IMAGE_REMOTE_PATTERNS_HOSTNAME}`,
				port: "",
				pathname: `${process.env.IMAGE_REMOTE_PATHNAME}`,
			},
		],
	},
};

export default nextConfig;
