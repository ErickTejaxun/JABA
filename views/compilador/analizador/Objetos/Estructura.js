function Estructura(nombre, ambito) {

    this.nombre = nombre.toLowerCase();
    this.ambito = ambito;
    this.listaVariables = [];
    this.contadorPosicion = 0;
    this.rol = "estructura";
    this.posicion = 0;
    // Para la clase
    this.visibilidad = "";
    this.herencia = "";
    this.listaMetodos = [];
    this.listaEstructuras = [];
}

function obtenerEstructura(nombre, p) {
    for (var i = 0; i < claseActual.listaEstructuras.length; i++) {
        var m = claseActual.listaEstructuras[i];
        if (m.nombre.toLowerCase() === nombre.toLowerCase()) {
            return m;
        }
    }
    for (var i = 0; i < tablaSimbolos.length; i++) {
        var simbolo = tablaSimbolos[i];
        if (simbolo.rol == "estructura") {
            if (simbolo.nombre.toLowerCase() == nombre.toLowerCase()) {
                return simbolo;
            }
        }
    }
    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la estructura: " + nombre, p.first_line, p.first_column));
    return null;
}

function obtenerVariableEstructura(nombre, p, declarada) {
    for (var i = 0; i < metodoActual.listaVariables.length; i++) {
        var v = metodoActual.listaVariables[i];
        if (v.nombre.toLowerCase() === nombre.toLowerCase() && v.declarada == declarada) {
            var ambitoV = v.ambito.split(',');
            //var ambitoA = ambito;
            if (compararAmbito(ambitoV, ambito.length) == true) { //Aunque esta en el mismo metodo asi diferenciar las varibles de algo recursivo
                return v;
            }
        }
    }
    return null;
}

function inicializarVariable(nombre, estruc, p) {
    var variable = obtenerVariableLocal(nombre, p, true);
    if (variable == null) { //Se encontro localmente
        variable = obtenerVariableGlobal(nombre, p, true)
        if (variable == null) {
            variable = obtenerVariableLocal(nombre, p, false);
            if (variable == null) { //Se encontro localmente
                variable = obtenerVariableGlobal(nombre, p, false)
                if (variable == null) {
                    return false;
                }
            }
        }
    }
    switch (variable.tipo.toLowerCase()) {
        case "entero":
        case "booleano":
        case "decimal":
        case "caracter":
            return true;
            break;
    }
    if (variable.inicializada == false) {
        var tam = obtenerTamanioAmbito();
        var t0 = generarTemp();
        var t1 = generarTemp();
        var t2 = generarTemp();
        var t3 = generarTemp();
        //listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", variable.posicion, "Posicion de la estructura"), p.first_line));
        if (variable.heredada == true) {
            listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", variable.posicionHeredada, "Obtengo la posicion de la variable heredada " + nombre), p.first_line));
        } else {
            listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", variable.posicion, "Obtengo la posicion de la variable global " + nombre), p.first_line));
        }
        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", "Posicion inicio de la estructura"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", estruc.listaVariables.length, "Reservar en el heap la estructura nueva"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t1, "+", "0", "Posicion del this simulado"), p.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, t2, "Envio el this"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), p.first_line));
        listaCodigo.push(new Codigo("call, , , " + estruc.nombre + "_init\n", p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), p.first_line));
        if (variable.ambitoAux == "global") {
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t0, t2, ""), p.first_line));
        } else {
            listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t0, t2, ""), p.first_line));
        }
        variable.inicializada = true;
    }
    return true;
}

function verificarInicializada(nombre) {
    var variable = obtenerVariableLocal(nombre, 0, true);
    if (variable == null) { //Se encontro localmente
        variable = obtenerVariableGlobal(nombre, 0, true)
        if (variable == null) {
            variable = obtenerVariableLocal(nombre, 0, false);
            if (variable == null) { //Se encontro localmente
                variable = obtenerVariableGlobal(nombre, 0, false)
                if (variable == null) {
                    return false;
                }
            }
        }
    }
    /*if (variable.rol != "estructura" && variable.rol != "puntero") {
        return true;
    }*/
    if (variable.rol == "parametro") {
        return true;
    }
    switch (variable.tipo.toLowerCase()) {
        case "entero":
        case "booleano":
        case "decimal":
        case "caracter":
            return true;
            break;
    }
    return variable.inicializada;
}