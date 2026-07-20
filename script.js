document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     SIDEBAR TOGGLE (HEADER BUTTON)
  ===================== */
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");

  function closeSidebarMobile() {
    if (window.innerWidth < 1024) {
      sidebar.classList.remove("open");
      menuToggle.classList.remove("active");
    }
  }

  if (menuToggle && sidebar) {
    // Toggle sidebar open/close
    menuToggle.addEventListener("click", () => {
      if (window.innerWidth < 1024) {
        sidebar.classList.toggle("open"); // Mobile slide
        menuToggle.classList.toggle("active");
      } else {
        sidebar.classList.toggle("collapsed"); // Desktop shrink
        menuToggle.classList.toggle("active");
      }
    });

    // Close sidebar when a sidebar link is clicked (mobile)
    document.querySelectorAll(".sidebar-nav a").forEach(link => {
      link.addEventListener("click", () => {
        closeSidebarMobile();
      });
    });

    // Close sidebar when clicking outside (mobile)
    document.addEventListener("click", (e) => {
      const clickedInsideSidebar = sidebar.contains(e.target);
      const clickedMenuButton = menuToggle.contains(e.target);

      if (!clickedInsideSidebar && !clickedMenuButton) {
        closeSidebarMobile();
      }
    });

    // Reset mobile-open state when resizing to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        sidebar.classList.remove("open");
      }
    });
  }

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

/* =====================
   SMOOTH SCROLL & ACTIVE NAV
===================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".sidebar-nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

/* =====================
   MOUSE FOLLOW EFFECT
===================== */
document.addEventListener("mousemove", e => {
  document.body.style.setProperty('--x', e.clientX + 'px');
  document.body.style.setProperty('--y', e.clientY + 'px');
});

/* =====================
   PROJECT CARD 3D HOVER EFFECT
===================== */
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });

});

document.querySelectorAll(".project-card").forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", x + "px");
    card.style.setProperty("--y", y + "px");

  });

});

const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {

const scrollTop = window.scrollY;
const docHeight = document.documentElement.scrollHeight - window.innerHeight;

const progress = (scrollTop / docHeight) * 100;

progressBar.style.width = progress + "%";

});