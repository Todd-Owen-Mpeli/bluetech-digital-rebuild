"use client";

// Imports
import {useEffect, useState} from "react";

const Head = () => {
	const [nonce, setNonce] = useState<string>("");

	useEffect(() => {
		const nonceFromHeaders = document
			.querySelector('meta[http-equiv="Content-Security-Policy"]')
			?.getAttribute("nonce");
		setNonce(nonceFromHeaders || "");
	}, []);

	return (
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			{nonce && (
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `console.log('Nonce works for inline scripts.');`,
					}}
				/>
			)}
		</head>
	);
};

export default Head;
