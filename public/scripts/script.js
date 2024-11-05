import { gsap } from "/node_modules/gsap/index.js";
import { ScrollTrigger } from "/node_modules/gsap/ScrollTrigger.js";
import { TextPlugin } from "/node_modules/gsap/TextPlugin.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // Función para animación de máquina de escribir conservando estilos base
  function typewriterEffect(element) {
    const text = element.textContent;
    element.textContent = ""; // Limpia el texto para iniciar el efecto

    // Calcula la duración en función de la longitud del texto
    const duration = text.length * 0.05;

    // Configura la animación de máquina de escribir sin cambiar estilos base
    gsap.to(element, {
      text: text,
      duration: duration,
      ease: "power1.inOut",
      onStart: () => {
        element.style.visibility = "visible";
      },
      onComplete: () => {
        // Restaurar cualquier estilo original en el texto después de la animación si es necesario
      },
      clearProps: "text" // Sólo limpia el texto después de la animación
    });
  }

  // Configuración para cada tarjeta con efecto de máquina de escribir
  gsap.utils.toArray(".card").forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 90%",
      end: "bottom 10%",
      onEnter: () => {
        card.classList.add("visible");
        const cardText = card.querySelector(".card-text");
        typewriterEffect(cardText);
      },
      onLeave: () => card.classList.remove("visible"),
      onEnterBack: () => {
        card.classList.add("visible");
        const cardText = card.querySelector(".card-text");
        typewriterEffect(cardText);
      },
      onLeaveBack: () => card.classList.remove("visible"),
    });
  });

  // Animación para la tarjeta horizontal
  const horizontalCard = document.querySelector(".card-horizontal");

  ScrollTrigger.create({
    trigger: horizontalCard,
    start: "top 90%",
    end: "bottom 10%",
    onEnter: () => {
      horizontalCard.classList.add("visible");
      const horizontalText = horizontalCard.querySelector(".horizontal-text");
      typewriterEffect(horizontalText);
    },
    onLeave: () => horizontalCard.classList.remove("visible"),
    onEnterBack: () => {
      horizontalCard.classList.add("visible");
      const horizontalText = horizontalCard.querySelector(".horizontal-text");
      typewriterEffect(horizontalText);
    },
    onLeaveBack: () => horizontalCard.classList.remove("visible"),
  });
});
