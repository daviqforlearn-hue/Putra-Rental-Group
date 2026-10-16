document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const html = document.documentElement;

    // ==================================================
    // 1. THEME MANAGEMENT - DARK / LIGHT MODE
    // ==================================================

    const themeButtons = [
        document.getElementById("theme-toggle"),
        document.getElementById("mobile-theme-toggle")
    ].filter(Boolean);

    function updateThemeButtons() {
        const isDark = html.classList.contains("dark");

        themeButtons.forEach(button => {
            const moonIcon = button.querySelector(".fa-moon");
            const sunIcon = button.querySelector(".fa-sun");

            button.setAttribute("aria-pressed", String(isDark));
            button.setAttribute(
                "aria-label",
                isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"
            );
            button.setAttribute(
                "title",
                isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"
            );

            if (moonIcon) {
                moonIcon.classList.toggle("hidden", isDark);
                moonIcon.classList.toggle("inline-block", !isDark);
            }

            if (sunIcon) {
                sunIcon.classList.toggle("hidden", !isDark);
                sunIcon.classList.toggle("inline-block", isDark);
            }
        });

        html.style.colorScheme = isDark ? "dark" : "light";
    }

    function setTheme(theme, save = true) {
        const isDark = theme === "dark";

        html.classList.toggle("dark", isDark);

        if (save) {
            try {
                localStorage.setItem("theme", isDark ? "dark" : "light");
            } catch (error) {
                // Tema tetap bekerja jika localStorage tidak tersedia.
            }
        }

        updateThemeButtons();
    }

    function initializeTheme() {
        let savedTheme = null;

        try {
            savedTheme = localStorage.getItem("theme");
        } catch (error) {
            // Gunakan preferensi sistem jika penyimpanan tidak tersedia.
        }

        if (savedTheme === "dark" || savedTheme === "light") {
            setTheme(savedTheme, false);
        } else {
            const prefersDark = window.matchMedia &&
                window.matchMedia("(prefers-color-scheme: dark)").matches;

            setTheme(prefersDark ? "dark" : "light", false);
        }
    }

    initializeTheme();

    themeButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            const isCurrentlyDark = html.classList.contains("dark");

            setTheme(isCurrentlyDark ? "light" : "dark");
        });
    });


    // ==================================================
    // 2. NAVBAR SCROLL EFFECT
    // ==================================================

    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle("shadow-md", window.scrollY > 20);
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // ==================================================
    // 3. MOBILE NAVIGATION MENU
    // ==================================================

    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuIcon = document.getElementById("mobile-menu-icon");

    function setMobileMenu(isOpen) {
        if (!mobileMenu || !mobileMenuBtn) return;

        mobileMenu.classList.toggle("hidden", !isOpen);

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        mobileMenuBtn.setAttribute(
            "aria-label",
            isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
        );

        if (mobileMenuIcon) {
            mobileMenuIcon.classList.toggle("fa-bars", !isOpen);
            mobileMenuIcon.classList.toggle("fa-xmark", isOpen);
        }
    }

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", event => {
            event.stopPropagation();

            const isOpen =
                mobileMenuBtn.getAttribute("aria-expanded") === "true";

            setMobileMenu(!isOpen);
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                setMobileMenu(false);
            });
        });

        // Tutup menu jika pengguna mengeklik di luar menu.
        document.addEventListener("click", event => {
            const isOpen =
                mobileMenuBtn.getAttribute("aria-expanded") === "true";

            if (
                isOpen &&
                !mobileMenu.contains(event.target) &&
                !mobileMenuBtn.contains(event.target)
            ) {
                setMobileMenu(false);
            }
        });
    }


    
    // ==================================================
    // 4. DROPDOWN HUBUNGI KAMI - MENU MENGAMBANG
    // ==================================================

    const contactButton = document.getElementById("desktopContactToggle");
    const contactMenu = document.getElementById("desktopContactMenu");
    const contactArrow = document.getElementById("desktopContactArrow");

    function setContactMenu(isOpen) {
        if (!contactButton || !contactMenu) return;

        contactButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        contactMenu.classList.toggle("invisible", !isOpen);
        contactMenu.classList.toggle("visible", isOpen);

        contactMenu.classList.toggle("pointer-events-none", !isOpen);
        contactMenu.classList.toggle("pointer-events-auto", isOpen);

        contactMenu.classList.toggle("opacity-0", !isOpen);
        contactMenu.classList.toggle("opacity-100", isOpen);

        contactMenu.classList.toggle("translate-y-2", !isOpen);
        contactMenu.classList.toggle("translate-y-0", isOpen);

        if (contactArrow) {
            contactArrow.classList.toggle("rotate-180", isOpen);
        }
    }

    if (contactButton && contactMenu) {
        contactButton.addEventListener("click", event => {
            event.stopPropagation();

            const isOpen =
                contactButton.getAttribute("aria-expanded") === "true";

            setContactMenu(!isOpen);
        });

        document.addEventListener("click", event => {
            if (
                !contactButton.contains(event.target) &&
                !contactMenu.contains(event.target)
            ) {
                setContactMenu(false);
            }
        });

        contactMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                setContactMenu(false);
            });
        });
    }

    
    const contactDropdown = document.getElementById("contactDropdown");
    const contactButton = document.getElementById("contactToggle");
    const contactMenu = document.getElementById("contactMenu");
    const contactArrow = document.getElementById("contactArrow");

    function setContactMenu(isOpen) {
        if (!contactButton || !contactMenu) return;

        contactButton.setAttribute("aria-expanded", String(isOpen));
        contactMenu.setAttribute("aria-hidden", String(!isOpen));

        contactMenu.classList.toggle("invisible", !isOpen);
        contactMenu.classList.toggle("visible", isOpen);

        contactMenu.classList.toggle("pointer-events-none", !isOpen);
        contactMenu.classList.toggle("pointer-events-auto", isOpen);

        contactMenu.classList.toggle("opacity-0", !isOpen);
        contactMenu.classList.toggle("opacity-100", isOpen);

        contactMenu.classList.toggle("translate-y-3", !isOpen);
        contactMenu.classList.toggle("translate-y-0", isOpen);

        contactMenu.classList.toggle("scale-95", !isOpen);
        contactMenu.classList.toggle("scale-100", isOpen);

        if (contactArrow) {
            contactArrow.classList.toggle("rotate-180", isOpen);
        }
    }

    if (contactButton && contactMenu) {
        contactButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                contactButton.getAttribute("aria-expanded") === "true";

            setContactMenu(!isOpen);
        });

        document.addEventListener("click", function (event) {
            const clickedOutside = contactDropdown
                ? !contactDropdown.contains(event.target)
                : !contactButton.contains(event.target) &&
                  !contactMenu.contains(event.target);

            if (clickedOutside) {
                setContactMenu(false);
            }
        });

        contactMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setContactMenu(false);
            });
        });

        setContactMenu(false);
    }
    // Akhir dropdown Hubungi Kami


    // ==================================================
    // 5. KEYBOARD ACCESSIBILITY
    // ==================================================

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            setMobileMenu(false);
            setContactMenu(false);
        }
    });


    // ==================================================
    // 6. RESPONSIVE WINDOW HANDLING
    // ==================================================

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            setMobileMenu(false);
        }

        updateNavbar();
    });

});
