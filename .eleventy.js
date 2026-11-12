module.exports = function (eleventyConfig) {
  // 1. Cloudflare redirects (यह आपका पुराना कोड है)
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy({ "baby-names/names-data.json": "assets/data/baby-names.json" });

  // Keep legacy Markdown drafts as source material, but do not render them: each has a maintained HTML page at the same output route.
  eleventyConfig.ignores.add("baby-names/**/*.md");
  eleventyConfig.ignores.add("posts/**/*.md");
  eleventyConfig.ignores.add("articles/**/*.html");
  eleventyConfig.ignores.add("article.html");

  // 2. MailerLite Pop-up injector (यह हर पेज पर पॉप-अप लगाएगा)
  eleventyConfig.addTransform("injectMailerLite", function(content, outputPath) {
    // यह सिर्फ HTML फाइलों में बदलाव करेगा
    if (outputPath && outputPath.endsWith(".html") && !content.includes("assets.mailerlite.com/js/universal.js")) {
      
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

  // Phase 3/9: guarantee shared header assets on every generated HTML page.
  eleventyConfig.addTransform("injectMarjanNavigation", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    content = content
      .replace(/<link[^>]+href=["'][^"']*marjan-navigation[.]css[^"']*["'][^>]*>\s*/gi, "")
      .replace(/<script[^>]+src=["'][^"']*marjan-navigation[.]js[^"']*["'][^>]*><[/]script>\s*/gi, "");
    content = content.replace("</head>", '<link rel="stylesheet" href="/assets/css/marjan-navigation.css?v=4">\n</head>');
    content = content.replace("</body>", '<script src="/assets/js/marjan-navigation.js?v=4"></script>\n</body>');
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
        <li><a href="/">Home</a></li><li><a href="/blog/">Blog</a></li><li><a href="/parenting">Parenting</a></li><li><a href="/kids-education">Kids Education</a></li><li><a href="/baby-names/">Baby Names</a></li><li><a href="/resources">Resources</a></li>
      </ul>
    </nav>
    <nav class="marjan-footer-col" aria-label="Learning and creativity">
      <h2>Learning & Creativity</h2>
      <ul>
        <li><a href="/worksheets">Worksheets & Printables</a></li><li><a href="/art-creativity">Art & Creativity</a></li><li><a href="/ebooks-pdfs">Ebooks & PDFs</a></li><li><a href="/digital-products/">Digital Products</a></li><li><a href="/activities">Kids Activities</a></li><li><a href="/kids-corner">Kids Corner</a></li>
      </ul>
    </nav>
    <nav class="marjan-footer-col" aria-label="Products and support">
      <h2>Products & Support</h2>
      <ul>
        <li><a href="/products-reviews">Products & Reviews</a></li><li><a href="/about">About Us</a></li><li><a href="/contact">Contact</a></li><li><a href="/affiliate-disclosure">Affiliate Disclosure</a></li>
      </ul>
    </nav>
  </div>
  <div class="marjan-footer-category-menu" aria-label="All categories and subcategories">
    <nav class="marjan-footer-category"><h2>Parenting</h2><a href="/parenting#baby-care">Baby Care</a><a href="/parenting#toddler-care">Toddler Care</a><a href="/parenting#preschool-parenting">Preschool Parenting</a><a href="/parenting#child-development">Child Development</a><a href="/parenting#child-behaviour">Child Behaviour</a><a href="/parenting#child-health">Child Health</a><a href="/parenting#immunization-vaccination">Immunization & Vaccination</a><a href="/parenting#parenting-tips">Parenting Tips</a></nav>
    <nav class="marjan-footer-category"><h2>Kids Education</h2><a href="/kids-education#early-learning">Early Learning</a><a href="/kids-education#preschool-learning">Preschool Learning</a><a href="/kids-education#school-education">School Education</a><a href="/kids-education#hindi-learning">Hindi Learning</a><a href="/kids-education#english-learning">English Learning</a><a href="/kids-education#maths">Maths</a><a href="/kids-education#science">Science</a><a href="/kids-education#educational-activities">Educational Activities</a></nav>
    <nav class="marjan-footer-category"><h2>Worksheets</h2><a href="/worksheets#handwriting-practice">Handwriting Practice</a><a href="/worksheets#hindi-worksheets">Hindi Worksheets</a><a href="/worksheets#english-worksheets">English Worksheets</a><a href="/worksheets#maths-worksheets">Maths Worksheets</a><a href="/worksheets#alphabet-numbers">Alphabet & Numbers</a><a href="/worksheets#class-wise">Class-wise Worksheets</a><a href="/worksheets#free-printables">Free Printables</a></nav>
    <nav class="marjan-footer-category"><h2>Art & Creativity</h2><a href="/art-creativity#drawing">Drawing</a><a href="/art-creativity#painting">Painting</a><a href="/art-creativity#colouring">Colouring</a><a href="/art-creativity#craft-activities">Craft Activities</a><a href="/art-creativity#calligraphy">Calligraphy</a><a href="/art-creativity#creative-projects">Creative Projects</a></nav>
    <nav class="marjan-footer-category"><h2>Ebooks & PDFs</h2><a href="/ebooks-pdfs#story-books">Story Books</a><a href="/ebooks-pdfs#poems">Poems</a><a href="/ebooks-pdfs#activity-books">Activity Books</a><a href="/ebooks-pdfs#learning-ebooks">Learning Ebooks</a><a href="/ebooks-pdfs#handwriting-books">Handwriting Books</a><a href="/ebooks-pdfs#printable-bundles">Printable PDF Bundles</a></nav>
    <nav class="marjan-footer-category"><h2>Baby Names</h2><a href="/baby-names/#boy-names">Boy Names</a><a href="/baby-names/#girl-names">Girl Names</a><a href="/baby-names/#hindu-names">Hindu Names</a><a href="/baby-names/#muslim-names">Muslim Names</a><a href="/baby-names/#sikh-names">Sikh Names</a><a href="/baby-names/#christian-names">Christian Names</a><a href="/baby-names/#a-z-names">Names A–Z</a></nav>
    <nav class="marjan-footer-category"><h2>Products & Reviews</h2><a href="/products-reviews#baby-products">Baby Products</a><a href="/products-reviews#educational-toys">Educational Toys</a><a href="/products-reviews#learning-kits">Learning Kits</a><a href="/products-reviews#school-supplies">School Supplies</a><a href="/products-reviews#product-reviews">Product Reviews</a><a href="/products-reviews#comparisons">Product Comparisons</a><a href="/products-reviews#buying-guides">Buying Guides</a></nav>
    <nav class="marjan-footer-category"><h2>Resources</h2><a href="/resources#parenting-guides">Parenting Guides</a><a href="/resources#learning-resources">Learning Resources</a><a href="/resources#free-downloads">Free Downloads</a><a href="/resources#useful-tools">Useful Tools</a><a href="/digital-products">Digital Products</a></nav>
  </div>
  <div class="marjan-footer-bottom">
    <span>© ${new Date().getFullYear()} MARJAN.IN. All rights reserved.</span>
    <div class="marjan-footer-legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms">Terms & Conditions</a><a href="/contact">Contact</a></div>
  </div>
</footer>`;
    if (/<footer\b[\s\S]*?<\/footer>/i.test(content)) {
      content = content.replace(/<footer\b[\s\S]*?<\/footer>/i, footerHtml);
    } else {
      content = content.replace("</body>", footerHtml + "\n</body>");
    }
    if (!content.includes("/assets/css/marjan-footer.css")) {
      content = content.replace("</head>", '<link rel="stylesheet" href="/assets/css/marjan-footer.css?v=1">\n</head>');
    }
    return content;
  });


  // Phase 5: add breadcrumbs and related articles to each published article page.
  eleventyConfig.addTransform("enhanceMarjanArticles", function(content, outputPath) {
    const route = String(outputPath || "").replaceAll("\\", "/");
    const routeMatch = route.match(/\/(?:article-([^/]+)|articles\/([^/]+))\/index\.html$/i);
    if (!routeMatch) return content;
    const slug = routeMatch[1] || routeMatch[2];
    const titleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "").trim() : "लेख";
    const safeTitle = rawTitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    if (!content.includes("marjan-article-breadcrumbs")) {
      const breadcrumb = '<nav class="marjan-article-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">›</span><a href="/blog/">Blog</a><span aria-hidden="true">›</span><span aria-current="page">' + safeTitle + '</span></nav>';
      content = content.replace('<article class="article">', breadcrumb + '<article class="article">');
      content = content.replace('<a class="back" href="/index.html">', '<a class="back" href="/">');
    }
    const related = {
      "reading-habit": [
        ["/article-bachon-ke-liye-hindi-story-books", "बच्चों के लिए Hindi Story Books", "उम्र और रुचि के अनुसार कहानी की किताबें चुनें"],
        ["/article-kids-sleep-routine", "बच्चों की अच्छी नींद", "एक सरल और नियमित Sleep Routine बनाने के तरीके"],
        ["/article-kids-activities-ghar-par", "घर पर 15 मज़ेदार Activities", "खेल-खेल में सीखने के रचनात्मक विचार"]
      ],
      "kids-sleep-routine": [
        ["/article-reading-habit", "पढ़ने की आदत कैसे डालें?", "सोने से पहले कहानी पढ़ने की अच्छी आदत"],
        ["/mobile-habit", "बच्चों की Screen Time आदतें", "मोबाइल उपयोग को संतुलित करने के सुझाव"],
        ["/article-kids-activities-ghar-par", "घर पर बच्चों की Activities", "दिन में सक्रिय रहने के आसान तरीके"]
      ],
      "kids-science-experiments-home": [
        ["/article-kids-activities-ghar-par", "घर पर 15 मज़ेदार Activities", "बच्चों के लिए खेल और प्रयोग"],
        ["/art-creativity", "Art & Creativity", "Drawing, Painting और Craft के विचार"],
        ["/worksheets", "Worksheets और Printables", "सीखने की Practice के लिए सामग्री"]
      ],
      "kids-activities-ghar-par": [
        ["/article-kids-science-experiments-home", "Home Science Experiments", "घर की चीज़ों से विज्ञान सीखें"],
        ["/art-creativity", "Art & Creativity", "बच्चों की कल्पनाशक्ति को बढ़ावा दें"],
        ["/worksheets", "Worksheets और Printables", "घर पर अभ्यास करने के संसाधन"]
      ],
      "bachon-ke-liye-educational-toys": [
        ["/article-bachon-ke-liye-hindi-story-books", "Hindi Story Books", "बच्चों की उम्र के अनुसार किताबें"],
        ["/products-reviews", "Products & Reviews", "खरीदने से पहले उपयोगी जानकारी"],
        ["/article-kids-activities-ghar-par", "घर पर सीखने वाली Activities", "खेल के साथ सीखने के तरीके"]
      ],
      "bachon-ke-liye-hindi-story-books": [
        ["/article-reading-habit", "पढ़ने की आदत कैसे डालें?", "बच्चों को किताबों से जोड़ने के तरीके"],
        ["/ebooks-pdfs", "Ebooks & PDFs", "कहानियाँ, Poems और Activity Books"],
        ["/article-bachon-ke-liye-educational-toys", "Educational Toys", "खेल के साथ सीखने के विकल्प"]
      ]
    };
    const items = related[slug] || related["reading-habit"];
    if (!content.includes("marjan-related-articles")) {
      const cards = items.map(function(item) {
        return '<a class="marjan-related-card" href="' + item[0] + '"><strong>' + item[1] + '</strong><span>' + item[2] + '</span></a>';
      }).join("");
      const relatedHtml = '<section class="marjan-related-articles" aria-labelledby="marjan-related-title"><h2 id="marjan-related-title">आपके लिए और उपयोगी लेख</h2><div class="marjan-related-grid">' + cards + '</div><p><a href="/blog/">सभी लेख देखें →</a></p></section>';
      content = content.replace("</article>", relatedHtml + "</article>");
    }
    if (!content.includes("/assets/css/marjan-article.css")) {
      content = content.replace("</head>", '<link rel="stylesheet" href="/assets/css/marjan-article.css?v=1">\n</head>');
    }
    if (!content.includes("/assets/js/marjan-article.js")) {
      content = content.replace("</body>", '<script src="/assets/js/marjan-article.js?v=1"></script>\n</body>');
    }
    return content;
  });

};