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
  const barraDeSeparacion = document.querySelectorAll('.barra_de_separacion');

  barraDeSeparacion.forEach(element => {
      const svgNamespace = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNamespace, 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', '0 0 600 120');
      svg.style.display = 'block';
      svg.style.margin = '0 auto';
      svg.style.backgroundColor = 'transparent';

      const text = document.createElementNS(svgNamespace, 'text');
      text.setAttribute('x', '50%');
      text.setAttribute('y', '60%');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = element.textContent;
      text.style.fontFamily = "'Goldman', sans-serif";
      text.style.fontSize = '5em';
      text.style.fill = 'white';
      text.style.stroke = 'white';
      text.style.strokeWidth = '0.5';
      svg.appendChild(text);

      element.innerHTML = '';
      element.appendChild(svg);

      const animationTimeline = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      const colors = ['#11243f', '#1e6c70', '#0ff294', '#ecf213', '#ffff', 'black'];

      const animations = [
          {
              name: 'scaleX',
              properties: () => ({ scaleX: 1 + (Math.random() - 0.5) * 0.2 }),
              duration: 2,
          },
          {
              name: 'scaleY',
              properties: () => ({ scaleY: 1 + (Math.random() - 0.5) * 0.2 }),
              duration: 2,
          },
          {
              name: 'strokeWidth',
              properties: () => ({ strokeWidth: `${Math.random() * 0.8 + 0.3}` }),
              duration: 2,
          },
          {
              name: 'letterSpacing',
              properties: () => ({ letterSpacing: `${Math.random() * 4 - 2}px` }),
              duration: 2,
          },
          {
              name: 'colorChange',
              properties: () => {
                  const randomColor = colors[Math.floor(Math.random() * colors.length)];
                  return { fill: randomColor, stroke: randomColor };
              },
              duration: 2,
          },
          {
            name: 'weightChange',
            properties: () => ({ fontWeight: Math.random() > 0.5 ? 'bold' : 'normal' }),
            duration: 2,
          },
          {
            name: 'fontChange',
            properties: () => ({ fontFamily: Math.random() > 0.5 ? "'Goldman', sans-serif" : "'Roboto', sans-serif" }),
            duration: 2,
          }
      ];

      function applyRandomAnimation() {
          const randomAnim = animations[Math.floor(Math.random() * animations.length)];
          animationTimeline.to(text, {
              ...randomAnim.properties(),
              duration: randomAnim.duration,
              ease: 'power1.inOut',
              onComplete: applyRandomAnimation  // Callback para continuar con una nueva animación
          });
      }

      applyRandomAnimation();  // Iniciar la secuencia de animación aleatoria
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