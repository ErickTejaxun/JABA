

function crearInit(linea) {
    var clase = obtenerClasePrincipal();
    if (clase != null) {
        claseActual = clase;
        var t1 = generarTemp();
        var tam = obtenerTamanioAmbito();
        listaCodigo.push(new Codigo("begin, , , Init\n", linea));
        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "0", "", "", "Inicializo el puntero del heap"), linea));
        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "0", "", "", "Inicializo el puntero del stack"), linea));
        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", "Guardo la posicion inicial del Heap"), linea));
        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", clase.listaVariables.length, "Reservo el espacio de la clase con el metodo principal"), linea));
        if (clase.herencia != "") {
            claseHereda = obtenerClase(clase.herencia);
            //listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", claseHereda.listaVariables.length, "Reservo el espacio de la clase "+clase.herencia), linea));
        }
        listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "0", t1, ""), linea));
        listaCodigo.push(new Codigo("call, , , " + clase.nombre + "_init //Llamo al constructor de la clase\n", linea));
        cambiarAmbitoMetodo("principal");
        listaCodigo.push(new Codigo("call, , , principal\n", linea));
        listaCodigo.push(new Codigo("end, , , Init\n", linea));
        listaCodigo.push(new Codigo("\n", linea));
        //leerTeclado();
        /*insertarLista();
        obtenerLista();
        buscarLista();
        buscarCadena();*/
        sumarAscii();
        concatenar();
        convertirEnteroACadena();
        convertirCadenaAEntero();
        convertirDecimalAEntero();
        //consultarTamanioCadena();
        modular();
        /*apilar();
        encolar();
        desapilar();
        desencolar();*/
        return true;
    }
    return false;
}

function generarCuadruplo(a, igual, b, signo, c, comentario) {
    var coment = "// " + comentario + " " + a + igual + b + signo + c;
    if (signo === "") {
        codigo = igual + ", " + b + ", " + c + ", " + a + " " + coment + "\n";
    } else if (signo === "je" || signo == "jne" || signo == "jg" || signo == "jge" || signo == "jl" || signo == "jle") {
        coment = "// " + comentario + " " + "if(" + b + operadorRelacionalNormal(signo) + c + ") goto " + a;
        codigo = signo + ", " + b + ", " + c + ", " + a + " " + coment + "\n";
    } else if (signo === "jmp") {
        coment = "// " + comentario + " goto " + a;
        codigo = signo + ", " + b + ", " + c + ", " + a + " " + coment + "\n";
    } else {
        codigo = signo + ", " + b + ", " + c + ", " + a + " " + coment + "\n";
    }
    return codigo;
}

function guardarEnArreglo(tipo, posicion, valor, comentario) {
    var coment = "// " + comentario + " " + tipo + "[" + posicion + "]" + "=" + valor;
    codigo = "<=, " + posicion + ", " + valor + ", " + tipo + " " + coment + "\n";
    return codigo;
}

function obtenerArreglo(valor, tipo, posicion, comentario) {
    var coment = "// " + comentario + " " + valor + "=" + tipo + "[" + posicion + "]";
    codigo = "=>, " + posicion + ", " + valor + ", " + tipo + " " + coment + "\n";
    return codigo;
}

function operadorRelacionalNormal(operador) {
    if (operador == "je") {
        return "==";
    } else if (operador == "jne") {
        return "!=";
    } else if (operador == "jg") {
        return ">";
    } else if (operador == "jge") {
        return ">=";
    } else if (operador == "jl") {
        return "<";
    } else if (operador == "jle") {
        return "<=";
    }
    return "";
}

function concatenar() {
    listaCodigo.push(new Codigo("begin, , , concatenar\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el parametro 1 posicion variable"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "P", "+", "2", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Stack", "t3", "Se obtiene el parametro 2 posicion variable 2"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "P", "+", "3", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t6", "Stack", "t5", "Se obtiene el parametro 3 tamanio variable"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "0", "", "", "Inicializo el contador 1"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t8", "=", "t4", "", "", "Inicializo el contador 2"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t11", "=", "t6", "+", "1", "Inicializo el contador 2"), -1));
    listaCodigo.push(new Codigo("L0" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t12", "=", "t2", "+", "t7", "Inicializo el contador 1"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t9", "Heap", "t12", "Obtener caracter"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t9", operadorRelacional("=="), "0", "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "t7", "+", "1", "Aumento contador 1"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "t7", operadorRelacional("=="), "t6", "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t10", "Heap", "t8", "Obtener caracter 2"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "t10", operadorRelacional("=="), "0", "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t12", "t10", "Guardar caracter"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t8", "=", "t8", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "t7", "+", "1", "Aumento contador"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t12", "=", "t2", "+", "t7", "Inicializo el contador 1"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L2" + ":\n", -1));
    listaCodigo.push(new Codigo("L3" + ":\n", -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t12", "0", "Guardar caracter"), -1));
    listaCodigo.push(new Codigo("end, , , concatenar\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}

function concatenarBackup() {
    listaCodigo.push(new Codigo("begin, , , concatenar\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el parametro"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "0", "", "", "Inicializo el contador"), -1));
    listaCodigo.push(new Codigo("L0" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "t2", "+", "t3", "Posicion de la cadena"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t4", "Obtener caracter"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t5", operadorRelacional("=="), "0", "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L2" + ":\n", -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "t5", "Guardar"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "t3", "+", "1", "Aumento contador"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo("end, , , concatenar\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}

function convertirEnteroACadena() {
    var tam = obtenerTamanioAmbito();
    listaCodigo.push(new Codigo("begin, , , convertirEnteroACadena\n", -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -2));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el parametro numero"), -2));
    //listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "t2", "/", "10", ""), -2));
    //listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "10", "*", "t3", ""), -2));
    //listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "t2", "-", "t4", "Modulo"), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t1", "t2", " Envio parametro 1"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t11", "=", "P", "+", "2", ""), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t11", "10", " Envio parametro 2"), -2));
    listaCodigo.push(new Codigo("call, , , modular\n", -2));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Stack", "t1", "Se obtiene el parametro modulo"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "t2", "-", "t5", ""), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "t4", "/", "10", ""), -2));
    //
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t3", operadorRelacional(">="), "10", "Etiqueta verdadera"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "", "jmp", "", "Etiqueta falsa"), -2));
    listaCodigo.push(new Codigo("L1" + ":\n", -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "P", "+", "1", ""), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t6", "t3", ""), -2));
    listaCodigo.push(new Codigo("call, , , convertirEnteroACadena\n", -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "t5", "+", "48", ""), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "t7", ""), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -2));
    listaCodigo.push(new Codigo(generarCuadruplo('L4', "=", "", "jmp", "", "Fin"), -2));
    listaCodigo.push(new Codigo("L2" + ":\n", -2));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "t3", operadorRelacional("=="), "0", "Etiqueta verdadera"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "t3", "+", "48", ""), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "t7", ""), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -2));
    listaCodigo.push(new Codigo("L3" + ":\n", -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t8", "=", "t5", "+", "48", ""), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "t8", ""), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -2));
    listaCodigo.push(new Codigo("L4" + ":\n", -2));
    listaCodigo.push(new Codigo("end, , , convertirEnteroACadena\n", -2));
    listaCodigo.push(new Codigo("\n", -2));
}

function sumarAscii() {
    listaCodigo.push(new Codigo("begin, , , sumarAscii\n", -3));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -3));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el parametro"), -3));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "0", "", "", "Inicializo el contador"), -3));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "0", "", "", "Inicializo la variable respuesta"), -3));
    listaCodigo.push(new Codigo("L0" + ":\n", -3));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "t2", "+", "t3", "Posicion de la cadena"), -3));
    listaCodigo.push(new Codigo(obtenerArreglo("t6", "Heap", "t5", "Obtener caracter"), -3));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t6", operadorRelacional("=="), "0", "Etiqueta verdadera"), -3));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "", "jmp", "", "Etiqueta falsa"), -3));
    listaCodigo.push(new Codigo("L2" + ":\n", -3));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "t4", "+", "t6", ""), -3));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "t3", "+", "1", "Aumento contador"), -3));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -3));
    listaCodigo.push(new Codigo("L1" + ":\n", -3));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "P", "+", "1", ""), -3));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t7", "t4", "Envio parametro"), -3));
    listaCodigo.push(new Codigo("end, , , sumarAscii\n", -3));
    listaCodigo.push(new Codigo("\n", -3));
}

function convertirCadenaAEntero() {
    listaCodigo.push(new Codigo("begin, , , convertirCadenaAEntero\n", -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -4));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el parametro inicio cadena"), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "0", "", "", "Inicializo el contador"), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "0", "", "", "Numero"), -4));
    listaCodigo.push(new Codigo("L0" + ":\n", -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "t2", "+", "t3", "Posicion de la cadena"), -4));
    listaCodigo.push(new Codigo(obtenerArreglo("t6", "Heap", "t5", "Obtener numero"), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t6", operadorRelacional("=="), "0", "Si es fin de cadena"), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "", "jmp", "", "Etiqueta falsa"), -4));
    listaCodigo.push(new Codigo("L2" + ":\n", -4));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "t6", operadorRelacional(">="), "48", "Si el numero es mayor o igual a 0 "), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("L4", "=", "", "jmp", "", "Etiqueta falsa"), -4));
    listaCodigo.push(new Codigo("L3" + ":\n", -4));
    listaCodigo.push(new Codigo(generarCuadruplo("L5", "=", "t6", operadorRelacional("<="), "57", "Si el numero es mejor a 9"), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("L4", "=", "", "jmp", "", "Etiqueta falsa"), -4));
    listaCodigo.push(new Codigo("L5" + ":\n", -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "t4", "*", "10", ""), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "t6", "-", "48", ""), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "t4", "+", "t7", ""), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "t3", "+", "1", "Aumento contador"), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -4));
    listaCodigo.push(new Codigo("L4" + ":\n", -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t9", "=", "P", "+", "1", ""), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t9", "t2", " Envio parametro"), -2));
    listaCodigo.push(new Codigo("call, , , sumarAscii\n", -2));
    listaCodigo.push(new Codigo(obtenerArreglo("t10", "Stack", "t9", "Se obtiene el parametro a sumarAscii"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t8", "=", "P", "+", "1", ""), -4));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t8", "t10", "Envio parametro"), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("L7", "=", "", "jmp", "", "Etiqueta falsa"), -4));
    listaCodigo.push(new Codigo("L1" + ":\n", -4));
    listaCodigo.push(new Codigo(generarCuadruplo("t8", "=", "P", "+", "1", ""), -4));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t8", "t4", "Envio parametro"), -4));
    listaCodigo.push(new Codigo("L7" + ":\n", -4));
    listaCodigo.push(new Codigo("end, , , convertirCadenaAEntero\n", -4));
    listaCodigo.push(new Codigo("\n", -4));
}

function convertirDecimalAEntero() {
    listaCodigo.push(new Codigo("begin, , , convertirDecimalAEntero\n", -5));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -5));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el parametro"), -5));
    //listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "t2", "/", "1", "Obtengo entero"), -5));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t1", "t2", " Envio parametro 1"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "P", "+", "2", ""), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t3", "1", " Envio parametro 2"), -2));
    listaCodigo.push(new Codigo("call, , , modular\n", -2));
    listaCodigo.push(new Codigo(obtenerArreglo("t6", "Stack", "t1", "Se obtiene el parametro modulo"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "t2", "-", "t6", ""), -5));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t1", "t7", "Envio parametro"), -5));
    listaCodigo.push(new Codigo("L7" + ":\n", -5));
    listaCodigo.push(new Codigo("end, , , convertirDecimalAEntero\n", -5));
    listaCodigo.push(new Codigo("\n", -5));
}

function consultarTamanioCadena() {
    listaCodigo.push(new Codigo("begin, , , consultarTamanioCadena\n", -6));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -6));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el parametro"), -6));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "0", "", "", "Inicializo el contador"), -6));
    listaCodigo.push(new Codigo("L0" + ":\n", -6));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "t3", "+", "t2", "Posicion de la cadena"), -6));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t4", "Obtener caracter"), -6));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t5", operadorRelacional("=="), "0", "Etiqueta verdadera"), -6));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "t3", "+", "1", "Aumento contado"), -6));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Regresar"), -6));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -6));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t1", "t3", "Envio parametro"), -6));
    listaCodigo.push(new Codigo("L1" + ":\n", -6));
    listaCodigo.push(new Codigo("end, , , consultarTamanioCadena\n", -6));
    listaCodigo.push(new Codigo("\n", -6));
}

function modular() {
    listaCodigo.push(new Codigo("begin, , , modular\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el parametro"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "P", "+", "2", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Stack", "t3", "Se obtiene el parametro"), -1));
    listaCodigo.push(new Codigo("L0" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "t2", "-", "t4", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t4", operadorRelacional(">"), "t5", "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t2", "=", "t5", "", "", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "t5", operadorRelacional("<"), "0", "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t1", "t5", "Envio parametro"), -4));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L2" + ":\n", -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t1", "t2", "Envio parametro"), -4));
    listaCodigo.push(new Codigo("L3" + ":\n", -1));
    listaCodigo.push(new Codigo("end, , , modular\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}

function convertirDecimalACadena() {
    var tam = obtenerTamanioAmbito();
    listaCodigo.push(new Codigo("begin, , , convertirDecimalACadena\n", -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -2));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el parametro decimal"), -2));
    listaCodigo.push(new Codigo("L0" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "t2", operadorRelacional("<"), "1", "Etiqueta verdadera"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "0", "", "", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "t2", "", "", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -2));
    listaCodigo.push(new Codigo("L2" + ":\n", -2));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "t4", operadorRelacional("<"), "10", "Etiqueta verdadera"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "t4", "/", "10", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "t3", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L2", "=", "", "jmp", "", "Etiqueta falsa"), -2));
    listaCodigo.push(new Codigo("L3" + ":\n", -2));
    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, ""), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "P", "+", "1", ""), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t5", "t4", " Envio parametro 1"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "P", "+", "2", ""), -2));
    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", "t6", "1", " Envio parametro 2"), -2));
    listaCodigo.push(new Codigo("call, , , modular\n", -2));
    listaCodigo.push(new Codigo("L3" + ":\n", -2));
    listaCodigo.push(new Codigo(obtenerArreglo("t7", "Stack", "t5", "Se obtiene el parametro modulo"), -2));
    listaCodigo.push(new Codigo(generarCuadruplo("t8", "=", "t4", "-", "t7", ""), -2));
    listaCodigo.push(new Codigo("end, , , convertirDecimalACadena\n", -2));
    listaCodigo.push(new Codigo("\n", -2));
}

function leerTeclado() {
    listaCodigo.push(new Codigo("begin, , , $_in_value\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Se obtiene el retorno"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "P", "+", "2", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Stack", "t3", "Se obtiene la referencia donde guardara el valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "P", "+", "3", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t6", "Stack", "t5", "Se obtiene la referencia a la cadena que muestra"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t7", "=", "P", "+", "4", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t8", "Stack", "t7", "Se obtiene 0 si es local, 1 global"), -1));
    listaCodigo.push(new Codigo("end, , , $_in_value\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}