/* MARJAN.IN Phase 3 navigation: mega menu, mobile drawer and real content links */
(function(){
var header=document.querySelector('header');
/* Legacy pages (notably the original homepage) use an unclassified nav.
   Promote that existing nav instead of exiting before the shared header is built. */
var menu=header&&(header.querySelector('#primary-navigation')||header.querySelector(':scope > nav'));
if(header&&!menu){menu=document.createElement('nav');header.appendChild(menu);}
if(menu){menu.id='primary-navigation';menu.classList.add('primary-navigation');}
/* Mobile fixed bottom shortcuts, modeled on the reference layout */
var bottom=document.createElement('nav');
bottom.className='marjan-mobile-bottom';
bottom.setAttribute('aria-label','Quick navigation');
bottom.innerHTML='<a class="bottom-item" href="/" data-path="/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg><span>Home</span></a><a class="bottom-item" href="/blog/" data-path="/blog/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"/></svg><span>Blog</span></a><a class="bottom-item" href="/kids-education" data-path="/kids-education"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H11v17H5.5A2.5 2.5 0 0 0 3 22zM21 5.5A2.5 2.5 0 0 0 18.5 3H13v17h5.5A2.5 2.5 0 0 1 21 22z"/></svg><span>Learn</span></a><a class="bottom-item" href="/worksheets" data-path="/worksheets/"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18H6zM9 7h6M9 11h6M9 15h4"/></svg><span>Worksheets</span></a><button class="bottom-item bottom-more" type="button" aria-expanded="false" aria-controls="marjan-bottom-more"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span>More</span></button>';
var more=document.createElement('div');
more.className='marjan-bottom-more';
more.id='marjan-bottom-more';
more.hidden=true;
more.innerHTML='<a href="/parenting">Parenting</a><a href="/art-creativity/">Art &amp; Creativity</a><a href="/ebooks-pdfs/">Ebooks &amp; PDFs</a><a href="/baby-names/">Baby Names</a><a href="/products-reviews/">Products &amp; Reviews</a><a href="/resources/">Resources</a><a href="/digital-products/">Digital Products</a>';
document.body.appendChild(more);
document.body.appendChild(bottom);
var moreButton=bottom.querySelector('.bottom-more');
function closeMore(){more.hidden=true;moreButton.setAttribute('aria-expanded','false');}
moreButton.onclick=function(event){event.preventDefault();event.stopPropagation();var open=more.hasAttribute('hidden');if(open)more.removeAttribute('hidden');else more.setAttribute('hidden','');moreButton.setAttribute('aria-expanded',String(open));};
more.addEventListener('click',function(event){event.stopPropagation();});
document.addEventListener('click',function(e){if(e.target.closest('.bottom-more')||more.contains(e.target))return;closeMore();});
var current=location.pathname.replace(/\/?$/,'/')||'/';
bottom.querySelectorAll('a.bottom-item').forEach(function(a){var target=a.getAttribute('data-path');if(target==='/'?current==='/':current.indexOf(target)===0){a.classList.add('is-active');a.setAttribute('aria-current','page');}});

var logoSrc='/media/marjan-logo.webp?v=1';var brandLogo=header&&header.querySelector('.brand img');if(brandLogo){brandLogo.src=logoSrc;brandLogo.alt='MARJAN.IN';brandLogo.removeAttribute('width');brandLogo.removeAttribute('height');}document.querySelectorAll('footer .footer-follow-line img,footer .footer-brand img,footer .marjan-footer-brand img').forEach(function(img){img.src=logoSrc;img.alt='MARJAN.IN';img.removeAttribute('width');img.removeAttribute('height');});
if(!header||!menu)return;
var navHTML=`
<a class="nav-home" href="/">Home</a>
<details class="nav-group"><summary>Parenting</summary><div class="nav-mega">
<div class="nav-mega-col"><h3 class="nav-mega-title">Age-wise Parenting</h3><a href="/parenting#baby-care">Baby Care</a><a href="/parenting#toddler-care">Toddler Care</a><a href="/parenting#preschool-parenting">Preschool Parenting</a><a href="/parenting#parenting-tips">Parenting Tips</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Growth & Behaviour</h3><a href="/parenting#child-development">Child Development</a><a href="/parenting#child-behaviour">Child Behaviour</a></div>
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
<div class="nav-mega-col"><h3 class="nav-mega-title">Downloads</h3><a href="/ebooks-pdfs#printable-bundles">Printable PDF Bundles</a><a href="/ebooks-pdfs#free-downloads">Free Downloads</a><a href="/digital-products/">Digital Products Catalog</a></div>
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
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore MARJAN.IN</h3><a href="/blog/">Blog & Latest Articles</a><a href="/kids-corner">Latest Learning & Activities</a><a href="/contact">Contact</a></div>
<div class="nav-mega-col"><h3 class="nav-mega-title">Explore</h3><a class="nav-mega-feature" href="/resources">All Resources</a></div></div></details>`;
menu.innerHTML=navHTML;
var oldToggle=header.querySelector('.menu-toggle'),toggle=oldToggle;
if(oldToggle){toggle=oldToggle.cloneNode(true);oldToggle.replaceWith(toggle);}else{toggle=document.createElement('button');toggle.type='button';toggle.className='menu-toggle';header.querySelector('.marjan-header-actions')?.appendChild(toggle);}
toggle.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h12M4 18h8"/></svg><span>Menu</span>';
toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open main menu');
var actions=header.querySelector('.marjan-header-actions');if(!actions){actions=document.createElement('div');actions.className='marjan-header-actions';header.appendChild(actions);}var search=header.querySelector('.nav-search');if(!search){search=document.createElement('a');search.className='nav-search';search.href='/search/';search.setAttribute('aria-label','Search MARJAN.IN');search.setAttribute('title','Search MARJAN.IN');search.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>';}else{search.href='/search/';}actions.appendChild(search);
/* Shared logo proportions and same-page expandable search */
var brandStyle=document.getElementById('marjan-brand-search-style');
if(!brandStyle){brandStyle=document.createElement('style');brandStyle.id='marjan-brand-search-style';brandStyle.textContent=".marjan-header .brand{display:flex!important;position:relative!important;flex:0 0 126px!important;width:126px!important;height:auto!important;overflow:visible!important;max-width:100%;min-width:0}.marjan-header .brand img{display:block!important;position:static!important;left:auto!important;top:auto!important;width:126px!important;height:auto!important;max-width:100%!important;max-height:54px!important;object-fit:contain!important;object-position:left center!important}footer .footer-brand,footer .marjan-footer-brand,footer .footer-follow-line a{display:inline-flex!important;align-items:center!important;justify-content:center!important;position:relative!important;width:auto!important;height:auto!important;min-height:0!important;max-width:100%!important;overflow:visible!important;margin:0 auto 14px!important;padding:8px 13px!important;background:#fff!important;border:1px solid rgba(255,255,255,.8)!important;border-radius:999px!important;box-shadow:0 7px 20px rgba(0,0,0,.16)!important;text-decoration:none!important}footer .footer-brand img,footer .marjan-footer-brand img,footer .footer-follow-line a img{display:block!important;position:static!important;left:auto!important;top:auto!important;width:180px!important;max-width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important;object-position:center!important;clip-path:none!important;border-radius:0!important;transform:none!important;margin:0!important}@media(max-width:900px){.marjan-header .brand{flex-basis:145px!important;width:145px!important}.marjan-header .brand img{width:145px!important;max-height:42px!important}footer .footer-brand img,footer .marjan-footer-brand img,footer .footer-follow-line a img{width:160px!important}}@media(max-width:420px){footer .footer-brand img,footer .marjan-footer-brand img,footer .footer-follow-line a img{width:145px!important}}.marjan-search-panel{display:none;position:absolute;z-index:500;top:100%;right:5%;width:min(440px,calc(100vw - 28px));padding:12px;background:#fff;border:1px solid #e4e8ef;border-radius:0 0 12px 12px;box-shadow:0 12px 28px #17243a24}.marjan-search-panel.is-open{display:block}.marjan-search-panel form{display:flex;gap:8px}.marjan-search-panel input{flex:1;min-width:0;padding:12px;border:1px solid #cbd3df;border-radius:8px;font:inherit}.marjan-search-panel button{border:0;border-radius:8px;padding:0 14px;background:#243047;color:#fff;font:inherit;font-weight:700}.nav-search[aria-expanded=true]{background:#f2f6ff}.marjan-header{position:relative}";brandStyle.textContent+='footer .footer-follow-line a{color:#243047!important;gap:8px!important}';document.head.appendChild(brandStyle);}
if(search&&!header.querySelector('.marjan-search-panel')){
 var panel=document.createElement('div');panel.className='marjan-search-panel';panel.innerHTML='<form role="search" action="/search/" method="get"><input type="search" name="q" id="marjan-header-search-input" placeholder="क्या खोज रहे हैं?" aria-label="वेबसाइट पर खोजें"><button type="submit">खोजें</button></form>';header.appendChild(panel);
 var searchInput=panel.querySelector('input');
 search.setAttribute('aria-expanded','false');search.setAttribute('aria-controls','marjan-search-panel');panel.id='marjan-search-panel';
 search.addEventListener('click',function(event){event.preventDefault();var open=!panel.classList.contains('is-open');panel.classList.toggle('is-open',open);search.setAttribute('aria-expanded',String(open));if(open){searchInput.focus();}else{search.focus();}});
 document.addEventListener('click',function(event){if(!header.contains(event.target)&&panel.classList.contains('is-open')){panel.classList.remove('is-open');search.setAttribute('aria-expanded','false');}});
 document.addEventListener('keydown',function(event){if(event.key==='Escape'&&panel.classList.contains('is-open')){panel.classList.remove('is-open');search.setAttribute('aria-expanded','false');search.focus();}});
}
if(toggle)actions.appendChild(toggle);header.classList.add('marjan-header');var tagline=header.querySelector('.tagline');if(tagline)tagline.remove();
function mobile(){return matchMedia('(max-width:900px)').matches;}
function close(focus){menu.classList.remove('is-open');if(toggle){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open main menu');}menu.querySelectorAll('.nav-group[open]').forEach(function(d){d.open=false;});if(focus&&toggle)toggle.focus();}
if(toggle)toggle.onclick=function(event){event.preventDefault();var open=!menu.classList.contains('is-open');menu.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close main menu':'Open main menu');};
menu.querySelectorAll('.nav-group').forEach(function(group){group.addEventListener('toggle',function(){if(group.open)menu.querySelectorAll('.nav-group').forEach(function(other){if(other!==group)other.open=false;});});});

document.addEventListener('click',function(e){if(!header.contains(e.target)&&mobile()&&menu.classList.contains('is-open'))close(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var open=menu.querySelector('.nav-group[open]');if(open)open.open=false;else if(menu.classList.contains('is-open'))close(true);}});
window.addEventListener('resize',function(){if(!mobile())close(false);});


})();