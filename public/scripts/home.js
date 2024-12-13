import { gsap } from "/node_modules/gsap/index.js";
import { ScrollTrigger } from "/node_modules/gsap/ScrollTrigger.js";
import Flip from "/node_modules/gsap/Flip.js";

/*let player;

// Cargar la API de IFrame de YouTube
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Crear el reproductor cuando la API esté lista
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    const videoContainer = document.getElementById('videoContainer');

    videoContainer.addEventListener("mouseenter", () => {
        player.seekTo(0); // Reinicia el video al inicio
        player.mute(); // Silencia el video
        player.playVideo(); // Reproduce el video
        gsap.to(videoContainer, { scale: 1.05, duration: 0.3 }); // Anima el hover
    });

    videoContainer.addEventListener("mouseleave", () => {
        player.pauseVideo(); // Pausa el video
        gsap.to(videoContainer, { scale: 1, duration: 0.3 }); // Restaura el tamaño original
    });

    videoContainer.addEventListener("click", () => {
        player.unMute(); // Activa el audio
        player.playVideo(); // Asegúrate de que se reproduce al hacer clic
        gsap.to(videoContainer, { scale: 1, duration: 0.3 }); // Restaura el tamaño por si está escalado
    });

    // Limitar la reproducción a los primeros 10 segundos
    setTimeout(() => {
        player.pauseVideo(); // Pausa después de 10 segundos
        player.seekTo(0); // Reinicia el video al inicio
    }, 10000); // 10000 ms = 10 segundos
}

// Iniciar la carga de la API al cargar la página
loadYouTubeAPI();*/


gsap.registerPlugin(ScrollTrigger);

// Selecciona todos los sections
const sections = document.querySelectorAll("section");

// Añadir ScrollTrigger a cada sección con animación alternada
sections.forEach((section, index) => {
  // Agrega las clases alternadas dependiendo de la posición
  section.classList.add(index % 2 === 0 ? "section-left" : "section-right");

  gsap.fromTo(
    section,
    {
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100, // Inicia fuera de vista
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
        toggleActions: "play none none none", // No repetirá ni hará otro efecto una vez la sección entra
      },
    }
  );
});
