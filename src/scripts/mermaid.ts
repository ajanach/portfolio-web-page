const MIN_SCALE = 0.3;
const MAX_SCALE = 8;
const ZOOM_FACTOR = 0.08;
const interactionControllers = new WeakMap<HTMLElement, AbortController>();
let mermaidPromise: Promise<(typeof import("mermaid"))["default"]> | undefined;

type ViewBox = { x: number; y: number; width: number; height: number };

function loadMermaid() {
  mermaidPromise ??= import("mermaid").then((module) => module.default);
  return mermaidPromise;
}

function controlButton(action: string, label: string, icon: string) {
  return `
    <button type="button" class="mermaid-btn" data-action="${action}" title="${label}" aria-label="${label}">
      ${icon}
    </button>`;
}

function createChrome(wrapper: HTMLElement) {
  const chrome = document.createElement("div");
  chrome.className = "mermaid-chrome";
  chrome.innerHTML = `
    <div class="mermaid-window-controls" aria-label="Diagram window controls">
      <button type="button" class="mermaid-window-control mermaid-window-close" data-window-action="close" title="Exit fullscreen" aria-label="Exit fullscreen" disabled><span aria-hidden="true">×</span></button>
      <button type="button" class="mermaid-window-control mermaid-window-minimize" data-window-action="minimize" title="Minimize diagram" aria-label="Minimize diagram" disabled><span aria-hidden="true">−</span></button>
      <button type="button" class="mermaid-window-control mermaid-window-maximize" data-window-action="maximize" title="Enter fullscreen" aria-label="Enter fullscreen" aria-pressed="false"><span aria-hidden="true">+</span></button>
    </div>
    <div class="mermaid-title" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M4 6.5h6l2 2h8v9H4z"/><path d="M8 12h8M8 15h5"/></svg>
      <span>Diagram</span>
    </div>
    <div class="mermaid-controls" role="toolbar" aria-label="Diagram controls">
      <output class="mermaid-scale" aria-label="Zoom level">100%</output>
      ${controlButton("zoom-out", "Zoom out", '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>')}
      ${controlButton("zoom-in", "Zoom in", '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>')}
      ${controlButton("reset", "Fit diagram", '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg>')}
      <span class="mermaid-control-divider" aria-hidden="true"></span>
      <button type="button" class="mermaid-btn mermaid-copy-btn" data-action="copy" title="Copy Mermaid source" aria-label="Copy Mermaid source">
        <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>
      </button>
      ${controlButton("fullscreen", "Enter fullscreen", '<svg class="mermaid-enter-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg><svg class="mermaid-exit-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M3 8h5V3M21 8h-5V3M3 16h5v5M21 16h-5v5"/></svg>')}
    </div>`;
  wrapper.prepend(chrome);
}

function setFullscreenState(wrapper: HTMLElement, active: boolean) {
  const maximizeButton = wrapper.querySelector<HTMLButtonElement>("[data-window-action='maximize']");
  const fullscreenButton = wrapper.querySelector<HTMLButtonElement>("[data-action='fullscreen']");
  if (maximizeButton) {
    const label = active ? "Restore diagram" : "Enter fullscreen";
    maximizeButton.ariaLabel = label;
    maximizeButton.title = label;
    maximizeButton.setAttribute("aria-pressed", String(active));
  }
  if (fullscreenButton) {
    const label = active ? "Exit fullscreen" : "Enter fullscreen";
    fullscreenButton.ariaLabel = label;
    fullscreenButton.title = label;
    fullscreenButton.setAttribute("aria-pressed", String(active));
  }
  wrapper.querySelectorAll<HTMLButtonElement>("[data-window-action='close'], [data-window-action='minimize']")
    .forEach((control) => { control.disabled = !active; });
}

function isExpanded(wrapper: HTMLElement) {
  return document.fullscreenElement === wrapper || wrapper.classList.contains("mermaid-expanded");
}

async function restoreDiagram(wrapper: HTMLElement) {
  if (document.fullscreenElement === wrapper) {
    await document.exitFullscreen();
  } else if (wrapper.classList.contains("mermaid-expanded")) {
    wrapper.classList.remove("mermaid-expanded");
    document.documentElement.classList.remove("mermaid-overlay-open");
    setFullscreenState(wrapper, false);
  }
}

async function toggleFullscreen(wrapper: HTMLElement) {
  if (isExpanded(wrapper)) {
    await restoreDiagram(wrapper);
    return;
  }

  try {
    await wrapper.requestFullscreen();
    if (document.fullscreenElement !== wrapper) throw new Error("Fullscreen was not activated");
    setFullscreenState(wrapper, true);
  } catch {
    wrapper.classList.add("mermaid-expanded");
    document.documentElement.classList.add("mermaid-overlay-open");
    setFullscreenState(wrapper, true);
  }
}

async function copySource(wrapper: HTMLElement, button: HTMLButtonElement) {
  await navigator.clipboard.writeText(wrapper.dataset.mermaidSource ?? "");
  button.classList.add("mermaid-copy-success");
  button.ariaLabel = "Mermaid source copied";
  button.title = "Mermaid source copied";
  window.setTimeout(() => {
    button.classList.remove("mermaid-copy-success");
    button.ariaLabel = "Copy Mermaid source";
    button.title = "Copy Mermaid source";
  }, 1600);
}

function setupInteraction(wrapper: HTMLElement) {
  interactionControllers.get(wrapper)?.abort();
  const controller = new AbortController();
  interactionControllers.set(wrapper, controller);
  const options = { signal: controller.signal };

  const stage = wrapper.querySelector<HTMLElement>(".mermaid-stage");
  const svg = stage?.querySelector<SVGSVGElement>("svg");
  if (!stage || !svg) return;
  const diagramStage = stage;
  const diagramSvg = svg;

  const bounds = diagramSvg.getBBox();
  const naturalWidth = bounds.width + bounds.x * 2 || diagramSvg.viewBox.baseVal.width || diagramSvg.clientWidth;
  const naturalHeight = bounds.height + bounds.y * 2 || diagramSvg.viewBox.baseVal.height || diagramSvg.clientHeight;
  const viewBox: ViewBox = { x: 0, y: 0, width: naturalWidth, height: naturalHeight };
  const home = { ...viewBox };
  const scaleOutput = wrapper.querySelector<HTMLOutputElement>(".mermaid-scale");

  diagramSvg.removeAttribute("width");
  diagramSvg.removeAttribute("height");
  diagramSvg.style.display = "block";

  function applyViewBox() {
    diagramSvg.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
    if (scaleOutput) scaleOutput.value = `${Math.round((naturalWidth / viewBox.width) * 100)}%`;
  }

  function resetView() {
    viewBox.x = home.x;
    viewBox.y = home.y;
    viewBox.width = home.width;
    viewBox.height = home.height;
    applyViewBox();
  }

  function zoomAt(clientX: number, clientY: number, factor: number) {
    const rect = diagramStage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const pointX = viewBox.x + ((clientX - rect.left) / rect.width) * viewBox.width;
    const pointY = viewBox.y + ((clientY - rect.top) / rect.height) * viewBox.height;
    const width = Math.max(naturalWidth / MAX_SCALE, Math.min(naturalWidth / MIN_SCALE, viewBox.width * factor));
    const height = Math.max(naturalHeight / MAX_SCALE, Math.min(naturalHeight / MIN_SCALE, viewBox.height * factor));
    viewBox.x = pointX - (pointX - viewBox.x) * (width / viewBox.width);
    viewBox.y = pointY - (pointY - viewBox.y) * (height / viewBox.height);
    viewBox.width = width;
    viewBox.height = height;
    applyViewBox();
  }

  function zoomCenter(factor: number) {
    const rect = diagramStage.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
  }

  const drag = { active: false, x: 0, y: 0, viewX: 0, viewY: 0 };
  diagramStage.addEventListener("mousedown", (event) => {
    if (event.button !== 0) return;
    drag.active = true;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.viewX = viewBox.x;
    drag.viewY = viewBox.y;
    wrapper.classList.add("mermaid-grabbing");
    event.preventDefault();
  }, options);
  window.addEventListener("mousemove", (event) => {
    if (!drag.active) return;
    const rect = diagramStage.getBoundingClientRect();
    viewBox.x = drag.viewX - ((event.clientX - drag.x) / rect.width) * viewBox.width;
    viewBox.y = drag.viewY - ((event.clientY - drag.y) / rect.height) * viewBox.height;
    applyViewBox();
  }, options);
  window.addEventListener("mouseup", () => {
    drag.active = false;
    wrapper.classList.remove("mermaid-grabbing");
  }, options);
  diagramStage.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomAt(event.clientX, event.clientY, event.deltaY > 0 ? 1 + ZOOM_FACTOR : 1 - ZOOM_FACTOR);
  }, { ...options, passive: false });
  diagramStage.addEventListener("dblclick", resetView, options);

  let lastTouchDistance = 0;
  diagramStage.addEventListener("touchstart", (event) => {
    if (event.touches.length === 1) {
      drag.active = true;
      drag.x = event.touches[0].clientX;
      drag.y = event.touches[0].clientY;
      drag.viewX = viewBox.x;
      drag.viewY = viewBox.y;
    } else if (event.touches.length === 2) {
      drag.active = false;
      lastTouchDistance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY,
      );
    }
  }, { ...options, passive: true });
  diagramStage.addEventListener("touchmove", (event) => {
    if (event.touches.length === 1 && drag.active) {
      event.preventDefault();
      const rect = diagramStage.getBoundingClientRect();
      viewBox.x = drag.viewX - ((event.touches[0].clientX - drag.x) / rect.width) * viewBox.width;
      viewBox.y = drag.viewY - ((event.touches[0].clientY - drag.y) / rect.height) * viewBox.height;
      applyViewBox();
    } else if (event.touches.length === 2) {
      event.preventDefault();
      const distance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY,
      );
      zoomAt(
        (event.touches[0].clientX + event.touches[1].clientX) / 2,
        (event.touches[0].clientY + event.touches[1].clientY) / 2,
        lastTouchDistance / distance,
      );
      lastTouchDistance = distance;
    }
  }, { ...options, passive: false });
  diagramStage.addEventListener("touchend", () => { drag.active = false; }, options);

  wrapper.querySelectorAll<HTMLButtonElement>("[data-action]").forEach((button) => {
    button.onclick = () => {
      const action = button.dataset.action;
      if (action === "zoom-in") zoomCenter(1 - ZOOM_FACTOR * 3);
      if (action === "zoom-out") zoomCenter(1 + ZOOM_FACTOR * 3);
      if (action === "reset") resetView();
      if (action === "copy") void copySource(wrapper, button);
      if (action === "fullscreen") void toggleFullscreen(wrapper);
    };
  });

  wrapper.querySelectorAll<HTMLButtonElement>("[data-window-action]").forEach((button) => {
    button.onclick = () => {
      const action = button.dataset.windowAction;
      if (action === "maximize") void toggleFullscreen(wrapper);
      if ((action === "close" || action === "minimize") && isExpanded(wrapper)) void restoreDiagram(wrapper);
    };
  });

  document.addEventListener("fullscreenchange", () => {
    setFullscreenState(wrapper, document.fullscreenElement === wrapper);
    if (document.fullscreenElement === wrapper) resetView();
  }, options);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isExpanded(wrapper)) {
      void restoreDiagram(wrapper);
    }
  }, options);

  applyViewBox();
}

async function initializeMermaid() {
  const mermaid = await loadMermaid();
  mermaid.initialize({
    startOnLoad: false,
    theme: document.documentElement.classList.contains("dark") ? "dark" : "default",
    securityLevel: "strict",
    fontFamily: "trebuchet ms, sans-serif",
  });
  return mermaid;
}

async function renderDiagrams() {
  const blocks = document.querySelectorAll<HTMLElement>('pre[data-language="mermaid"]');
  if (!blocks.length) return;
  const mermaid = await initializeMermaid();

  for (const [index, block] of [...blocks].entries()) {
    const source = block.textContent?.trim() ?? "";
    try {
      const result = await mermaid.render(`mermaid-${Date.now()}-${index}`, source);
      const wrapper = document.createElement("div");
      wrapper.className = "mermaid-wrapper";
      wrapper.dataset.mermaidSource = source;
      wrapper.innerHTML = `<div class="mermaid-stage">${result.svg}</div>`;
      createChrome(wrapper);
      const codeWrapper = block.parentElement?.classList.contains("code-block-wrapper")
        ? block.parentElement
        : null;
      (codeWrapper ?? block).replaceWith(wrapper);
      setupInteraction(wrapper);
    } catch (error) {
      console.error("Mermaid render error:", error);
    }
  }
}

async function rerenderDiagrams() {
  const wrappers = document.querySelectorAll<HTMLElement>(".mermaid-wrapper[data-mermaid-source]");
  if (!wrappers.length) return;
  const mermaid = await initializeMermaid();

  for (const [index, wrapper] of [...wrappers].entries()) {
    const source = wrapper.dataset.mermaidSource ?? "";
    try {
      const result = await mermaid.render(`mermaid-theme-${Date.now()}-${index}`, source);
      const stage = wrapper.querySelector<HTMLElement>(".mermaid-stage");
      if (!stage) continue;
      stage.innerHTML = result.svg;
      setupInteraction(wrapper);
    } catch (error) {
      console.error("Mermaid re-render error:", error);
    }
  }
}

let renderedDarkMode = document.documentElement.classList.contains("dark");
const themeObserver = new MutationObserver(() => {
  const isDark = document.documentElement.classList.contains("dark");
  if (isDark === renderedDarkMode) return;
  renderedDarkMode = isDark;
  void rerenderDiagrams();
});

function setup() {
  void renderDiagrams();
  themeObserver.disconnect();
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup, { once: true });
else setup();
document.addEventListener("astro:after-swap", setup);