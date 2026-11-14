// Phase 3 deployment verification: trigger a fresh production build from the current main branch.
module.exports = function (eleventyConfig) {
  // 1. Cloudflare redirects (यह आपका पुराना कोड है)
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("media"); // Serve the official brand assets and page media explicitly.

  // Keep legacy Markdown drafts as source material, but do not render them: each has a maintained HTML page at the same output route.
  eleventyConfig.ignores.add("baby-names/**/*.md");
  eleventyConfig.ignores.add("posts/**/*.md");
  eleventyConfig.ignores.add("README.md"); // Repository documentation is not a public website route.
  eleventyConfig.ignores.add("docs/**/*.md"); // Internal design and implementation notes are not public pages.
  eleventyConfig.ignores.add("articles/**/*.html");
  eleventyConfig.ignores.add("article.html");
  eleventyConfig.ignores.add("test-results/**");
  eleventyConfig.ignores.add("playwright-report/**");
  // Authoring template is copied into the site root only when creating a new page.
  eleventyConfig.ignores.add("_templates/**");

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

  // Phase 3/10: replace legacy page-specific headers with one shared, crawlable header shell.
  eleventyConfig.addTransform("standardizeMarjanHeader", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const sharedHeader = `
<header class="marjan-header">
  <a class="brand" href="/" aria-label="MARJAN.IN Home"><img src="/media/marjan-logo-header.svg?v=3" alt="MARJAN.IN" width="300" height="83" decoding="async" fetchpriority="high"></a>
  <nav id="primary-navigation" class="primary-navigation" aria-label="Main navigation">
    <a class="nav-home" href="/">Home</a>
    <a class="nav-direct" href="/parenting">Parenting</a>
    <a class="nav-direct" href="/kids-education">Kids Education</a>
    <a class="nav-direct" href="/worksheets">Worksheets</a>
    <a class="nav-direct" href="/art-creativity">Art &amp; Creativity</a>
    <a class="nav-direct" href="/ebooks-pdfs">Ebooks &amp; PDFs</a>
    <a class="nav-direct" href="/baby-names/">Baby Names</a>
    <a class="nav-direct" href="/products-reviews">Products &amp; Reviews</a>
    <a class="nav-direct" href="/resources">Resources</a>
  </nav>
  <div class="marjan-header-actions">
    <a class="nav-search" href="/search/" aria-label="Search MARJAN.IN" title="Search MARJAN.IN"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg></a>
    <button class="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false" aria-label="Open main menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h12M4 18h8"></path></svg></button>
  </div>
</header>`;
    if (/<header\b[\s\S]*?<\/header>/i.test(content)) {
      content = content.replace(/<header\b[\s\S]*?<\/header>/i, sharedHeader);
    } else {
      content = content.replace(/<body\b[^>]*>/i, function(match) { return match + "\n" + sharedHeader; });
    }
    return content;
  });

  // Phase 3/9: guarantee shared header assets on every generated HTML page.
  eleventyConfig.addTransform("injectMarjanNavigation", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    content = content
      .replace(/<link[^>]+href=["'][^"']*marjan-navigation[.]css[^"']*["'][^>]*>\s*/gi, "")
      .replace(/<script[^>]+src=["'][^"']*marjan-navigation[.]js[^"']*["'][^>]*><[/]script>\s*/gi, "");
    content = content.replace("</head>", '<link rel="stylesheet" href="/assets/css/marjan-navigation.css?v=8">\n</head>');
    content = content.replace("</body>", '<script src="/assets/js/marjan-navigation.js?v=9"></script>\n</body>');
    return content;
  });
  // Phase 4: render one crawlable, consistent footer on every generated HTML page.
  eleventyConfig.addTransform("ensureMarjanSearchControl", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const headerMatch = content.match(/<header\b[\s\S]*?<\/header>/i);
    if (!headerMatch || /class=["'][^"']*\bnav-search\b/.test(headerMatch[0])) return content;
    const searchLink = '<a class="nav-search" href="/search/" aria-label="Search MARJAN.IN" title="Search MARJAN.IN"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg></a>';
    return content.replace(/<\/header>/i, searchLink + "\n</header>");
  });

  eleventyConfig.addTransform("standardizeMarjanFooter", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const footerHtml = `
<footer class="marjan-site-footer" aria-label="MARJAN.IN footer">
  <div class="marjan-footer-top">
    <div class="marjan-footer-about">
      <p class="footer-follow-line"><a class="marjan-footer-brand" href="/" aria-label="MARJAN.IN ko Follow karein - Home Page"><img src="/media/marjan-logo-footer.svg?v=3" alt="MARJAN.IN" width="220" height="61" loading="lazy" decoding="async"><span>को Follow करें।</span></a></p>
      <p class="marjan-footer-description">MARJAN.IN पर Parenting, बच्चों की शिक्षा, रचनात्मक गतिविधियों और सीखने के संसाधनों से जुड़ी उपयोगी जानकारी सरल हिंदी में पढ़ें। हमारा उद्देश्य माता-पिता को बच्चों की सीखने की यात्रा में मदद देना है।</p>
      <div class="social-links" aria-label="MARJAN.IN social media links">
        <a href="https://www.facebook.com/marjaninindia" target="_blank" rel="noopener noreferrer" aria-label="Facebook पर MARJAN.IN को Follow करें"><span class="social-mark facebook-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4z"/></svg></span>Facebook</a>
        <a href="https://www.youtube.com/@MarjanIndia" target="_blank" rel="noopener noreferrer" aria-label="YouTube पर MARJAN.IN को Subscribe करें"><span class="social-mark youtube-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg></span>YouTube</a>
        <a href="https://www.pinterest.com/MarjanIndia/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest पर MARJAN.IN को Follow करें"><span class="social-mark pinterest-mark" aria-hidden="true">P</span>Pinterest</a>
        <a href="https://www.instagram.com/marjan.india/" target="_blank" rel="noopener noreferrer" aria-label="Instagram पर MARJAN.IN को Follow करें"><span class="social-mark instagram-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7zm5 2.3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6zm5.8-3.3a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6z"/></svg></span>Instagram</a>
        <a href="https://x.com/marjanindia" target="_blank" rel="noopener noreferrer" aria-label="X पर MARJAN.IN को Follow करें"><span class="social-mark x-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.6 22H2.4l7.3-8.4L1.8 2h6.5l4.5 6.8L18.9 2zm-1.1 17.8h1.7L7.3 4.1H5.5z"/></svg></span>X</a>
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
      content = content.replace("</head>", '<link rel="stylesheet" href="/assets/css/marjan-footer.css?v=4">\n</head>');
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


  // Final output guard: keep the Blog canonical and Facebook footer link consistent on every built page.
  eleventyConfig.addTransform("ensureMarjanBlogCanonicalAndFacebook", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    const route = String(outputPath).replaceAll("\\", "/");
    if (/\/blog\/index\.html$/i.test(route) || /<title>[^<]*Blog/i.test(content)) {
      content = content.replace(/<link\b[^>]*rel=["']canonical["'][^>]*>\s*/gi, "");
      content = content.replace("</head>", '<link rel="canonical" href="https://marjan.in/blog/">\n</head>');
      content = content.replace(/<meta\b(?=[^>]*property=["']og:url["'])[^>]*>/i, '<meta property="og:url" content="https://marjan.in/blog/">');
    }
    const footerMatch = content.match(/<footer\b[\s\S]*?<\/footer>/i);
    if (footerMatch && !footerMatch[0].includes("https://www.facebook.com/marjaninindia")) {
      const socialLink = '<a href="https://www.facebook.com/marjaninindia" target="_blank" rel="noopener noreferrer">Facebook</a>';
      let footer = footerMatch[0];
      if (/<div[^>]*class=["'][^"']*(?:marjan-footer-social|social-links)[^"']*["'][^>]*>/i.test(footer)) {
        footer = footer.replace(/(<div[^>]*class=["'][^"']*(?:marjan-footer-social|social-links)[^"']*["'][^>]*>[\s\S]*?)(<\/div>)/i, "$1" + socialLink + "$2");
      } else {
        footer = footer.replace("</footer>", '<div class="marjan-footer-social">' + socialLink + '</div>\n</footer>');
      }
      content = content.replace(footerMatch[0], footer);
    }
    return content;
  });
};