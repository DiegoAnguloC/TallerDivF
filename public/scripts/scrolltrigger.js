// Importa y registra los plugins de GSAP correctamente
import { gsap } from "/node_modules/gsap/index.js";
import { ScrollTrigger } from "/node_modules/gsap/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

// Seleccionar todas las secciones
const sections = document.querySelectorAll('section');

// Añadir ScrollTrigger a cada sección con animación alternada
sections.forEach((section, index) => {
  // Agregar clases alternadas dependiendo de la posición
  section.classList.add(index % 2 === 0 ? 'section-left' : 'section-right');

  // Animación con GSAP
  gsap.fromTo(
    section,
    {
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100, // Movimiento lateral según la posición
    },
    {
      opacity: 1,
      x: 0, // Llega al centro
      duration: 1, // Duración de la animación
      ease: "power2.out", // Suavizado de la animación
      scrollTrigger: {
        trigger: section,
        start: "top 90%", // Se activa cuando la parte superior de la sección está al 90% de la ventana
        end: "bottom top", // Fin de la animación
        scrub: false, // Animación sin scrub
        once: true, // Solo se ejecuta una vez
        toggleActions: "play none none none", // Solo reproduce
      },
    }
  );
});
