metodoActualDebug = "";
tercerDebug = new RecorridoDebugger;
listaMetodosDebug = [];
listaAux = [];
ambito3D = [];
linea = 0;
listaBreakpoints = [];
intervalo = "";
existenFilas = false;
saltar = false;

function debuggear(tipo) {
    limpiarTablas(false);
    limpiarDebugger();
    iniciar();
    c3d = obtenerC3D();
    editor3D.setValue(c3d);
    crearTablaErrores();
    crearTablaSimbolos();
    iniciarDebugger(tipo);
    imprimir();
}

function iniciarDebugger(tipo) {
    var velocidad = 2000;
    for (i = 0; i < 1000; i++) {
        Heap[i] = -1;
        Stack[i] = -1;
    }
    actualizarApuntador("P", 0);
    actualizarApuntador("H", 0);
    llenarArreglos();
    if (c3d != "") {
        gramatica3D.parse(c3d);
        if (nodo === null) {
            console.log("Error al analizar 3D");
            return;
        }
    }
    tercerDebug.recorrer(nodo);
    metodoActualDebug = obtenerMetodo3D("init");
    if (metodoActualDebug === null) {
        return;
    }
    nodoActualDebug = new nodoDebug(metodoActualDebug);
    listaMetodosDebug.push(nodoActualDebug);

    if (tipo == 0) { //Automatico
        var vel = document.getElementById('velocidad').value;
        if (vel > 0) {
            velocidad = vel;
        }
        intervalo = window.setInterval(debuggearAutomatico, velocidad);
    } else {  //Con break;
        intervalo = window.setInterval(debuggearSentencias, 0);
    }

}

function debuggearAutomatico() {
    if (verificarNodo()) {
        return;
    }
    if (nodoActualDebug.listaNodos.length > 0) {
        nodoHijo = nodoActualDebug.listaNodos[nodoActualDebug.posicion];
        linea = nodoHijo.posicion.first_line;
        moverCursor(linea - 1);
        nodoActualDebug.posicion++;
        tercer = new RecorridoDebugger;
        tercer.ejecutarDebugger(nodoHijo);
    } else {
        moverCursor(nodoActualDebug.linea - 1);
    }
}

function verificarNodo() {
    nodoActualDebug = listaMetodosDebug[listaMetodosDebug.length - 1];
    if (nodoActualDebug.posicion == nodoActualDebug.listaNodos.length) {
        listaMetodosDebug.pop();
        ambito3D.pop();
        moverCursor(linea);
        if (saltar == true) {
            window.clearInterval(intervalo);
            return true;
        }
        if (listaMetodosDebug.length == 0) {
            window.clearInterval(intervalo);
            return true;
        }
        return verificarNodo();
    }
    return false;
}

function moverCursor(linea) {
    //console.log("currsssssooor = " + linea);
    editor3D.setCursor({ line: linea, ch: 2 });
    var lineaAux = buscarLinea(linea);
    if (lineaAux > 0) {
        editor.setCursor({ line: lineaAux, ch: 2 });
        for (let i = 0; i < listaBreakpoints.length; i++) {
            var punto = listaBreakpoints[i];
            if (lineaAux == punto.linea && punto.estado == true) {
                listaBreakpoints[i].estado = false;
                window.clearInterval(intervalo);
                return true;
            }
        }
    }
    return false;
}

function buscarLinea(linea) {
    for (let i = 0; i < listaCodigo.length; i++) {
        var codigo = listaCodigo[i];
        if (codigo.contador === linea) {
            return codigo.linea - 1;
        }
    }
}

function debuggearSentencias() {

    if (verificarNodo()) {
        return;
    }
    if (nodoActualDebug.listaNodos.length > 0) {
        nodoHijo = nodoActualDebug.listaNodos[nodoActualDebug.posicion];
        linea = nodoHijo.posicion.first_line;
        nodoActualDebug.posicion++;
        tercer = new RecorridoDebugger;
        tercer.ejecutarDebugger(nodoHijo);
        if (moverCursor(linea - 1)) {
            return;
        }
    } else {
        if (moverCursor(nodoActualDebug.linea - 1)) {
            return;
        }
    }
}

function parar() {
    window.clearInterval(intervalo);
    //limpiarDebugger();
    editor3D.setCursor({ line: 0, ch: 2 });
    editor.setCursor({ line: 0, ch: 2 });
}

function continuar() {
    intervalo = window.setInterval(debuggearSentencias, 0);
}

function siguiente() {
    debuggearSentencias();
}

function salto() {
    saltar = true;
    intervalo = window.setInterval(debuggearSentencias, 0);
}