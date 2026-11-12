module.exports = function (eleventyConfig) {
  // 1. Cloudflare redirects (यह आपका पुराना कोड है)
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("assets");

  // Keep legacy Markdown drafts as source material, but do not render them: each has a maintained HTML page at the same output route.
  eleventyConfig.ignores.add("baby-names/**/*.md");

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

  // Phase 3: shared navigation assets are added to every generated HTML page.
  eleventyConfig.addTransform("injectMarjanNavigation", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html") && !content.includes("/assets/js/marjan-navigation.js")) {
      content = content.replace("</head>", '<link rel="stylesheet" href="/assets/css/marjan-navigation.css?v=3">\n</head>');
      content = content.replace("</body>", '<script src="/assets/js/marjan-navigation.js?v=3"></script>\n</body>');
    }
    return content;
  });
  // Phase 4: render one crawlable, consistent footer on every generated HTML page.
  eleventyConfig.addTransform("standardizeMarjanFooter", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const footerHtml = `
<footer class="marjan-site-footer" aria-label="MARJAN.IN footer">
  <div class="marjan-footer-top">
    <div class="marjan-footer-about">
      <a class="marjan-footer-brand" href="/" aria-label="MARJAN.IN Home"><img src="/media/marjan.in%20logo%20png.png?v=1" alt="MARJAN.IN" width="220" height="120" loading="lazy" decoding="async"></a>
      <p>MARJAN.IN पर Parenting, बच्चों की शिक्षा, रचनात्मक गतिविधियों और सीखने के संसाधनों से जुड़ी उपयोगी जानकारी सरल हिंदी में पढ़ें। हमारा उद्देश्य माता-पिता को बच्चों की सीखने की यात्रा में मदद देना है।</p>
      <div class="marjan-footer-social" aria-label="MARJAN.IN social media links">
        <a href="https://www.facebook.com/marjaninindia" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.youtube.com/@MarjanIndia" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://www.pinterest.com/MarjanIndia/" target="_blank" rel="noopener noreferrer">Pinterest</a>
        <a href="https://www.instagram.com/marjan.india/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://x.com/marjanindia" target="_blank" rel="noopener noreferrer">X</a>
      </div>
    </div>
    <nav class="marjan-footer-col" aria-label="Explore MARJAN.IN">
      <h2>Explore</h2>
      <ul>
        <li><a href="/">Home</a></li><li><a href="/parenting">Parenting</a></li><li><a href="/kids-education">Kids Education</a></li><li><a href="/baby-names/">Baby Names</a></li><li><a href="/resources">Resources</a></li>
      </ul>
    </nav>
    <nav class="marjan-footer-col" aria-label="Learning and creativity">
      <h2>Learning & Creativity</h2>
      <ul>
        <li><a href="/worksheets">Worksheets & Printables</a></li><li><a href="/art-creativity">Art & Creativity</a></li><li><a href="/ebooks-pdfs">Ebooks & PDFs</a></li><li><a href="/activities">Kids Activities</a></li><li><a href="/kids-corner">Kids Corner</a></li>
      </ul>
    </nav>
    <nav class="marjan-footer-col" aria-label="Products and support">
      <h2>Products & Support</h2>
      <ul>
        <li><a href="/products-reviews">Products & Reviews</a></li><li><a href="/about">About Us</a></li><li><a href="/contact">Contact</a></li><li><a href="/affiliate-disclosure">Affiliate Disclosure</a></li>
      </ul>
    </nav>
  </div>
  <div class="marjan-footer-bottom">
    <span>© ${new Date().getFullYear()} MARJAN.IN. All rights reserved.</span>
    <div class="marjan-footer-legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms & Conditions</a><a href="/contact">Contact</a></div>
  </div>
</footer>`;
    if (/<footer\\b[\\s\\S]*?<\\/footer>/i.test(content)) {
      content = content.replace(/<footer\\b[\\s\\S]*?<\\/footer>/i, footerHtml);
    } else {
      content = content.replace("</body>", footerHtml + "\\n</body>");
    }
    if (!content.includes("/assets/css/marjan-footer.css")) {
      content = content.replace("</head>", '<link rel="stylesheet" href="/assets/css/marjan-footer.css?v=1">\\n</head>');
    }
    return content;
  });

};