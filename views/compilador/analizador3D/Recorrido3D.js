
class Recorrido3D {

    recorrer(raiz) {
        var result = null;

        if (raiz !== null) {
            //console.log(raiz.nombre + ":" + raiz.hijos.length);
            switch (raiz.nombre) {
                case "ENTRADA":
                    switch (raiz.hijos.length) {
                        case 2:
                            tercer.recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "INICIO":
                    for (let i = 0; i < raiz.hijos.length; i++) {
                        var nodo = raiz.hijos[i];
                        tercer.recorrer(raiz.hijos[i]);
                    }
                    ejecutarMetodo("Init");
                    break;
                case "METODO":
                    switch (raiz.hijos.length) {
                        case 1://vacio
                            listaMetodos3D.push(new Metodo3D(raiz.hijos[0].token, null));
                            break;
                        case 2:
                            listaMetodos3D.push(new Metodo3D(raiz.hijos[0].token, raiz.hijos[1]));
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

    ejecutar(raiz) {
        //console.log(" **************** EJECUTAR ******************")
        var result = null;

        if (raiz !== null) {
            for (let i = 0; i < raiz.hijos.length; i++) {
                var nodo = raiz.hijos[i];
                //"fin"console.log("Nombre : " + nodo.nombre + ":" + nodo.hijos.length);
                switch (nodo.nombre) {
                    case "ASIGNACION":
                        var valor1 = "";
                        var valor2 = "";
                        var valor3 = "";
                        var asignar = "";
                        switch (nodo.hijos.length) {
                            case 3:                                 //'=' ',' VALOR ',' ',' VALOR
                                valor1 = tercer.obtenerValor(nodo.hijos[1]);
                                valor3 = tercer.obtenerValor(nodo.hijos[2]);
                                asignarValor(valor3, valor1.valor);
                                break;
                            case 4:
                                if (nodo.hijos[0].nombre === "OPARIT") { //OPARIT ',' VALOR ',' VALOR ',' VALOR
                                    var operador = nodo.hijos[0].hijos[0].token;
                                    valor1 = tercer.obtenerValor(nodo.hijos[1]);
                                    valor2 = tercer.obtenerValor(nodo.hijos[2]);
                                    valor3 = tercer.obtenerValor(nodo.hijos[3]);
                                    asignar = tercer.realizarOperacion(valor1.valor, operador, valor2.valor);
                                    asignarValor(valor3, asignar);
                                    if (valor3.nombre == "t2") {
                                        console.log("");
                                    }
                                } else if (nodo.hijos[0].token === "<=") { //<= ',' VALOR ',' VALOR ',' VALOR
                                    valor1 = tercer.obtenerValor(nodo.hijos[1]);
                                    valor2 = tercer.obtenerValor(nodo.hijos[2]);
                                    valor3 = tercer.obtenerValor(nodo.hijos[3]);
                                    if (valor3.valor === "heap") {
                                        Heap[valor1.valor] = valor2.valor;
                                    } else {
                                        Stack[valor1.valor] = valor2.valor;
                                    }
                                } else if (nodo.hijos[0].token === "=>") { //=> ',' VALOR ',' VALOR ',' VALOR
                                    valor1 = tercer.obtenerValor(nodo.hijos[1]);
                                    valor2 = tercer.obtenerValor(nodo.hijos[2]);
                                    valor3 = tercer.obtenerValor(nodo.hijos[3]);
                                    if (valor3.valor === "heap") {
                                        asignarValor(valor2, Heap[valor1.valor]);
                                    } else {
                                        asignarValor(valor2, Stack[valor1.valor]);
                                    }
                                }
                                break;
                        }
                        break;
                    case "SALTO":
                        switch (nodo.hijos.length) {
                            case 2:
                                var etq = buscarEtiqueta(nodo.hijos[1].token, raiz);
                                if (etq > 0) {
                                    i = etq;
                                } else {
                                    console.log("La etiqueta " + nodo.hijos[1].token + " no se ha encontrado");
                                }
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
                                valor1 = tercer.obtenerValor(nodo.hijos[1]);
                                valor2 = tercer.obtenerValor(nodo.hijos[2]);
                                valor3 = nodo.hijos[3].token;

                                asignar = tercer.realizarOperacion(valor1.valor, operador, valor2.valor);
                                //console.log(asignar);
                                if (asignar === true) {
                                    var etq = buscarEtiqueta(valor3, raiz);
                                    if (etq > 0) {
                                        i = etq;
                                    } else {
                                        console.log("La etiqueta " + valor3 + "no se ha encontrado");
                                    }
                                }
                                break;
                        }
                        break;
                    case "IMPRIMIR":
                        switch (nodo.hijos.length) { //print '(' IMPR ',' VALOR ')' ';'
                            case 3:
                                var tipo = nodo.hijos[1].hijos[0].nombre;
                                var asignar = tercer.obtenerValor(nodo.hijos[2]);
                                if (asignar.valor == "-281216") {
                                    consola += "nulo \n"
                                    break;
                                }
                                if (tipo === "printEntero") {
                                    consola += asignar.valor;
                                } else if (tipo === "printFloat") {
                                    consola += asignar.valor;
                                } else {
                                    if (asignar.rol === "temporal") {
                                        var posH = asignar.valor;
                                        var bool = true;
                                        var cont = 0;
                                        while (bool) {
                                            var caracter = Heap[posH];
                                            if (caracter === 0 || cont === 1000) {
                                                bool = false;
                                            } else if (caracter == "-281216") {
                                                consola += "nulo \n"
                                                break;
                                            }
                                            var c = String.fromCharCode(caracter);
                                            consola += c;
                                            if (c == "\n") {
                                                consola += " -> "
                                            }
                                            posH++;
                                            cont++;
                                        }

                                    } else {
                                        var c = String.fromCharCode(asignar.valor);
                                        consola += c;
                                        if (c == "\n") {
                                            consola += " -> "
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
                                ejecutarMetodo(nodo.hijos[1].token);
                                break;
                        }
                        break;
                    case "LECTURA":
                        switch (nodo.hijos.length) {
                            case 2:
                                leyendoTeclado = true;
                                limite = 0;
                                ambito3D.push("$_in_value");
                                leerTeclado3D();
                                ambito3D.pop();
                                leyendoTeclado = false;
                                break;
                        }
                        break;

                }
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
                    var valorPos = tercer.obtenerValor(raiz.hijos[1]);
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

