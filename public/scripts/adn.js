document.addEventListener("DOMContentLoaded", function () {
    // Configura `overflow-x: hidden` para evitar problemas de desplazamiento horizontal
    document.body.style.overflowX = "hidden";

    // Asegúrate de registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Detecta si el dispositivo es móvil o escritorio
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        // Animación para dispositivos móviles
        gsap.set("#animated-svg path", {
            strokeDasharray: 1000, // Tamaño del trazo inicial
            strokeDashoffset: 1000 // Completamente fuera de vista
        });

        gsap.to("#animated-svg path", {
            strokeDashoffset: 0, // Dibuja el trazo hasta completarlo
            duration: 60, // La animación tarda más en móviles
            scrollTrigger: {
                trigger: "#animated-svg", // El elemento que activa la animación
                start: "top 80%", // Inicio del trigger
                end: "bottom 20%", // Fin del trigger
                scrub: false // Sin seguimiento del scroll
            }
        });
    } else {
        // Animación para escritorio
        
        gsap.from("#animated-svg path", {
            scrollTrigger: {
                trigger: "#animated-svg", // El elemento que activa la animación
                start: "top 80%", // Inicio del trigger
                end: "bottom 35%", // Fin del trigger
                scrub: true // Sincroniza con el scroll
            },
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            duration: 3 // Duración más corta para escritorio
        });
    }
});
