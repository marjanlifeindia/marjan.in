
async function loadArticles() {
  const container = document.getElementById("article-list");
  if (!container) return;

  try {
    const response = await fetch("./articles.json");
    if (!response.ok) throw new Error("Articles could not load");

    const articles = await response.json();

    if (!articles.length) {
      container.innerHTML = "<p>नए लेख जल्द आ रहे हैं।</p>";
      return;
    }

    container.innerHTML = articles.map(article => `
      <article>
        <h3><a href="${article.url}">${article.title}</a></h3>
        <p>${article.description || ""}</p>
      </article>
    `).join("");
  } catch (error) {
    container.textContent = "लेख अभी लोड नहीं हो सके।";
  }
}

document.addEventListener("DOMContentLoaded", loadArticles);
