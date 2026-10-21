export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    // Send both legacy forms to the single canonical article URL.
    if (path === "/reading-habit.html" || path === "/reading-habit") {
      url.pathname = "/article-reading-habit.html";
      return Response.redirect(url.toString(), 301);
    }

    // Preserve normal static asset handling for every other request.
    return env.ASSETS.fetch(request);
  },
};
