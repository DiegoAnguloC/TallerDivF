import { gsap } from "/node_modules/gsap/index.js";
import { ScrollTrigger } from "/node_modules/gsap/ScrollTrigger.js";
import { TextPlugin } from "/node_modules/gsap/TextPlugin.js";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // Función para el efecto de máquina de escribir
  function typewriterEffect(title, content) {
    const titleDuration = title.textContent.length * 0.05;
    const contentDuration = content.textContent.length * 0.05;

    // Asegura que el texto sea visible antes de empezar la animación
    title.style.visibility = "visible";
    content.style.visibility = "visible";

    gsap.fromTo(
      title,
      { text: "" },
      {
        text: title.textContent,
        duration: titleDuration,
        ease: "power1.inOut",
        clearProps: "text"
      }
    ).then(() => {
      gsap.fromTo(
        content,
        { text: "" },
        {
          text: content.textContent,
          duration: contentDuration,
          ease: "power1.inOut",
          clearProps: "text"
        }
      );
    });
  }

  // Función para animar la aparición y expansión del contenedor card-text
  function animateCardTextContainer(cardText, onComplete) {
    // Oculta inicialmente el texto para que aparezca solo con el efecto de máquina de escribir
    const title = cardText.querySelector("h2");
    const content = cardText.querySelector("p");
    title.style.visibility = "hidden";
    content.style.visibility = "hidden";

    gsap.fromTo(
      cardText,
      { opacity: 0, scaleY: 0 }, // Empieza oculto y colapsado verticalmente
      {
        opacity: 1,
        scaleY: 1,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete, // Llama a typewriterEffect después de expandir el contenedor
      }
    );
  }

  // Configura ScrollTrigger para cada tarjeta
  gsap.utils.toArray(".card").forEach((card) => {
    ScrollTrigger.create({
      trigger: card,
      start: "top 90%",
      end: "bottom 10%",
      onEnter: () => {
        card.classList.add("visible");
        const cardText = card.querySelector(".card-text");
        const title = cardText.querySelector("h2");
        const content = cardText.querySelector("p");

        // Primero, anima el contenedor card-text, luego inicia el efecto de máquina de escribir en el texto
        animateCardTextContainer(cardText, () => typewriterEffect(title, content));
      },
      onLeave: () => card.classList.remove("visible"),
      onEnterBack: () => {
        card.classList.add("visible");
        const cardText = card.querySelector(".card-text");
        const title = cardText.querySelector("h2");
        const content = cardText.querySelector("p");

        // Repite la animación al entrar de nuevo
        animateCardTextContainer(cardText, () => typewriterEffect(title, content));
      },
      onLeaveBack: () => card.classList.remove("visible"),
    });
  });

  // Configura ScrollTrigger para la tarjeta horizontal
  const horizontalCard = document.querySelector(".card-horizontal");

  ScrollTrigger.create({
    trigger: horizontalCard,
    start: "top 90%",
    end: "bottom 10%",
    onEnter: () => {
      horizontalCard.classList.add("visible");
      const cardText = horizontalCard.querySelector(".horizontal-text");
      const title = cardText.querySelector("h2");
      const content = cardText.querySelector("p");

      // Primero, anima el contenedor card-text de la tarjeta horizontal, luego el efecto de máquina de escribir
      animateCardTextContainer(cardText, () => typewriterEffect(title, content));
    },
    onLeave: () => horizontalCard.classList.remove("visible"),
    onEnterBack: () => {
      horizontalCard.classList.add("visible");
      const cardText = horizontalCard.querySelector(".horizontal-text");
      const title = cardText.querySelector("h2");
      const content = cardText.querySelector("p");

      // Repite la animación al entrar de nuevo
      animateCardTextContainer(cardText, () => typewriterEffect(title, content));
    },
    onLeaveBack: () => horizontalCard.classList.remove("visible"),
  });
});
