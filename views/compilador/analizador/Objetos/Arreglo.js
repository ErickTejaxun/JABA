/////////////////////////////// LOS QUE FUNCIONAN /////////////////////////////////////////////

function declararArregloDinamico(pos, variable, dimension, asignar, p) {
    var bool = asignar instanceof Expresion;
    var tipo = "Stack";
    if (variable.ambitoAux == "global") {
        tipo = "Heap";
    }
    if (variable.dimension.length < 0) {
        listaErrores.push(new Errores("Error Semantico", "El tamanio del arreglo " + variable.nombre + "  es incorrecto ", p.first_line, p.first_column));
        return;
    }
    if (asignar instanceof Expresion) {
        if (asignar.tipo == "cadena" && variable.tipo != "caracter") {
            listaErrores.push(new Errores("Error Semantico", "El tipo del arreglo " + variable.nombre + "  es incorrecto ", p.first_line, p.first_column));
            return;
        }
    }
    var tamDim = variable.dimension.length;
    var etq1 = generarEtq();
    var etq2 = generarEtq();
    if (asignar.tipo === "nada") {
        var t1 = generarTemp();
        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), p.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, pos, "H", "Guardo el arreglo"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", tamDim + 2, "Reservo el tamanio del las dimensiones"), p.first_line))
        var t2 = generarTemp();
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "1", "", "", ""), p.first_line));
        for (let i = 0; i < tamDim; i++) {
            var dim = dimension[i];
            listaCodigo = agregarLista(listaCodigo, dim.codigo);
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, dim.valor, "Valor de la dimension"), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", "1", ""), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "*", dim.valor, "Tam arreglo"), p.first_line));
        }
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, t2, "Tamanio total del arreglo"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", "1", ""), p.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, "H", "Posicion real arreglo"), p.first_line));
        listaCodigo.push(new Codigo(etq2 + ":\n", p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t2, operadorRelacional("=="), "0", "Etiqueta verdadera"), p.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", varNulo, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "-", "1", ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etq2, "=", "", "jmp", "", "Etiqueta falsa"), p.first_line));
        listaCodigo.push(new Codigo(etq1 + ":\n", p.first_line));
    } else {
        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, pos, "H", "Guardo el inicio del arreglo"), p.first_line));
        var t1 = generarTemp();
        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", tamDim + 2, "Reservo el tamanio del las dimensiones"), p.first_line));
        var t2 = generarTemp();
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "1", "", "", ""), p.first_line));
        for (let i = 0; i < tamDim; i++) {
            var dim = dimension[i];
            listaCodigo = agregarLista(listaCodigo, dim.codigo);
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, dim.valor, "Valor de la dimension"), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", "1", ""), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "*", dim.valor, "Tam arreglo"), p.first_line));
        }

        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, t2, "Tamanio total del arreglo"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", "1", ""), p.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, "H", "Posicion real arreglo"), p.first_line));

        var t3 = generarTemp();

        if (variable.tipo == "caracter" && asignar.tipo == "cadena") { //Si es una cadena "sdfasdf" o
            if (asignar.convertirAcadena == true) {
                listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "-", asignar.tamanio, ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t3, operadorRelacional("<"), "0", "Si los valores exceden el tamanio"), p.first_line));

            } else {

                listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "-", asignar.valor.length, ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t3, operadorRelacional("<"), "0", "Si los valores exceden el tamanio"), p.first_line));

                if (asignar.tipo == "cadena" && asignar.rol == "valor") {
                    listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                    for (let j = 0; j < asignar.valor.length; j++) {
                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asignar.valor.charCodeAt(j), ""), p.first_line));
                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
                    }
                } else if (asignar.tipo == "cadena" && asignar.rol == "temp") {
                    listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asignar.valor, ""), p.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
                }
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));

            }
        } else if ((variable.tipo == "caracter") && (!bool)) { //{ 'a', 'b' }

            listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "-", asignar.length, ""), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t3, operadorRelacional("<"), "0", "Si los valores exceden el tamanio"), p.first_line));
            for (let i = 0; i < asignar.length; i++) {
                var expresion = asignar[i];
                if (expresion.tipo == variable.tipo) {
                    listaCodigo = agregarLista(listaCodigo, expresion.codigo);
                    if (expresion.rol == "valor") {
                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", expresion.valor.charCodeAt(0), ""), p.first_line));
                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
                    } else {
                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", expresion.valor, ""), p.first_line));
                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
                    }
                } else {
                    listaErrores.push(new Errores("Error Semantico", "El tipo ingresado del arreglo " + variable.nombre + " es incorrecto ", p.first_line, p.first_column));
                    return;
                }
            }
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", ""), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));

        } else if ((variable.tipo == "entero" || variable.tipo == "decimal" || variable.tipo == "booleano") && (!bool)) { //Si son alguna de estas opciones

            listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "-", asignar.length, ""), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t3, operadorRelacional("<"), "0", "Si los valores exceden el tamanio"), p.first_line));
            for (let i = 0; i < asignar.length; i++) {
                var expresion = asignar[i];
                listaCodigo = agregarLista(listaCodigo, expresion.codigo);
                if (expresion.tipo == variable.tipo) {
                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", expresion.valor, ""), p.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
                } else {
                    listaErrores.push(new Errores("Error Semantico", "El tipo ingresado del arreglo " + variable.nombre + " es incorrecto ", p.first_line, p.first_column));
                    return;
                }
            }

        } else {
            if (bool == true) { //Si es otro arreglo
                listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                var t1 = generarTemp();
                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), p.first_line));
                listaCodigo.push(new Codigo(guardarEnArreglo(tipo, pos, "H", "Guardo el arreglo"), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", tamDim + 2, "Reservo el tamanio del las dimensiones"), p.first_line))
                var t2 = generarTemp();
                listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "1", "", "", ""), p.first_line));
                for (let i = 0; i < tamDim; i++) {
                    var dim = dimension[i];
                    listaCodigo = agregarLista(listaCodigo, dim.codigo);
                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, dim.valor, "Valor de la dimension"), p.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", "1", ""), p.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "*", dim.valor, "Tam arreglo"), p.first_line));
                }
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, t2, "Tamanio total del arreglo"), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", "1", ""), p.first_line));
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, asignar.valor, "Posicion real arreglo"), p.first_line));
                variable.declarada = true;
                return;
            } else {//Si es objeto o estructura 
                listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "-", asignar.length, ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t3, operadorRelacional("<"), "0", "Si los valores exceden el tamanio"), p.first_line));

                for (let i = 0; i < asignar.length; i++) {
                    var expresion = asignar[i];
                    if (expresion.tipo == variable.tipo && expresion.rol == "temp") {
                        listaCodigo = agregarLista(listaCodigo, expresion.codigo);
                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", expresion.valor, ""), p.first_line));
                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El tipo ingresado del arreglo " + variable.nombre + " es incorrecto ", p.first_line, p.first_column));
                        return;
                    }
                }
            }
        }
        listaCodigo.push(new Codigo(etq2 + ":\n", p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t3, operadorRelacional("=="), "0", "Etiqueta verdadera"), p.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", varNulo, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t3, "-", "1", ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etq2, "=", "", "jmp", "", "Etiqueta falsa"), p.first_line));
        listaCodigo.push(new Codigo(etq1 + ":\n", p.first_line));

    }
    variable.declarada = true;
}

function asignarArregloDinamico(variable, pos, tipo, asignar, p) {
    var bool = asignar instanceof Expresion;
    if (variable.dimension.length < 0) {
        listaErrores.push(new Errores("Error Semantico", "El tamanio del arreglo " + variable.nombre + "  es incorrecto ", p.first_line, p.first_column));
        return;
    }
    var tamDim = variable.dimension.length;
    var t1 = generarTemp();
    var t2 = generarTemp();
    if (asignar.tipo === "nada") {
        listaCodigo.push(new Codigo(obtenerArreglo(t1, "Heap", pos, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", tamDim, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t2, varNulo, ""), p.first_line));
    }
    var etq1 = generarEtq();
    var etq2 = generarEtq();
    var t3 = generarTemp()
    var t4 = generarTemp();
    if (variable.tipo == "caracter" && asignar.tipo == "cadena") {

        listaCodigo.push(new Codigo(obtenerArreglo(t1, tipo, pos, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", tamDim, ""), p.first_line));
        listaCodigo.push(new Codigo(obtenerArreglo(t3, "Heap", t2, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t3, "-", asignar.valor.length, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t3, operadorRelacional("<"), "0", "Si los valores exceden el tamanio"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
        //listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t2, "H", ""), p.first_line));
        listaCodigo.push(new Codigo(obtenerArreglo(t4, "Heap", t2, "Posicion del arreglo real"), p.first_line));
        listaCodigo = agregarLista(listaCodigo, asignar.codigo);
        if (asignar.rol == "valor") {
            for (let j = 0; j < asignar.valor.length; j++) {
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t4, asignar.valor.charCodeAt(j), ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t4, "+", "1", ""), p.first_line));
            }
        } else {
            if (asignar.convertirAcadena == true) {
                var t5 = generarTemp();
                var t6 = generarTemp();
                var etq3 = generarEtq();
                var etq4 = generarEtq();
                listaCodigo.push(new Codigo(generarCuadruplo(t5, "=", asignar.valor, "", "", "Posicion"), p.first_line));
                listaCodigo.push(new Codigo(etq3 + ":\n", p.first_line));
                listaCodigo.push(new Codigo(obtenerArreglo(t6, "Heap", t5, "Valor del inicio de convertir"), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(etq4, "=", t6, operadorRelacional("=="), "0", "Si es fin de cadena"), p.first_line));
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t4, t6, ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t4, "+", "1", ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(t5, "=", t5, "+", "1", ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(etq3, "=", "", "jmp", "", "Continuar"), p.first_line));
                listaCodigo.push(new Codigo(etq4 + ":\n", p.first_line));

            } else {
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asignar.valor, ""), p.first_line));
            }
        }
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t4, "0", ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t4, "+", "1", ""), p.first_line));

    } else if ((variable.tipo == "caracter") && (!bool)) { //{ 'a', 'b' }

        listaCodigo.push(new Codigo(obtenerArreglo(t1, tipo, pos, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", tamDim, ""), p.first_line));
        listaCodigo.push(new Codigo(obtenerArreglo(t3, "Heap", t2, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t3, "-", asignar.length, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t3, operadorRelacional("<"), "0", "Si los valores exceden el tamanio"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
        listaCodigo.push(new Codigo(obtenerArreglo(t4, "Heap", t2, "Posicion del arreglo real"), p.first_line));
        for (let i = 0; i < asignar.length; i++) {
            var expresion = asignar[i];
            if (expresion.tipo == variable.tipo) {
                listaCodigo = agregarLista(listaCodigo, expresion.codigo);
                if (expresion.rol == "valor") {
                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t4, expresion.valor.charCodeAt(0), ""), p.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t4, "+", "1", ""), p.first_line));
                } else {
                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t4, expresion.valor, ""), p.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t4, "+", "1", ""), p.first_line));
                }
            } else {
                listaErrores.push(new Errores("Error Semantico", "El tipo ingresado del arreglo " + variable.nombre + " es incorrecto ", p.first_line, p.first_column));
                return;
            }
        }
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));

    } else if ((variable.tipo == "entero" || variable.tipo == "decimal" || variable.tipo == "booleano") && (!(bool))) {

        listaCodigo.push(new Codigo(obtenerArreglo(t1, tipo, pos, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", tamDim, ""), p.first_line));
        listaCodigo.push(new Codigo(obtenerArreglo(t3, "Heap", t2, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t3, "-", asignar.length, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etq1, "=", t3, operadorRelacional("<"), "0", "Si los valores exceden el tamanio"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
        //listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t2, "H", ""), p.first_line));
        listaCodigo.push(new Codigo(obtenerArreglo(t4, "Heap", t2, "Posicion del arreglo real"), p.first_line));
        for (let i = 0; i < asignar.length; i++) {
            var expresion = asignar[i];
            listaCodigo = agregarLista(listaCodigo, expresion.codigo);
            if (expresion.tipo == variable.tipo) {
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t4, expresion.valor, ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t4, "+", "1", ""), p.first_line));
            } else {
                listaErrores.push(new Errores("Error Semantico", "El tipo ingresado del arreglo " + variable.nombre + " es incorrecto ", p.first_line, p.first_column));
                return;
            }
        }
    } else {
        var etqV = generarEtq();
        var t3 = generarTemp();
        var t4 = generarTemp();
        var t5 = generarTemp();
        listaCodigo = agregarLista(listaCodigo, asignar.codigo);
        listaCodigo.push(new Codigo(obtenerArreglo(t1, tipo, pos, ""), p.first_line));

        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", tamDim, "Tamanio del arreglo"), p.first_line));
        listaCodigo.push(new Codigo(obtenerArreglo(t3, "Heap", t2, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", asignar.posicion, "+", asignar.tamanio, "Obtener el tamanio de asignar"), p.first_line)); //Con el .length da error
        listaCodigo.push(new Codigo(obtenerArreglo(t5, "Heap", t4, ""), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(etqV, "=", t5, operadorRelacional("!="), t3, "Etiqueta verdadera"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t2, asignar.valor, "Asigno la referencia del arreglo"), p.first_line));
        listaCodigo.push(new Codigo(etqV + ":\n", p.first_line));
    }
}

function obtenerValorArreglo(nombre, dimension, p) {
    var resultado = new Expresion();
    var variable = obtenerVariable3D(nombre, p);
    if (variable == null) {
        resultado.valor = "error";
        listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + nombre + " local ni globalmente", p.first_line, p.first_column));
        return resultado;
    }
    var listaAux = [];
    var tamDim = dimension.length;
    if (tamDim > variable.tamanio.length) {
        resultado.valor = "error"
        resultado.tipo = "error";
        listaErrores.push(new Errores("Error Semantico", "El tamanio indicado  es incorrecto en arreglo " + nombre, p.first_line, p.first_column));
        return resultado;
    }
    listaAux = agregarLista(listaAux, variable.codigo)
    if (dimension.length > 0) {
        var t2 = generarTemp();
        var t4 = generarTemp();
        listaAux.push(new Codigo(generarCuadruplo(t2, "=", variable.posicion, "+", tamDim, "Posicion inicial mas el tamanio de las dim"), p.first_line));
        listaAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
        var expresionI = dimension[0];
        listaAux = agregarLista(listaAux, expresionI.codigo);
        listaAux.push(new Codigo(generarCuadruplo(t4, "=", expresionI.valor, "-", "0", "(i - Linf)"), p.first_line));
        var pos = 1;
        for (let i = 1; i < dimension.length; i++) {
            var expresionJ = dimension[i];
            listaAux = agregarLista(listaAux, expresionJ.codigo);
            var t5 = generarTemp();
            var t6 = generarTemp();
            var t7 = generarTemp();
            var t8 = generarTemp();
            listaAux.push(new Codigo(generarCuadruplo(t5, "=", variable.posicion, "+", (i), "Posicion de la dimension"), p.first_line));
            listaAux.push(new Codigo(obtenerArreglo(t6, "Heap", t5, "Valor de la dimension n"), p.first_line));
            listaAux.push(new Codigo(generarCuadruplo(t7, "=", t4, "*", t6, "(i - Linf)*n"), p.first_line));
            listaAux.push(new Codigo(generarCuadruplo(t8, "=", expresionJ.valor, "-", "0", "(i - Linf)"), p.first_line));;
            listaAux.push(new Codigo(generarCuadruplo(t4, "=", t7, "+", t8, ""), p.first_line));
        }
        var t9 = generarTemp();
        var t10 = generarTemp();
        listaAux.push(new Codigo(generarCuadruplo(t9, "=", variable.valor, "+", t4, "Pos del verdadero arreglo mas la posicion"), p.first_line));
        listaAux.push(new Codigo(obtenerArreglo(t10, "Heap", t9, "Valor final"), p.first_line));
        resultado.tipo = variable.tipo;
        resultado.rol = "temp";
        resultado.valor = t10;
        resultado.codigo = listaAux;
    }
    resultado.valorArreglo = true;
    return resultado;
}

function asignarValorArreglo(nombre, dimension, asignar, p) {
    var variable = obtenerVariable3D(nombre, p);
    if (variable == null) {
        listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + nombre + " local ni globalmente", p.first_line, p.first_column));
        return;
    }
    var tamDim = dimension.length;
    if (tamDim > variable.tamanio) {
        listaErrores.push(new Errores("Error Semantico", "El tamanio indicado  es incorrecto en arreglo " + nombre, p.first_line, p.first_column));
        return;
    }
    listaCodigo = agregarLista(listaCodigo, variable.codigo)
    if (dimension.length > 0) {
        var t2 = generarTemp();
        var t4 = generarTemp();
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", variable.posicion, "+", tamDim, "Posicion inicial mas el tamanio de las dim"), p.first_line));
        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
        var expresionI = dimension[0];
        listaCodigo = agregarLista(listaCodigo, expresionI.codigo);
        listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", expresionI.valor, "-", "0", "(i - Linf)"), p.first_line));
        var pos = 1;
        for (let i = 1; i < dimension.length; i++) {
            var expresionJ = dimension[i];
            listaCodigo = agregarLista(listaCodigo, expresionJ.codigo);
            var t5 = generarTemp();
            var t6 = generarTemp();
            var t7 = generarTemp();
            var t8 = generarTemp();
            listaCodigo.push(new Codigo(generarCuadruplo(t5, "=", variable.posicion, "+", (i), "Posicion de la dimension"), p.first_line));
            listaCodigo.push(new Codigo(obtenerArreglo(t6, "Heap", t5, "Valor de la dimension n"), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo(t7, "=", t4, "*", t6, "(i - Linf)*n"), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo(t8, "=", expresionJ.valor, "-", "0", "(i - Linf)"), p.first_line));;
            listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t7, "+", t8, ""), p.first_line));
        }
        var t9 = generarTemp();
        var t10 = generarTemp();
        listaCodigo = agregarLista(listaCodigo, asignar.codigo);
        var temp = "";
        if (asignar.tipo == "cadena" && asignar.rol == "valor") {
            temp = generarTemp();
            listaCodigo.push(new Codigo(generarCuadruplo(temp, "=", "H", "", "", "Guardo inicio cadena"), p.first_line));
            for (let j = 0; j < asignar.valor.length; j++) {
                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asignar.valor.charCodeAt(j), ""), p.first_line));
                listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
            }
            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), p.first_line));
            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
            asignar.valor = temp;
        } else if (asignar.tipo == "caracter" && asignar.rol == "valor") {
            temp = generarTemp();
            listaCodigo.push(new Codigo(generarCuadruplo(temp, "=", asignar.valor.charCodeAt(0), "", "", "Cambio a ascii"), p.first_line));
            asignar.valor = temp;
        }
        listaCodigo.push(new Codigo(generarCuadruplo(t9, "=", variable.valor, "+", t4, "Pos del verdadero arreglo mas la posicion"), p.first_line));
        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t9, asignar.valor, "")));
    }
    return;
}

function obtenerValorArregloObjeto(nombre, var3d, dimension, p) {
    var resultado = new Expresion();
    var variable = obtenerVariable3D(nombre, p);
    if (variable == null) {
        resultado.valor = "error";
        listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + nombre + " local ni globalmente", p.first_line, p.first_column));
        return resultado;
    }
    var listaAux = [];
    var tamDim = dimension.length;
    if (tamDim > variable.tamanio) {
        resultado.valor = "error"
        resultado.tipo = "error";
        listaErrores.push(new Errores("Error Semantico", "El tamanio indicado  es incorrecto en arreglo " + nombre, p.first_line, p.first_column));
        return resultado;
    }
    listaAux = agregarLista(listaAux, variable.codigo)
    if (dimension.length > 0) {
        var t1 = generarTemp();
        var t2 = generarTemp();
        var t3 = generarTemp();
        var t4 = generarTemp();

        listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", variable.posicion, "Posicion del atributo: " + nombre), p.first_line));
        listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t1, "Valor del apuntador"), p.first_line));

        listaAux.push(new Codigo(generarCuadruplo(t2, "=", t3, "+", tamDim, "Posicion inicial mas el tamanio de las dim"), p.first_line));
        listaAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
        var expresionI = dimension[0];
        listaAux = agregarLista(listaAux, expresionI.codigo);
        listaAux.push(new Codigo(generarCuadruplo(t4, "=", expresionI.valor, "-", "0", "(i - Linf)"), p.first_line));
        var pos = 1;
        for (let i = 1; i < dimension.length; i++) {
            var expresionJ = dimension[i];
            listaAux = agregarLista(listaAux, expresionJ.codigo);
            var t5 = generarTemp();
            var t6 = generarTemp();
            var t7 = generarTemp();
            var t8 = generarTemp();
            listaAux.push(new Codigo(generarCuadruplo(t5, "=", t3, "+", (i), "Posicion de la dimension"), p.first_line));
            listaAux.push(new Codigo(obtenerArreglo(t6, "Heap", t5, "Valor de la dimension n"), p.first_line));
            listaAux.push(new Codigo(generarCuadruplo(t7, "=", t4, "*", t6, "(i - Linf)*n"), p.first_line));
            listaAux.push(new Codigo(generarCuadruplo(t8, "=", expresionJ.valor, "-", "0", "(i - Linf)"), p.first_line));;
            listaAux.push(new Codigo(generarCuadruplo(t4, "=", t7, "+", t8, ""), p.first_line));
        }
        var t9 = generarTemp();
        var t10 = generarTemp();
        listaAux.push(new Codigo(generarCuadruplo(t9, "=", variable.valor, "+", t4, "Pos del verdadero arreglo mas la posicion"), p.first_line));
        listaAux.push(new Codigo(obtenerArreglo(t10, "Heap", t9, "Valor final"), p.first_line));
        resultado.tipo = variable.tipo;
        resultado.rol = "temp";
        resultado.valor = t10;
        resultado.codigo = listaAux;
        resultado.posicion = t9;
    }
    return resultado;
}