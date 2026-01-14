function initCopyCode() {
  const codeBlocks = document.querySelectorAll('pre:has(code)');

  codeBlocks.forEach((code) => {
    if (code.querySelector('.copy-btn')) return;

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '/copy.svg#empty');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('copy-svg');
    svg.appendChild(use);

    const btn = document.createElement('button');
    btn.appendChild(svg);
    btn.classList.add('copy-btn');
    btn.addEventListener('click', (e) => copyCode(e));

    const container = document.createElement('div');
    container.classList.add('copy-cnt');
    container.appendChild(btn);

    code.classList.add('relative');
    code.appendChild(container);
  });
}

/**
* @param {MouseEvent} event
*/
function copyCode(event) {
  const btn = event.currentTarget;
  const pre = btn.closest('pre');
  const code = pre?.querySelector('code');
  if (!code) return;

  navigator.clipboard.writeText(code.innerText);

  const use = btn.querySelector('use');
  if (use) {
    use.setAttribute('href', '/copy.svg#filled');
    setTimeout(() => {
      use.setAttribute('href', '/copy.svg#empty');
    }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', initCopyCode);
document.addEventListener('astro:after-swap', initCopyCode);
initCopyCode();
