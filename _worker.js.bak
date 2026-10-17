export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect only the legacy reading-habit URL. Keep the same host and query string.
    if (url.pathname === "/reading-habit.html") {
      url.pathname = "/article-reading-habit.html";
      return Response.redirect(url.toString(), 301);
    }

    // Preserve normal Cloudflare Pages static-asset behavior for every other request.
    return env.ASSETS.fetch(request);
  },
};
