
listaCodigoAux = [];

function resolverOperacion(raiz) {
    var result = null;

    if (raiz !== null) {
        // console.log(raiz.nombre + ":" + raiz.hijos.length);
        switch (raiz.hijos.length) {
            case 1:
                //console.log("Nombre = " + raiz.hijos[0].nombre + ", Token = " + raiz.hijos[0].token)
                var nombre = raiz.hijos[0].nombre;
                if (nombre == "FUNCIONES" || nombre == "LLAMADA" || nombre == "CONCATENAR"
                    || nombre == "MEMORIA" || nombre == "FUNCION_EDD" || nombre == "E") {
                    result = segundo.recorrerMetodos(raiz.hijos[0]);
                    try {
                        // listaCodigoAux = agregarLista(listaCodigoAux, result.codigo);
                    } catch (error) {
                        listaErrores.push(new Errores("Error Semantico", error, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        resultado = new Expresion();
                        resultado.tipo == "error";
                        resultado.valor == "error";
                        return resultado;
                    }
                    return result;
                }
                var dato = raiz.hijos[0].token.replace("'", "");
                var resultado = new Expresion();
                resultado.tipo = raiz.hijos[0].nombre;
                resultado.valor = dato;
                resultado.rol = "valor";
                switch (raiz.hijos[0].nombre) {
                    case "cadenaDoble":
                        resultado.tipo = "cadena";
                        resultado.valor = dato.replace("\"", "").replace("\"", "");
                        break;
                    case "cadenaSimple":
                        resultado.tipo = "caracter";
                        resultado.valor = dato.replace("'", "").replace("'", "");
                        break;
                    case "entero":
                        resultado.tipo = "entero";
                        break;
                    case "decimal":
                        resultado.tipo = "decimal";
                        break;
                    case "verdadero":
                        resultado.tipo = "booleano";
                        resultado.valor = 1;
                        break;
                    case "falso":
                        resultado.tipo = "booleano";
                        resultado.valor = 0;
                        break;
                    case "nada":
                        break;
                    case "nulo":
                        break;
                    case "id":
                        var variable = obtenerVariable3D(dato, raiz.hijos[0].posicion);
                        variable.valorTemp = dato;
                        //listaCodigoAux = agregarLista(listaCodigoAux, variable.codigo);r
                        resultado.codigo = variable.codigo;
                        resultado = variable;
                        break;
                    default:
                        break;
                }
                return resultado;
            case 2:
                var resultado = new Expresion();
                var temp = generarTemp();
                if (raiz.hijos[1].nombre == "INSTANCIA") {  //id INSTANCIA
                    var id = raiz.hijos[0].token;
                    result = obtenerValorInstancia(id, raiz.hijos[1]);
                    return result;
                } else if (raiz.hijos[1].nombre == "DIMENSION") {  //id DIMENSION
                    regresarTemp();
                    var id = raiz.hijos[0].token;
                    var dim = segundo.recorrerMetodos(raiz.hijos[1]);
                    result = obtenerValorArreglo(id, dim, raiz.hijos[0].posicion);
                    return result;
                } else if (raiz.hijos[0].token == "-") {  //- E

                    var E1 = resolverOperacion(raiz.hijos[1]);

                    resultado.codigo = agregarLista(resultado.codigo, E1.codigo);
                    if (E1.tipo == "entero" || E1.tipo == "decimal") {
                        resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "*", "-1", ""), raiz.hijos[1].posicion.first_line));
                    } else if (E1.tipo == "caracter") {
                        var asc = E1.valor.charCodeAt(0);
                        resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", asc, "*", "-1", ""), raiz.hijos[1].posicion.first_line));
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "No se pueden negar la operacion : " + E1.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    }
                    resultado.tipo = E1.tipo;
                } else if (raiz.hijos[1].token == "++") {  // E ++
                    var E1 = resolverOperacion(raiz.hijos[0]);

                    resultado.codigo = agregarLista(resultado.codigo, E1.codigo);
                    if (E1.rol == "temp" && raiz.hijos[0].hijos[0].nombre == "id") {
                        if (E1.ambito == "local" && (E1.tipo == "entero" || E1.tipo == "decimal")) {
                            var t1 = generarTemp();
                            resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", E1.valor, "+", "1", "Aumento"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(guardarEnArreglo("Stack", E1.posicion, t1, "Guardo la variable"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "", "", "Asignacion"), raiz.hijos[1].posicion.first_line));
                        } else { //global
                            if (E1.tipo == "caracter" || E1.tipo == "entero" || E1.tipo == "decimal") {
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", E1.valor, "+", "1", "Aumento"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", E1.posicion, t1, "Guardo la variable"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "", "", "Asignacion"), raiz.hijos[1].posicion.first_line));
                            } else {
                                listaErrores.push(new Errores("Error Semantico", "No se pueden negar la operacion : " + E1.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            }
                        }
                    } else { //valor
                        if (E1.tipo == "entero" || E1.tipo == "decimal" || E1.tipo == "caracter") {
                            var t1 = generarTemp();
                            resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", E1.valor, "+", "1", "Aumento"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", t1, "Guardo la variable"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", t1, "", "", "Asignacion"), raiz.hijos[1].posicion.first_line));
                        }
                    }
                    resultado.tipo = E1.tipo;
                } else if (raiz.hijos[1].token == "--") {  // E --
                    var E1 = resolverOperacion(raiz.hijos[0]);
                    resultado.codigo = agregarLista(resultado.codigo, E1.codigo);
                    if (E1.rol == "temp" && raiz.hijos[0].hijos[0].nombre == "id") {
                        if (E1.ambito == "local" && (E1.tipo == "entero" || E1.tipo == "decimal")) {
                            var t1 = generarTemp();
                            resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", E1.valor, "-", "1", "Decremento"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(guardarEnArreglo("Stack", E1.posicion, t1, "Guardo la variable"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "", "", "Asignacion"), raiz.hijos[1].posicion.first_line));
                        } else { //global
                            if (E1.tipo == "caracter" || E1.tipo == "entero" || E1.tipo == "decimal") {
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", E1.valor, "-", "1", "Decremento"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", E1.posicion, t1, "Guardo la variable"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "", "", "Asignacion"), raiz.hijos[1].posicion.first_line));
                            } else {
                                listaErrores.push(new Errores("Error Semantico", "No se pueden negar la operacion : " + E1.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            }
                        }
                    } else { //valor
                        if (E1.tipo == "entero" || E1.tipo == "decimal" || E1.tipo == "caracter") {
                            var t1 = generarTemp();
                            resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", E1.valor, "-", "1", "Decremento"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", t1, "Guardo la variable"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", t1, "", "", "Asignacion"), raiz.hijos[1].posicion.first_line));
                        }
                    }
                    resultado.tipo = E1.tipo;
                } else {//! E
                    var E1 = resolverOperacion(raiz.hijos[1]);
                    if (E1.tipo != 'booleano') {
                        listaErrores.push(new Errores("Error Semantico", "No se pueden realizar la operacion logica: " + E1.valor + "!", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        resultado.tipo = 'error';
                        //areturn;
                    }
                    if (E1.rol == "valor") {
                        var etqV = generarEtq();
                        var etqF = generarEtq();
                        //estaba e1.codigo +=
                        resultado.codigo.push(new Codigo(generarCuadruplo(etqV, "=", E1.valor, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                        /*var etqFin = generarEtq();
                        resultado.codigo.push(new Codigo(etqV + ':\n', raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", "0", "", "", "Negativo"), raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(etqF + ':\n', raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", "1", "", "", "Positivo"), raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(etqFin + ":\n", raiz.hijos[1].posicion.first_line));*/
                        resultado.etqV = etqF;
                        resultado.etqF = etqV;
                    } else {
                        var etqV = E1.etqV;
                        var etqF = E1.etqF;
                        resultado.codigo = agregarLista(resultado.codigo, E1.codigo);
                        if (E1.rol == "relacional") {
                            resultado.etqV = E1.etqF;
                            resultado.etqF = E1.etqV;
                        } else {
                            etqV = generarEtq();
                            etqF = generarEtq();
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqV, "=", E1.valor, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                            resultado.etqV = etqV;
                            resultado.etqF = etqF;
                        }
                    }
                    resultado.tipo = 'booleano';
                    resultado.rol = "relacional";
                    resultado.valor = temp;
                    return resultado;
                }
                resultado.valor = temp;
                resultado.rol = "temp";
                result = resultado;
                break;
            case 3:
                if (raiz.hijos[0].token == "(" && raiz.hijos[2].token == ")") {
                    result = resolverOperacion(raiz.hijos[1]); //( E )
                    return result;
                }
                var listaAux = [];
                var listaAux2 = [];
                var E1 = resolverOperacion(raiz.hijos[0]);
                var E2 = resolverOperacion(raiz.hijos[2]);
                var resultado = new Expresion();

                if (E1 == null || E2 == null) {
                    console.log("Hay un nulo");
                    return null;
                }
                if (E1.valor === "nulo" || E2.valor === "nulo") {
                    listaErrores.push(new Errores("Error Semantico", "No se pueden realizar operaciones con nulos", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    resultado.rol = 'error';
                    return;
                }
                if (E1.rol == 'error') {
                    return E1;
                }
                if (E2.rol == 'error') {
                    return E2;
                }
                resultado.codigo = agregarLista(resultado.codigo, E1.codigo);
                resultado.codigo = agregarLista(resultado.codigo, E2.codigo);

                switch (raiz.hijos[1].nombre) {
                    case '+':
                        var temp = generarTemp();
                        if (E1.tipo == 'entero' && E2.tipo == 'decimal' || //Decimal
                            E1.tipo == 'decimal' && E2.tipo == 'entero' ||
                            E1.tipo == 'decimal' && E2.tipo == 'caracter' ||
                            E1.tipo == 'caracter' && E2.tipo == 'decimal' ||
                            E1.tipo == 'booleano' && E2.tipo == 'decimal' ||
                            E1.tipo == 'decimal' && E2.tipo == 'booleano' ||
                            E1.tipo == 'decimal' && E2.tipo == 'decimal') {
                            var siCaracter = verificarCaracter(E1, E2, raiz.hijos[1].posicion);
                            E1.valor = siCaracter.valor;
                            E2.valor = siCaracter.valorTemp;
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "+", E2.valor, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "decimal";
                        }
                        else if (E1.tipo == 'entero' && E2.tipo == 'caracter' || //Entero
                            E1.tipo == 'caracter' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'entero' ||
                            E1.tipo == 'entero' && E2.tipo == 'booleano' ||
                            E1.tipo == 'entero' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'booleano' ||
                            E1.tipo == 'caracter' && E2.tipo == 'caracter') {
                            if (E1.tipo == "caracter") {
                                var asc = E1.valor.charCodeAt(0);
                                E1.valor = asc;
                            }
                            if (E2.tipo == "caracter") {
                                var asc = E2.valor.charCodeAt(0);
                                E2.valor = asc;
                            }
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "+", E2.valor, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "entero";
                        }
                        //INCIERTOOOOOOOOOOOOOOOOOOOOOOOOOO
                        else if (E1.tipo == 'cadena' && E2.tipo == 'caracter'
                            || E1.tipo == 'caracter' && E2.tipo == 'cadena'
                            || E1.tipo == 'caracter' && E2.tipo == 'caracter') {
                            limite = 0;
                            var pos1 = E1.valor;
                            var pos2 = E2.valor;
                            if (E1.rol === 'valor') {
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < E1.valor.length; i++) {
                                    var asc = E1.valor.charCodeAt(i);
                                    resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E1.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                pos1 = t1;
                            }
                            if (E2.rol === 'valor') {
                                var t2 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < E2.valor.length; i++) {
                                    var asc = E2.valor.charCodeAt(i);
                                    resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E2.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                pos2 = t2;
                            }
                            generarCodigoDefinidos(temp, pos1, pos2, "concatenar", "concatenar", raiz.hijos[1].posicion);
                            resultado.tipo = "cadena";

                        } else if (E1.tipo == 'cadena' && (E2.tipo == 'entero')) {
                            limite = 0;
                            var pos1 = E1.valor;
                            var pos2 = E2.valor;
                            if (E1.rol === 'valor') {
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < E1.valor.length; i++) {
                                    var asc = E1.valor.charCodeAt(i);
                                    resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E1.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                pos1 = t1;
                            }
                            generarCodigoDefinidos(temp, pos1, pos2, "concatenar", "convertirEnteroACadena", raiz.hijos[1].posicion);
                            resultado.tipo = "cadena";
                        }
                        else if ((E1.tipo == 'entero') && E2.tipo == 'cadena') {
                            limite = 0;
                            var pos1 = E1.valor;
                            var pos2 = E2.valor;
                            if (E2.rol === 'valor') {
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < E2.valor.length; i++) {
                                    var asc = E2.valor.charCodeAt(i);
                                    resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E2.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                pos2 = t1;
                            }
                            generarCodigoDefinidos(temp, pos1, pos2, "convertirEnteroACadena", "concatenar", raiz.hijos[1].posicion);
                            resultado.tipo = "cadena";
                        }
                        else if (E1.tipo == 'cadena' && E2.tipo == 'booleano') {
                            limite = 0;
                            var pos1 = E1.valor;
                            var pos2 = E2.valor;
                            if (E1.rol === 'valor') {
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < E1.valor.length; i++) {
                                    var asc = E1.valor.charCodeAt(i);
                                    resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E1.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                pos1 = t1;
                            }
                            generarCodigoDefinidos(temp, pos1, pos2, "concatenar", "obtenerAscii", raiz.hijos[1].posicion);
                            resultado.tipo = "cadena";
                        }
                        else if (E1.tipo == 'booleano' && E2.tipo == 'cadena') {
                            limite = 0;
                            var pos1 = E1.valor;
                            var pos2 = E2.valor;
                            if (E2.rol === 'valor') {
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < E2.valor.length; i++) {
                                    var asc = E2.valor.charCodeAt(i);
                                    resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E2.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                pos2 = t1;
                            }
                            generarCodigoDefinidos(temp, pos1, pos2, "obtenerAscii", "concatenar", raiz.hijos[1].posicion);
                            resultado.tipo = "cadena";

                        } else if (E1.tipo == 'cadena' && E2.tipo == 'decimal') {
                            limite = 0;
                            var pos1 = E1.valor;
                            var pos2 = E2.valor;
                            if (E1.rol === 'valor') {
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < E1.valor.length; i++) {
                                    var asc = E1.valor.charCodeAt(i);
                                    resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E1.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                pos1 = t1;
                            }
                            generarCodigoDefinidos(temp, pos1, pos2, "concatenar", "convertirEnteroACadena", raiz.hijos[1].posicion);
                            resultado.tipo = "cadena";
                        } else {
                            listaErrores.push(new Errores("Error Semantico", "No se puede realizar la suma " + E1.valor + "+" + E2.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            resultado.codigo.push(new Codigo("//ERROR", raiz.hijos[1].posicion.first_line));;
                        }
                        resultado.valor = temp;
                        resultado.rol = "temp";

                        result = resultado;
                        break;
                    case '-':
                        var temp = generarTemp();
                        if (E1.tipo == 'entero' && E2.tipo == 'decimal' || //Decimal
                            E1.tipo == 'decimal' && E2.tipo == 'entero' ||
                            E1.tipo == 'decimal' && E2.tipo == 'caracter' ||
                            E1.tipo == 'caracter' && E2.tipo == 'decimal' ||
                            E1.tipo == 'booleano' && E2.tipo == 'decimal' ||
                            E1.tipo == 'decimal' && E2.tipo == 'booleano' ||
                            E1.tipo == 'decimal' && E2.tipo == 'decimal') {
                            var siCaracter = verificarCaracter(E1, E2, raiz.hijos[1].posicion);
                            E1.valor = siCaracter.valor;
                            E2.valor = siCaracter.valorTemp;
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "-", E2.valor, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "decimal";
                        }
                        else if (E1.tipo == 'entero' && E2.tipo == 'caracter' || //Entero
                            E1.tipo == 'caracter' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'entero' ||
                            E1.tipo == 'entero' && E2.tipo == 'booleano' ||
                            E1.tipo == 'entero' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'booleano') {
                            var siCaracter = verificarCaracter(E1, E2, raiz.hijos[1].posicion);
                            E1.valor = siCaracter.valor;
                            E2.valor = siCaracter.valorTemp;
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "-", E2.valor, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "entero";
                        }
                        else if (E1.tipo == 'caracter' && E2.tipo == 'caracter') {
                            var asc1 = E1.valor.charCodeAt(0);
                            var asc2 = E2.valor.charCodeAt(0);
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", asc1, "-", asc2, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "entero";
                        }
                        else {
                            listaErrores.push(new Errores("Error Semantico", "No se puede realizar la resta " + E1.valor + "-" + E2.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        }
                        resultado.valor = temp;
                        resultado.rol = "temp";

                        result = resultado;
                        break;
                    case '*':
                        var temp = generarTemp();
                        if (E1.tipo == 'entero' && E2.tipo == 'decimal' || //Decimal
                            E1.tipo == 'decimal' && E2.tipo == 'entero' ||
                            E1.tipo == 'decimal' && E2.tipo == 'caracter' ||
                            E1.tipo == 'caracter' && E2.tipo == 'decimal' ||
                            E1.tipo == 'booleano' && E2.tipo == 'decimal' ||
                            E1.tipo == 'decimal' && E2.tipo == 'booleano' ||
                            E1.tipo == 'decimal' && E2.tipo == 'decimal') {
                            var siCaracter = verificarCaracter(E1, E2, raiz.hijos[1].posicion);
                            E1.valor = siCaracter.valor;
                            E2.valor = siCaracter.valorTemp;
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "*", E2.valor, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "decimal";
                        }
                        else if (E1.tipo == 'entero' && E2.tipo == 'caracter' || //Entero
                            E1.tipo == 'caracter' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'entero' ||
                            E1.tipo == 'entero' && E2.tipo == 'booleano' ||
                            E1.tipo == 'entero' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'booleano') {
                            if (E1.tipo == "caracter") {
                                var asc = E1.valor.charCodeAt(0);
                                E1.valor = asc;
                            } else if (E2.tipo == "caracter") {
                                var asc = E2.valor.charCodeAt(0);
                                E2.valor = asc;
                            }
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "*", E2.valor, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "entero";
                        } else if (E1.tipo == 'caracter' && E2.tipo == 'caracter') {
                            var asc1 = E1.valor.charCodeAt(0);
                            var asc2 = E2.valor.charCodeAt(0);
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", asc1, "*", asc2, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "entero";
                        } else {
                            listaErrores.push(new Errores("Error Semantico", "No se puede realizar la operacion " + E1.valor + "*" + E2.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        }
                        resultado.valor = temp;
                        resultado.rol = "temp";
                        resultado.tipo = "entero";
                        if (E1.tipo == 'decimal' || E2.tipo == 'decimal') {
                            resultado.tipo = 'decimal';
                        }
                        result = resultado;
                        break;
                    case '/':
                        var temp = generarTemp();
                        if (E2.valor == "0") {
                            listaErrores.push(new Errores("Error de Ejecucion", "No se puede realizar la operacion " + E1.valor + "/" + E2.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        }
                        else if (E1.tipo == 'entero' && E2.tipo == 'decimal' || //Decimal
                            E1.tipo == 'decimal' && E2.tipo == 'entero' ||
                            E1.tipo == 'decimal' && E2.tipo == 'caracter' ||
                            E1.tipo == 'caracter' && E2.tipo == 'decimal' ||
                            E1.tipo == 'booleano' && E2.tipo == 'decimal' ||
                            E1.tipo == 'decimal' && E2.tipo == 'booleano' ||
                            E1.tipo == 'decimal' && E2.tipo == 'decimal') {
                            var siCaracter = verificarCaracter(E1, E2, raiz.hijos[1].posicion);
                            E1.valor = siCaracter.valor;
                            E2.valor = siCaracter.valorTemp;
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "/", E2.valor, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "decimal";
                        }
                        else if (E1.tipo == 'entero' && E2.tipo == 'caracter' || //Entero
                            E1.tipo == 'caracter' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'entero' ||
                            E1.tipo == 'entero' && E2.tipo == 'booleano' ||
                            E1.tipo == 'entero' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'booleano') {
                            var siCaracter = verificarCaracter(E1, E2, raiz.hijos[1].posicion);
                            E1.valor = siCaracter.valor;
                            E2.valor = siCaracter.valorTemp;
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", E1.valor, "/", E2.valor, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "entero";
                        } else if (E1.tipo == 'caracter' && E2.tipo == 'caracter') {
                            var asc1 = E1.valor.charCodeAt(0);
                            var asc2 = E2.valor.charCodeAt(0);
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", asc1, "/", asc2, ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "entero";
                        } else {
                            listaErrores.push(new Errores("Error Semantico", "No se puede realizar la operacion " + E1.valor + "/" + E2.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        }
                        resultado.valor = temp;
                        resultado.rol = "temp";
                        resultado.tipo = "entero";
                        if (E1.tipo == 'decimal' || E2.tipo == 'decimal') {
                            resultado.tipo = 'decimal';
                        }
                        result = resultado;
                        break;
                    case '^':
                        var tempAux = "";
                        if (E1.tipo == 'entero' && E2.tipo == 'decimal' || //Decimal
                            E1.tipo == 'decimal' && E2.tipo == 'entero' ||
                            E1.tipo == 'caracter' && E2.tipo == 'decimal' ||
                            E1.tipo == 'booleano' && E2.tipo == 'decimal' ||
                            E1.tipo == 'decimal' && E2.tipo == 'booleano' ||
                            E1.tipo == 'decimal' && E2.tipo == 'decimal') {
                            var siCaracter = verificarCaracter(E1, E2, raiz.hijos[1].posicion);
                            E1.valor = siCaracter.valor;
                            E2.valor = siCaracter.valorTemp;
                            var t1 = generarTemp();
                            var etqIni = generarEtq();
                            var etqV = generarEtq();
                            var etqF = generarEtq();
                            var t2 = generarTemp();
                            resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "1", "", "", "Contador"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(t2, "=", "0", "", "", "Contador"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(etqIni + ":\n", raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqV, "=", t2, operadorRelacional("<"), E2.valor, "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(etqV + ":\n", raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "*", E1.valor, "Contador"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", "Aumento contador"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqIni, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(etqF + ":\n", raiz.hijos[1].posicion.first_line));
                            var temp = generarTemp();
                            tempAux = temp;
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", t1, "", "", ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "entero";
                            if (E1.tipo == 'decimal' || E2.tipo == 'decimal') {
                                resultado.tipo = 'decimal';
                            }

                        }
                        else if ( //Entero
                            E1.tipo == 'caracter' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'entero' ||
                            E1.tipo == 'entero' && E2.tipo == 'booleano' ||
                            E1.tipo == 'entero' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'booleano') {
                            var siCaracter = verificarCaracter(E1, E2, raiz.hijos[1].posicion);
                            E1.valor = siCaracter.valor;
                            E2.valor = siCaracter.valorTemp;
                            var t1 = generarTemp();
                            var etqIni = generarEtq();
                            var etqV = generarEtq();
                            var etqF = generarEtq();
                            var t2 = generarTemp();
                            resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "1", "", "", "Contador"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(t2, "=", "0", "", "", "Contador"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(etqIni + ":\n", raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqV, "=", t2, operadorRelacional("<"), E2.valor, "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(etqV + ":\n", raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "*", E1.valor, "Contador"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", "Contador"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqIni, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(etqF + ":\n", raiz.hijos[1].posicion.first_line));
                            var temp = generarTemp();
                            tempAux = temp;
                            resultado.codigo.push(new Codigo(generarCuadruplo(temp, "=", t1, "", "", ""), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = "entero";
                        } else if (E1.tipo == 'decimal' && E2.tipo == 'caracter' ||
                            E1.tipo == 'entero' && E2.tipo == 'caracter') {
                            listaErrores.push(new Errores("Error Semantico", "Fuera de rango " + E1.valor + "^" + E2.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        } else {
                            listaErrores.push(new Errores("Error Semantico", "No se puede realizar la operacion " + E1.valor + "^" + E2.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        }
                        resultado.valor = tempAux;
                        resultado.rol = "temp";

                        result = resultado;
                        break;
                    case '>':
                    case '<':
                    case '>=':
                    case '<=':
                    case '==':
                    case '!=':
                        var etqV = generarEtq();
                        var etqF = generarEtq();
                        var operador = operadorRelacional(raiz.hijos[1].nombre);
                        //resultado.codigo = [];
                        // resultado.rol = "booleano";
                        if (E1.tipo == 'caracter' && E2.tipo == 'entero' ||
                            E1.tipo == 'entero' && E2.tipo == 'caracter' ||
                            E1.tipo == 'entero' && E2.tipo == 'booleano' ||
                            E1.tipo == 'booleano' && E2.tipo == 'entero' ||
                            E1.tipo == 'entero' && E2.tipo == 'entero' ||
                            E1.tipo == 'booleano' && E2.tipo == 'booleano' ||
                            E1.tipo == 'caracter' && E2.tipo == 'decimal' ||
                            E1.tipo == 'decimal' && E2.tipo == 'caracter') {
                            var siCaracter = verificarCaracter(E1, E2, raiz.hijos[1].posicion);
                            E1.valor = siCaracter.valor;
                            E2.valor = siCaracter.valorTemp;
                            var etqAux = "";
                            if (E1.rol == "relacional") {
                                etqAux = generarEtq();
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(E1.etqV + ':\n', raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "1", "", "", "Auxiliar"), raiz.hijos[0].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo(etqAux, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(E1.etqF + ':\n', raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "0", "", "", "Auxiliar"), raiz.hijos[0].posicion.first_line));
                                E1.valor = t1;
                            }
                            if (E2.rol == "relacional") {
                                etqAux = generarEtq();
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(E2.etqV + ':\n', raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "1", "", "", "Auxiliar"), raiz.hijos[0].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo(etqAux, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(E2.etqF + ':\n', raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "0", "", "", "Auxiliar"), raiz.hijos[0].posicion.first_line));
                                E2.valor = t1;
                            }
                            if (etqAux != "") {
                                resultado.codigo.push(new Codigo(etqAux + ':\n', raiz.hijos[1].posicion.first_line));
                            }
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqV, "=", E1.valor, operador, E2.valor, "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));


                        } else if (E1.tipo == 'caracter' && E2.tipo == 'cadena' ||
                            E1.tipo == 'cadena' && E2.tipo == 'caracter' ||
                            E1.tipo == 'cadena' && E2.tipo == 'cadena' ||
                            E1.tipo == 'caracter' && E2.tipo == 'caracter') {
                            var pos1 = E1.valor;
                            var pos2 = E2.valor;
                            if (E1.rol === 'valor') {
                                var t1 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < E1.valor.length; i++) {
                                    var asc = E1.valor.charCodeAt(i);
                                    resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E1.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                pos1 = t1;
                            }
                            if (E2.rol === 'valor') {
                                var t2 = generarTemp();
                                resultado.codigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < E2.valor.length; i++) {
                                    var asc = E2.valor.charCodeAt(i);
                                    resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + E2.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                resultado.codigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                resultado.codigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                pos2 = t2;
                            }
                            var tam = obtenerTamanioAmbito();
                            resultado.codigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), raiz.hijos[1].posicion.first_line));
                            var t3 = generarTemp();
                            resultado.codigo.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(guardarEnArreglo("Stack", t3, pos1, "Envio parametro1 a sumarAscii"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo("call, , , sumarAscii" + "\n", raiz.hijos[1].posicion.first_line));
                            var t4 = generarTemp();
                            resultado.codigo.push(new Codigo(obtenerArreglo(t4, "Stack", t3, "Se obtiene el parametro 1"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(guardarEnArreglo("Stack", t3, pos2, "Envio parametro2 a sumarAscii"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo("call, , , sumarAscii" + "\n", raiz.hijos[1].posicion.first_line));
                            var t5 = generarTemp();
                            resultado.codigo.push(new Codigo(obtenerArreglo(t5, "Stack", t3, "Se obtiene el parametro 2"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqV, "=", t4, operador, t5, "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                            resultado.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));

                        }
                        resultado.tipo = 'booleano';
                        resultado.etqV = etqV;
                        resultado.etqF = etqF;
                        resultado.rol = "relacional";
                        result = resultado;

                        break;
                    case '||':
                        resultado.tipo = 'booleano';
                        resultado.codigo = [];
                        if (E1.tipo != 'booleano' || E2.tipo != 'booleano') {
                            listaErrores.push(new Errores("Error Semantico", "No se pueden realizar la operacion logica: " + E1.valor + "(" + E1.tipo + ")" + "||" + E2.valor + "(" + E2.tipo + ")", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            resultado.tipo = 'error';
                        }
                        if (E1.rol != "relacional") {
                            var etqV = generarEtq();
                            var etqF = generarEtq();
                            E1.codigo.push(new Codigo(generarCuadruplo(etqV, "=", E1.valor, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[0].posicion.first_line));
                            E1.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[0].posicion.first_line));
                            E1.etqV = etqV;
                            E1.etqF = etqF;
                            resultado.rol = "relacional";
                        }
                        if (E2.rol != "relacional") {
                            var etqV = generarEtq();
                            var etqF = generarEtq();
                            E2.codigo.push(new Codigo(generarCuadruplo(etqV, "=", E2.valor, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[0].posicion.first_line));
                            E2.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[0].posicion.first_line));
                            E2.etqV = etqV;
                            E2.etqF = etqF;
                            resultado.rol = "relacional";
                        }
                        resultado.codigo = agregarLista(resultado.codigo, E1.codigo);
                        resultado.codigo.push(new Codigo(E1.etqF + ':\n', raiz.hijos[1].posicion.first_line));
                        resultado.codigo = agregarLista(resultado.codigo, E2.codigo);
                        resultado.etqV = E1.etqV + ',' + E2.etqV;
                        resultado.etqF = E2.etqF;
                        resultado.valor = "0";
                        //resultado.rol = "booleano";
                        resultado.rol = "relacional";
                        result = resultado;
                        break;
                    case '&&':
                        resultado.codigo = [];
                        resultado.rol = "booleano";

                        if (E1.tipo != 'booleano' || E2.tipo != 'booleano') {
                            listaErrores.push(new Errores("Error Semantico", "No se pueden realizar la operacion logica: " + E1.valor + "||" + E2.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            resultado.tipo = 'error';
                        }
                        if (E1.rol != "relacional") {
                            var etqV = generarEtq();
                            var etqF = generarEtq();
                            E1.codigo.push(new Codigo(generarCuadruplo(etqV, "=", E1.valor, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[0].posicion.first_line));
                            E1.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[0].posicion.first_line));
                            E1.etqV = etqV;
                            E1.etqF = etqF;
                            resultado.rol = "relacional";
                        }
                        if (E2.rol != "relacional") {
                            var etqV = generarEtq();
                            var etqF = generarEtq();
                            E2.codigo.push(new Codigo(generarCuadruplo(etqV, "=", E2.valor, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[0].posicion.first_line));
                            E2.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[0].posicion.first_line));
                            E2.etqV = etqV;
                            E2.etqF = etqF;
                            resultado.rol = "relacional";
                        }
                        resultado.codigo = agregarLista(resultado.codigo, E1.codigo);
                        resultado.codigo.push(new Codigo(E1.etqV + ':\n', raiz.hijos[1].posicion.first_line));
                        resultado.codigo = agregarLista(resultado.codigo, E2.codigo);
                        resultado.tipo = 'booleano';
                        resultado.etqV = E2.etqV;
                        resultado.etqF = E1.etqF + ',' + E2.etqF + '';
                        result = resultado;
                        break;
                    case '??':
                        resultado.codigo = [];
                        //resultado.rol = "booleano";
                        resultado.tipo = 'booleano';
                        if (E1.tipo != 'booleano' || E2.tipo != 'booleano') {
                            listaErrores.push(new Errores("Error Semantico", "No se pueden realizar la operacion logica: " + E1.valor + "||" + E2.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            resultado.tipo = 'error';
                        }
                        if (E1.rol != "relacional") {
                            var etqV = generarEtq();
                            var etqF = generarEtq();
                            E1.codigo.push(new Codigo(generarCuadruplo(etqV, "=", E1.valor, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[0].posicion.first_line));
                            E1.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[0].posicion.first_line));
                            E1.etqV = etqV;
                            E1.etqF = etqF;
                            resultado.rol = "relacional";
                        }
                        if (E2.rol != "relacional") {
                            var etqV = generarEtq();
                            var etqF = generarEtq();
                            E2.codigo.push(new Codigo(generarCuadruplo(etqV, "=", E2.valor, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[0].posicion.first_line));
                            E2.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[0].posicion.first_line));
                            E2.etqV = etqV;
                            E2.etqF = etqF;
                            resultado.rol = "relacional";
                        }
                        var t1 = generarTemp();
                        resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "0", "", "", "Contador"), raiz.hijos[1].posicion.first_line));
                        resultado.codigo = agregarLista(resultado.codigo, E1.codigo);
                        resultado.codigo.push(new Codigo(E1.etqV + ':\n', raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", "1", "", "", "Contador"), raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(E1.etqF + ':\n', raiz.hijos[1].posicion.first_line));
                        resultado.codigo = agregarLista(resultado.codigo, E2.codigo);
                        resultado.codigo.push(new Codigo(E2.etqV + ':\n', raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", "1", "Sumo 1 al Contador"), raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(E2.etqF + ':\n', raiz.hijos[1].posicion.first_line));
                        var etqV = generarEtq();
                        var etqF = generarEtq();
                        resultado.codigo.push(new Codigo(generarCuadruplo(etqV, "=", t1, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                        resultado.codigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                        resultado.etqV = etqV;
                        resultado.etqF = etqF;
                        resultado.rol = "relacional";
                        result = resultado;
                        break;
                    default:
                        break;
                }
                break;
            case 4:
                var resultado = new Expresion();
                if (raiz.hijos[3].nombre == "este") { // este '.' id 
                    boolEste = true;
                    var variable = obtenerVariable3D(raiz.hijos[2].token, raiz.hijos[0].posicion);
                    boolEste = false;
                    return variable;
                } else {                              // este '.' id INSTANCIA
                    boolEste = true;
                    resultado = obtenerValorInstancia(raiz.hijos[2].token, raiz.hijos[3]);
                    boolEste = false;
                    break;
                }
                result = resultado;
                break;
            default:
                break;
        }
    }
    return result;

}

function operadorRelacional(operador) {
    if (operador == "==") {
        return "je";
    } else if (operador == "!=") {
        return "jne";
    } else if (operador == ">") {
        return "jg";
    } else if (operador == ">=") {
        return "jge";
    } else if (operador == "<") {
        return "jl";
    } else if (operador == "<=") {
        return "jle";
    }
    return "";
}

function generarCodigoDefinidos(temp, pos1, pos2, parametro1, parametro2, p) {
    var listaCodigoAux = [];
    var tam = obtenerTamanioAmbito();
    listaCodigoAux.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), p.first_line));
    var t3 = generarTemp();
    listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), p.first_line));
    listaCodigoAux.push(new Codigo(generarCuadruplo(temp, "=", "H", "", "", ""), p.first_line));
    listaCodigoAux.push(new Codigo(guardarEnArreglo("Stack", t3, pos1, "Envio parametro1 a " + parametro1), p.first_line));
    listaCodigoAux.push(new Codigo("call, , , " + parametro1 + "\n", p.first_line));
    listaCodigoAux.push(new Codigo(guardarEnArreglo("Stack", t3, pos2, "Envio parametro2 a " + parametro2), p.first_line));
    listaCodigoAux.push(new Codigo("call, , , " + parametro2 + "\n", p.first_line));
    listaCodigoAux.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), p.first_line));
    listaCodigoAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), p.first_line));
    listaCodigoAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), p.first_line));
    return listaCodigoAux;
}

function agregarLista(listaPadre, listaHijo) {
    for (let i = 0; i < listaHijo.length; i++) {
        listaPadre.push(listaHijo[i]);
    }
    return listaPadre;
}


function generarCodigoConcatenar(tamVariable, pos1, pos2, p) {
    var listaAux = [];
    var tam = obtenerTamanioAmbito();
    listaAux.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), p.first_line));
    var t3 = generarTemp();
    listaAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), p.first_line));
    listaAux.push(new Codigo(guardarEnArreglo("Stack", t3, pos1, "Envio parametro1 "), p.first_line));
    listaAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "2", ""), p.first_line));
    listaAux.push(new Codigo(guardarEnArreglo("Stack", t3, pos2, "Envio parametro2 "), p.first_line));
    listaAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "3", ""), p.first_line));
    listaAux.push(new Codigo(guardarEnArreglo("Stack", t3, tamVariable, "Envio parametro3 "), p.first_line));
    listaAux.push(new Codigo("call, , , concatenar\n", p.first_line));
    listaAux.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), p.first_line));
    return listaAux;
}
