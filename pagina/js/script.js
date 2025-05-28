function togglePlatoInfo(button) {
    const platoDiv = button.parentNode;
    platoDiv.classList.toggle("expanded");
    button.textContent = platoDiv.classList.contains("expanded") ? "Ver menos" : "Ver mas";
    const comboInfo = platoDiv.querySelector(".combo-info");
    if (comboInfo) {
        comboInfo.style.display = platoDiv.classList.contains("expanded") ? "block" : "none";
    }
    const platoImagen = platoDiv.querySelector(".plato-imagen");
    if (platoImagen) {
        platoImagen.style.display = platoDiv.classList.contains("expanded") ? "block" : "none";
    }
}

// Obtén todos los botones "Ver más"
const verMasButtons = document.querySelectorAll('.ver-mas-btn');

// Agrega event listeners para 'click' y 'touchstart' a cada botón
verMasButtons.forEach(button => {
    button.addEventListener('click', function() {
        togglePlatoInfo(this);
    });
    button.addEventListener('touchstart', function(event) {
        // Evita el comportamiento predeterminado del 'touchstart' para que no interfiera con el 'click'
        event.preventDefault();
        togglePlatoInfo(this);
    });
});