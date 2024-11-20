// Imports
import {headers} from "next/headers";

const Head = async () => {
	const nonce = (await headers()).get("x-csp-nonce") || "";

	return (
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<script
				nonce={nonce}
				dangerouslySetInnerHTML={{
					__html: `console.log('Nonce works for inline scripts.');`,
				}}
			/>
		</head>
	);
};

export default Head;
