document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn-save").addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Recopilar datos del formulario
        let nombreCaso = document.querySelector("input[placeholder='Ej: Registro de usuario']").value;
        let area = document.querySelector("input[placeholder='Ej: Autenticación']").value;
        let idUnico = document.querySelector("input[placeholder='Ej: UC-001']").value;
        let actores = document.querySelector("input[placeholder='Listar actores principales']").value;
        let interesados = document.querySelector("input[placeholder='Listar partes interesadas']").value;
        let nivel = document.querySelector("select").value;
        let descripcion = document.querySelector("textarea[placeholder='Descripción detallada del caso de uso...']").value;
        let evento = document.querySelector("textarea[placeholder='Evento que inicia el caso de uso...']").value;
        let prioridad = document.querySelectorAll("select")[1].value;
        let riesgo = document.querySelectorAll("select")[2].value;

        // Recopilar pasos dinámicos
        let pasos = [];
        document.querySelectorAll("#steps-body tr").forEach(row => {
            let paso = row.cells[0].textContent;
            let descripcion = row.cells[1].querySelector("input").value;
            let detalles = row.cells[2].querySelector("textarea").value;
            pasos.push(`<tr><td>${paso}</td><td>${descripcion}</td><td>${detalles}</td></tr>`);
        });

        // Crear contenido HTML para exportar
        let contenidoHTML = `
            <html>
            <head>
                <title>${nombreCaso} - Documento de Caso de Uso</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { text-align: center; color: #2c3e50; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid black; padding: 10px; text-align: left; }
                    th { background-color: #3498db; color: white; }
                    .section { margin-bottom: 15px; }
                </style>
            </head>
            <body>
                <h1>Documentacion de Caso de Uso</h1>
                <div class="section"><strong>Nombre del Caso de Uso:</strong> ${nombreCaso}</div>
                <div class="section"><strong>Area:</strong> ${area}</div>
                <div class="section"><strong>ID Unico:</strong> ${idUnico}</div>
                <div class="section"><strong>Actor(es):</strong> ${actores}</div>
                <div class="section"><strong>Interesados:</strong> ${interesados}</div>
                <div class="section"><strong>Nivel:</strong> ${nivel}</div>
                <div class="section"><strong>Descripcion:</strong> ${descripcion}</div>
                <div class="section"><strong>Evento Desencadenador:</strong> ${evento}</div>
                <div class="section"><strong>Prioridad:</strong> ${prioridad}</div>
                <div class="section"><strong>Riesgo:</strong> ${riesgo}</div>
                <h2>Pasos Realizados:</h2>
                <table>
                    <tr><th>Paso</th><th>Descripcion</th><th>Detalles Adicionales</th></tr>
                    ${pasos.join("")}
                </table>
            </body>
            </html>
        `;

        // Crear Blob con el contenido HTML
        let blob = new Blob([contenidoHTML], { type: "text/html" });
        let url = URL.createObjectURL(blob);
        
        // Abrir el documento en una nueva ventana
        let ventana = window.open(url, "_blank");

        // Agregar retraso antes de imprimir para asegurar que el contenido se haya cargado
        setTimeout(() => {
            ventana.print();
        }, 1000);
    });
});
