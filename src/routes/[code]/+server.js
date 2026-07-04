import { redirect, error } from '@sveltejs/kit';
import { parseLink } from '$lib/links.js';

export async function GET({ params, platform }) {
	const raw = await platform.env.SHORT_LINKS.get(params.code);
	if (!raw) {
		throw error(404, 'That short link does not exist');
	}

	// READ current data → MODIFY the count → WRITE it back
	const { url, clicks } = parseLink(raw);
	const updated = JSON.stringify({ url, clicks: clicks + 1 });
	await platform.env.SHORT_LINKS.put(params.code, updated);

	throw redirect(302, url);
}