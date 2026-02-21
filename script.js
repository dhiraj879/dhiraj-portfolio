document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       PROFESSIONAL TYPING LOOP
    ========================= */
    const texts = ["Dhiraj Khalas", "Data Analyst", "Web Developer"];
    const typingElement = document.querySelector(".typing");

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 60;
    const delayBetweenTexts = 1200;

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
       SCROLL FADE (One Time)
    ========================= */
    const faders = document.querySelectorAll(".fade");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    faders.forEach(section => observer.observe(section));



    /* =========================
       NAVBAR SHRINK (CLASS BASED)
    ========================= */
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {
        if (!nav) return;
        nav.classList.toggle("shrink", window.scrollY > 50);
    });



    /* =========================
       ACTIVE NAV LINK
    ========================= */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    });



    /* =========================
       SMOOTH SCROLL
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
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
            button.style.background = "#555";

            setTimeout(() => {
                button.innerText = "Message Sent ✓";
                button.style.background = "#00adb5";
                form.reset();

                setTimeout(() => {
                    button.innerText = "Send Message";
                    button.disabled = false;
                }, 2000);

            }, 1500);
        });
    }



    /* =========================
       SCROLL PROGRESS BAR
    ========================= */
    const progressBar = document.createElement("div");
    progressBar.style.position = "fixed";
    progressBar.style.top = "0";
    progressBar.style.left = "0";
    progressBar.style.height = "3px";
    progressBar.style.background = "#00adb5";
    progressBar.style.zIndex = "2000";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    });

});
