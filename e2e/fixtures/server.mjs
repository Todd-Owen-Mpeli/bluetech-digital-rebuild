// -----------------------------------------------------------------------------
// The fake backend the whole E2E suite points the app at instead of the real
// WPGraphQL/Azure endpoints. Runs as its own process (Playwright's
// `webServer` entry), started before `next dev`.
//
// Why a fake backend and not page.route(): every CMS call this app makes
// happens server-side (RSC data fetching in app/[locale]/layout.tsx and its
// page components) — none of that is visible to page.route(), which only
// intercepts requests the browser itself makes. Pointing the app's own env
// vars at this instead is the only way to control what those server-side
// calls see.
//
// No fake SMTP server here (unlike the cbf-rebuild reference this fixture
// layer is modelled on) — this codebase's contact-form pipeline is broken
// as-is (no app/api/email route exists, config/nodemailer.ts's transporter is
// never called), flagged in the upgrade-plan audit, so there's no working
// email flow to fixture against yet.
// -----------------------------------------------------------------------------

import http from "node:http";
import { handleGraphQL, requestLog, resetLog } from "./router.mjs";
import { GRAPHQL_PORT } from "./env.mjs";

// A genuine 1x1 white JPEG — real enough for next/image's own server-side
// decode/re-encode step to succeed on, unlike an arbitrary placeholder string.
const ONE_PIXEL_JPEG = Buffer.from(
	"/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkI" +
		"CQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQ" +
		"EBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAB" +
		"AAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAj/xAAUEAEAAAAAAAAAAAAAAAAA" +
		"AAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMB" +
		"AAIRAxEAPwCdABmX/9k=",
	"base64"
);

const readJsonBody = (req) =>
	new Promise((resolve, reject) => {
		let raw = "";
		req.on("data", (chunk) => (raw += chunk));
		req.on("end", () => {
			try {
				resolve(raw ? JSON.parse(raw) : {});
			} catch (error) {
				reject(error);
			}
		});
		req.on("error", reject);
	});

const send = (res, status, body) => {
	res.writeHead(status, { "Content-Type": "application/json" });
	res.end(JSON.stringify(body));
};

const server = http.createServer(async (req, res) => {
	try {
		if (req.method === "GET" && req.url === "/__health") return send(res, 200, { ok: true });

		if (req.method === "POST" && req.url === "/__reset") {
			resetLog();
			return send(res, 200, { ok: true });
		}

		if (req.method === "GET" && req.url === "/__graphql-log") return send(res, 200, requestLog);

		if (req.method === "POST" && req.url === "/graphql") {
			const body = await readJsonBody(req);
			const { status, body: responseBody } = handleGraphQL(body);
			return send(res, status, responseBody);
		}

		// Stands in for the real CMS's own wp-content/uploads/ — proves
		// app/api/media/[...path]/route.ts's proxy round-trip actually works
		// end to end, not just that a URL string got rewritten.
		if (req.method === "GET" && req.url?.startsWith("/wp-content/uploads/")) {
			res.writeHead(200, { "Content-Type": "image/jpeg" });
			return res.end(ONE_PIXEL_JPEG);
		}

		// Azure Translator stub — AZURE_TRANSLATOR_KEY is blank in the test env
		// so the real client fails soft before ever reaching here; kept only so
		// a stray call (a non-English locale spec) can't hang.
		if (req.method === "POST" && req.url?.startsWith("/translate")) {
			return send(res, 200, [{ translations: [{ text: "", to: "en" }] }]);
		}

		send(res, 404, { error: "not found" });
	} catch (error) {
		console.error("[fixture server] request handler error:", error);
		send(res, 500, { error: String(error) });
	}
});

server.listen(GRAPHQL_PORT, () => console.log(`[fixture] fake CMS/control server listening on :${GRAPHQL_PORT}`));
