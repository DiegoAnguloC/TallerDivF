document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.querySelector(".navbar_container");

    // Usamos fetch para cargar el contenido de navbar.html
    fetch('/components/navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el navbar');
            return response.text();
        })
        .then(data => {
            navbarContainer.innerHTML = data;

            // Menú principal hamburguesa
            const menuBtn = navbarContainer.querySelector(".hamburguesa");
            const menuBar = navbarContainer.querySelector("#menu");
            const closeBtn = navbarContainer.querySelector(".btn-cerrar-menu");

            if (menuBtn && menuBar && closeBtn) {
                menuBtn.addEventListener("click", () => {
                    menuBar.classList.add("active");
                });

                closeBtn.addEventListener("click", () => {
                    menuBar.classList.remove("active");
                });
            }

            // Menú desplegable de subcategorías
            const toggleButtons = navbarContainer.querySelectorAll(".toggle-submenu");
            toggleButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const targetId = button.getAttribute("data-target");
                    const submenu = navbarContainer.querySelector(targetId);

                    if (submenu) {
                        submenu.classList.toggle("open");
                        button.textContent = submenu.classList.contains("open") ? "x" : "+";
                    }
                });
            });
        })
        .catch(error => console.error('Error al cargar el navbar:', error));
});