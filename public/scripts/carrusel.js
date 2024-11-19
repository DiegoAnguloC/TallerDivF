// Carrusel de artículos
const articuloCarrusel = new Swiper('.articulos_carrusel', {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: '.articulos_carrusel .swiper-button-next',
    prevEl: '.articulos_carrusel .swiper-button-prev',
    enabled: window.innerWidth >= 1024, // Navegación solo para pantallas grandes
  },
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
  on: {
    // Ajusta la navegación al redimensionar la pantalla
    resize: function () {
      const isLargeScreen = window.innerWidth >= 1024;
      this.params.navigation.enabled = isLargeScreen; // Activa/desactiva navegación
      this.navigation.update(); // Actualiza el estado de las flechas
    },
  },
});

// Carrusel de artistas
const artistaCarrusel = new Swiper('.artistas_carrusel', {
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: '.artistas_carrusel .swiper-button-next',
    prevEl: '.artistas_carrusel .swiper-button-prev',
    enabled: window.innerWidth >= 1024, // Navegación solo para pantallas grandes
  },
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
  on: {
    // Ajusta la navegación al redimensionar la pantalla
    resize: function () {
      const isLargeScreen = window.innerWidth >= 1024;
      this.params.navigation.enabled = isLargeScreen; // Activa/desactiva navegación
      this.navigation.update(); // Actualiza el estado de las flechas
    },
  },
});