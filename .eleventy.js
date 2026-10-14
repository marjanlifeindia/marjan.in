module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("media");
  eleventyConfig.addPassthroughCopy("about.html");
  eleventyConfig.addPassthroughCopy("activities.html");
  eleventyConfig.addPassthroughCopy("kids-education.html");
  eleventyConfig.addPassthroughCopy("mobile-habit.html");
  eleventyConfig.addPassthroughCopy("parenting.html");
  eleventyConfig.addPassthroughCopy("reading-habit.html");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
