// 1. Mobile Navigation
document.addEventListener("DOMContentLoaded", function () {

    const nav = document.querySelector("nav");
    const navList = nav ? nav.querySelector("ul") : null;

    if (nav && navList) {
        const menuButton = document.createElement("button");

        menuButton.textContent = "☰";
        menuButton.className = "menu-toggle";
        menuButton.setAttribute("aria-label", "Toggle navigation");
        menuButton.setAttribute("aria-expanded", "false");

        nav.insertBefore(menuButton, navList);

        menuButton.addEventListener("click", function () {
            const isOpen = navList.classList.toggle("nav-open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.textContent = isOpen ? "✕" : "☰";
        });

        navList.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navList.classList.remove("nav-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "☰";
            });
        });
    }

    // 2. Contact Form Validation
    const contactForm = document.querySelector(
        'form[data-form="contact"], form#contactForm'
    );

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            showMessage(
                contactForm,
                "Thank you! Your message has been validated."
            );

            contactForm.reset();
        });
    }

    // 3. Reservation Form Validation
    const reservationForm = document.querySelector(
        'form[data-form="reservation"], form#reservationForm'
    );

    if (reservationForm) {
        const dateInput = reservationForm.querySelector(
            'input[type="date"]'
        );

        if (dateInput) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");

            dateInput.min = `${year}-${month}-${day}`;
        }

        reservationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!reservationForm.checkValidity()) {
                reservationForm.reportValidity();
                return;
            }

            showMessage(
                reservationForm,
                "Your reservation details have been validated successfully!"
            );

            reservationForm.reset();
        });
    }

    // 4. Current Year in Footer
    document.querySelectorAll("[data-current-year]").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

});

// Display a message after local form validation
function showMessage(form, message) {
    let messageBox = form.querySelector(".form-message");

    if (!messageBox) {
        messageBox = document.createElement("p");
        messageBox.className = "form-message";
        messageBox.setAttribute("role", "status");
        form.appendChild(messageBox);
    }

    messageBox.textContent = message;
}