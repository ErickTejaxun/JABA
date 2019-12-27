
class RecorridoDebugger {

    recorrer(raiz) {
        var result = null;

        if (raiz !== null) {
            switch (raiz.nombre) {
                case "ENTRADA":
                    switch (raiz.hijos.length) {
                        case 2:
                            tercerDebug.recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "INICIO":
                    for (let i = 0; i < raiz.hijos.length; i++) {
                        var nodo = raiz.hijos[i];
                        tercerDebug.recorrer(raiz.hijos[i]);
                    }
                    break;
                case "METODO":
                    switch (raiz.hijos.length) {
                        case 1://vacio
                            listaMetodos3D.push(new MetodoDebug(raiz.hijos[0].token, [], raiz.hijos[0].posicion.first_line));
                            listaAux.push(new MetodoDebug(raiz.hijos[0].token, [], raiz.hijos[0].posicion.first_line));
                            break;
                        case 2:
                            listaMetodos3D.push(new MetodoDebug(raiz.hijos[0].token, raiz.hijos[1].hijos, raiz.hijos[0].posicion.first_line));
                            listaAux.push(new MetodoDebug(raiz.hijos[0].token, raiz.hijos[1].hijos, raiz.hijos[0].posicion.first_line));
                            break;
                    }
                    break;
                ///////////////////////////////////////////////////////////////////////////////////
                default:
                    break;
            }
        }
        return result;
    }

    ejecutarDebugger(nodo) {
        var result = null;

        if (nodo !== null) {
            switch (nodo.nombre) {
                case "ASIGNACION":
                    var valor1 = "";
                    var valor2 = "";
                    var valor3 = "";
                    var asignar = "";
                    switch (nodo.hijos.length) {
                        case 3:                                 //'=' ',' VALOR ',' ',' VALOR
                            valor1 = tercerDebug.obtenerValor(nodo.hijos[1]);
                            valor3 = tercerDebug.obtenerValor(nodo.hijos[2]);
                            asignarValor3D(valor3, valor1.valor);
                            break;
                        case 4:
                            if (nodo.hijos[0].nombre === "OPARIT") { //OPARIT ',' VALOR ',' VALOR ',' VALOR
                                var operador = nodo.hijos[0].hijos[0].token;
                                valor1 = tercerDebug.obtenerValor(nodo.hijos[1]);
                                valor2 = tercerDebug.obtenerValor(nodo.hijos[2]);
                                valor3 = tercerDebug.obtenerValor(nodo.hijos[3]);
                                asignar = tercerDebug.realizarOperacion(valor1.valor, operador, valor2.valor);
                                asignarValor3D(valor3, asignar);
                            } else if (nodo.hijos[0].token === "<=") { //<= ',' VALOR ',' VALOR ',' VALOR
                                valor1 = tercerDebug.obtenerValor(nodo.hijos[1]);
                                valor2 = tercerDebug.obtenerValor(nodo.hijos[2]);
                                valor3 = tercerDebug.obtenerValor(nodo.hijos[3]);
                                if (valor3.valor === "heap") {
                                    actualizarArreglos("Heap", valor1.valor, valor2.valor);
                                    Heap[valor1.valor] = valor2.valor;
                                } else {
                                    actualizarArreglos("Stack", valor1.valor, valor2.valor);
                                    Stack[valor1.valor] = valor2.valor;
                                }
                            } else if (nodo.hijos[0].token === "=>") { //=> ',' VALOR ',' VALOR ',' VALOR
                                valor1 = tercerDebug.obtenerValor(nodo.hijos[1]);
                                valor2 = tercerDebug.obtenerValor(nodo.hijos[2]);
                                valor3 = tercerDebug.obtenerValor(nodo.hijos[3]);
                                if (valor3.valor === "heap") {
                                    asignarValor3D(valor2, Heap[valor1.valor]);
                                } else {
                                    asignarValor3D(valor2, Stack[valor1.valor]);
                                }
                            }
                            break;
                    }
                    break;
                case "SALTO":
                    switch (nodo.hijos.length) {
                        case 2:
                            for (let i = 0; i < nodoActualDebug.listaNodos.length; i++) {
                                var nodoActual = nodoActualDebug.listaNodos[i];
                                if (nodoActual.nombre == "ETIQUETA") {
                                    for (let j = 0; j < nodoActual.hijos.length; j++) {
                                        var etq = nodoActual.hijos[j];
                                        if (etq.token == nodo.hijos[1].token) {
                                            nodoActualDebug.posicion = i + 1;
                                            return;
                                        }
                                    }
                                }
                            }
                            console.log("La etiqueta " + nodo.hijos[1].token + " no se ha encontrado");
                            break;
                    }
                    break;
                case "CONDICIONAL":
                    var valor1 = "";
                    var valor2 = "";
                    var valor3 = "";
                    var asignar = "";
                    switch (nodo.hijos.length) {
                        case 4:                                 //OPREL ',' VALOR ',' VALOR ',' etiqueta
                            var operador = nodo.hijos[0].hijos[0].token;
                            valor1 = tercerDebug.obtenerValor(nodo.hijos[1]);
                            valor2 = tercerDebug.obtenerValor(nodo.hijos[2]);
                            valor3 = nodo.hijos[3].token;
                            asignar = tercerDebug.realizarOperacion(valor1.valor, operador, valor2.valor);
                            //console.log(asignar);
                            if (asignar === true) {
                                for (let i = 0; i < nodoActualDebug.listaNodos.length; i++) {
                                    var nodoActual = nodoActualDebug.listaNodos[i];
                                    if (nodoActual.nombre == "ETIQUETA") {
                                        for (let j = 0; j < nodoActual.hijos.length; j++) {
                                            var etq = nodoActual.hijos[j];
                                            if (etq.token == valor3) {
                                                nodoActualDebug.posicion = i + 1;
                                                return;
                                            }
                                        }
                                    }
                                }
                                console.log("La etiqueta " + valor3 + " no se ha encontrado");
                            }
                            break;
                    }
                    break;
                case "IMPRIMIR":
                    switch (nodo.hijos.length) { //print '(' IMPR ',' VALOR ')' ';'
                        case 3:
                            var tipo = nodo.hijos[1].hijos[0].nombre;
                            var asignar = tercerDebug.obtenerValor(nodo.hijos[2]);
                            if (asignar.valor == "-281216") {
                                var text = document.getElementById("consola").value + "nulo \n - >";
                                document.getElementById("consola").value = text;
                                break;
                            }
                            if (tipo === "printEntero") {
                                var text = document.getElementById("consola").value + asignar.valor;
                                document.getElementById("consola").value = text;
                            } else if (tipo === "printFloat") {
                                var text = document.getElementById("consola").value + asignar.valor;
                                document.getElementById("consola").value = text;
                            } else {
                                if (asignar.rol === "temporal") {
                                    var posH = asignar.valor;
                                    var bool = true;
                                    var cont = 0;
                                    while (bool) {
                                        var caracter = Heap[posH];
                                        if (caracter === 0 || cont === 1000) {
                                            bool = false;
                                        }
                                        else if (caracter == "-281216") {
                                            consola += "nulo \n"
                                            break;
                                        }
                                        var c = String.fromCharCode(caracter);
                                        var text = document.getElementById("consola").value + c;
                                        document.getElementById("consola").value = text;
                                        if (c == "\n") {
                                            var text = document.getElementById("consola").value + " -> ";
                                            document.getElementById("consola").value = text;
                                        }
                                        posH++;
                                        cont++;
                                    }
                                } else {
                                    var c = String.fromCharCode(asignar.valor);
                                    var text = document.getElementById("consola").value + c;
                                    document.getElementById("consola").value = text;
                                    if (c == "\n") {
                                        var text = document.getElementById("consola").value + " -> ";
                                        document.getElementById("consola").value = text;
                                    }
                                }
                            }
                            break;
                    }
                    break;
                    break;
                case "ETIQUETA":
                    break;
                case "LLAMADA":
                    //console.log("llamada");
                    switch (nodo.hijos.length) {
                        case 2:
                            var nombre = nodo.hijos[1].token;
                            metodoActualDebug = obtenerMetodo3D(nombre);
                            if (metodoActualDebug != null) {
                                ambito3D.push(nombre);
                                nodoActualDebug = new nodoDebug(metodoActualDebug);
                                listaMetodosDebug.push(nodoActualDebug);
                            }
                            break;
                    }
                    break;
                case "LECTURA":
                    leyendoTeclado = true;
                    limite = 0;
                    ambito3D.push("$_in_value");
                    leerTeclado3DDebugger();
                    ambito3D.pop();
                    leyendoTeclado = false;
                    break;

            }
        }
        return result;
    }

    obtenerValor(raiz) {
        var exp = new Expresion();
        if (raiz != null) {
            exp.rol = raiz.hijos[0].nombre;

            switch (raiz.hijos.length) {
                case 1:
                    if (raiz.hijos[0].nombre === "temporal") {
                        exp.nombre = raiz.hijos[0].token;
                        exp.valor = obtenerTemporal(raiz.hijos[0].token, raiz.hijos[0].posicion);
                    } else if (raiz.hijos[0].nombre === "numero") {
                        exp.valor = parseInt(raiz.hijos[0].token);
                    } else if (raiz.hijos[0].nombre === "decimal") {
                        exp.valor = parseFloat(raiz.hijos[0].token);
                    } else if (raiz.hijos[0].nombre === "p") {
                        exp.valor = p;
                    } else if (raiz.hijos[0].nombre === "h") {
                        exp.valor = h;
                    } else if (raiz.hijos[0].nombre === "heap") {
                        exp.valor = "heap";
                    } else if (raiz.hijos[0].nombre === "stack") {
                        exp.valor = "stack";
                    } else if (raiz.hijos[0].nombre === "etiqueta") {
                        exp.valor = raiz.hijos[0].token;
                    } else if (raiz.hijos[0].nombre === "fin") {
                        exp.valor = 0;
                    }
                    break;
                case 2: //numero negativo
                    var valorPos = tercerDebug.obtenerValor(raiz.hijos[1]);
                    exp.valor = valorPos.valor * (-1);
                    break;

                default:
                    break;
            }
        }
        return exp;
    }

    realizarOperacion(valor1, operador, valor2) {
        var result;
        switch (operador) {
            case '+':
                result = valor1 + valor2;
                break;
            case '-':
                result = valor1 - valor2;
                break;
            case '*':
                result = valor1 * valor2;
                break;
            case '/':
                result = valor1 / valor2;
                break;
            case 'jg':
                result = valor1 > valor2;
                break;
            case 'jge':
                result = valor1 >= valor2;
                break;
            case 'jl':
                result = valor1 < valor2;
                break;
            case 'jle':
                result = valor1 <= valor2;
                break;
            case 'je':
                result = valor1 == valor2;
                break;
            case 'jne':
                result = valor1 != valor2;
                break;
            default:
                break;
        }
        return result;
    }

}

function asignarValor3D(exp, valor) {
    if (exp.rol.toLowerCase() === "h") {
        h = valor;
        actualizarApuntador("H", valor);
    } else if (exp.rol.toLowerCase() === "p") {
        p = valor;
        actualizarApuntador("P", valor);
    } else {
        for (let i = 0; i < listaTemporales.length; i++) {
            var t = listaTemporales[i];
            if (t.nombre === exp.nombre && t.ambito.toLowerCase() === crearAmbito3D()) {
                listaTemporales[i].valor = valor;
                actualizarTemporal(i, valor);
                return;
            }
        }
        listaTemporales.push(new Temporal(exp.nombre, valor, crearAmbito3D()));
        agregarTemporal(exp.nombre, valor, crearAmbito3D());
    }
}

function obtenerMetodo3D(nombre) {
    for (let i = 0; i < listaMetodos3D.length; i++) {
        var metodo = listaMetodos3D[i];
        if (metodo.nombre.toLowerCase() === nombre.toLowerCase()) {
            return metodo;
        }
    }
    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado el metodo : " + nombre + " para debuggear", 0, 0));
    return null;
}
