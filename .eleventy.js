module.exports = function (eleventyConfig) {
  // 1. Cloudflare redirects (यह आपका पुराना कोड है)
  eleventyConfig.addPassthroughCopy("_redirects");

  // 2. MailerLite Pop-up injector (यह हर पेज पर पॉप-अप लगाएगा)
  eleventyConfig.addTransform("injectMailerLite", function(content, outputPath) {
    // यह सिर्फ HTML फाइलों में बदलाव करेगा
    if (outputPath && outputPath.endsWith(".html")) {
      
      // ⬇️ यहाँ नीचे अपना पूरा MailerLite वाला कोड पेस्ट करें ⬇️
      // (सिर्फ [ यहाँ अपना कोड डालें ] वाले हिस्से को हटाकर)
      
      const mailerliteCode = `
        <!-- MailerLite Universal -->
        [ यहाँ अपना MailerLite स्क्रिप्ट कोड पेस्ट करें ]
        <!-- End MailerLite Universal -->
      `;
      
      // यह कोड हर पेज के </body> टैग से ठीक पहले जुड़ जाएगा
      return content.replace("</body>", mailerliteCode + "\n</body>");
    }
    return content;
  });
};
