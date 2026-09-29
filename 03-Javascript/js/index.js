document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    // 1. Encontrar o contentor no HTML
    var container = document.getElementById("controls-container");

    // 2. Criar a div principal do Bootstrap para o switch
    var formDiv = document.createElement("div");
    formDiv.className = "form-check form-switch fs-5 mb-3";

    // 3. Criar o input (o botão slider)
    var input = document.createElement("input");
    input.className = "form-check-input";
    input.type = "checkbox";
    input.role = "switch";
    input.id = "kitchenLightSwitch";
    
    // Opcional: Detetar quando o botão é alterado
    input.addEventListener("change", function() {
        if (this.checked) {
            console.log("Luzes ligadas!");
        } else {
            console.log("Luzes desligadas!");
        }
    });

    // 4. Criar a etiqueta (label) do botão
    var label = document.createElement("label");
    label.className = "form-check-label";
    label.setAttribute("for", "kitchenLightSwitch");
    label.innerText = "Kitchen Lights";

    // 5. Juntar o input e a label à div, e colocar tudo dentro do contentor da página
    formDiv.appendChild(input);
    formDiv.appendChild(label);
    container.appendChild(formDiv);
});