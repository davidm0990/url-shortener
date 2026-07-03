<script>
	// `form` holds whatever our server action returns after a submit.
	let { form } = $props();
</script>

<h1>🔗 URL Shortener</h1>

<form method="POST">
	<input name="url" type="url" placeholder="https://example.com/some/very/long/link" required />
	<button>Shorten</button>
</form>

{#if form?.error}
	<p style="color: red">{form.error}</p>
{/if}

{#if form?.shortUrl}
	<p>✅ Your short link: <a href={form.shortUrl}>{form.shortUrl}</a></p>
{/if}