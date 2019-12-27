esLista = false;

function esEstructuraDeDatos(tipo) {
    tipo = tipo.toLowerCase();
    if (tipo == "lista" || tipo == "pila" || tipo == "cola") {
        return true;
    }
    return false;
}

function asignarEstructuraDeDatos(variable, pos, asignar, ambito, p) {
    variable.rol = variable.tipo.toLowerCase();
    if (asignar.tipoEstructura != "") { //Inicializa la lista
        if (variable.tipo.toLowerCase() != asignar.tipoEstructura.toLowerCase()) {
            listaErrores.push(new Errores("Error Semantico", "El tipoEstructura no coincide " + variable.tipo + " - " + asignar.tipoEstructura, p.first_line, p.first_column));
        }
        variable.inicializada = true;
        variable.tipo = asignar.tipo.toLowerCase();
    }
    listaCodigo = agregarLista(listaCodigo, asignar.codigo);
    listaCodigo.push(new Codigo(guardarEnArreglo(ambito, pos, "H", "Almacenar referencia heap"), p.first_line));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", varNulo, "Almacenar referencia lista"), p.first_line));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
    variable.declarada = true;
}

function verificarTipoLista(tipoVariable, tipoAsignar, p) {
    try {
        if (tipoVariable.toLowerCase() == tipoAsignar.toLowerCase()) {
            return true;
        } else if (tipoVariable.toLowerCase() == "caracter" && tipoAsignar.toLowerCase() == "cadena") {
            return true;
        } else {
            listaErrores.push(new Errores("Error Semantico", "El tipo a ingresar en la lista es incorrecto: " + tipoVariable + " - " + tipoAsignar, p.first_line, p.first_column));
            return false
        }
    } catch (error) {
        console.log(error)
    }

}

function insertarLista() {
    listaCodigo.push(new Codigo("begin, , , insertar\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Parametro posicion lista"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Stack", "t3", "Parametro valor"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t2", "Valor de la posicion"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "t5", operadorRelacional("!="), varNulo, "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t2", "H", "Guardo el inicio del valor"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "t4", "Guardo el primer valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", varNulo, "Ref al siguiente valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L2" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "t5", "+", "1", "Posicion de sig ref"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t7", "Heap", "t6", "Valor de la sig ref"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "t7", operadorRelacional("!="), varNulo, "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t6", "H", "Guardo el inicio del valor"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "t4", "Guardo el primer valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", varNulo, "Ref al siguiente valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L4", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L3" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "t7", "", "", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo("L4" + ":\n", -1));
    listaCodigo.push(new Codigo("end, , , insertar\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}

function obtenerLista() {
    listaCodigo.push(new Codigo("begin, , , obtener\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Parametro posicion lista"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Stack", "t3", "Parametro indice"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t2", "Valor de la posicion"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "0", "", "", "Contador"), -1));
    listaCodigo.push(new Codigo("L0" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t5", operadorRelacional("=="), varNulo, "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "t6", operadorRelacional("=="), "t4", "Indice es igual al contador"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "t5", "+", "1", "posicion siguiente ref"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t7", "Valor de la siguiente ref"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "t6", "+", "1", "aumento contador"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L2" + ":\n", -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t8", "Heap", "t5", "Valor buscado"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t9", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t9", "t8", "Envio valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t9", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t9", varNulo, "Envio valor"), -1));
    listaCodigo.push(new Codigo("L3" + ":\n", -1));
    listaCodigo.push(new Codigo("end, , , obtener\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}

function buscarLista() {
    listaCodigo.push(new Codigo("begin, , , buscar\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Parametro posicion lista"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Stack", "t3", "Parametro valor"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t2", "Valor de la posicion"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "0", "", "", ""), -1));
    listaCodigo.push(new Codigo("L0" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t5", operadorRelacional("=="), varNulo, "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t7", "Heap", "t5", "Valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "t7", operadorRelacional("=="), "t4", "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t8", "=", "t5", "+", "1", "Posicion de la sig referencia"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t8", "Valor de la referencia"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "t6", "+", "1", "Aumento contador"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t9", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t9", "0", "Envio valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L2" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t9", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t9", "t6", "Envio el indice"), -1));
    listaCodigo.push(new Codigo("L3" + ":\n", -1));
    listaCodigo.push(new Codigo("end, , , buscar\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}

function buscarCadena() {
    listaCodigo.push(new Codigo("begin, , , buscarCadena\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Parametro posicion lista"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Stack", "t3", "Parametro valor"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t2", "Valor de la posicion"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "0", "", "", ""), -1));
    listaCodigo.push(new Codigo("L0" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t5", operadorRelacional("=="), varNulo, "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t7", "Heap", "t5", "Valor"), -1));
    //
    //listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "t7", operadorRelacional("=="), "t4", "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t8", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t8", "t4", "Envio parametro1 a sumarAscii"), -1));
    listaCodigo.push(new Codigo("call, , , sumarAscii" + "\n", -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t9", "Stack", "t8", "Se obtiene el parametro 1"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t8", "t7", "Envio parametro2 a sumarAscii"), -1));
    listaCodigo.push(new Codigo("call, , , sumarAscii" + "\n", -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t10", "Stack", "t8", "Se obtiene el parametro 2"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "t9", operadorRelacional("=="), "t10", "Etiqueta verdadera"), -1));
    //listaCodigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), -1``));
    //
    listaCodigo.push(new Codigo(generarCuadruplo("t11", "=", "t5", "+", "1", "Posicion de la sig referencia"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t11", "Valor de la referencia"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "t6", "+", "1", "Aumento contador"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t12", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t12", "0", "Envio valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L2" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t12", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t12", "t6", "Envio el indice"), -1));
    listaCodigo.push(new Codigo("L3" + ":\n", -1));
    listaCodigo.push(new Codigo("end, , , buscarCadena\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}

function verificarLlamada(var3d, raiz) {
    var resultado = new Expresion();
    resultado.tipo = "error";
    var listaCodigoAux = [];
    try {
        var rol = var3d.rolVariable.toLowerCase();
        if (rol == "lista" || rol == "pila" || rol == "cola") {
            if (var3d.inicializada == false) {
                listaErrores.push(new Errores("Error Semantico", "No se ha inicializado la estrucutura de datos ", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                return resultado;
            }
            var id = raiz.hijos[0].token;
            esLista = true;
            switch (raiz.hijos.length) {
                case 3:
                case "desapilar":
                    listaCodigo = agregarLista(listaCodigo, var3d.codigo);
                    var t0 = generarTemp();
                    var t1 = generarTemp();
                    var t2 = generarTemp();
                    var tam = obtenerTamanioAmbito();
                    listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", tam, "Ambito simulado"), raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t0, "+", "0", ""), raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, var3d.valor, "Envio posicion de lista a insertar"), raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, ""), raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo("call, , , desapilar\n", raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, ""), raiz.hijos[0].posicion.first_line));
                    return;
                case "desencolar":
                    listaCodigo = agregarLista(listaCodigo, var3d.codigo);
                    var t0 = generarTemp();
                    var t1 = generarTemp();
                    var t2 = generarTemp();
                    var tam = obtenerTamanioAmbito();
                    listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", tam, "Ambito simulado"), raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t0, "+", "0", ""), raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, var3d.valor, "Envio posicion de lista a insertar"), raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, ""), raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo("call, , , desapilar\n", raiz.hijos[0].posicion.first_line));
                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, ""), raiz.hijos[0].posicion.first_line));
                    return;
                case 4: // id ( VALOR )
                    switch (id) {
                        case "insertar":
                            var valor = segundo.recorrerMetodos(raiz.hijos[2]);
                            if (verificarTipoLista(var3d.tipo, valor.tipo, raiz.hijos[0].posicion)) {
                                listaCodigo = agregarLista(listaCodigo, var3d.codigo);
                                listaCodigo = agregarLista(listaCodigo, valor.codigo);
                                var t0 = generarTemp();
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                var tam = obtenerTamanioAmbito();
                                if (valor.rol == "temp") {
                                    listaCodigo = agregarLista(listaCodigo, valor.codigo);
                                } else { //Si es valo
                                    if (valor.tipo == "cadena" || valor.tipo == "caracter") {
                                        var t3 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[0].posicion.first_line));
                                        for (var i = 0; i < valor.valor.length; i++) {
                                            var asc = valor.valor.charCodeAt(i);
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + valor.valor[i] + "'"), raiz.hijos[0].posicion.first_line));
                                            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                        }
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), raiz.hijos[0].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                        valor.valor = t3;
                                    }
                                }
                                listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", tam, "Ambito simulado"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t0, "+", "0", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, var3d.valor, "Envio posicion de lista a insertar"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t0, "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t2, valor.valor, "Envio valor a insertar"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo("call, , , insertar\n", raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, ""), raiz.hijos[0].posicion.first_line));
                            }
                            return;
                        case "obtener":
                            var valor = segundo.recorrerMetodos(raiz.hijos[2]);
                            if (valor.tipo.toLowerCase() == "entero") {
                                listaCodigoAux = agregarLista(listaCodigoAux, var3d.codigo);
                                var resultado = new Expresion();
                                var t0 = generarTemp();
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                var t3 = generarTemp();
                                var t4 = generarTemp();
                                var tam = obtenerTamanioAmbito();
                                listaCodigoAux = agregarLista(listaCodigoAux, valor.codigo);
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", tam, "Ambito simulado"), raiz.hijos[0].posicion.first_line));
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", t0, "+", "0", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigoAux.push(new Codigo(guardarEnArreglo("Stack", t1, var3d.valor, "Envio posicion de lista a insertar"), raiz.hijos[0].posicion.first_line));
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t0, "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigoAux.push(new Codigo(guardarEnArreglo("Stack", t2, valor.valor, "Envio el indice"), raiz.hijos[0].posicion.first_line));
                                listaCodigoAux.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, ""), raiz.hijos[0].posicion.first_line));
                                listaCodigoAux.push(new Codigo("call, , , obtener\n", raiz.hijos[0].posicion.first_line));
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "0", ""), -1));
                                listaCodigoAux.push(new Codigo(obtenerArreglo(t4, "Stack", t3, "Valor obtenido"), -1));
                                listaCodigoAux.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, ""), raiz.hijos[0].posicion.first_line));
                                resultado.valor = t4;
                                resultado.tipo = var3d.tipo;
                                resultado.rol = "temp";
                                resultado.tamanio = var3d.tamanio;
                                resultado.rolVariable = var3d.rol;
                                resultado.ambitoVariable = var3d.ambitoDireccion;
                                resultado.codigo = listaCodigoAux;
                                esLista = false;
                                return resultado;
                            }
                            break;
                        case "buscar":
                            var valor = segundo.recorrerMetodos(raiz.hijos[2]);
                            listaCodigoAux = agregarLista(listaCodigoAux, var3d.codigo);
                            listaCodigoAux = agregarLista(listaCodigoAux, valor.codigo);
                            var temp = "";
                            if ((valor.tipo == "cadena" || valor.tipo == "caracter") && valor.rol == "valor") {
                                var temp = generarTemp();
                                listaCodigoAux.push(new Codigo(generarCuadruplo(temp, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[0].posicion.first_line));
                                for (var i = 0; i < valor.valor.length; i++) {
                                    var asc = valor.valor.charCodeAt(i);
                                    listaCodigoAux.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + valor.valor[i] + "'"), raiz.hijos[0].posicion.first_line));
                                    listaCodigoAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                }
                                listaCodigoAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), raiz.hijos[0].posicion.first_line));
                                listaCodigoAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                valor.valor = temp;
                            }
                            var resultado = new Expresion();
                            var t0 = generarTemp();
                            var t1 = generarTemp();
                            var t2 = generarTemp();
                            var t3 = generarTemp();
                            var t4 = generarTemp();
                            var tam = obtenerTamanioAmbito();
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", tam, "Ambito simulado"), raiz.hijos[0].posicion.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", t0, "+", "0", ""), raiz.hijos[0].posicion.first_line));
                            listaCodigoAux.push(new Codigo(guardarEnArreglo("Stack", t1, var3d.valor, "Envio posicion de lista a insertar"), raiz.hijos[0].posicion.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t0, "+", "1", ""), raiz.hijos[0].posicion.first_line));
                            listaCodigoAux.push(new Codigo(guardarEnArreglo("Stack", t2, valor.valor, "Envio el valor a buscar"), raiz.hijos[0].posicion.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, ""), raiz.hijos[0].posicion.first_line));
                            if (valor.tipo == "cadena" || valor.tipo == "caracter") {
                                listaCodigoAux.push(new Codigo("call, , , buscarCadena\n", raiz.hijos[0].posicion.first_line));
                            } else {
                                listaCodigoAux.push(new Codigo("call, , , buscar\n", raiz.hijos[0].posicion.first_line));
                            }
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "0", ""), -1));
                            listaCodigoAux.push(new Codigo(obtenerArreglo(t4, "Stack", t3, "Indice obtenido"), -1));
                            listaCodigoAux.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, ""), raiz.hijos[0].posicion.first_line));
                            resultado.valor = t4;
                            resultado.tipo = "entero";
                            resultado.rol = "temp";
                            resultado.tamanio = var3d.tamanio;
                            resultado.rolVariable = var3d.rol;
                            resultado.ambitoVariable = var3d.ambitoDireccion;
                            resultado.codigo = listaCodigoAux;
                            esLista = false;
                            return resultado;
                        case "apilar":
                            var valor = segundo.recorrerMetodos(raiz.hijos[2]);
                            if (verificarTipoLista(var3d.tipo, valor.tipo, raiz.hijos[0].posicion)) {
                                listaCodigo = agregarLista(listaCodigo, var3d.codigo);
                                listaCodigo = agregarLista(listaCodigo, valor.codigo);
                                var t0 = generarTemp();
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                var tam = obtenerTamanioAmbito();
                                if (valor.rol == "temp") {
                                    listaCodigo = agregarLista(listaCodigo, valor.codigo);
                                } else { //Si es valo
                                    if (valor.tipo == "cadena" || valor.tipo == "caracter") {
                                        var t3 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[0].posicion.first_line));
                                        for (var i = 0; i < valor.valor.length; i++) {
                                            var asc = valor.valor.charCodeAt(i);
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + valor.valor[i] + "'"), raiz.hijos[0].posicion.first_line));
                                            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                        }
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), raiz.hijos[0].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                        valor.valor = t3;
                                    }
                                }
                                listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", tam, "Ambito simulado"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t0, "+", "0", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, var3d.valor, "Envio posicion de lista a insertar"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t0, "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t2, valor.valor, "Envio valor a insertar"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo("call, , , apilar\n", raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, ""), raiz.hijos[0].posicion.first_line));
                            }
                            return;
                        case "encolar":
                            var valor = segundo.recorrerMetodos(raiz.hijos[2]);
                            if (verificarTipoLista(var3d.tipo, valor.tipo, raiz.hijos[0].posicion)) {
                                listaCodigo = agregarLista(listaCodigo, var3d.codigo);
                                listaCodigo = agregarLista(listaCodigo, valor.codigo);
                                var t0 = generarTemp();
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                var tam = obtenerTamanioAmbito();
                                if (valor.rol == "temp") {
                                    listaCodigo = agregarLista(listaCodigo, valor.codigo);
                                } else { //Si es valo
                                    if (valor.tipo == "cadena" || valor.tipo == "caracter") {
                                        var t3 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[0].posicion.first_line));
                                        for (var i = 0; i < valor.valor.length; i++) {
                                            var asc = valor.valor.charCodeAt(i);
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + valor.valor[i] + "'"), raiz.hijos[0].posicion.first_line));
                                            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                        }
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), raiz.hijos[0].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                        valor.valor = t3;
                                    }
                                }
                                listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "P", "+", tam, "Ambito simulado"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t0, "+", "0", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, var3d.valor, "Envio posicion de lista a insertar"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t0, "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t2, valor.valor, "Envio valor a insertar"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo("call, , , encolar\n", raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, ""), raiz.hijos[0].posicion.first_line));
                            }
                            return;
                        default:
                            break;
                    }
                    break;
            }
        }
    } catch (error) {
        listaErrores.push(new Errores("Error Semantico", error, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
        return resultado;
    }
    listaErrores.push(new Errores("Error Semantico", "No existe la clase o EDD " + var3d.nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
    return resultado;


}

