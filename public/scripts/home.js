import { gsap } from "/node_modules/gsap/index.js";
import { ScrollTrigger } from "/node_modules/gsap/ScrollTrigger.js";
import Flip from "/node_modules/gsap/Flip.js";

const video = document.querySelector(".video video");
let hoverEnabled = true; // Controla si el hover está activado

// Evento de hover para reproducir el video en mute
video.addEventListener("mouseenter", () => {
  if (hoverEnabled) {
    video.currentTime = 0; // Reinicia el video al inicio cada vez
    video.muted = true;    // Mantiene el video en silencio
    video.play();          // Reproduce el video en mute al hacer hover
    gsap.to(video, { scale: 1.05, duration: 0.3 }); // Anima el hover
  }
});

// Pausar y reiniciar al salir del hover
video.addEventListener("mouseleave", () => {
  if (hoverEnabled) {
    video.pause();         // Pausa el video al salir del hover
    video.currentTime = 0; // Reinicia el video al inicio
    gsap.to(video, { scale: 1, duration: 0.3 }); // Restaura el tamaño original
  }
});

// Evento de clic para activar el audio y los controles, y desactivar el hover
video.addEventListener("click", () => {
  video.muted = false;     // Activa el audio
  video.controls = true;   // Muestra los controles del video
  hoverEnabled = false;    // Desactiva el hover hasta la recarga de la página
  gsap.to(video, { scale: 1, duration: 0.3 }); // Restaura el tamaño por si está escalado
});



gsap.registerPlugin(ScrollTrigger);

// Selecciona todos los sections
const sections = document.querySelectorAll('section');

// Añadir ScrollTrigger a cada sección con animación alternada
sections.forEach((section, index) => {
  // Agrega las clases alternadas dependiendo de la posición
  section.classList.add(index % 2 === 0 ? 'section-left' : 'section-right');

  gsap.fromTo(section, 
    {
      opacity: 0, 
      x: index % 2 === 0 ? -100 : 100 // Inicia fuera de vista
    }, 
    {
      opacity: 1, 
      x: 0, // Llega al centro
      scrollTrigger: {
        trigger: section,
        start: "top 90%", // Se activa cuando la parte superior de la sección está al 80% de la ventana
        end: "bottom top",
        scrub: false, // Desactiva el scrub para que la animación no se repita
        once: true, // Solo se ejecuta una vez
        toggleActions: "play none none none" // No repetirá ni hará otro efecto una vez la sección entra
      }
    });
});