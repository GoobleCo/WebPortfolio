// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Add click event listeners to navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navLinksContainer = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinksContainer.classList.toggle("mobile-menu-open")
      this.classList.toggle("active")
    })
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in class to elements and observe them
  const animatedElements = document.querySelectorAll(".card, .hero-content, .section-title")
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Progress bar animations
  const progressBars = document.querySelectorAll(".progress-fill")
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.style.width
          progressBar.style.width = "0%"
          setTimeout(() => {
            progressBar.style.width = width
          }, 200)
        }
      })
    },
    { threshold: 0.5 },
  )

  progressBars.forEach((bar) => {
    progressObserver.observe(bar)
  })

  // Header background on scroll
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)"
    } else {
      header.style.background = "rgba(255, 255, 255, 0.8)"
    }
  })
})

// Scroll to contact function
function scrollToContact() {
  const contactSection = document.getElementById("contact")
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Add mobile menu styles dynamically
const style = document.createElement("style")
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-menu-open {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`
document.head.appendChild(style)
