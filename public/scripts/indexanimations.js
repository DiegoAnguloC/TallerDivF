import { gsap } from "/node_modules/gsap/index.js";
import { ScrollTrigger } from "/node_modules/gsap/ScrollTrigger.js";
import { TextPlugin } from "/node_modules/gsap/TextPlugin.js";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

document.addEventListener("DOMContentLoaded", () => {
    // Animación inicial de la sección .main
    const mainSection = document.querySelector(".main");
    gsap.fromTo(
        mainSection,
        { opacity: 0, scale: 0.5 },
        { 
            opacity: 1, 
            scale: 1, 
            duration: 1.5, 
            ease: "power2.out" 
        }
    );

    // Selección de todas las secciones, excepto la primera (main)
    const sections = document.querySelectorAll("section:not(.main)");

    sections.forEach((section, index) => {
        const direction = index % 2 === 0 ? -100 : 100; // Alterna: izquierda (-100) o derecha (100)

        gsap.fromTo(
            section,
            { opacity: 0, x: direction },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            }
        );
    });

    // Selección y animación de los elementos article-text (sin incluir los de .main)
    const articleTexts = document.querySelectorAll(".article-text:not(.main-article .article-text)");

    articleTexts.forEach((articleText) => {
        const title = articleText.querySelector("h1");
        const content = articleText.querySelector("p");

        // Ocultamos inicialmente el texto para evitar parpadeos
        title.style.opacity = "0";
        content.style.opacity = "0";

        // Configuración de ScrollTrigger para article-texts en secciones no-main
        ScrollTrigger.create({
            trigger: articleText,
            start: "top 80%",
            onEnter: () => {
                gsap.to(title, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    onComplete: () => {
                        typewriterEffect(content);
                    }
                });
            }
        });
    });
});

// Función para el efecto de máquina de escribir
function typewriterEffect(element) {
    const duration = element.textContent.length * 0.03;

    gsap.fromTo(
        element,
        { text: "", opacity: 1 },
        {
            text: element.textContent,
            duration: duration,
            ease: "power1.inOut",
            clearProps: "text"
        }
    );
}
