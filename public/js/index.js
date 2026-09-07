const expresion = document.getElementById("expresion");
//$('#expresion')
const arbol = document.getElementById("arbol");


/*const validar_campo = (campo) => {
    campo.addEventListener(/[0-9\+-\/*]/,"");
}*/


const dibujar_arbol = (expresionInput) => {
    //let separacion = expresionInput.split('[\+-\/*]');
    let separacionNumeros = expresionInput.split(/[\+-\/*/]/);
    let separacionOperador = expresionInput.replace(/[0-9]/g,"");
    //validacion  de input para recibir solo operadores matematicas
    expresion.value = expresionInput.replace(/[^0-9\+-\/*]$/,"");
    //validacion de estructura de operacion , si no se cumple detiene el proceso
    if(!/[0-9]+[\+\-\/\*]{1}[0-9]+/.test(expresionInput)) return;

    
    let contenido = `
        <div class="row justify-content-around">
            <div class="col-12 text-center">
                <div class="row justify-content-center">
                    <div class="col-1 text-center">
                        <p id="raiz1" class="bg-warning rounded-circle py-4">${separacionOperador}</p>
                    </div>
                </div>
            </div>
            <div class="col-1 text-center">
                <p id="nodo1" class="bg-success rounded-circle py-4">${separacionNumeros[0]}</p>
            </div>
            <div class="col-1 text-center">
                <p id="nodo2" class="bg-success rounded-circle py-4">${separacionNumeros[1]}</p>
            </div>
        </div>
    `;
    arbol.innerHTML = contenido;
    // console.log(separacionNumeros);
    // console.log(separacionOperador);
    
}

expresion.addEventListener("input",(event)=>{
    // Solo permite números y operadores + - / *
    //expresion.value = expresion.value.replace(/[^0-9+\-/*]/g, "");
    dibujar_arbol(event.currentTarget.value);
    //console.log(event.currentTarget.value);
    new LeaderLine(
        document.getElementById('raiz1'),
        document.getElementById('nodo1'),{
            startPlug: 'disc',
            endPlug: 'disc',
            color: '#e7669c',
            size: 5
        }
    );
    new LeaderLine(
        document.getElementById('raiz1'),
        document.getElementById('nodo2'),{
            startPlug: 'disc',
            endPlug: 'disc',
            color: '#e7669c',
            size: 5
        }
    );
    
});