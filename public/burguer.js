document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector("#btn-menu .hamburguesa");
    const menuBar = document.querySelector("#menu");
    const closeBtn = document.querySelector(".btn-cerrar-menu");

    menuBtn.addEventListener("click", function () {
        menuBar.classList.add("active");
    });

    closeBtn.addEventListener("click", function () {
        menuBar.classList.remove("active");
    });
});
