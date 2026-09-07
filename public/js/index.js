const expresion = document.getElementById("expresion");
const arbol = document.getElementById("arbol");

let lineas = [];

const estiloNodo = "width: 65px; height: 65px; display: inline-flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: bold; margin: 0;";

// Bloquea directamente presionar la tecla de punto
expresion.addEventListener("keydown", (event) => {
    if (event.key === "." || event.key === "Decimal") {
        event.preventDefault();
    }
});

const dibujar_arbol = (expresionInput) => {

    // Borrar líneas anteriores
    lineas.forEach(linea => linea.remove());
    lineas = [];

    // Limpia cualquier caracter no deseado (incluyendo puntos si pegan texto)
    let cleanInput = expresionInput.replace(/[^0-9+\-*/]/g, "");
    expresion.value = cleanInput;

    let separacionNumeros = cleanInput.split(/[+\-*/]/);
    let separacionOperador = cleanInput.replace(/[0-9]/g, "");

    if (!/[0-9]+[+\-*/]{1}[0-9]+/.test(cleanInput)) {
        arbol.innerHTML = "";
        return;
    }

    // Empezamos con el último número
    let derecha = `
        <p id="nodo${separacionNumeros.length - 1}"
           class="bg-success rounded-circle"
           style="${estiloNodo}">
            ${separacionNumeros[separacionNumeros.length - 1]}
        </p>
    `;

    // Vamos creando el árbol
    for (let i = separacionOperador.length - 1; i >= 1; i--) {

        derecha = `
            <div style="text-align:center;">

                <p id="raiz${i}"
                   class="bg-warning rounded-circle"
                   style="${estiloNodo}">
                    ${separacionOperador[i]}
                </p>

                <div style="display:flex; justify-content:center; gap:100px; margin-top: 30px;">

                    <p id="nodo${i}"
                       class="bg-success rounded-circle"
                       style="${estiloNodo}">
                        ${separacionNumeros[i]}
                    </p>

                    ${derecha}

                </div>

            </div>
        `;
    }

    // Raíz
    let contenido = `
        <div style="text-align:center; margin-top:40px;">

            <p id="raiz0"
               class="bg-warning rounded-circle"
               style="${estiloNodo}">
                ${separacionOperador[0]}
            </p>

            <div style="display:flex; justify-content:center; gap:100px; margin-top: 30px;">

                <p id="nodo0"
                   class="bg-success rounded-circle"
                   style="${estiloNodo}">
                    ${separacionNumeros[0]}
                </p>

                ${derecha}

            </div>

        </div>
    `;

    arbol.innerHTML = contenido;

    // Dibujar líneas
    for (let i = 0; i < separacionOperador.length; i++) {

        lineas.push(
            new LeaderLine(
                document.getElementById(`raiz${i}`),
                document.getElementById(`nodo${i}`),
                {
                    startPlug: "disc",
                    endPlug: "disc",
                    color: "#e7669c",
                    size: 3
                }
            )
        );

        if (i + 1 < separacionOperador.length) {

            lineas.push(
                new LeaderLine(
                    document.getElementById(`raiz${i}`),
                    document.getElementById(`raiz${i + 1}`),
                    {
                        startPlug: "disc",
                        endPlug: "disc",
                        color: "#e7669c",
                        size: 3
                    }
                )
            );

        } else {

            lineas.push(
                new LeaderLine(
                    document.getElementById(`raiz${i}`),
                    document.getElementById(`nodo${i + 1}`),
                    {
                        startPlug: "disc",
                        endPlug: "disc",
                        color: "#e7669c",
                        size: 3
                    }
                )
            );
        }
    }
};

expresion.addEventListener("input", (event) => {
    dibujar_arbol(event.currentTarget.value);
});
