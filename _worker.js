export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Redirect only the legacy article URL. Preserve the host and query string.
    if (url.pathname === "/reading-habit.html") {
      url.pathname = "/article-reading-habit.html";
      return Response.redirect(url.toString(), 301);
    }

    // Keep all other requests working as normal static assets.
    return env.ASSETS.fetch(request);
  },
};
