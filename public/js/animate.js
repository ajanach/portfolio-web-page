function animate() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".animate").forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", animate);
document.addEventListener("astro:after-swap", animate);
animate();