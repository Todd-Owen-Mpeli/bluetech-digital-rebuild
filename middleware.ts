// Imports
import {NextResponse} from "next/server";

/* Content Security Policy (CSP) Configured
Utility function to generate a nonce using
the Web Crypto API */
const generateNonce = () => {
	const array: Uint8Array | any = new Uint8Array(16); // 16 bytes for the nonce
	crypto.getRandomValues(array);
	return btoa(String.fromCharCode.apply(null, array)); // Convert to base64 string
};

const middleware = () => {
	// Generate a random nonce
	const nonce = generateNonce();

	// Set Content Security Policy (CSP) header with the nonce
	const contentSecurityPolicy = `
        default-src 'self';
		img-src 'self' ${process.env.CMS_URL} ${process.env.IMAGE_REMOTE_PATTERNS_HOSTNAME} data:;
		script-src 'self' 'nonce-${nonce}' 'unsafe-eval';
		style-src 'self' 'unsafe-inline';
		connect-src 'self' ${process.env.CMS_URL};
		frame-src 'self';
		object-src 'none';
		frame-ancestors 'none';`
		.replace(/\s{2,}/g, " ")
		.trim();

	// Create response and inject CSP header
	const response = NextResponse.next();
	response.headers.set("Content-Security-Policy", contentSecurityPolicy);

	// Pass nonce via a custom header (or cookies if necessary)
	response.headers.set("X-CSP-Nonce", nonce);

	return response;
};

export default middleware;
