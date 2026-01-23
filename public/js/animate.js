function animate() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".animate").forEach((el) => {
    // Skip if element is already in viewport (visible without scrolling)
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (inViewport) {
      // Immediately show above-the-fold content
      el.classList.add("show");
    } else {
      // Observe below-the-fold content for scroll reveal
      observer.observe(el);
    }
  });
}

document.addEventListener("DOMContentLoaded", animate);
document.addEventListener("astro:after-swap", animate);
animate();