claseAuxiliar = "";
esObjeto = false;
posInstancia = 0;
tamInstancia = 0;

function obtenerValorInstancia(nombre, raiz) {
    //console.log("buscaaaaaaaaaaaaaaaar = " + nombre);
    var resultado = new Expresion();
    resultado.tipo = "error";
    var listaCodigoAux = [];
    var temp = generarTemp();
    switch (raiz.hijos.length) {
        case 2:
            if (raiz.hijos[0].nombre == "." && raiz.hijos[1].nombre == "LLAMADA") { //'.' LLAMADA
                var var3d = obtenerVariable3D(nombre, raiz.hijos[1].posicion);
                var clase = obtenerClase(var3d.tipo);
                if (clase != null && !(esEstructuraDeDatos(var3d.rolVariable))) {
                    listaCodigo = agregarLista(listaCodigo, var3d.codigo);
                    posInstancia = var3d.valor;
                    tamInstancia = clase.listaVariables.length;
                    claseAuxiliar = claseActual;
                    claseActual = clase;
                    esObjeto = true;
                    resultado = segundo.recorrerMetodos(raiz.hijos[1]);
                    esObjeto = false;
                    claseActual = claseAuxiliar;
                    claseAuxiliar = "";
                    return resultado;
                } else {
                    return verificarLlamada(var3d, raiz.hijos[1]);
                }
            } else if (raiz.hijos[0].nombre == ".") {                              // '.' id                                
                if (verificarInicializada(nombre) == false) {
                    listaErrores.push(new Errores("Error Semantico", "No se ha inicializado la variable: " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return resultado;
                }
                var var3d = obtenerVariable3D(nombre, raiz.hijos[1].posicion);
                var clase = obtenerClaseEstructura(var3d.tipo);
                if (clase != null) {
                    //Verificar si es una estrucutura
                    var atr = obtenerAtributo(clase, raiz.hijos[1].token, "variable", raiz.hijos[1].posicion);
                    if (atr != null) {
                        if (atr.visibilidad.toLowerCase() != "publico") {
                            listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[1].token + " es " + atr.visibilidad.toLowerCase(), raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            return resultado;
                        }
                        claseAnterior = claseActual;
                        claseActual = clase;
                        if (verificarInicializada(raiz.hijos[1].token) == false) {
                            listaErrores.push(new Errores("Error Semantico", "No se ha inicializado la variable: " + raiz.hijos[1].token, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            claseActual = claseAnterior;
                            return resultado;
                        }
                        claseActual = claseAnterior;
                        listaCodigoAux = agregarLista(listaCodigoAux, var3d.codigo);

                        resultado.tipo = atr.tipo;
                        resultado.rolVariable = atr.rol;
                        resultado.inicializada = atr.inicializada;
                        var t1 = generarTemp();
                        //listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        if (atr.heredada == true) {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        } else {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        }
                        listaCodigoAux.push(new Codigo(obtenerArreglo(temp, "Heap", t1, "Valor del atributo"), raiz.hijos[1].posicion.first_line));
                        if (atr.rol.toLowerCase() == "arreglo") {
                            var t2 = generarTemp();
                            var t3 = generarTemp();
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", temp, "+", atr.dimension.length, "Obtener el tamanio"), p.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
                            listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t2, "Posicion del arreglo real"), p.first_line));
                            resultado.codigo = listaCodigoAux;
                            resultado.tipo = atr.tipo;
                            resultado.posicion = temp;
                            resultado.tamanio = atr.dimension;
                            resultado.valor = t3;
                            resultado.rol = "temp";
                            return resultado;
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[1].token + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return resultado;
                    }
                } else {
                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la clase o estructura: " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return resultado;
                }

            } else {                                                                  //'->' id
                if (verificarInicializada(nombre) == false) {
                    listaErrores.push(new Errores("Error Semantico", "No se ha inicializado la variable: " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return resultado;
                }
                var var3d = obtenerVariable3D(nombre, raiz.hijos[1].posicion);
                var clase = obtenerClaseEstructura(var3d.tipo);
                if (clase != null) {
                    //Verificar si es una estrucutura
                    var atr = obtenerAtributo(clase, raiz.hijos[1].token, "variable", raiz.hijos[1].posicion);
                    if (atr != null) {
                        if (atr.visibilidad.toLowerCase() != "publico") {
                            listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[1].token + " es " + atr.visibilidad.toLowerCase(), raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            return resultado;
                        }
                        claseAnterior = claseActual;
                        claseActual = clase;
                        if (verificarInicializada(raiz.hijos[1].token) == false) {
                            listaErrores.push(new Errores("Error Semantico", "No se ha inicializado la variable: " + raiz.hijos[1].token, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            claseActual = claseAnterior;
                            return resultado;
                        }
                        claseActual = claseAnterior;
                        listaCodigoAux = agregarLista(listaCodigoAux, var3d.codigo);

                        resultado.tipo = atr.tipo;
                        resultado.rolVariable = atr.rol;
                        resultado.inicializada = atr.inicializada;
                        var t1 = generarTemp();
                        //listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.posicionRef, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        if (atr.heredada == true) {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.posicionRef, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        } else {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.posicionRef, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        }
                        listaCodigoAux.push(new Codigo(obtenerArreglo(temp, "Heap", t1, "Valor del atributo"), raiz.hijos[1].posicion.first_line));
                        if (atr.rol.toLowerCase() == "arreglo") {
                            var t2 = generarTemp();
                            var t3 = generarTemp();
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", temp, "+", atr.dimension.length, "Obtener el tamanio"), p.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
                            listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t2, "Posicion del arreglo real"), p.first_line));
                            resultado.codigo = listaCodigoAux;
                            resultado.tipo = atr.tipo;
                            resultado.posicion = temp;
                            resultado.tamanio = atr.dimension;
                            resultado.valor = t3;
                            resultado.rol = "temp";
                            return resultado;
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[1].token + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return resultado;
                    }
                } else {
                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la clase o estructura: " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return resultado;
                }

            }
            break;
        case 3:
            if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[2].nombre == "LLAMADA") { //INSTANCIA '.' LLAMADA 
                var rInstancia = obtenerValorInstancia(nombre, raiz.hijos[0]);
                var clase = obtenerClase(rInstancia.tipo);
                if (rInstancia != null && clase != null) {
                    listaCodigo = agregarLista(listaCodigo, rInstancia.codigo);
                    posInstancia = rInstancia.valor;
                    tamInstancia = clase.listaVariables.length;
                    claseAuxiliar = claseActual;
                    claseActual = clase;
                    esObjeto = true;
                    resultado = segundo.recorrerMetodos(raiz.hijos[2]);
                    esObjeto = false;
                    claseActual = claseAuxiliar;
                    claseAuxiliar = "";
                    return resultado;
                } else {
                    return verificarLlamada(rInstancia, raiz.hijos[2]);
                }

            } else if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[1].nombre == ".") {//INSTANCIA '.' id     
                var rInstancia = obtenerValorInstancia(nombre, raiz.hijos[0]);
                var clase = obtenerClaseEstructura(rInstancia.tipo);

                if (rInstancia != null && clase != null) {
                    var atr = obtenerAtributo(clase, raiz.hijos[2].token, "variable", raiz.hijos[1].posicion);
                    if (atr != null) {
                        if (atr.visibilidad.toLowerCase() != "publico") {
                            listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[2].token + " es " + atr.visibilidad.toLowerCase(), raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            return resultado;
                        }
                        claseAnterior = claseActual;
                        claseActual = clase;
                        if (verificarInicializada(raiz.hijos[2].token) == false) {
                            listaErrores.push(new Errores("Error Semantico", "No se ha inicializado la variable: " + raiz.hijos[1].token, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            claseActual = claseAnterior;
                            return resultado;
                        }
                        claseActual = claseAnterior;
                        listaCodigoAux = agregarLista(listaCodigoAux, rInstancia.codigo);
                        resultado.tipo = atr.tipo;
                        var t1 = generarTemp();
                        //listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        if (atr.heredada == true) {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        } else {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));;
                        }
                        listaCodigoAux.push(new Codigo(obtenerArreglo(temp, "Heap", t1, "Valor del atributo"), raiz.hijos[1].posicion.first_line));
                        if (atr.rol.toLowerCase() == "arreglo") {
                            var t2 = generarTemp();
                            var t3 = generarTemp();
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", temp, "+", atr.dimension.length, "Obtener el tamanio"), p.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
                            listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t2, "Posicion del arreglo real"), p.first_line));
                            resultado.codigo = listaCodigoAux;
                            resultado.tipo = atr.tipo;
                            resultado.posicion = temp;
                            resultado.tamanio = atr.dimension;
                            resultado.valor = t3;
                            resultado.rol = "temp";
                            return resultado;
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[2].token + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return resultado;
                    }
                } else {
                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la clase o estructura: " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return resultado;
                }
            } else if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[1].nombre == "->") {// INSTANCIA '->' id  
                var rInstancia = obtenerValorInstancia(nombre, raiz.hijos[0]);
                var clase = obtenerClaseEstructura(rInstancia.tipo);
                if (rInstancia != null && clase != null) {

                    var atr = obtenerAtributo(clase, raiz.hijos[2].token, "variable", raiz.hijos[1].posicion);
                    if (atr != null) {
                        if (atr.visibilidad.toLowerCase() != "publico") {
                            listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[2].token + " es " + atr.visibilidad.toLowerCase(), raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            return resultado;
                        }
                        claseAnterior = claseActual;
                        claseActual = clase;
                        if (verificarInicializada(raiz.hijos[2].token) == false) {
                            listaErrores.push(new Errores("Error Semantico", "No se ha inicializado la variable: " + raiz.hijos[1].token, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            claseActual = claseAnterior;
                            return resultado;
                        }
                        claseActual = claseAnterior;
                        listaCodigoAux = agregarLista(listaCodigoAux, rInstancia.codigo);
                        resultado.tipo = atr.tipo;
                        var t1 = generarTemp();
                        //listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        if (atr.heredada == true) {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        } else {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));;
                        }
                        listaCodigoAux.push(new Codigo(obtenerArreglo(temp, "Heap", t1, "Valor del atributo"), raiz.hijos[1].posicion.first_line));
                        if (atr.rol.toLowerCase() == "arreglo") {
                            var t2 = generarTemp();
                            var t3 = generarTemp();
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", temp, "+", atr.dimension.length, "Obtener el tamanio"), p.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), p.first_line));
                            listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t2, "Posicion del arreglo real"), p.first_line));
                            resultado.codigo = listaCodigoAux;
                            resultado.tipo = atr.tipo;
                            resultado.posicion = temp;
                            resultado.tamanio = atr.dimension;
                            resultado.valor = t3;
                            resultado.rol = "temp";
                            return resultado;
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[2].token + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return resultado;
                    }
                } else {
                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la clase o estructura: " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return resultado;
                }
            } else {                                                                        //'.' id DIMENSION
                var var3d = obtenerVariable3D(nombre, raiz.hijos[1].posicion);
                var clase = obtenerClase(var3d.tipo);
                if (clase != null) {
                    listaCodigoAux = agregarLista(listaCodigoAux, var3d.codigo);
                    var atr = obtenerAtributo(clase, raiz.hijos[1].token, "variable");
                    if (atr != null) {
                        var tamDim = atr.dimension.length;
                        claseAuxiliar = claseActual;
                        claseAnterior = claseActual;
                        claseActual = clase;
                        resultado.tipo = atr.tipo;
                        var t1 = generarTemp();
                        var t3 = generarTemp();
                        //listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        if (atr.heredada == true) {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        } else {
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        }
                        listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t1, "obtengo el inicio del arreglo"), raiz.hijos[1].posicion.first_line));
                        var dimension = segundo.recorrerMetodos(raiz.hijos[2]);
                        /////////////////////////////////////
                        if (dimension.length > 0) {
                            var t2 = generarTemp();
                            var t4 = generarTemp();
                            var t0 = generarTemp();
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t3, "+", tamDim, "Posicion inicial mas el tamanio de las dim"), raiz.hijos[1].posicion.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), raiz.hijos[1].posicion.first_line));
                            listaCodigoAux.push(new Codigo(obtenerArreglo(t0, "Heap", t2, "Valor de la dimension n"), raiz.hijos[1].posicion.first_line));
                            var expresionI = dimension[0];
                            listaCodigoAux = agregarLista(listaCodigoAux, expresionI.codigo);
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t4, "=", expresionI.valor, "-", "0", "(i - Linf)"), raiz.hijos[1].posicion.first_line));
                            var pos = 1;
                            for (let i = 1; i < dimension.length; i++) {
                                var expresionJ = dimension[i];
                                listaCodigoAux = agregarLista(listaCodigoAux, expresionJ.codigo);
                                var t5 = generarTemp();
                                var t6 = generarTemp();
                                var t7 = generarTemp();
                                var t8 = generarTemp();
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t5, "=", t3, "+", (i), "Posicion de la dimension"), raiz.hijos[1].posicion.first_line));
                                listaCodigoAux.push(new Codigo(obtenerArreglo(t6, "Heap", t5, "Valor de la dimension n"), raiz.hijos[1].posicion.first_line));
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t7, "=", t4, "*", t6, "(i - Linf)*n"), raiz.hijos[1].posicion.first_line));
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t8, "=", expresionJ.valor, "-", "0", "(i - Linf)"), raiz.hijos[1].posicion.first_line));;
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t4, "=", t7, "+", t8, ""), raiz.hijos[1].posicion.first_line));
                            }
                            var t9 = generarTemp();
                            var t10 = generarTemp();
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t9, "=", t0, "+", t4, "Pos del verdadero arreglo mas la posicion"), raiz.hijos[1].posicion.first_line));
                            listaCodigoAux.push(new Codigo(obtenerArreglo(t10, "Heap", t9, "Valor final"), raiz.hijos[1].posicion.first_line));
                            resultado.tipo = atr.tipo;
                            resultado.rol = "temp";
                            resultado.valor = t10;
                            resultado.posicion = t9;
                            resultado.codigo = listaCodigoAux;
                            claseActual = claseAnterior;
                            claseAuxiliar = "";
                            return resultado;
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + nombre + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return resultado;
                    }
                } else {
                    listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return resultado;
                }
            }
            break;
        case 4:                 //INSTANCIA '.' id DIMENSION
            var rInstancia = obtenerValorInstancia(nombre, raiz.hijos[0]);
            var clase = obtenerClaseEstructura(rInstancia.tipo);
            if (rInstancia != null && clase != null) {
                listaCodigoAux = agregarLista(listaCodigoAux, rInstancia.codigo);

                var atr = obtenerAtributo(clase, raiz.hijos[2].token, "variable", raiz.hijos[1].posicion);
                if (atr != null) {
                    claseAnterior = claseActual;
                    claseActual = clase;
                    if (verificarInicializada(raiz.hijos[2].token) == false) {
                        listaErrores.push(new Errores("Error Semantico", "No se ha inicializado la variable: " + raiz.hijos[1].token, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        claseActual = claseAnterior;
                        return resultado;
                    }
                    claseActual = claseAnterior;
                    var tamDim = atr.dimension.length;
                    claseAuxiliar = claseActual;
                    claseAnterior = claseActual;
                    claseActual = clase;
                    resultado.tipo = atr.tipo;
                    var t1 = generarTemp();
                    var t3 = generarTemp();
                    //listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                    if (atr.heredada == true) {
                        listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                    } else {
                        listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                    }
                    listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t1, "obtengo el inicio del arreglo"), raiz.hijos[1].posicion.first_line));
                    var dimension = segundo.recorrerMetodos(raiz.hijos[3]);
                    /////////////////////////////////////
                    if (dimension.length > 0) {
                        var t2 = generarTemp();
                        var t4 = generarTemp();
                        var t0 = generarTemp();
                        listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t3, "+", tamDim, "Posicion inicial mas el tamanio de las dim"), raiz.hijos[1].posicion.first_line));
                        listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), raiz.hijos[1].posicion.first_line));
                        listaCodigoAux.push(new Codigo(obtenerArreglo(t0, "Heap", t2, "Valor de la dimension n"), raiz.hijos[1].posicion.first_line));

                        var expresionI = dimension[0];
                        listaCodigoAux = agregarLista(listaCodigoAux, expresionI.codigo);
                        listaCodigoAux.push(new Codigo(generarCuadruplo(t4, "=", expresionI.valor, "-", "0", "(i - Linf)"), raiz.hijos[1].posicion.first_line));
                        var pos = 1;
                        for (let i = 1; i < dimension.length; i++) {
                            var expresionJ = dimension[i];
                            listaCodigoAux = agregarLista(listaCodigoAux, expresionJ.codigo);
                            var t5 = generarTemp();
                            var t6 = generarTemp();
                            var t7 = generarTemp();
                            var t8 = generarTemp();
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t5, "=", t3, "+", (i), "Posicion de la dimension"), raiz.hijos[1].posicion.first_line));
                            listaCodigoAux.push(new Codigo(obtenerArreglo(t6, "Heap", t5, "Valor de la dimension n"), raiz.hijos[1].posicion.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t7, "=", t4, "*", t6, "(i - Linf)*n"), raiz.hijos[1].posicion.first_line));
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t8, "=", expresionJ.valor, "-", "0", "(i - Linf)"), raiz.hijos[1].posicion.first_line));;
                            listaCodigoAux.push(new Codigo(generarCuadruplo(t4, "=", t7, "+", t8, ""), raiz.hijos[1].posicion.first_line));
                        }
                        var t9 = generarTemp();
                        var t10 = generarTemp();
                        listaCodigoAux.push(new Codigo(generarCuadruplo(t9, "=", t0, "+", t4, "Pos del verdadero arreglo mas la posicion"), raiz.hijos[1].posicion.first_line));
                        listaCodigoAux.push(new Codigo(obtenerArreglo(t10, "Heap", t9, "Valor final"), raiz.hijos[1].posicion.first_line));
                        resultado.tipo = atr.tipo;
                        resultado.rol = "temp";
                        resultado.valor = t10;
                        resultado.posicion = t9;
                        resultado.codigo = listaCodigoAux;
                        claseActual = claseAnterior;
                        claseAuxiliar = "";
                        return resultado;
                    }
                } else {
                    listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[2].token + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return resultado;
                }
            } else {
                listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                return resultado;
            }
            break;
    }
    resultado.valor = temp;
    resultado.rol = "temp";
    resultado.codigo = listaCodigoAux;
    return resultado;
}

function asignarValorInstancia(nombre, raiz, asignar, cantidad) {
    var resultado = new Expresion();
    resultado.tipo = "error";
    var temp = "";
    switch (raiz.hijos.length) {
        case 2:
            if (raiz.hijos[0].nombre == ".") {                              // '.' id      
                var contador = 1;
                var var3d = obtenerVariable3D(nombre, raiz.hijos[1].posicion);
                var estructura = obtenerClaseEstructura(var3d.tipo);
                if (estructura != null) {
                    inicializarVariable(nombre, estructura, raiz.hijos[0].posicion);
                    listaCodigo = agregarLista(listaCodigo, var3d.codigo);
                    var atr = obtenerAtributo(estructura, raiz.hijos[1].token, "variable", raiz.hijos[1].posicion);
                    if (atr != null) {
                        if (atr.visibilidad.toLowerCase() != "publico") {
                            listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[1].token + " es " + atr.visibilidad.toLowerCase(), raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            return resultado;
                        }
                        var claseAux = obtenerClaseEstructura(atr.tipo);
                        if (claseAux != null) {
                            claseAnterior = claseActual;
                            claseActual = estructura;
                            inicializarVariable(raiz.hijos[1].token, claseAux, raiz.hijos[0].posicion);
                            claseActual = claseAnterior;
                        }

                        resultado.tipo = atr.tipo;
                        var t1 = generarTemp();
                        //listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        if (atr.heredada == true) {
                            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        } else {
                            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", var3d.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        }

                        if (cantidad == contador) {
                            if (asignar == null || asignar.tipo === "nada") {
                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                            } else {
                                if (atr.rol.toLowerCase() == "arreglo") {
                                    asignarArregloDinamico(atr, t1, "Heap", asignar, raiz.hijos[0].posicion);
                                } else {
                                    if (verificarTipo(atr, asignar.tipo, raiz.hijos[0].posicion)) {
                                        asignarVariable(asignar, t1, "global", raiz.hijos[1].posicion, true);
                                    }
                                }
                            }
                        } else {
                            temp = generarTemp();
                            listaCodigo.push(new Codigo(obtenerArreglo(temp, "Heap", t1, "Valor del atributo"), raiz.hijos[1].posicion.first_line));
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[1].token + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return;
                    }
                } else {
                    listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return;
                }
                resultado.posicion = contador;
            } else {                                                                  //'->' id
                if (verificarMemoria(nombre) == false) {
                    listaErrores.push(new Errores("Error Semantico", "No se ha reservado memoria en el puntero " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return;
                }
                var contador = 1;
                var var3d = obtenerVariable3D(nombre, raiz.hijos[1].posicion);
                var estructura = obtenerEstructura(var3d.tipo);
                if (estructura != null) {
                    listaCodigo = agregarLista(listaCodigo, var3d.codigo);
                    inicializarPuntero(nombre, estructura, var3d.posicionRef, raiz.hijos[0].posicion);
                    var atr = obtenerAtributo(estructura, raiz.hijos[1].token, "variable", raiz.hijos[1].posicion);
                    if (atr != null) {
                        var claseAux = obtenerClaseEstructura(atr.tipo);
                        if (claseAux != null) {
                            claseAnterior = claseActual;
                            claseActual = estructura;
                            inicializarVariable(raiz.hijos[1].token, claseAux, raiz.hijos[0].posicion);
                            claseActual = claseAnterior;
                        }

                        resultado.tipo = atr.tipo;
                        var t1 = generarTemp();
                        //listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", var3d.posicionRef, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        if (atr.heredada == true) {
                            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", var3d.posicionRef, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        } else {
                            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", var3d.posicionRef, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                        }
                        if (cantidad == contador) {
                            if (asignar == null || asignar.tipo === "nada") {
                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                            } else {
                                if (atr.rol.toLowerCase() == "arreglo") {
                                    asignarArregloDinamico(atr, t1, "Heap", asignar, raiz.hijos[0].posicion);
                                } else {
                                    if (verificarTipo(atr, asignar.tipo, raiz.hijos[0].posicion)) {
                                        asignarVariable(asignar, t1, "global", raiz.hijos[1].posicion, true);
                                    }
                                }
                            }
                        } else {
                            temp = generarTemp();
                            listaCodigo.push(new Codigo(obtenerArreglo(temp, "Heap", t1, "Valor del atributo"), raiz.hijos[1].posicion.first_line));
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[1].token + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return;
                    }
                } else {
                    listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return;
                }
                resultado.posicion = contador;
            }
            break;
        case 3:
            if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[1].nombre == ".") {//INSTANCIA '.' id     
                var rInstancia = asignarValorInstancia(nombre, raiz.hijos[0], asignar, cantidad);
                var estructura = obtenerClaseEstructura(rInstancia.tipo);
                if (rInstancia != null && estructura != null) {
                    claseAnterior = claseActual;
                    claseActual = estructura;
                    inicializarVariable(raiz.hijos[2].token, estructura, raiz.hijos[0].posicion);
                    claseActual = claseAnterior;

                    var atr = obtenerAtributo(estructura, raiz.hijos[2].token, "variable", raiz.hijos[1].posicion);
                    if (atr != null) {
                        if (atr.visibilidad.toLowerCase() != "publico") {
                            listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[2].token + " es " + atr.visibilidad.toLowerCase(), raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            return resultado;
                        }
                        resultado.tipo = atr.tipo;
                        var contador = rInstancia.posicion;
                        contador++;
                        var t1 = generarTemp();
                        //listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        if (atr.heredada == true) {
                            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        } else {
                            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        }
                        if (cantidad == contador) {
                            if (asignar == null || asignar.tipo === "nada") {
                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                            } else {
                                if (atr.rol.toLowerCase() == "arreglo") {
                                    asignarArregloDinamico(atr, t1, "Heap", asignar, raiz.hijos[0].posicion);
                                } else {
                                    if (verificarTipo(atr, asignar.tipo, raiz.hijos[0].posicion)) {
                                        asignarVariable(asignar, t1, "global", raiz.hijos[1].posicion, true);
                                    }
                                }
                            }
                        } else {
                            temp = generarTemp();
                            listaCodigo.push(new Codigo(obtenerArreglo(temp, "Heap", t1, "Valor del atributo"), raiz.hijos[1].posicion.first_line));
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[2].token + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return;
                    }
                    resultado.posicion = contador;
                } else {
                    listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return;
                }
            } else if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[1].nombre == "->") {// INSTANCIA '->' id      

                var rInstancia = asignarValorInstancia(nombre, raiz.hijos[0], asignar, cantidad);
                var estructura = obtenerClaseEstructura(rInstancia.tipo);
                if (rInstancia != null && estructura != null) {
                    claseAnterior = claseActual;
                    claseActual = estructura;
                    inicializarVariable(raiz.hijos[2].token, estructura, raiz.hijos[0].posicion);
                    claseActual = claseAnterior;

                    var atr = obtenerAtributo(estructura, raiz.hijos[2].token, "variable", raiz.hijos[1].posicion);
                    if (atr != null) {
                        if (atr.visibilidad.toLowerCase() != "publico") {
                            listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[2].token + " es " + atr.visibilidad.toLowerCase(), raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            return resultado;
                        }
                        resultado.tipo = atr.tipo;
                        var contador = rInstancia.posicion;
                        contador++;
                        var t1 = generarTemp();
                        //listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        if (atr.heredada == true) {
                            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicionHeredada, "Posicion del atributo heredado: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        } else {
                            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", rInstancia.valor, "+", atr.posicion, "Posicion del atributo: " + raiz.hijos[2].token), raiz.hijos[1].posicion.first_line));
                        }
                        if (cantidad == contador) {
                            if (asignar == null || asignar.tipo === "nada") {
                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                            } else {
                                if (atr.rol.toLowerCase() == "arreglo") {
                                    asignarArregloDinamico(atr, t1, "Heap", asignar, raiz.hijos[0].posicion);
                                } else {
                                    if (verificarTipo(atr, asignar.tipo, raiz.hijos[0].posicion)) {
                                        asignarVariable(asignar, t1, "global", raiz.hijos[1].posicion, true);
                                    }
                                }
                            }
                        } else {
                            temp = generarTemp();
                            listaCodigo.push(new Codigo(obtenerArreglo(temp, "Heap", t1, "Valor del atributo"), raiz.hijos[1].posicion.first_line));
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[2].token + " no existe", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return;
                    }
                    resultado.posicion = contador;
                } else {
                    listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                    return;
                }
            } else {                                                                        //'.' id DIMENSION

            }
            break;
    }
    resultado.valor = temp;
    resultado.rol = "temp";
    return resultado;
}

function contarInstancias(raiz) {
    var contador = 0;
    switch (raiz.hijos.length) {
        case 2:
            if (raiz.hijos[0].nombre == "." && raiz.hijos[1].nombre == "LLAMADA") { //'.' LLAMADA
                return -1;
            } else if (raiz.hijos[0].nombre == ".") {                              // '.' id                                
                contador = 1;
            } else {                                                        //'->' id
                contador = 1;
            }
            break;
        case 3:
            if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[2].nombre == "LLAMADA") { //INSTANCIA '.' LLAMADA 
                return -1;
            } else if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[1].nombre == ".") {//INSTANCIA '.' id     
                contador = contarInstancias(raiz.hijos[0]);
                contador++;
            } else if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[1].nombre == "->") {// INSTANCIA '->' id      
                contador = contarInstancias(raiz.hijos[0]);
                contador++;
            } else {                                                                        //'.' id DIMENSION
                contador = contarInstancias(raiz.hijos[0]);
                contador++;
            }
            break;
    }
    return contador;
}

function obtenerAtributo(claseEstructura, nombre, tipo, p) {
    try {
        for (var i = 0; i < claseEstructura.listaVariables.length; i++) {
            var v = claseEstructura.listaVariables[i];
            if (v.nombre.toLowerCase() === nombre.toLowerCase()) {
                return v;
            }
        }
        if (claseEstructura.rol == "clase") {
            if (claseEstructura.herencia != "") {
                return buscarVariablesHeredadas(nombre, claseEstructura, claseEstructura.listaVariables.length, p);
            }
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}