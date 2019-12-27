
function obtenerVariable3D(dato, posicion) {
    var resultado = new Expresion();
    var listaCodigoAux = [];
    var variable = obtenerVariableLocal(dato, posicion, true)
    if (variable != null && boolEste == false) { //Se encontro localmente
        var t1 = generarTemp();
        listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Obtengo la posicion de la variable local " + dato), posicion.first_line));
        var t2 = generarTemp();
        listaCodigoAux.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), posicion.first_line));
        resultado.valor = t2;
        resultado.rol = "temp";
        resultado.codigo = listaCodigoAux;
        resultado.tipo = variable.tipo;
        resultado.ambito = "local";
        resultado.posicion = t1;
        resultado.tamanio = variable.tamanio;
        resultado.rolVariable = variable.rol;
        resultado.ambitoVariable = variable.ambitoDireccion;
    } else {
        var variable = obtenerVariableGlobal(dato, posicion, true)
        if (variable != null) { //Se encontro localmente
            var t1 = generarTemp();
            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", ""), posicion.first_line));
            var t2 = generarTemp();
            listaCodigoAux.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), posicion.first_line));
            var t3 = generarTemp();
            if (variable.heredada == true) {
                listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicionHeredada, "Obtengo la posicion de la variable heredada " + dato), posicion.first_line));
            } else {
                listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Obtengo la posicion de la variable global " + dato), posicion.first_line));
            }
            var t4 = generarTemp();
            listaCodigoAux.push(new Codigo(obtenerArreglo(t4, "Heap", t3, ""), posicion.first_line));
            resultado.valor = t4;
            resultado.rol = "temp";
            resultado.codigo = listaCodigoAux;
            resultado.tipo = variable.tipo;
            resultado.ambito = "global";
            resultado.posicion = t3;
            resultado.tamanio = variable.tamanio;
            resultado.rolVariable = variable.rol;
            resultado.ambitoVariable = variable.ambitoDireccion;
        } else {
            listaErrores.push(new Errores("Error Semantico", "Error no se ha encontrado la variable3d : " + dato + " local ni globalmente", posicion.first_line, posicion.first_column));
            resultado.valor = "error";
            resultado.tipo = "error";
            return resultado;
        }
    }
    resultado.visibilidad = variable.visibilidad;
    resultado.inicializada = variable.inicializada;
    if (variable.rol.toLowerCase() == "arreglo") {
        var t2 = generarTemp();
        var t3 = generarTemp();
        listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", resultado.valor, "+", variable.dimension.length, "Obtener el tamanio"), posicion.first_line));
        listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), posicion.first_line));
        listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t2, "Posicion del arreglo real"), posicion.first_line));
        resultado.codigo = listaCodigoAux;
        resultado.ambito = "global";
        resultado.posicion = resultado.valor;
        resultado.valor = t3;
    }
    if (variable.rol.toLowerCase() == "puntero") {
        var t3 = generarTemp();
        var etqV = generarEtq();
        var etqF = generarEtq();
        listaCodigoAux.push(new Codigo(generarCuadruplo(etqV, "=", resultado.valor, operadorRelacional("!="), "-281216", "Es nulo"), posicion.first_line));
        listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", resultado.valor, "", "", "Es nulo"), posicion.first_line));
        listaCodigoAux.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), posicion.first_line));
        listaCodigoAux.push(new Codigo(etqV + ":\n", posicion.first_line));
        if (variable.ambitoDireccion == "local") {
            listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Stack", resultado.valor, "valor del puntero con referencia local"), posicion.first_line));
            //resultado.posicion = resultado.valor; //Es para la asignacion de punteros
            resultado.posicionRef = resultado.valor;
            resultado.valor = t3;
            resultado.codigo = listaCodigoAux;
        } else {
            listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", resultado.valor, "valor del puntero con referencia global"), posicion.first_line));
            //resultado.posicion = resultado.valor;
            resultado.posicionRef = resultado.valor;
            resultado.valor = t3;
            resultado.codigo = listaCodigoAux;
        }
        listaCodigoAux.push(new Codigo(etqF + ":\n", posicion.first_line));
    }

    return resultado;
}

function asignarVariable(asignar, temp, ambito, posicion, declarada) {
    var tipo = "Stack";
    if (ambito == "global") {
        tipo = "Heap";
    }
    if (asignar.valor === "") {
        asignar.valor = "-2812";
        console.log("Valor vacio");
    }
    //console.log("Asignar variable: rol =" + asignar.rol + ", tipo = " + asignar.tipo);
    if (asignar.rol == 'temp') {
        listaCodigo = agregarLista(listaCodigo, asignar.codigo);
        if (asignar.tipo == "caracter" && asignar.valorArreglo == true) { // Para validar a = caracter [0]
            var t1 = generarTemp();
            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", "Inicio del caracter"), posicion.first_line));
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asignar.valor, "Guardo de nuevo caracter"), posicion.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), posicion.first_line));
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), posicion.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), posicion.first_line));
            listaCodigo.push(new Codigo(guardarEnArreglo(tipo, temp, t1, "Asigno a la variable"), posicion.first_line));
        
        } else {
            listaCodigo.push(new Codigo(guardarEnArreglo(tipo, temp, asignar.valor, "Asigno a la variable"), posicion.first_line));
        }
    } else if (asignar.rol == "relacional") {
        var etqFin = generarEtq();
        listaCodigo = agregarLista(listaCodigo, asignar.codigo);
        listaCodigo.push(new Codigo(asignar.etqV + ":\n", posicion.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, temp, "1", "Asigno a la variable"), posicion.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", ""), posicion.first_line));
        listaCodigo.push(new Codigo(asignar.etqF + ":\n", posicion.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, temp, "0", "Asigno a la variable"), posicion.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", ""), posicion.first_line));
        listaCodigo.push(new Codigo(etqFin + ":\n", posicion.first_line));

    } else if (asignar.tipo == 'cadena' || asignar.tipo == 'caracter') {
        var t1 = generarTemp();
        if (!(declarada == true) || asignar.tipo == 'caracter') {//} && variable.rol == "variable") { //Si es una declaracion
            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", "Inicio de la cadena"), posicion.first_line));
            for (var i = 0; i < asignar.valor.length; i++) {
                var asc = asignar.valor.charCodeAt(i);
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + asignar.valor[i] + "'"), posicion.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), posicion.first_line));
            }
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), posicion.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), posicion.first_line));
            listaCodigo.push(new Codigo(guardarEnArreglo(tipo, temp, t1, "Asigno a la variable"), posicion.first_line));
        } else {
            var t2 = generarTemp();
            listaCodigo.push(new Codigo(obtenerArreglo(t1, tipo, temp, ""), posicion.first_line));
            //listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", temp, "", "", "Inicio de la cadena"), posicion.first_line));
            for (var i = 0; i < asignar.valor.length; i++) {
                var asc = asignar.valor.charCodeAt(i);
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, asc, "'" + asignar.valor[i] + "'"), posicion.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", "1", "Aumento el contador del heap"), posicion.first_line));
            }
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, "0", "Fin de la cadena"), posicion.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), posicion.first_line));
        }
    } else {//valores puntuales
        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, temp, asignar.valor, "Asigno a la variable"), posicion.first_line));
    }
}

function aumento(nombre, posicion, valor) {
    var variable = obtenerVariableLocal(nombre, posicion, true)
    if (variable != null) {
        var t1 = generarTemp();
        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Obtengo la posicion de la variable " + nombre), posicion.first_line));
        var t2 = generarTemp();
        listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), posicion.first_line));
        var t3 = generarTemp();
        if (variable.tipo == "entero" || variable.tipo == "decimal") { //Se encontro localmente
            listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, valor, "1", ""), posicion.first_line));
            listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, t3, "Guarda nuevo valor "), posicion.first_line));
        } else if (variable.tipo == "caracter") {
            listaCodigo.push(new Codigo(obtenerArreglo(t3, "Heap", t2, ""), posicion.first_line));
            var t4 = generarTemp();
            listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t3, valor, "1", ""), posicion.first_line));
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t2, t4, "Guarda nuevo valor "), posicion.first_line));
        } else {
            listaErrores.push(new Errores("Error Semantico", "No se puede realizar el aumento o decremento de : " + variable.valor, posicion.first_line, posicion.first_column));
        }
    } else {
        var variable = obtenerVariableGlobal(nombre, posicion, true)
        if (variable != null) { //Se encontro localmente
            var t1 = generarTemp();
            //listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Obtengo la posicion de la variable " + nombre), posicion.first_line));
            if (variable.heredada == true) {
                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicionHeredada, "Obtengo la posicion de la variable heredada " + nombre), posicion.first_line));
            } else {
                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Obtengo la posicion de la variable global " + nombre), posicion.first_line));
            }
            var t2 = generarTemp();
            listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), posicion.first_line));
            var t3 = generarTemp();
            if (variable.tipo == "entero" || variable.tipo == "decimal" || variable.tipo == "caracter") { //Se encontro localmente
                listaCodigo.push(new Codigo(obtenerArreglo(t3, "Heap", t2, ""), posicion.first_line));
                var t4 = generarTemp();
                listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t3, valor, "1", ""), posicion.first_line));
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t2, t4, "Guarda nuevo valor "), posicion.first_line));
            } else {
                listaErrores.push(new Errores("Error Semantico", "No se puede realizar el aumento o decremento de : " + variable.valor, posicion.first_line, posicion.first_column));
            }
        } else {
            listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable (LG) : " + nombre, posicion.first_line, posicion.first_column));
            //resultado.valor = "error";
        }
    }
}

function compararValores(E1, operador, E2, posicion) {
    var etqV = generarEtq();
    var listaCodigoAux = [];
    var resultado = new Expresion();
    resultado.etqV = etqV;
    if (E1.tipo == 'caracter' && E2.tipo == 'entero' ||
        E1.tipo == 'entero' && E2.tipo == 'caracter' ||
        E1.tipo == 'entero' && E2.tipo == 'booleano' ||
        E1.tipo == 'entero' && E2.tipo == 'entero' ||
        E1.tipo == 'caracter' && E2.tipo == 'decimal' ||
        E1.tipo == 'decimal' && E2.tipo == 'caracter'
    ) {
        var valor1 = E1.valor;
        var valor2 = E2.valor;
        if (E1.tipo == "caracter" && E1.rol == "valor") {
            var asc = E1.valor.charCodeAt(0);
            valor1 = asc;
        }
        if (E2.tipo == "caracter" && E2.rol == "valor") {
            var asc = E2.valor.charCodeAt(0);
            valor2 = asc;
        }
        if (E1.tipo == "caracter" && E1.rol == "temp") {
            var t1 = generarTemp();
            listaCodigoAux.push(new Codigo(obtenerArreglo(t1, "Heap", E1.valor, ""), posicion.first_line));
            valor1 = t1;
        }
        if (E2.tipo == "caracter" && E2.rol == "temp") {
            var t1 = generarTemp();
            listaCodigoAux.push(new Codigo(obtenerArreglo(t1, "Heap", E2.valor, ""), posicion.first_line));
            valor2 = t1;
        }
        listaCodigoAux.push(new Codigo(generarCuadruplo(etqV, "=", valor1, operador, valor2, "Etiqueta verdadera"), posicion.first_line));
        // listaCodigoAux.push(new Codigo (generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), posicion.first_line));
        resultado.codigo = listaCodigoAux;//codigo generado

    } else if (E1.tipo == 'caracter' && E2.tipo == 'cadena' ||
        E1.tipo == 'cadena' && E2.tipo == 'caracter' ||
        E1.tipo == 'cadena' && E2.tipo == 'cadena' ||
        E1.tipo == 'caracter' && E2.tipo == 'caracter') {
        var pos1 = E1.valor;
        var pos2 = E2.valor;
        if (E1.rol === 'valor') {
            var t1 = generarTemp();
            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), posicion.first_line));
            for (var i = 0; i < E1.valor.length; i++) {
                var asc = E1.valor.charCodeAt(i);
                listaCodigoAux.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E1.valor[i] + "' "), posicion.first_line));
                listaCodigoAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), posicion.first_line));
            }
            listaCodigoAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), posicion.first_line));
            listaCodigoAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), posicion.first_line));
            pos1 = t1;
        }
        if (E2.rol === 'valor') {
            var t2 = generarTemp();
            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", ""), posicion.first_line));
            for (var i = 0; i < E2.valor.length; i++) {
                var asc = E2.valor.charCodeAt(i);
                listaCodigoAux.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E2.valor[i] + "' "), posicion.first_line));
                listaCodigoAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), posicion.first_line));
            }
            listaCodigoAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), posicion.first_line));
            listaCodigoAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), posicion.first_line));
            pos2 = t2;
        }
        var tam = obtenerTamanioAmbito();
        listaCodigoAux.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), posicion.first_line));
        var t3 = generarTemp();
        listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), posicion.first_line));
        listaCodigoAux.push(new Codigo(guardarEnArreglo("Stack", t3, pos1, "Envio parametro1 a sumarAscii"), posicion.first_line));
        listaCodigoAux.push(new Codigo("call, , , sumarAscii" + "\n", posicion.first_line));
        var t4 = generarTemp();
        listaCodigoAux.push(new Codigo(obtenerArreglo(t4, "Stack", t3, "Se obtiene el parametro 1"), posicion.first_line));
        listaCodigoAux.push(new Codigo(guardarEnArreglo("Stack", t3, pos2, "Envio parametro2 a sumarAscii"), posicion.first_line));
        listaCodigoAux.push(new Codigo("call, , , sumarAscii" + "\n", posicion.first_line));
        var t5 = generarTemp();
        listaCodigoAux.push(new Codigo(obtenerArreglo(t5, "Stack", t3, "Se obtiene el parametro 2"), posicion.first_line));
        listaCodigoAux.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), posicion.first_line));
        listaCodigoAux.push(new Codigo(generarCuadruplo(etqV, "=", t4, operador, t5, "Etiqueta verdadera"), posicion.first_line));
        // listaCodigoAux.push(new Codigo (generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), posicion.first_line));
        resultado.codigo = listaCodigoAux;
    }
    return resultado;
}

function verificarCaracter(E1, E2, posicion) {
    var resultado = new Expresion();
    resultado.valor = E1.valor;
    resultado.valorTemp = E2.valor;
    if (E1.tipo == "caracter" && E1.rol == "valor") {
        var asc = E1.valor.charCodeAt(0);
        resultado.valor = asc;
    }
    if (E2.tipo == "caracter" && E2.rol == "valor") {
        var asc = E2.valor.charCodeAt(0);
        resultado.valorTemp = asc;
    }
    if (E1.tipo == "caracter" && E1.rol == "temp") {
        var t1 = generarTemp();
        listaCodigoAux.push(new Codigo(obtenerArreglo(t1, "Heap", E1.valor, ""), posicion.first_line));
        resultado.valor = t1;
    }
    if (E2.tipo == "caracter" && E2.rol == "temp") {
        var t1 = generarTemp();
        listaCodigoAux.push(new Codigo(obtenerArreglo(t1, "Heap", E2.valor, ""), posicion.first_line));
        resultado.valorTemp = t1;
    }
    return resultado;
}


