<script>
	let { data, form } = $props();
</script>

<main>
	<h1>🔗 URL Shortener</h1>
	<p class="tagline">Turn long links into short ones — powered by Cloudflare KV.</p>

	<form method="POST">
		<input name="url" type="url" placeholder="Paste a long URL…" required />
		<button>Shorten</button>
	</form>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	{#if form?.shortUrl}
		<p class="success">✅ Your short link: <a href={form.shortUrl}>{form.shortUrl}</a></p>
	{/if}

	{#if data.links.length > 0}
		<h2>All short links</h2>
		<ul class="links">
			{#each data.links as link}
				<li>
					<a class="code" href={`/${link.code}`}>/{link.code}</a>
					<span class="arrow">→</span>
					<span class="dest">{link.url}</span>
				</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	:global(body) {
		margin: 0;
		background: #f4f5f7;
		font-family: 'Segoe UI', system-ui, sans-serif;
		color: #23272e;
	}
	main {
		max-width: 640px;
		margin: 3rem auto;
		padding: 2rem 2.25rem;
		background: #fff;
		border-radius: 14px;
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
	}
	h1 { margin: 0 0 0.25rem; font-size: 1.9rem; }
	.tagline { margin: 0 0 1.5rem; color: #5a6069; }
	form { display: flex; gap: 0.5rem; }
	input {
		flex: 1;
		padding: 0.7rem 0.9rem;
		border: 1px solid #d6dae0;
		border-radius: 8px;
		font-size: 1rem;
	}
	input:focus {
		outline: none;
		border-color: #f6821f;
		box-shadow: 0 0 0 3px rgba(246, 130, 31, 0.15);
	}
	button {
		padding: 0.7rem 1.3rem;
		border: none;
		border-radius: 8px;
		background: #f6821f;
		color: #fff;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
	}
	button:hover { background: #e5730f; }
	.error {
		color: #c0392b;
		background: #fdecea;
		padding: 0.6rem 0.8rem;
		border-radius: 8px;
	}
	.success {
		background: #eafaf1;
		padding: 0.6rem 0.8rem;
		border-radius: 8px;
	}
	.success a { color: #1c7c4a; font-weight: 600; }
	h2 { margin-top: 2rem; font-size: 1.15rem; }
	ul.links { list-style: none; padding: 0; margin: 0; }
	ul.links li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 0;
		border-bottom: 1px solid #eceef1;
		font-size: 0.9rem;
	}
	.code {
		font-family: 'Consolas', monospace;
		font-weight: 600;
		color: #f6821f;
		text-decoration: none;
		white-space: nowrap;
	}
	.arrow { color: #9aa0a6; }
	.dest {
		color: #5a6069;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>