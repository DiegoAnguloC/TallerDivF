document.addEventListener("DOMContentLoaded", function () {
    const fterContainer = document.querySelector(".fter_container");
    fetch('/components/fter.html')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el footer');
            return response.text();
        })
        .then(data => {
            fterContainer.innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el footer:', error));
});