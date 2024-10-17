<script>
  let url = '';
  let shortUrl = '';
  let error = '';

  async function shortenUrl() {
    if (!url) {
      error = 'Please enter URL.';
      return;
    }

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
      });

      const data = await response.json();

      if (response.ok) {
        shortUrl = `${window.location.origin}/${data.shortUrl}`;
        error = '';
      } else {
        error = 'Failed to shorten URL.';
      }
    } catch (err) {
      error = 'Error occurred.';
    }
  }
</script>

<main>
  <h1>URL Shortener</h1>

  <input
    type="url"
    placeholder="Please enter the URL to be shortened."
    bind:value={url}
  />

  <button on:click={shortenUrl}>Shorten</button>

  {#if shortUrl}
    <p>Short URL: <a href={shortUrl} target="_blank">{shortUrl}</a></p>
  {/if}

  {#if error}
    <p style="color: red;">{error}</p>
  {/if}
</main>

