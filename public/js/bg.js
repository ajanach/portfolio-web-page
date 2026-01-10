function loadParticles() {
  if (typeof tsParticles === "undefined") return;

  tsParticles.load("tsparticles", {
    fpsLimit: 120,
    interactivity: {
      detectsOn: "window",
      events: {
        onclick: { enable: true, mode: "push" },
        onhover: {
          enable: true,
          mode: ["grab", "slow"],
          parallax: { enable: true, force: 30, smooth: 15 }
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 250,
          links: { opacity: 0.8 }
        },
        slow: {
          factor: 3,
          radius: 200
        },
        push: { quantity: 1 }
      }
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        outModes: { default: "out" },
        random: false,
        straight: false,
        attract: { enable: false }
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80,
        limit: 300
      },
      opacity: {
        value: { min: 0.3, max: 0.7 }
      },
      size: {
        value: { min: 1, max: 4 }
      }
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          interactivity: {
            events: {
              onhover: { enable: false },
            }
          },
          particles: {
            number: {
              value: 40,
              limit: 60
            }
          }
        }
      }
    ]
  });
}

document.addEventListener('astro:page-load', loadParticles);
document.addEventListener('DOMContentLoaded', loadParticles);