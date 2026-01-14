document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     Sidebar Toggle
  ===================== */
  const sidebar = document.getElementById("sidebar");
  const toggle = document.getElementById("sidebarToggle");

  if (toggle && sidebar) {
    toggle.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.toggle("open");
      } else {
        sidebar.classList.toggle("collapsed");
      }
    });
  }

  // Close sidebar on mobile when clicking a link
  document.querySelectorAll(".sidebar-nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove("open");
      }
    });
  });

  /* =====================
     Output Preview Toggle
  ===================== */
  document.querySelectorAll(".output-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const pre = btn.nextElementSibling;
      const isOpen = pre.style.display === "block";

      pre.style.display = isOpen ? "none" : "block";
      btn.textContent = isOpen ? "▶ View Output Preview" : "▼ Hide Output Preview";
    });
  });

  /* =====================
     Modal for Full Output
  ===================== */
  const modal = document.getElementById("output-modal");
  const modalText = document.getElementById("outputText");
  const closeModal = document.querySelector(".modal .close");

  document.querySelectorAll(".view-output").forEach(btn => {
    btn.addEventListener("click", () => {
      const preview = btn.parentElement.querySelector(".output-content");
      if (preview) {
        modalText.textContent = preview.textContent.trim();
        modal.style.display = "flex";
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => modal.style.display = "none");
  }

  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  /* =====================
     Floating CTA Close
  ===================== */
  const closeCTA = document.getElementById("close-cta");
  const cta = document.getElementById("floating-cta");

  if (closeCTA && cta) {
    closeCTA.addEventListener("click", () => {
      cta.style.display = "none";
    });
  }

});



document.addEventListener("DOMContentLoaded", () => {
  const texts = [
    "Welcome to Phumudzo.dev",
    "Building intelligent, reliable, and scalable web solutions.",
    "Solving problems with code and algorithms.",
    "Turning ideas into functional software."
  ];

  let count = 0;
  let index = 0;
  let currentText = "";
  let isDeleting = false;

  function typeLoop() {
    currentText = texts[count];

    if (!isDeleting) {
      index++;
    } else {
      index--;
    }

    const displayed = currentText.slice(0, index);
    document.getElementById("typing").textContent = displayed;

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && index === currentText.length) {
      delay = count === 0 ? 2500 : 1800;
      isDeleting = true;
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      count = (count + 1) % texts.length;
      delay = 500;
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();
});
