function verificarMemoria(nombre) {
    try {

        var variable = obtenerVariableLocal(nombre, 0, true)
        if (variable == null) {
            variable = obtenerVariableGlobal(nombre, 0, true)
            if (variable = null) {
                return false;
            }
        }
        return variable.memoriaReservada;
    } catch (error) {
        return false;
    }
}

function inicializarPuntero(nombre, estruc, inicio, p) {
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
    if (variable.rol != "estructura" && variable.rol != "puntero") {
        return true;
    }
    if (variable.inicializada == false) {
        var tam = obtenerTamanioAmbito();
        var t0 = generarTemp();
        var t1 = generarTemp();
        var t2 = generarTemp();
        var t3 = generarTemp();
        //listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", variable.posicion, "Posicion de la estructura"), p.first_line));
        if (variable.heredada == true) {
            listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", variable.posicionHeredada, "Posicion de la estructura " + nombre), p.first_line));
        } else {
            listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", variable.posicion, "Posicion de la estructura " + nombre), p.first_line));
        }
        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", inicio, "", "", "Posicion inicio de la estructura"), p.first_line));
        //listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", estruc.listaVariables.length, "Reservar en el heap la estructura nueva"), p.first_line));
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
