export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.pathname === "/reading-habit.html" || url.pathname === "/reading-habit") {
    const target = new URL("/article-reading-habit.html", url.origin);
    return Response.redirect(target.toString(), 301);
  }

  return context.next();
}
