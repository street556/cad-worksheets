document.addEventListener("DOMContentLoaded", function() {
    'use strict';

    // 1. Encontrar o contentor no HTML
    var container = document.getElementById("controls-container"); // Supondo que existe um elemento com id "controls-container" no HTML

    // 2. Criar a div principal do Bootstrap para o switch
    var formDiv = document.createElement("div"); // Cria uma div para o switch
    formDiv.className = "form-check form-switch fs-5 mb-3"; // Adiciona classes do Bootstrap para o switch, tamanho da fonte e margem inferior

    // 3. Criar o input (o botão slider)
    var input = document.createElement("input"); // Cria o elemento input
    input.className = "form-check-input"; // Adiciona a classe do Bootstrap para o input
    input.type = "checkbox"; // Define o tipo como checkbox
    input.role = "switch"; // Define o papel como switch
    input.id = "kitchenLightSwitch"; // Define o id para associar à label
    
    // Opcional: Detetar quando o botão é alterado
    input.addEventListener("change", function() { // Adiciona um "ouvinte de evento" para mudanças no estado do switch
        if (this.checked) { // Se o switch estiver ligado
            console.log("Luzes ligadas!"); // Coloca um log na consola a indicar que as luzes estão ligadas
        } else {
            console.log("Luzes desligadas!"); // Coloca um log na consola a indicar que as luzes estão desligadas
        }
    });

    // 4. Criar a etiqueta (label) do botão
    var label = document.createElement("label"); // Cria o elemento label
    label.className = "form-check-label"; // Adiciona a classe do Bootstrap para a label
    label.setAttribute("for", "kitchenLightSwitch"); // Associa a label ao input através do atributo "for"
    label.innerText = "Kitchen Lights"; // Define o texto da label

    // 5. Juntar o input e a label à div, e colocar tudo dentro do contentor da página
    formDiv.appendChild(input); // Adiciona o input à div
    formDiv.appendChild(label); // Adiciona a label à div
    container.appendChild(formDiv); // Adiciona a div ao contentor principal
});