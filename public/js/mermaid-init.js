(function () {
  var mermaidPromise = null;
  var MIN_SCALE = 0.3;
  var MAX_SCALE = 8;
  var ZOOM_FACTOR = 0.08;

  function loadMermaid() {
    if (!mermaidPromise) {
      mermaidPromise = import("https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs")
        .then(function (mod) { return mod.default; });
    }
    return mermaidPromise;
  }

  function createControls(wrapper) {
    var bar = document.createElement("div");
    bar.className = "mermaid-controls";
    bar.innerHTML =
      '<button type="button" class="mermaid-btn" data-action="zoom-in" title="Zoom in" aria-label="Zoom in">' +
        '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
      '</button>' +
      '<button type="button" class="mermaid-btn" data-action="zoom-out" title="Zoom out" aria-label="Zoom out">' +
        '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
      '</button>' +
      '<button type="button" class="mermaid-btn" data-action="reset" title="Reset view" aria-label="Reset view">' +
        '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>' +
      '</button>' +
      '<button type="button" class="mermaid-btn" data-action="fullscreen" title="Toggle fullscreen" aria-label="Toggle fullscreen">' +
        '<svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>' +
      '</button>';
    wrapper.appendChild(bar);
  }

  function setupInteraction(wrapper) {
    var svg = wrapper.querySelector("svg");
    if (!svg) return;

    // Read natural dimensions from the SVG
    var bbox = svg.getBBox();
    var natW = bbox.width + bbox.x * 2 || svg.viewBox.baseVal.width || svg.clientWidth;
    var natH = bbox.height + bbox.y * 2 || svg.viewBox.baseVal.height || svg.clientHeight;

    // Ensure SVG fills its container
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.display = "block";

    var vb = { x: 0, y: 0, w: natW, h: natH };
    var home = { x: 0, y: 0, w: natW, h: natH };

    function applyViewBox() {
      svg.setAttribute("viewBox", vb.x + " " + vb.y + " " + vb.w + " " + vb.h);
    }

    function resetView() {
      vb.x = home.x; vb.y = home.y; vb.w = home.w; vb.h = home.h;
      applyViewBox();
    }

    // Convert a client-space point to SVG viewBox coords
    function clientToVB(cx, cy) {
      var rect = svg.getBoundingClientRect();
      var px = (cx - rect.left) / rect.width;
      var py = (cy - rect.top) / rect.height;
      return { x: vb.x + px * vb.w, y: vb.y + py * vb.h };
    }

    function zoomAt(cx, cy, factor) {
      var pt = clientToVB(cx, cy);
      var newW = Math.max(natW / MAX_SCALE, Math.min(natW / MIN_SCALE, vb.w * factor));
      var newH = Math.max(natH / MAX_SCALE, Math.min(natH / MIN_SCALE, vb.h * factor));
      vb.x = pt.x - (pt.x - vb.x) * (newW / vb.w);
      vb.y = pt.y - (pt.y - vb.y) * (newH / vb.h);
      vb.w = newW;
      vb.h = newH;
      applyViewBox();
    }

    function zoomCenter(factor) {
      var rect = svg.getBoundingClientRect();
      zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
    }

    // Wheel zoom
    wrapper.addEventListener("wheel", function (e) {
      e.preventDefault();
      var f = e.deltaY > 0 ? (1 + ZOOM_FACTOR) : (1 - ZOOM_FACTOR);
      zoomAt(e.clientX, e.clientY, f);
    }, { passive: false });

    // Mouse drag
    var drag = { active: false, sx: 0, sy: 0, svbx: 0, svby: 0 };
    wrapper.addEventListener("mousedown", function (e) {
      if (e.button !== 0 || e.target.closest(".mermaid-controls")) return;
      drag.active = true;
      drag.sx = e.clientX; drag.sy = e.clientY;
      drag.svbx = vb.x; drag.svby = vb.y;
      wrapper.classList.add("mermaid-grabbing");
      e.preventDefault();
    });
    window.addEventListener("mousemove", function (e) {
      if (!drag.active) return;
      var rect = svg.getBoundingClientRect();
      var dx = (e.clientX - drag.sx) / rect.width * vb.w;
      var dy = (e.clientY - drag.sy) / rect.height * vb.h;
      vb.x = drag.svbx - dx;
      vb.y = drag.svby - dy;
      applyViewBox();
    });
    window.addEventListener("mouseup", function () {
      drag.active = false;
      wrapper.classList.remove("mermaid-grabbing");
    });

    // Touch: drag + pinch
    var touch = { lastDist: 0 };
    wrapper.addEventListener("touchstart", function (e) {
      if (e.target.closest(".mermaid-controls")) return;
      if (e.touches.length === 1) {
        drag.active = true;
        drag.sx = e.touches[0].clientX; drag.sy = e.touches[0].clientY;
        drag.svbx = vb.x; drag.svby = vb.y;
      } else if (e.touches.length === 2) {
        drag.active = false;
        var dx = e.touches[0].clientX - e.touches[1].clientX;
        var dy = e.touches[0].clientY - e.touches[1].clientY;
        touch.lastDist = Math.hypot(dx, dy);
      }
    }, { passive: true });
    wrapper.addEventListener("touchmove", function (e) {
      if (e.touches.length === 1 && drag.active) {
        e.preventDefault();
        var rect = svg.getBoundingClientRect();
        var dx = (e.touches[0].clientX - drag.sx) / rect.width * vb.w;
        var dy = (e.touches[0].clientY - drag.sy) / rect.height * vb.h;
        vb.x = drag.svbx - dx;
        vb.y = drag.svby - dy;
        applyViewBox();
      } else if (e.touches.length === 2) {
        e.preventDefault();
        var tdx = e.touches[0].clientX - e.touches[1].clientX;
        var tdy = e.touches[0].clientY - e.touches[1].clientY;
        var dist = Math.hypot(tdx, tdy);
        var cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        var cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        zoomAt(cx, cy, touch.lastDist / dist);
        touch.lastDist = dist;
      }
    }, { passive: false });
    wrapper.addEventListener("touchend", function () { drag.active = false; });

    // Double-click to reset
    wrapper.addEventListener("dblclick", function (e) {
      if (e.target.closest(".mermaid-controls")) return;
      resetView();
    });

    // Button controls
    wrapper.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) return;
      var action = btn.getAttribute("data-action");
      if (action === "zoom-in") zoomCenter(1 - ZOOM_FACTOR * 3);
      else if (action === "zoom-out") zoomCenter(1 + ZOOM_FACTOR * 3);
      else if (action === "reset") resetView();
      else if (action === "fullscreen") {
        if (!document.fullscreenElement) {
          wrapper.requestFullscreen().catch(function () {});
        } else {
          document.exitFullscreen();
        }
      }
    });

    // Fullscreen change: recalculate and reset view
    wrapper.addEventListener("fullscreenchange", function () {
      resetView();
    });

    applyViewBox();
  }

  async function renderDiagrams() {
    var preBlocks = document.querySelectorAll('pre[data-language="mermaid"]');
    if (!preBlocks.length) return;

    var mermaid = await loadMermaid();
    var isDark = document.documentElement.classList.contains("dark");

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      securityLevel: "strict",
      fontFamily: "trebuchet ms, sans-serif",
    });

    for (var i = 0; i < preBlocks.length; i++) {
      var pre = preBlocks[i];
      var code = pre.textContent.trim();
      var id = "mermaid-" + Date.now() + "-" + i;

      try {
        var result = await mermaid.render(id, code);
        var wrapper = document.createElement("div");
        wrapper.className = "mermaid-wrapper";
        wrapper.setAttribute("data-mermaid-source", code);
        wrapper.innerHTML = result.svg;
        createControls(wrapper);
        pre.parentNode.replaceChild(wrapper, pre);
        setupInteraction(wrapper);
      } catch (e) {
        console.error("Mermaid render error:", e);
      }
    }
  }

  async function reRenderDiagrams() {
    var wrappers = document.querySelectorAll(".mermaid-wrapper[data-mermaid-source]");
    if (!wrappers.length) return;

    var mermaid = await loadMermaid();
    var isDark = document.documentElement.classList.contains("dark");

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      securityLevel: "strict",
      fontFamily: "trebuchet ms, sans-serif",
    });

    for (var i = 0; i < wrappers.length; i++) {
      var wrapper = wrappers[i];
      var code = wrapper.getAttribute("data-mermaid-source");
      var id = "mermaid-rerender-" + Date.now() + "-" + i;

      try {
        var result = await mermaid.render(id, code);
        var oldSvg = wrapper.querySelector("svg");
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = result.svg;
        var newSvg = tempDiv.querySelector("svg");
        if (oldSvg && newSvg) {
          oldSvg.parentNode.replaceChild(newSvg, oldSvg);
          setupInteraction(wrapper);
        }
      } catch (e) {
        console.error("Mermaid re-render error:", e);
      }
    }
  }

  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === "class") {
        reRenderDiagrams();
        break;
      }
    }
  });

  function setup() {
    renderDiagrams();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  }

  document.addEventListener("DOMContentLoaded", setup);
  document.addEventListener("astro:after-swap", renderDiagrams);
})();
