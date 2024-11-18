document.addEventListener("DOMContentLoaded", function () {
    // Establece overflow-x: hidden en el body
    document.body.style.overflowX = "hidden";

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
        markers: true // Activa los marcadores para ver los puntos de start y end
    });
    
    gsap.from("#animated-svg path", {
        scrollTrigger: {
            trigger: "#animated-svg",
            start: "top 90%",
            end: "bottom 0%",
            scrub: true
        },
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        duration: 3
    });
});