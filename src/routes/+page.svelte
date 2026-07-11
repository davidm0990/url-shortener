<script>
	let { data, form } = $props();
</script>

<main>
	<h1>🔗 URL Shortener</h1>
	<p class="tagline">
		Turn long links into short ones — powered by Cloudflare KV.
	</p>
	<form method="POST" action="?/create">
		<input name="url" type="url" placeholder="Paste a long URL…" required />
		<select name="ttl">
			<option value="">Never expires</option>
			<option value="60">1 minute</option>
			<option value="3600">1 hour</option>
			<option value="86400">1 day</option>
			<option value="604800">1 week</option>
		</select>
		<button>Shorten</button>
	</form>

	{#if form?.error}
		<p class="msg error">{form.error}</p>
	{/if}

	{#if form?.shortUrl}
		<p class="msg success">
			✅ Your short link: <a href={form.shortUrl}>{form.shortUrl}</a>
		</p>
	{/if}

	{#if data.links.length > 0}
		<h2>All short links</h2>
		<ul class="links">
			{#each data.links as link}
				<li>
					<a class="code" href={`/${link.code}`}>/{link.code}</a>
					<span class="arrow">→</span>
					<span class="dest">{link.url}</span>
					<span class="clicks">{link.clicks} clicks</span>
					<form method="POST" action="?/delete">
						<input type="hidden" name="code" value={link.code} />
						<button class="del" aria-label="Delete link">✕</button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	:global(body) {
		margin: 0;
		background: #eef2f8;
		font-family: "Segoe UI", system-ui, sans-serif;
		color: #475569;
	}
	main {
		max-width: 560px;
		margin: 3rem auto;
		padding: 2rem;
		background: #ffffff;
		border: 1px solid #e6eaf2;
		border-radius: 18px;
		box-shadow: 0 12px 30px rgba(30, 50, 90, 0.08);
	}
	h1 {
		margin: 0 0 0.3rem;
		font-size: 1.8rem;
		font-weight: 800;
		letter-spacing: -0.4px;
		background: linear-gradient(90deg, #38bdf8, #2563eb);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
	.tagline {
		margin: 0 0 1.5rem;
		font-size: 0.85rem;
		color: #8a94a6;
	}

	form {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}
	input {
		flex: 1 1 100%;
		padding: 0.75rem 0.9rem;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		background: #f7f9fc;
		font-size: 0.95rem;
		color: #1e293b;
	}
	input:focus {
		outline: none;
		border-color: #38bdf8;
		box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
	}
	input::placeholder {
		color: #9aa4b2;
	}
	select {
		flex: 1;
		padding: 0.75rem 0.9rem;
		border: 1px solid #e2e8f0;
		border-radius: 12px;
		background: #f7f9fc;
		font-size: 0.95rem;
		color: #1e293b;
		cursor: pointer;
	}
	select:focus {
		outline: none;
		border-color: #38bdf8;
		box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18);
	}
	button {
		padding: 0.75rem 1.3rem;
		border: none;
		border-radius: 12px;
		background: linear-gradient(135deg, #38bdf8, #2563eb);
		color: #fff;
		font-size: 0.95rem;
		font-weight: 700;
		cursor: pointer;
	}
	button:hover {
		filter: brightness(1.06);
	}

	.msg {
		border-radius: 12px;
		padding: 0.7rem 0.9rem;
		margin-top: 1.25rem;
		font-size: 0.9rem;
		background: #f7f9fc;
	}
	.error {
		color: #dc2626;
	}
	.success a {
		color: #2563eb;
		font-weight: 600;
	}

	h2 {
		margin: 1.75rem 0 1rem;
		font-size: 1.1rem;
		color: #1e293b;
		font-weight: 600;
	}
	ul.links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	ul.links li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.7rem 0.85rem;
		border-radius: 12px;
		background: #f7f9fc;
		font-size: 0.85rem;
	}
	.code {
		font-family: "Consolas", monospace;
		font-weight: 700;
		color: #2563eb;
		text-decoration: none;
		white-space: nowrap;
	}
	.arrow {
		color: #c3ccd8;
	}
	.dest {
		color: #64748b;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.clicks {
		margin-left: auto;
		white-space: nowrap;
		font-size: 0.72rem;
		font-weight: 700;
		color: #fff;
		background: linear-gradient(135deg, #38bdf8, #2563eb);
		padding: 0.2rem 0.6rem;
		border-radius: 999px;
	}
	.links form {
		margin: 0;
	}
	.del {
		width: 1.6rem;
		height: 1.6rem;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: #fee2e2;
		color: #dc2626;
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1;
		cursor: pointer;
		flex-shrink: 0;
	}
	.del:hover {
		background: #dc2626;
		color: #fff;
	}
</style>
