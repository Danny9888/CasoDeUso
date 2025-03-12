document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn-save").addEventListener("click", function (event) {
        event.preventDefault();

        // [Código de recolección de datos igual...]

        // Modificación en la generación del PDF
        const ventana = window.open("", "_blank");
        if (!ventana) {
            alert("Por favor permite ventanas emergentes para este sitio");
            return;
        }

        ventana.document.write(contenidoHTML);
        ventana.document.close();

        ventana.onload = function() {
            ventana.print();
        };
    });
});

// Mover aquí las funciones de la tabla dinámica
let stepCounter = 1;

function addStep() {
    const tbody = document.getElementById('steps-body');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>${stepCounter}</td>
        <td><input type="text" placeholder="Descripción del paso"></td>
        <td><textarea placeholder="Detalles adicionales"></textarea></td>
        <td><button type="button" onclick="deleteStep(this)">Eliminar</button></td>
    `;
    
    tbody.appendChild(newRow);
    stepCounter++;
}

function deleteStep(button) {
    const row = button.closest('tr');
    row.remove();
    updateStepNumbers();
}

function updateStepNumbers() {
    const rows = document.querySelectorAll('#steps-body tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
    stepCounter = rows.length + 1;
}
