'use strict';

document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Controlo dos Switches (Luzes e Música) ---
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

    setupSwitch("kitchenLightSwitch", "kitchenLightIcon", false);
    setupSwitch("livingCeilingLightSwitch", "livingCeilingLightIcon", false);
    setupSwitch("livingAmbientLightSwitch", "livingAmbientLightIcon", false);
    setupSwitch("ambientMusicSwitch", "ambientMusicIcon", true);


    // --- 2. Atualização automática da Temperatura a cada 5 segundos ---
    function updateTemperatures() {
        var kitchenTemp = document.getElementById("kitchenTemp");
        var livingTemp = document.getElementById("livingTemp");

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


    // --- 3. Atualização da Data e Relógio ---
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


    // --- 4. Funcionalidade da API do OpenWeatherMap & Tempo Relativo ---
    function getRelativeTimeString(date) {
        var now = new Date();
        var secondsAgo = Math.floor((now - date) / 1000);

        if (secondsAgo < 60) {
            return "Last update: Just now";
        } else if (secondsAgo < 3600) {
            var minutes = Math.floor(secondsAgo / 60);
            return "Last update: " + minutes + (minutes === 1 ? " minute ago" : " minutes ago");
        } else if (secondsAgo < 86400) {
            var hours = Math.floor(secondsAgo / 3600);
            return "Last update: " + hours + (hours === 1 ? " hour ago" : " hours ago");
        } else {
            var days = Math.floor(secondsAgo / 86400);
            return "Last update: " + days + (days === 1 ? " day ago" : " days ago");
        }
    }

    function fetchWeatherData(cityName) {
        var apiKey = "8f39750025c9e6e8bfaaf2f21333ebb6";
        var url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(cityName)}&appid=${apiKey}`;

        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Cidade não encontrada ou erro na API.");
                }
                return response.json();
            })
            .then(function(data) {
                document.getElementById("currentTemp").innerText = data.main.temp.toFixed(1) + " °C";
                document.getElementById("maxTemp").innerText = data.main.temp_max.toFixed(1) + " °C";
                document.getElementById("minTemp").innerText = data.main.temp_min.toFixed(1) + " °C";
                document.getElementById("humidity").innerText = data.main.humidity + "%";

                document.getElementById("sunriseTime").innerText = formatUnixTime(data.sys.sunrise);
                document.getElementById("sunsetTime").innerText = formatUnixTime(data.sys.sunset);

                // Atualizar o texto do último update com o formato relativo
                var updateTime = new Date();
                var lastUpdateEl = document.getElementById("lastUpdate");
                if (lastUpdateEl) {
                    lastUpdateEl.innerText = getRelativeTimeString(updateTime);
                }
            })
            .catch(function(error) {
                console.error("Erro:", error);
                alert("Não foi possível obter os dados para a cidade indicada. Tenta novamente.");
            });
    }

    function formatUnixTime(unixTimestamp) {
        var date = new Date(unixTimestamp * 1000);
        var hours = String(date.getHours()).padStart(2, '0');
        var minutes = String(date.getMinutes()).padStart(2, '0');
        return hours + "h" + minutes;
    }

    var getBtn = document.getElementById("getWeatherBtn");
    var cityInput = document.getElementById("cityInput");

    if (getBtn && cityInput) {
        getBtn.addEventListener("click", function() {
            var city = cityInput.value.trim();
            if (city !== "") {
                fetchWeatherData(city);
            }
        });

        cityInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                getBtn.click();
            }
        });
    }

    // Carregar os dados de Leiria automaticamente logo ao abrir
    fetchWeatherData("Leiria");
});