document.addEventListener("DOMContentLoaded", () => {

/* =====================
   SIDEBAR TOGGLE (HEADER BUTTON)
===================== */
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");

if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
      sidebar.classList.toggle("open");      // Mobile slide
    } else {
      sidebar.classList.toggle("collapsed"); // Desktop shrink
    }
  });

  // Close sidebar when link clicked (mobile)
  document.querySelectorAll(".sidebar-nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
        sidebar.classList.remove("open");
      }
    });
  });
}

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
});

  /* =====================
     OUTPUT PREVIEW TOGGLE
  ===================== */
  document.querySelectorAll(".output-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const pre = btn.nextElementSibling;
      if (!pre) return;

      const isOpen = pre.style.display === "block";
      pre.style.display = isOpen ? "none" : "block";
      btn.textContent = isOpen
        ? "▶ View Output Preview"
        : "▼ Hide Output Preview";
    });
  });

  /* =====================
     MODAL FOR FULL OUTPUT
  ===================== */
  const modal = document.getElementById("output-modal");
  const modalText = document.getElementById("outputText");
  const closeModal = document.querySelector(".modal .close");

  document.querySelectorAll(".view-output").forEach(btn => {
    btn.addEventListener("click", () => {
      const preview = btn.closest(".project-card")
        ?.querySelector(".output-content");

      if (preview && modal && modalText) {
        modalText.textContent = preview.textContent.trim();
        modal.style.display = "flex";
      }
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  }

  /* =====================
     FLOATING CTA CLOSE
  ===================== */
  const closeCTA = document.getElementById("close-cta");
  const cta = document.getElementById("floating-cta");

  if (closeCTA && cta) {
    closeCTA.addEventListener("click", () => {
      cta.style.display = "none";
    });
  }

  /* =====================
     TYPING EFFECT (HERO)
  ===================== */
  const texts = [
    "Welcome to Phumudzo.dev",
    "Building intelligent, reliable, and scalable web solutions.",
    "Solving problems with code and algorithms.",
    "Turning ideas into functional software."
  ];

  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  let index = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = texts[index];

    if (!isDeleting) {
      typingElement.textContent = current.slice(0, charIndex++);
      if (charIndex > current.length) {
        setTimeout(() => (isDeleting = true), 1500);
      }
    } else {
      typingElement.textContent = current.slice(0, charIndex--);
      if (charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 90);
  }

  typeEffect();

});

