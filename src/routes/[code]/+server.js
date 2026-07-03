import { redirect, error } from '@sveltejs/kit';

export async function GET({ params, platform }) {
	// params.code is whatever came after the slash, e.g. "a3k9zq"
	// 🔑 THE KV READ: look up the long URL saved under this code
	const longUrl = await platform.env.SHORT_LINKS.get(params.code);

	// Not in KV? Show a 404.
	if (!longUrl) {
		throw error(404, 'That short link does not exist');
	}

	// Found it → send the visitor to the original URL
	throw redirect(302, longUrl);
}