'use strict';

// Controlo dos Switches (Luzes e Música) 
function setupSwitch(switchId, iconId, isMusic = false) {
    var sw = document.getElementById(switchId);
    var icon = document.getElementById(iconId);

    if (!sw || !icon) return;

    function updateState() {
        if (sw.checked) {
            if (isMusic) {
                icon.className = "fas fa-music me-2 text-primary";
            } else {
                icon.className = "fas fa-lightbulb me-2 text-warning";
            }
        } else {
            if (isMusic) {
                icon.className = "fas fa-volume-xmark me-2 text-danger";
            } else {
                icon.className = "far fa-lightbulb me-2 text-secondary";
            }
        }
    }

    updateState();

    sw.addEventListener("change", function() {
        updateState();
        if (this.checked) {
            console.log(switchId + " ligado!");
        } else {
            console.log(switchId + " desligado!");
        }
    });
}

// Configurar todos os interruptores do painel
setupSwitch("kitchenLightSwitch", "kitchenLightIcon", false);
setupSwitch("livingCeilingLightSwitch", "livingCeilingLightIcon", false);
setupSwitch("livingAmbientLightSwitch", "livingAmbientLightIcon", false);
setupSwitch("ambientMusicSwitch", "ambientMusicIcon", true);


// Atualização automática da Temperatura a cada 5 segundos 
function updateTemperatures() {
    var kitchenTemp = document.getElementById("kitchenTemp"); // Obter o elemento de temperatura da cozinha
    var livingTemp = document.getElementById("livingTemp"); // Obter o elemento de temperatura da sala de estar

    if (kitchenTemp) {
        var randKitchen = (Math.random() * (30 - 10) + 10).toFixed(1);
        kitchenTemp.innerText = randKitchen + " °C";
    }

    if (livingTemp) {
        var randLiving = (Math.random() * (30 - 10) + 10).toFixed(1);
        livingTemp.innerText = randLiving + " °C";
    }
}

updateTemperatures();
setInterval(updateTemperatures, 5000);


// Atualização da Data e Relógio 
function updateClock() {
    var now = new Date();

    var currentDateElement = document.getElementById("currentDate");
    if (currentDateElement) {
        var year = now.getFullYear();
        var month = String(now.getMonth() + 1).padStart(2, '0');
        var day = String(now.getDate()).padStart(2, '0');
        currentDateElement.innerText = year + "-" + month + "-" + day;
    }

    var currentTimeElement = document.getElementById("currentTime");
    if (currentTimeElement) {
        var hours = String(now.getHours()).padStart(2, '0');
        var minutes = String(now.getMinutes()).padStart(2, '0');
        var seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeElement.innerText = hours + ":" + minutes + ":" + seconds;
    }
}

updateClock();
setInterval(updateClock, 1000);