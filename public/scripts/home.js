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

window.addEventListener('load', () => {
    // Obtener todos los elementos .barra_de_separacion
    const barraDeSeparacion = document.querySelectorAll('.barra_de_separacion');
    
    barraDeSeparacion.forEach(element => {
        // Crear un SVG con el filtro glitch
        const svgNamespace = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNamespace, 'svg');
        svg.setAttribute('width', '400');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 600 100');
        svg.style.display = 'block';
        svg.style.margin = '0 auto';
        svg.style.backgroundColor = 'transparent'; // Fondo transparente

        // Crear el filtro glitch
        const defs = document.createElementNS(svgNamespace, 'defs');
        const filter = document.createElementNS(svgNamespace, 'filter');
        filter.setAttribute('id', 'filter');

        // Definir el filtro (código similar al que proporcionaste)
        filter.innerHTML = `
            <feFlood flood-color="red" result="flood1" />
            <feFlood flood-color="limegreen" result="flood2" />
            <feOffset in="SourceGraphic" dx="3" dy="0" result="off1a"/>
            <feOffset in="SourceGraphic" dx="2" dy="0" result="off1b"/>
            <feOffset in="SourceGraphic" dx="-3" dy="0" result="off2a"/>
            <feOffset in="SourceGraphic" dx="-2" dy="0" result="off2b"/>
            <feComposite in="flood1" in2="off1a" operator="in" result="comp1" />
            <feComposite in="flood2" in2="off2a" operator="in" result="comp2" />
            <feMerge>
                <feMergeNode in="black" />
                <feMergeNode in="comp1" />
                <feMergeNode in="off1b" />
            </feMerge>
            <feMerge>
                <feMergeNode in="SourceGraphic" />
                <feMergeNode in="merge1" />
                <feMergeNode in="merge2" />
            </feMerge>
        `;
        defs.appendChild(filter);
        svg.appendChild(defs);

        // Crear el texto SVG con el contenido de la barra_de_separacion
        const text = document.createElementNS(svgNamespace, 'text');
        text.setAttribute('x', '0');
        text.setAttribute('y', '100');
        text.textContent = element.textContent; // Usar el texto de .barra_de_separacion
        text.style.fontFamily = "'Goldman', sans-serif"; // Aplicar la fuente Goldman
        text.style.fontSize = '100px';
        text.style.fill = 'white';
        text.style.filter = 'url(#filter)';
        svg.appendChild(text);

        // Insertar el SVG en el contenedor
        element.innerHTML = ''; // Limpiar contenido previo
        element.appendChild(svg);

        // Aplicar animación glitch con GSAP (más suave)
        gsap.to(text, {
            y: '+=3', // Movimiento suave y menos agresivo
            opacity: 1, // Mantener opacidad constante para evitar parpadeo
            duration: 0.6, // Duración más larga para hacerlo suave
            repeat: -1,
            yoyo: true,
            stagger: 0.1, // Retraso entre animaciones
            ease: 'power1.inOut', // Suavizar el movimiento
        });

        // Animación de deslizamiento del texto (glitch más sutil)
        gsap.to(text, {
            x: '+=2', // Movimiento suave
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
            ease: 'power1.inOut', // Suavizar el movimiento
        });
    });
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