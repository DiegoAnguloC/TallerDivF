// Carrusel de artículos
const articuloCarrusel = new Swiper('.articulos_carrusel', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.articulos_carrusel .swiper-button-next',
      prevEl: '.articulos_carrusel .swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
  
  // Carrusel de artistas
  const artistaCarrusel = new Swiper('.artistas_carrusel', {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
      nextEl: '.artistas_carrusel .swiper-button-next',
      prevEl: '.artistas_carrusel .swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
  