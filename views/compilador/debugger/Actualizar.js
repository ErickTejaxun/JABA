
function actualizarApuntador(tipo, valor) {
    if (tipo == "P") {
        var p = document.getElementById("p");
        p.innerHTML = "P = " + valor;
    } else if (tipo == "H") {
        var h = document.getElementById("h");
        h.innerHTML = "H = " + valor;
    }
}

function llenarArreglos() {
    existenFilas = true;
    for (var i = 0; i < 1000; i++) {
        var tabla = document.getElementById("cuerpoTablaHeap");
        var row = tabla.insertRow(tabla.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = h + i;
        cell2.innerHTML = "-1";
    }
    for (var i = 0; i < 1000; i++) {
        var tabla = document.getElementById("cuerpoStack");
        var row = tabla.insertRow(tabla.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = p + i;
        cell2.innerHTML = "-1";
    }
}

function actualizarArreglos(tipo, posicion, valor) {
    if (tipo == "Stack") {
        var tabla = document.getElementById("cuerpoStack");
        tabla.rows[posicion].cells[1].innerHTML = valor;
    } else {
        var tabla = document.getElementById("cuerpoTablaHeap");
        tabla.rows[posicion].cells[1].innerHTML = valor;
    }
}

function limpiarDebugger() {
    if (existenFilas) {
        var tabla = document.getElementById("cuerpoStack");
        for (var i = 0; i < 1000; i++) {
            tabla.rows[i].cells[1].innerHTML = -1;
        }
        tabla = document.getElementById("cuerpoTablaHeap");
        for (var i = 0; i < 1000; i++) {
            tabla.rows[i].cells[1].innerHTML = -1;
        }
    }
    actualizarApuntador("P", 0);
    actualizarApuntador("H", 0);
    listaMetodos3D = [];
    listaTemporales = [];
    listaMetodosDebug = [];
    ambito3D = [];
    listaAux = [];
    saltar = false;
    for (let i = 0; i < listaBreakpoints.length; i++) {
        listaBreakpoints[i].estado = true;
    }
}

function actualizarBreakpoint(linea) {

    for (let i = 0; i < listaBreakpoints.length; i++) {
        var punto = listaBreakpoints[i];
        if (punto.linea == linea) {
            listaBreakpoints.splice(i, 1);
            return;
        }
    }
    listaBreakpoints.push(new Punto(linea, true));
}

function actualizarTemporal(posicion, valor) {
    var tabla = document.getElementById("cuerpoTablaTemporal");
    tabla.rows[posicion].cells[1].innerHTML = valor;
}

function agregarTemporal(nombre, valor, ambito) {
    var tabla = document.getElementById("cuerpoTablaTemporal");
    var row = tabla.insertRow(tabla.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = nombre;
    cell2.innerHTML = valor;
    cell3.innerHTML = ambito;
}

function Punto(linea, estado) {
    this.linea = linea;
    this.estado = estado;
}
