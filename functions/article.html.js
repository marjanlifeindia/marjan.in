/**
 * Server-side redirects for legacy article URLs that used
 * /article.html?post=<markdown filename>.
 *
 * Cloudflare Pages _redirects does not match query strings, so handle these
 * requests in a Pages Function before the article HTML/JavaScript is served.
 */
export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  if (url.pathname !== "/article.html" || !["GET", "HEAD"].includes(request.method)) {
    return next();
  }

  const filename = url.searchParams.get("post");
  if (!filename || !/^[A-Za-z0-9._-]+\.md$/.test(filename)) {
    return next();
  }

  try {
    // Read the generated filename-to-slug index from the static asset binding.
    const indexUrl = new URL("/posts/index.json", url.origin);
    const indexResponse = await env.ASSETS.fetch(new Request(indexUrl));

    if (!indexResponse.ok) {
      return next();
    }

    const index = await indexResponse.json();
    const match = Object.entries(index).find(([, indexedFilename]) => indexedFilename === filename);
    if (!match) {
      return next();
    }

    const slug = match[0];
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return next();
    }

    // Send visitors and crawlers directly to the canonical extensionless URL.
    return Response.redirect(new URL(`/article-${slug}`, url.origin).toString(), 301);
  } catch {
    // Preserve the existing article page as a safe fallback if the index cannot be read.
    return next();
  }
}
