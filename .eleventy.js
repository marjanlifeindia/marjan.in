module.exports = function (eleventyConfig) {
  // 1. Cloudflare redirects (यह आपका पुराना कोड है)
  eleventyConfig.addPassthroughCopy("_redirects");

  // 2. MailerLite Pop-up injector (यह हर पेज पर पॉप-अप लगाएगा)
  eleventyConfig.addTransform("injectMailerLite", function(content, outputPath) {
    // यह सिर्फ HTML फाइलों में बदलाव करेगा
    if (outputPath && outputPath.endsWith(".html")) {
      
      // आपका MailerLite कोड यहाँ पेस्ट हो चुका है
      const mailerliteCode = `
        <!-- MailerLite Universal -->
        <script>
            (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '2723810');
        </script>
        <!-- End MailerLite Universal -->
      `;
      
      // यह कोड हर पेज के </body> टैग से ठीक पहले जुड़ जाएगा
      return content.replace("</body>", mailerliteCode + "\n</body>");
    }
    return content;
  });
};
