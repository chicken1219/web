document.addEventListener('DOMContentLoaded', function() {
    const pageContent = document.getElementById('page-content');
    const closedMessage = document.getElementById('closed-message');
    const countdownTimer = document.getElementById('countdown-timer');

    // Horario de apertura y cierre
    const openHour = 9; // 9 AM
    const openMinute = 0;
    const closeHour = 19; // 7 PM
    const closeMinute = 30; // 7:30 PM

    function checkPageAvailability() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Calcular la hora de apertura y cierre en minutos desde la medianoche
        const openTimeInMinutes = openHour * 60 + openMinute;
        const closeTimeInMinutes = closeHour * 60 + closeMinute;
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes) {
            // Si está dentro del horario
            pageContent.style.display = 'block'; // Mostrar el contenido de la página
            closedMessage.style.display = 'none'; // Ocultar el mensaje de cerrado
            clearInterval(window.countdownInterval); // Limpiar cualquier cronómetro existente
        } else {
            // Si está fuera del horario
            pageContent.style.display = 'none'; // Ocultar el contenido de la página
            closedMessage.style.display = 'block'; // Mostrar el mensaje de cerrado
            startCountdown(); // Iniciar el cronómetro
        }
    }

    function startCountdown() {
        // Función para actualizar el cronómetro cada segundo
        function updateCountdown() {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const currentSecond = now.getSeconds();

            const openDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), openHour, openMinute, 0);
            const closeDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), closeHour, closeMinute, 0);

            let timeUntilOpen = 0;
            let timeUntilClose = 0;

            if (now.getTime() < openDateTime.getTime()) {
                // Si aún no es hora de abrir
                timeUntilOpen = openDateTime.getTime() - now.getTime();
                const hours = Math.floor((timeUntilOpen / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeUntilOpen / (1000 * 60)) % 60);
                const seconds = Math.floor((timeUntilOpen / 1000) % 60);
                countdownTimer.textContent = `Abre en: ${hours}h ${minutes}m ${seconds}s`;
            } else if (now.getTime() > closeDateTime.getTime()) {
                // Si ya cerró, calcula para la apertura del día siguiente
                const nextOpenDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, openHour, openMinute, 0);
                timeUntilOpen = nextOpenDateTime.getTime() - now.getTime();
                const hours = Math.floor((timeUntilOpen / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeUntilOpen / (1000 * 60)) % 60);
                const seconds = Math.floor((timeUntilOpen / 1000) % 60);
                countdownTimer.textContent = `Abre mañana en: ${hours}h ${minutes}m ${seconds}s`;
            } else {
                // Si está dentro del horario, esto no debería ejecutarse si la página está visible
                // Pero por si acaso, muestra cuánto tiempo queda hasta el cierre
                timeUntilClose = closeDateTime.getTime() - now.getTime();
                const hours = Math.floor((timeUntilClose / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeUntilClose / (1000 * 60)) % 60);
                const seconds = Math.floor((timeUntilClose / 1000) % 60);
                countdownTimer.textContent = `Cierra en: ${hours}h ${minutes}m ${seconds}s`; // Este caso es menos probable si la lógica de arriba funciona
            }
        }

        // Ejecutar la actualización del cronómetro inmediatamente y luego cada segundo
        updateCountdown();
        window.countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Comprobar la disponibilidad de la página al cargarla y cada minuto
    checkPageAvailability();
    setInterval(checkPageAvailability, 60 * 1000); // Comprueba cada minuto
});