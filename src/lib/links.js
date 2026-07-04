// Makes a random 6-character code like "a3k9zq"
export function makeCode() {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const bytes = crypto.getRandomValues(new Uint8Array(6));
	let code = '';
	for (const b of bytes) code += chars[b % chars.length];
	return code;
}

// Reads a stored value and always returns { url, clicks }.
// Understands new JSON values AND old plain-text URLs.
export function parseLink(raw) {
	try {
		const obj = JSON.parse(raw);
		if (obj && typeof obj.url === 'string') {
			return { url: obj.url, clicks: obj.clicks ?? 0 };
		}
	} catch {
		// not JSON → it's an old plain-string URL
	}
	return { url: raw ?? '', clicks: 0 };
}