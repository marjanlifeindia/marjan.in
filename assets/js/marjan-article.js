/* MARJAN.IN article enhancements: dynamic table of contents for CMS-rendered articles. */
(function(){
  var body=document.getElementById("articleBody");
  if(!body)return;
  var toc=document.getElementById("marjanArticleToc");
  if(!toc){
    toc=document.createElement("nav");
    toc.id="marjanArticleToc";
    toc.className="marjan-article-toc";
    toc.setAttribute("aria-label","इस लेख की सामग्री");
    toc.innerHTML='<details open><summary>इस लेख में</summary><ol></ol></details>';
    body.parentNode.insertBefore(toc,body);
  }
  var list=toc.querySelector("ol");
  function refresh(){
    var headings=Array.from(body.querySelectorAll("h2"));
    list.innerHTML="";
    headings.forEach(function(heading,index){
      if(!heading.id)heading.id="article-section-"+(index+1);
      var li=document.createElement("li"),link=document.createElement("a");
      link.href="#"+heading.id;
      link.textContent=heading.textContent.trim();
      li.appendChild(link);list.appendChild(li);
    });
    toc.hidden=headings.length===0;
  }
  refresh();
  if(window.MutationObserver){
    var observer=new MutationObserver(function(){refresh();});
    observer.observe(body,{childList:true,subtree:true,characterData:true});
  }
})();