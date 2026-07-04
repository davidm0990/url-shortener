import { fail } from '@sveltejs/kit';


export async function load({ platform }) {
	// Get every key (short code) in the store
	const list = await platform.env.SHORT_LINKS.list();

	// For each code, also fetch its long URL
	const links = await Promise.all(
		list.keys.map(async (k) => ({
			code: k.name,
			url: await platform.env.SHORT_LINKS.get(k.name)
		}))
	);

	return { links };
}

// Makes a random 6-character code like "a3k9zq"
function makeCode() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const bytes = crypto.getRandomValues(new Uint8Array(6));
    let code = '';
    for (const b of bytes) code += chars[b % chars.length];
    return code;
}

export const actions = {
    default: async ({ request, platform, url }) => {
        const data = await request.formData();
        const longUrl = data.get('url');

        // Basic check: must start with http:// or https://
        if (!longUrl || !/^https?:\/\//.test(longUrl)) {
            return fail(400, { error: 'Please enter a URL starting with http:// or https://' });
        }

        const code = makeCode();

        // 🔑 THE KV WRITE: save  code → longUrl  into your namespace
        await platform.env.SHORT_LINKS.put(code, longUrl);

        // Build the short link, e.g. http://localhost:5173/a3k9zq
        const shortUrl = `${url.origin}/${code}`;
        return { shortUrl };
    }
};