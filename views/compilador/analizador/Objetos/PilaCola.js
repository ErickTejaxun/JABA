
function apilar() {
    listaCodigo.push(new Codigo("begin, , , apilar\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Parametro posicion lista"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t3", "=", "P", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Stack", "t3", "Parametro valor"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t5", "Heap", "t2", "Valor inicio lista"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t5", operadorRelacional("!="), varNulo, "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t2", "H", "Guardo el inicio del valor"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "t4", "Guardo el primer valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", varNulo, "Ref al siguiente valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "t5", "+", "1", "Posicion de sig ref"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t7", "Heap", "t6", "Valor de la sig ref"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L3", "=", "t7", operadorRelacional("!="), varNulo, "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo("L2" + ":\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t8", "=", "H", "", "", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t9", "Heap", "t5", "Obtengo el ultimo valor"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "t9", "Cambio de posicion al ultimo valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", varNulo, "Guardo la sig ref"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t5", "t4", "Guardo el valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t6", "=", "t5", "+", "1", "Posicion de sig ref"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t6", "t8", "Guardo la ref"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L0", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L3" + ":\n", -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t10", "Heap", "t5", "Valor anterior"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t5", "t4", "Guardo nuevo valor"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "t7", "", "", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t4", "=", "t10", "", "", ""), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "", "jmp", "", "Etiqueta falsa"), -1));
    listaCodigo.push(new Codigo("L0" + ":\n", -1));
    listaCodigo.push(new Codigo("end, , , apilar\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}

function encolar() {
    listaCodigo.push(new Codigo("begin, , , encolar\n", -1));
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
    listaCodigo.push(new Codigo("end, , , encolar\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}


function desapilar() {
    listaCodigo.push(new Codigo("begin, , , desapilar\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Posicion lista"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t3", "Heap", "t2", "referencia inicio lista"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Heap", "t3", "Valor inicio lista"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t4", operadorRelacional("=="), varNulo, "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "t3", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t6", "Heap", "t5", "Valor de la referencia"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t2", "t6", "Guardo nuevo referencia"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo("end, , , desapilar\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}

function desencolar() {
    listaCodigo.push(new Codigo("begin, , , desencolar\n", -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t1", "=", "P", "+", "0", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t2", "Stack", "t1", "Posicion lista"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t3", "Heap", "t2", "referencia inicio lista"), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t4", "Heap", "t3", "Valor inicio lista"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("L1", "=", "t4", operadorRelacional("=="), varNulo, "Etiqueta verdadera"), -1));
    listaCodigo.push(new Codigo(generarCuadruplo("t5", "=", "t3", "+", "1", ""), -1));
    listaCodigo.push(new Codigo(obtenerArreglo("t6", "Heap", "t5", "Valor de la referencia"), -1));
    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "t2", "t6", "Guardo nuevo referencia"), -1));
    listaCodigo.push(new Codigo("L1" + ":\n", -1));
    listaCodigo.push(new Codigo("end, , , desencolar\n", -1));
    listaCodigo.push(new Codigo("\n", -1));
}
