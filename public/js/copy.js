function initCopyCode() {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach((pre) => {
    // Avoid double-wrapping
    if (pre.parentElement.classList.contains('code-block-wrapper')) return;

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('code-block-wrapper');

    // Create header
    const header = document.createElement('div');
    header.classList.add('code-header');

    // Determine language
    // Astro usually puts class="language-xyz" on pre and/or code
    // fallback to "Text" or empty
    let lang = 'Text';
    const code = pre.querySelector('code');
    const langConfig = pre.getAttribute('data-language') ||
      code?.className.match(/language-(\w+)/)?.[1] ||
      pre.className.match(/language-(\w+)/)?.[1];

    if (langConfig) {
      lang = langConfig.toUpperCase();
      if (lang === 'PLAINTEXT') lang = 'TEXT';
    }

    // Language label
    const langLabel = document.createElement('span');
    langLabel.classList.add('code-lang');
    langLabel.innerText = lang;
    header.appendChild(langLabel);

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.classList.add('copy-btn');
    copyBtn.setAttribute('aria-label', 'Copy to clipboard');

    // Create SVG icon
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('copy-svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '/copy.svg#empty');
    svg.appendChild(use);

    copyBtn.appendChild(svg);
    copyBtn.addEventListener('click', () => copyToClipboard(pre, copyBtn));
    header.appendChild(copyBtn);

    // restructure DOM
    // content -> wrapper -> [header, pre]
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });
}

/**
 * @param {HTMLPreElement} pre
 * @param {HTMLButtonElement} btn
 */
async function copyToClipboard(pre, btn) {
  const code = pre.querySelector('code');
  if (!code) return;

  try {
    await navigator.clipboard.writeText(code.innerText);

    const use = btn.querySelector('use');
    if (use) {
      use.setAttribute('href', '/copy.svg#filled');
      setTimeout(() => {
        use.setAttribute('href', '/copy.svg#empty');
      }, 2000);
    }
  } catch (err) {
    console.error('Failed to copy!', err);
  }
}

document.addEventListener('DOMContentLoaded', initCopyCode);
document.addEventListener('astro:after-swap', initCopyCode);
initCopyCode();
