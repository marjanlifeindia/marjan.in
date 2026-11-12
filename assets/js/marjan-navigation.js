/* MARJAN.IN Phase 3 navigation: mega menu, mobile drawer and real content links */
(function(){
var header=document.querySelector('header'),menu=document.getElementById('primary-navigation');if(!header||!menu)return;
var navHTML=`
<a class="nav-home" href="/">Home</a>
<a class="nav-direct" href="/blog">Blog</a>
<details class="nav-group"><summary>Parenting</summary><div class="nav-mega">
<div class="nav-mega-col"><h3 class="nav-mega-title">Age-wise Parenting</h3><a href="/parenting#baby-care">Baby Care</a><a href="/parenting#toddler-care">Toddler Care</a><a href="/parenting#preschool-parenting">Preschool Parenting</a><a href="/parenting#parenting-tips">Parenting Tips</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Growth & Behaviour</h3><a href="/parenting#child-development">Child Development</a><a href="/parenting#child-behaviour">Child Behaviour</a><a href="/parenting#development-milestones">Development Milestones</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Child Health</h3><a href="/parenting#child-health">Child Health</a><a href="/parenting#immunization-vaccination">Immunization & Vaccination</a><a href="/parenting#health-safety">Health & Safety</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore</h3><a href="/parenting">All Parenting Guides</a><a href="/kids-corner">Latest Learning & Activities</a></div></div></details>
<details class="nav-group"><summary>Kids Education</summary><div class="nav-mega">
<div class="nav-mega-col"><h3 class="nav-mega-title">Learning Stages</h3><a href="/kids-education#early-learning">Early Learning</a><a href="/kids-education#preschool-learning">Preschool Learning</a><a href="/kids-education#school-education">School Education</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Subjects</h3><a href="/kids-education#hindi-learning">Hindi Learning</a><a href="/kids-education#english-learning">English Learning</a><a href="/kids-education#maths">Maths</a><a href="/kids-education#science">Science</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Practice & Play</h3><a href="/kids-education#educational-activities">Educational Activities</a><a href="/activities">Kids Activities</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore</h3><a href="/kids-education">All Learning Guides</a><a href="/kids-corner">Kids Corner</a></div></div></details>
<details class="nav-group"><summary>Worksheets</summary><div class="nav-mega">
<div class="nav-mega-col"><h3 class="nav-mega-title">Language Practice</h3><a href="/worksheets#handwriting-practice">Handwriting Practice</a><a href="/worksheets#hindi-worksheets">Hindi Worksheets</a><a href="/worksheets#english-worksheets">English Worksheets</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Numbers & Classes</h3><a href="/worksheets#maths-worksheets">Maths Worksheets</a><a href="/worksheets#alphabet-numbers">Alphabet & Numbers</a><a href="/worksheets#class-wise">Class-wise Worksheets</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Printables</h3><a href="/worksheets#free-printables">Free Printables</a><a href="/worksheets#how-to-use">How to Use Worksheets</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore</h3><a class="nav-mega-feature" href="/worksheets">All Worksheets & Printables</a></div></div></details>
<details class="nav-group"><summary>Art & Creativity</summary><div class="nav-mega">
<div class="nav-mega-col"><h3 class="nav-mega-title">Art Skills</h3><a href="/art-creativity#drawing">Drawing</a><a href="/art-creativity#painting">Painting</a><a href="/art-creativity#colouring">Colouring</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Make & Create</h3><a href="/art-creativity#craft-activities">Craft Activities</a><a href="/art-creativity#creative-projects">Creative Projects</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Writing Arts</h3><a href="/art-creativity#calligraphy">Calligraphy</a><a href="/art-creativity#handwriting-art">Handwriting Art</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore</h3><a class="nav-mega-feature" href="/art-creativity">All Art & Creativity</a></div></div></details>
<details class="nav-group"><summary>Ebooks & PDFs</summary><div class="nav-mega">
<div class="nav-mega-col"><h3 class="nav-mega-title">Books</h3><a href="/ebooks-pdfs#story-books">Story Books</a><a href="/ebooks-pdfs#poems">Poems</a><a href="/ebooks-pdfs#activity-books">Activity Books</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Learning</h3><a href="/ebooks-pdfs#learning-ebooks">Learning Ebooks</a><a href="/ebooks-pdfs#handwriting-books">Handwriting Books</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Downloads</h3><a href="/ebooks-pdfs#printable-bundles">Printable PDF Bundles</a><a href="/ebooks-pdfs#free-downloads">Free Downloads</a><a href="/digital-products">Digital Products Catalog</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore</h3><a class="nav-mega-feature" href="/ebooks-pdfs">All Ebooks & PDFs</a></div></div></details>
<details class="nav-group"><summary>Baby Names</summary><div class="nav-mega">
<div class="nav-mega-col"><h3 class="nav-mega-title">By Gender</h3><a href="/baby-names/#boy-names">Boy Names</a><a href="/baby-names/#girl-names">Girl Names</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">By Religion</h3><a href="/baby-names/#hindu-names">Hindu Names</a><a href="/baby-names/#muslim-names">Muslim Names</a><a href="/baby-names/#sikh-names">Sikh Names</a><a href="/baby-names/#christian-names">Christian Names</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore Names</h3><a href="/baby-names/#a-z-names">Names A–Z</a><a href="/baby-names/#names-by-meaning">Names by Meaning</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore</h3><a class="nav-mega-feature" href="/baby-names/">All Baby Names</a></div></div></details>
<details class="nav-group"><summary>Products & Reviews</summary><div class="nav-mega">
<div class="nav-mega-col"><h3 class="nav-mega-title">Baby & Kids</h3><a href="/products-reviews#baby-products">Baby Products</a><a href="/products-reviews#educational-toys">Educational Toys</a><a href="/products-reviews#learning-kits">Learning Kits</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">School</h3><a href="/products-reviews#school-supplies">School Supplies</a><a href="/products-reviews#buying-guides">Buying Guides</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Reviews</h3><a href="/products-reviews#product-reviews">Product Reviews</a><a href="/products-reviews#comparisons">Product Comparisons</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore</h3><a class="nav-mega-feature" href="/products-reviews">All Products & Reviews</a></div></div></details>
<details class="nav-group"><summary>Resources</summary><div class="nav-mega">
<div class="nav-mega-col"><h3 class="nav-mega-title">Parent Resources</h3><a href="/resources#parenting-guides">Parenting Guides</a><a href="/resources#learning-resources">Learning Resources</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Downloads & Tools</h3><a href="/resources#free-downloads">Free Downloads</a><a href="/resources#useful-tools">Useful Tools</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore MARJAN.IN</h3><a href="/kids-corner">Latest Learning & Activities</a><a href="/contact">Contact</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore</h3><a class="nav-mega-feature" href="/resources">All Resources</a></div></div></details>`;
menu.innerHTML=navHTML;
var oldToggle=header.querySelector('.menu-toggle'),toggle=oldToggle;
if(oldToggle){toggle=oldToggle.cloneNode(true);toggle.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span>Menu</span>';oldToggle.replaceWith(toggle);}
var actions=header.querySelector('.marjan-header-actions');if(!actions){actions=document.createElement('div');actions.className='marjan-header-actions';header.appendChild(actions);}var search=header.querySelector('.nav-search');if(!search){search=document.createElement('a');search.className='nav-search';search.href='/search/';search.setAttribute('aria-label','Search MARJAN.IN');search.setAttribute('title','Search MARJAN.IN');search.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>';}else{search.href='/search/';}actions.appendChild(search);if(toggle)actions.appendChild(toggle);header.classList.add('marjan-header');var tagline=header.querySelector('.tagline');if(tagline)tagline.remove();
function mobile(){return matchMedia('(max-width:760px)').matches;}
function close(focus){menu.classList.remove('is-open');if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open main menu');}menu.querySelectorAll('.nav-group[open]').forEach(function(d){d.open=false;});if(focus&&toggle)toggle.focus();}
if(toggle)toggle.addEventListener('click',function(){var open=!menu.classList.contains('is-open');menu.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close main menu':'Open main menu');});
menu.querySelectorAll('.nav-group').forEach(function(group){group.addEventListener('toggle',function(){if(group.open)menu.querySelectorAll('.nav-group').forEach(function(other){if(other!==group)other.open=false;});});});
menu.addEventListener('click',function(e){if(e.target.closest('a')&&mobile())close(false);});
document.addEventListener('click',function(e){if(!header.contains(e.target)&&mobile()&&menu.classList.contains('is-open'))close(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var open=menu.querySelector('.nav-group[open]');if(open)open.open=false;else if(menu.classList.contains('is-open'))close(true);}});
window.addEventListener('resize',function(){if(!mobile())close(false);});
})();