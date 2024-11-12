document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.splide');

    carousels.forEach((carousel) => {
        new Splide(carousel, {
            type: 'loop',
            perPage: window.innerWidth >= 1024 ? 5 : 3, // 5 elementos en desktop (1024px o más), 1 en mobile
            autoplay: true,
            interval: 3000,
            gap: '10px', // Ajusta el espacio entre los elementos del carrusel aquí
            pagination: false,
            arrows: window.innerWidth >= 1024 ? true : false, // Habilitado en ambas versiones (puedes ponerlo en false si no lo quieres)
        }).mount();
    });
});
