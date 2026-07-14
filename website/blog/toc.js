/* TriggerEngage blog — auto table-of-contents plugin.
   Builds a floating desktop TOC + a collapsible mobile panel from the article's
   headings, with an animated active-section indicator and a reading-progress bar.
   Zero config: just include this script on any page with an <article class="prose">. */
(function () {
  'use strict';
  var prose = document.querySelector('article.prose');
  if (!prose) return;

  var headings = Array.prototype.slice.call(prose.querySelectorAll('h2, h3'));
  if (headings.length < 3) return; // short posts don't need a TOC

  // Give each heading a stable id (slugified from its text) if it lacks one.
  var seen = {};
  function slugify(t) {
    var s = t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!s) s = 'section';
    if (seen[s] != null) { seen[s]++; s += '-' + seen[s]; } else { seen[s] = 0; }
    return s;
  }
  var items = headings.map(function (h) {
    if (!h.id) h.id = slugify(h.textContent);
    return { id: h.id, text: h.textContent.trim(), level: h.tagName === 'H3' ? 3 : 2 };
  });

  function listHTML() {
    return items.map(function (it) {
      return '<li class="toc-l' + it.level + '"><a href="#' + it.id + '" data-id="' + it.id + '">' +
        it.text.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</a></li>';
    }).join('');
  }

  // Desktop: fixed panel that lives in the left margin beside the article.
  var aside = document.createElement('aside');
  aside.className = 'toc toc-float';
  aside.setAttribute('aria-label', 'Table of contents');
  aside.innerHTML = '<div class="toc-h">On this page</div><ul class="toc-list">' + listHTML() + '</ul>';
  document.body.appendChild(aside);

  // Mobile: a collapsible "On this page" panel, dropped in after the lead/figure.
  var details = document.createElement('details');
  details.className = 'toc toc-mobile';
  details.innerHTML = '<summary>On this page</summary><ul class="toc-list">' + listHTML() + '</ul>';
  var anchorEl = prose.querySelector('figure') || prose.querySelector('p.lead') || prose.firstElementChild;
  if (anchorEl) anchorEl.insertAdjacentElement('afterend', details);

  // Reading-progress bar across the very top of the viewport.
  var bar = document.createElement('div');
  bar.className = 'toc-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  // Index links by heading id (there are two copies: float + mobile).
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc-list a'));
  var current = null;
  function setActive(id) {
    if (id === current) return;
    current = id;
    links.forEach(function (a) {
      var on = a.getAttribute('data-id') === id;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    // Keep the active item in view inside the (scrollable) floating panel.
    var fa = aside.querySelector('a[data-id="' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"]');
    if (fa) {
      var top = fa.offsetTop, ph = aside.clientHeight;
      if (top < aside.scrollTop + 24 || top > aside.scrollTop + ph - 44) aside.scrollTop = top - ph / 2;
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, doc.scrollTop / max) : 0) + ')';
      var line = 104; // just below the sticky nav
      var activeId = items[0].id;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top <= line) activeId = headings[i].id; else break;
      }
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 2) activeId = items[items.length - 1].id;
      setActive(activeId);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // Close the mobile panel after a jump.
  links.forEach(function (a) {
    a.addEventListener('click', function () { if (details.open) details.open = false; });
  });
})();
