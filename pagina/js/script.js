function togglePlatoInfo(button) {
    const platoDiv = button.parentNode;
    platoDiv.classList.toggle("expanded")
    button.textContent = platoDiv.classList.contains("expanded") ? "Ver menos" : "Ver mas";
    const comboInfo = platoDiv.querySelector(".combo-info");
    if (comboInfo) {
        comboInfo.style.display= platoDiv.classList.contains("expanded") ? "block" : "none";
    }
    const platoImagen = platoDiv.querySelector(".plato-imagen");
    if (platoImagen) {
        platoImagen.style.display= platoDiv.classList.contains("expanded") ? "block" : "none";
    }
}