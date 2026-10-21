
    // ==================================================
    // 4. DROPDOWN HUBUNGI KAMI
    // ==================================================

    const desktopContactButton = document.getElementById("desktopContactToggle");
    const desktopContactMenu = document.getElementById("desktopContactMenu");
    const desktopContactArrow = document.getElementById("desktopContactArrow");

    const contactDropdown = document.getElementById("contactDropdown");
    const contactButton = document.getElementById("contactToggle");
    const contactMenu = document.getElementById("contactMenu");
    const contactArrow = document.getElementById("contactArrow");

    function toggleContactMenu(button, menu, arrow, isOpen) {
        if (!button || !menu) return;

        button.setAttribute("aria-expanded", String(isOpen));
        menu.setAttribute("aria-hidden", String(!isOpen));

        menu.classList.toggle("invisible", !isOpen);
        menu.classList.toggle("visible", isOpen);
        menu.classList.toggle("pointer-events-none", !isOpen);
        menu.classList.toggle("pointer-events-auto", isOpen);
        menu.classList.toggle("opacity-0", !isOpen);
        menu.classList.toggle("opacity-100", isOpen);
        menu.classList.toggle("translate-y-2", !isOpen);
        menu.classList.toggle("translate-y-0", isOpen);
        menu.classList.toggle("translate-y-3", !isOpen);
        menu.classList.toggle("translate-y-0", isOpen);
        menu.classList.toggle("scale-95", !isOpen);
        menu.classList.toggle("scale-100", isOpen);

        if (arrow) {
            arrow.classList.toggle("rotate-180", isOpen);
        }
    }

    function closeAllContactMenus() {
        toggleContactMenu(
            desktopContactButton,
            desktopContactMenu,
            desktopContactArrow,
            false
        );

        toggleContactMenu(
            contactButton,
            contactMenu,
            contactArrow,
            false
        );
    }

    function setupContactMenu(button, menu, arrow, dropdown) {
        if (!button || !menu) return;

        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = button.getAttribute("aria-expanded") === "true";

            closeAllContactMenus();

            toggleContactMenu(button, menu, arrow, !isOpen);
        });

        menu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeAllContactMenus);
        });

        toggleContactMenu(button, menu, arrow, false);
    }

    setupContactMenu(
        desktopContactButton,
        desktopContactMenu,
        desktopContactArrow
    );

    setupContactMenu(
        contactButton,
        contactMenu,
        contactArrow,
        contactDropdown
    );

    document.addEventListener("click", event => {
        const insideDesktop =
            desktopContactButton?.contains(event.target) ||
            desktopContactMenu?.contains(event.target);

        const insideMobile =
            contactDropdown?.contains(event.target) ||
            contactButton?.contains(event.target) ||
            contactMenu?.contains(event.target);

        if (!insideDesktop && !insideMobile) {
            closeAllContactMenus();
        }
    });


    // ==================================================
    // 5. KEYBOARD ACCESSIBILITY
    // ==================================================

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            setMobileMenu(false);
            closeAllContactMenus();
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
