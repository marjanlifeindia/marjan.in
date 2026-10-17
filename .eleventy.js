module.exports = function (eleventyConfig) {
  // Cloudflare Pages only reads redirects from the published output directory.
  // Copy the root _redirects file into Eleventy's default _site output.
  eleventyConfig.addPassthroughCopy("_redirects");
};
