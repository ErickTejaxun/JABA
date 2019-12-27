function iniciar() {
    iniciarVariables1R();
    //var texto = document.getElementById('texto').value;//obtiene el texto del area de texto
    var texto = editor.getValue();
    try {
        gramatica.parse(texto);
        let nodo = gramatica.arbol.raiz;
        if (nodo === null) {
            listaErrores.push(new Errores("Error Semantico", "El texto esta vacio", 0, 0));
            return;
        }
        console.log(" * * * * * * * * * INICIAR * * * * * * * * *");
        primer = new PrimerRecorrido();
        primer.recorrer(nodo);
        iniciarVariables2R();
        segundo = new SegundoRecorrido();
        segundo.recorrer(nodo);
        console.log("\n * * * * * * * * ERRORES * * * * * * * * *");
        imprimirErrores();
    } catch (error) {
        listaErrores.push(new Errores("Error Sintactico", error, 0, 0));
        listaCodigo = [];
        console.log(error);
    }
}


function iniciar3D() {
    try {

        if (c3d != "") {
            gramatica3D.parse(c3d);
            if (nodo === null) {
                console.log("Error al analizar 3D");
                return;
            }
            console.log(" * * * * * * * * INICIAR 3D * * * * * * * * *");
            tercer = new Recorrido3D();
            tercer.recorrer(nodo);
            imprimir();
        } else {
            listaErrores.push(new Errores("Error Semantico", "El codigo 3D esta vacio", 0, 0));
        }
    } catch (error) {
        listaErrores.push(new Errores("Error Sintactico", error, 0, 0));
        console.log(error);
    }
}

function imprimir() {
    console.log(listaMetodos3D);
    console.log(listaTemporales);
    console.log("Heap");
    console.log(Heap);
    console.log("Stack");
    console.log(Stack);
    console.log("P = " + p);
    console.log("H = " + h);
    console.log(" * * * * * * * * CONSOLA * * * * * * * * *");
    console.log(consola);
}

function iniciarVariables1R() {
    listaCodigo = [];
    tablaSimbolos = [];
    claseActual = "";
    metodoActual = "";
    ambito = [];
    ambito.push("Global");
    listaErrores = [];
    c3d = "";
    //////////////////////////
    h = 0;
    p = 0;
    Heap = [];
    Stack = [];
    listaMetodos3D = [];
    listaTemporales = [];
    ambito3D = [];
    consola = " -> ";
    reiniciarC3D();
    sobrescrito = false;
    contadorSent = 1;
}

function iniciarVariables2R() {
    ambito = [];
    ambito.push("Global");
    sobrescrito = false;
    contadorSent = 1;
    contadorMetodos = 1;
    etqVSi = "";
    etqFSi = "";
    listaArreglo = [];
    valorSwitch = "";
    listaRomper = [];
    listaContinuar = [];
    varRetorno = "";
}
