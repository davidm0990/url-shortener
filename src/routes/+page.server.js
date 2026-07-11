import { fail } from '@sveltejs/kit';
import { makeCode, parseLink } from '$lib/links.js';

export async function load({ platform }) {
	const list = await platform.env.SHORT_LINKS.list();
	const links = await Promise.all(
		list.keys.map(async (k) => {
			const raw = await platform.env.SHORT_LINKS.get(k.name);
			const { url, clicks } = parseLink(raw);
			return { code: k.name, url, clicks };
		})
	);
	return { links };
}

export const actions = {
	create: async ({ request, platform, url }) => {
		const data = await request.formData();
		const longUrl = data.get('url');

		if (!longUrl || !/^https?:\/\//.test(longUrl)) {
			return fail(400, { error: 'Please enter a URL starting with http:// or https://' });
		}

		const code = makeCode();
		const ttl = Number(data.get('ttl'));
		const options = ttl ? { expirationTtl: ttl } : {};
		const value = JSON.stringify({ url: longUrl, clicks: 0 });
		await platform.env.SHORT_LINKS.put(code, value,options);

		return { shortUrl: `${url.origin}/${code}` };
		
	},
	delete: async ({ request, platform }) => {
		const data = await request.formData();
		const code = data.get('code');
		await platform.env.SHORT_LINKS.delete(code);
		return { deleted: true };
	}
};
