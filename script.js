document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE NAV TOGGLE
    ========================= */
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinksContainer = document.querySelector(".nav-links");

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener("click", () => {
            navLinksContainer.classList.toggle("active");
            menuToggle.classList.toggle("open");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinksContainer.classList.remove("active");
                menuToggle.classList.remove("open");
            });
        });
    }


    /* =========================
       PROFESSIONAL TYPING EFFECT
    ========================= */
    const texts = ["Dhiraj Khalas", "Data Analyst", "Web Developer"];
    const typingElement = document.querySelector(".typing");

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 100;
    const deletingSpeed = 60;
    const delayBetweenTexts = 1500;

    function typeEffect() {
        if (!typingElement) return;

        const currentText = texts[textIndex];

        if (!isDeleting) {
            typingElement.innerHTML =
                currentText.substring(0, charIndex + 1) +
                '<span class="cursor">|</span>';
            charIndex++;

            if (charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, delayBetweenTexts);
            }
        } else {
            typingElement.innerHTML =
                currentText.substring(0, charIndex - 1) +
                '<span class="cursor">|</span>';
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }

    typeEffect();


    /* =========================
       SCROLL FADE ANIMATION
    ========================= */
    const faders = document.querySelectorAll(".fade");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    faders.forEach(section => observer.observe(section));


    /* =========================
       NAVBAR SHRINK
    ========================= */
    const nav = document.querySelector("nav");

    function handleNavbar() {
        if (!nav) return;
        nav.classList.toggle("shrink", window.scrollY > 50);
    }


    /* =========================
       ACTIVE NAV LINK (Better Logic)
    ========================= */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    function updateActiveLink() {
        let scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            if (
                scrollPos >= section.offsetTop &&
                scrollPos < section.offsetTop + section.offsetHeight
            ) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + section.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }


    /* =========================
       SMOOTH SCROLL
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });


    /* =========================
       CONTACT FORM ANIMATION
    ========================= */
    const form = document.querySelector(".contact-form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const button = form.querySelector("button");
            button.innerText = "Sending...";
            button.disabled = true;
            button.style.opacity = "0.7";

            setTimeout(() => {
                button.innerText = "Message Sent ✓";
                button.style.background = "#00adb5";
                form.reset();

                setTimeout(() => {
                    button.innerText = "Send Message";
                    button.disabled = false;
                    button.style.opacity = "1";
                }, 2000);

            }, 1500);
        });
    }


    /* =========================
       SCROLL PROGRESS BAR (Smooth)
    ========================= */
    const progressBar = document.createElement("div");
    progressBar.style.position = "fixed";
    progressBar.style.top = "0";
    progressBar.style.left = "0";
    progressBar.style.height = "3px";
    progressBar.style.background = "#00adb5";
    progressBar.style.zIndex = "2000";
    progressBar.style.width = "0%";
    progressBar.style.transition = "width 0.1s ease";

    document.body.appendChild(progressBar);

    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    }


    /* =========================
       OPTIMIZED SCROLL HANDLER
    ========================= */
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavbar();
                updateActiveLink();
                updateProgressBar();
                ticking = false;
            });
            ticking = true;
        }
    });

});
