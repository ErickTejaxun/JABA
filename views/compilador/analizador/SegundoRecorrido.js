
sobrescrito = false;
contadorSent = 1;
contadorMetodos = 1;
listaEtqVSi = [];
listaEtqFSi = [];
listaArreglo = [];
valorSwitch = "";
listaRomper = [];
listaContinuar = [];
varRetorno = "";
boolEste = false;

class SegundoRecorrido {

    recorrer(raiz) {
        var result = null;

        if (raiz !== null) {
            // console.log(raiz.nombre + ":" + raiz.hijos.length);
            switch (raiz.nombre) {
                case "INICIO":
                    switch (raiz.hijos.length) {
                        case 2:
                            result = segundo.recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "ENTRADA":
                    claseActual = "";
                    metodoActual = "";
                    if (crearInit(0) == false) {
                        return;
                    }
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            result = segundo.recorrer(raiz.hijos[0]);
                            result = segundo.recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "IMPORTAR":
                    switch (raiz.hijos.length) {
                        case 4:
                            result = segundo.recorrer(raiz.hijos[2]);
                            break;
                        case 5:
                            result = segundo.recorrer(raiz.hijos[0]);
                            result = segundo.recorrer(raiz.hijos[3]);
                            break;
                    }
                    break;
                case "CLASES":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            result = segundo.recorrer(raiz.hijos[0]);
                            result = segundo.recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "CLASE":
                    switch (raiz.hijos.length) {                    //clase id '{' INSTRUCCIONES '}'
                        case 5:
                            var clase = obtenerClase(raiz.hijos[1].token);
                            if (clase != null) {
                                ambito.push(clase.nombre);
                                var claseAnterior = claseActual;
                                claseActual = clase;
                                listaCodigo.push(new Codigo("begin, , , " + clase.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                segundo.recorrerClaseGlobal(raiz.hijos[3]);
                                listaCodigo.push(new Codigo("end, , ," + clase.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[1].posicion.first_line));
                                result = segundo.recorrer(raiz.hijos[3]);
                                claseActual = claseAnterior;
                                ambito.pop();
                            }
                            break;
                        case 6:                                     //VISIBILIDAD clase id '{' INSTRUCCIONES '}'
                            var clase = obtenerClase(raiz.hijos[2].token);
                            if (clase != null) {
                                ambito.push(clase.nombre);
                                var claseAnterior = claseActual;
                                claseActual = clase;
                                listaCodigo.push(new Codigo("begin, , , " + clase.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                segundo.recorrerClaseGlobal(raiz.hijos[4]);
                                listaCodigo.push(new Codigo("end, , ," + clase.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[1].posicion.first_line));
                                result = segundo.recorrer(raiz.hijos[4]);
                                claseActual = claseAnterior;
                                ambito.pop();
                            }
                            break;
                        case 7:                                     //clase id hereda_de id '{' INSTRUCCIONES '}'
                            var clase = obtenerClase(raiz.hijos[1].token);
                            if (clase != null) {
                                ambito.push(clase.nombre);
                                var claseAnterior = claseActual;
                                claseActual = clase;
                                listaCodigo.push(new Codigo("begin, , , " + clase.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                segundo.recorrerClaseGlobal(raiz.hijos[5]);
                                //Herencia
                                var claseHeredada = obtenerClase(raiz.hijos[3].token);
                                if (claseHeredada != null) {
                                    var tam = obtenerTamanioAmbito();
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    var t4 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", "Posicion del this "), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, "Valor del this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t2, "+", clase.listaVariables.length, "Posicion de la clase " + raiz.hijos[1].token), raiz.hijos[1].posicion.first_line));
                                    var t5 = generarTemp();
                                    var t3 = generarTemp();
                                    var t6 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t5, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", claseHeredada.listaVariables.length, "Reservo el tam de la clase " + claseHeredada.nombre), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", clase.listaVariables.length, "Ambito simulado de clase " + clase.nombre), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t6, "=", t3, "+", "0", "Posicion del this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t6, t5, "Envio el inicio de " + claseHeredada.nombre), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", clase.listaVariables.length, "Cambio ambito"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("call, , , " + claseHeredada.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", clase.listaVariables.length, "Cambio ambito"), raiz.hijos[1].posicion.first_line));
                                }
                                listaCodigo.push(new Codigo("end, , ," + clase.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[1].posicion.first_line));
                                result = segundo.recorrer(raiz.hijos[5]);
                                claseActual = claseAnterior;
                                ambito.pop();
                            }
                            break;
                        case 8:                                     //VISIBILIDAD clase id hereda_de id '{' INSTRUCCIONES '}'
                            var clase = obtenerClase(raiz.hijos[2].token);
                            if (clase != null) {
                                ambito.push(clase.nombre);
                                var claseAnterior = claseActual;
                                claseActual = clase;
                                listaCodigo.push(new Codigo("begin, , , " + clase.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                segundo.recorrerClaseGlobal(raiz.hijos[5]);
                                listaCodigo.push(new Codigo("end, , ," + clase.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[1].posicion.first_line));
                                result = segundo.recorrer(raiz.hijos[5]);
                                claseActual = claseAnterior;
                                ambito.pop();
                            }
                            break;
                    }
                    metodoActual = "";
                    break;
                case "INSTRUCCIONES":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            result = segundo.recorrer(raiz.hijos[0]);
                            result = segundo.recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "INSTRUCCION":
                    switch (raiz.hijos.length) {
                        case 1:
                            if (raiz.hijos[0].token === 'romper') {
                            } else if (raiz.hijos[0].token === 'continuar') {
                            } else if (raiz.hijos[0].token === 'retorno') {
                            } else {
                                result = segundo.recorrer(raiz.hijos[0]);
                            }
                            break;
                        case 2:
                            result = segundo.recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "VISIBILIDAD":
                    result = raiz.hijos[0].token;
                    break;
                case "TIPO":
                    result = raiz.hijos[0].token;
                    break;
                case "DIMENSION":
                    //console.log("dim h = " + raiz.hijos.length);
                    switch (raiz.hijos.length) {
                        case 3:
                            var dim = []
                            result = segundo.recorrer(raiz.hijos[1]);
                            dim.push(result);
                            result = dim;
                            break;
                        case 4:
                            var dim = segundo.recorrer(raiz.hijos[0]);
                            var num = segundo.recorrer(raiz.hijos[2]);
                            dim.push(num);
                            result = dim;
                            break;
                    }
                    break;
                case "ARREGLO":
                    break;
                case "PRINCIPAL": //Principal '(' ')' '{'  INSTRUCCIONES '}'
                    var metodo = obtenerMetodo("principal", "principal", [], raiz.hijos[0].posicion);
                    if (metodo != null) {
                        listaCodigo.push(new Codigo("begin, , , " + metodo.nombreAux + "\n", raiz.hijos[0].posicion.first_line));
                        metodoActual = metodo;
                        ambito.push(metodo.nombre);
                        segundo.recorrerMetodos(raiz.hijos[4]);
                        ambito.pop();
                        listaCodigo.push(new Codigo("end, , , " + metodo.nombreAux + "\n", raiz.hijos[5].posicion.first_line));
                        listaCodigo.push(new Codigo("\n", raiz.hijos[5].posicion.first_line));
                    }
                    break;
                case "PROCEDIMIENTO":
                    switch (raiz.hijos.length) {
                        case 1:
                            segundo.recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            sobrescrito = true;
                            segundo.recorrer(raiz.hijos[1]);
                            sobrescrito = false;
                            break;
                    }
                    break;
                case "METODO":
                    var tipo = "";
                    var vis = "publico";
                    var nombre = "";
                    var exito = false;
                    var param = [];
                    var boolParam = 0;
                    switch (raiz.hijos.length) {
                        case 7:
                            if (raiz.hijos[0].nombre === "TIPO") {  //TIPO id '(' ')' '{' INSTRUCCIONES '}'
                                tipo = segundo.recorrer(raiz.hijos[0]);
                            } else {                                // id id '(' ')' '{' INSTRUCCIONES '}'
                                tipo = raiz.hijos[0].token;
                            }
                            nombre = raiz.hijos[1].token;
                            var metodo = obtenerMetodo(nombre, "metodo", [], raiz.hijos[0].posicion);
                            if (metodo != null) {
                                if (metodo.sobrescrito == true) {
                                    if (!buscarMetodoSobrescrito(nombre, claseActual, [])) {
                                        listaErrores.push(new Errores("Error Semantico", "El metodo " + nombre + " no se puede sobreescribir", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                        return null;
                                    }
                                }
                                var etqRetorno = generarEtq();
                                varRetorno = etqRetorno;
                                listaCodigo.push(new Codigo("begin, , , " + metodo.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                metodoActual = metodo;
                                ambito.push(metodo.nombre);
                                segundo.recorrerMetodos(raiz.hijos[5]);
                                ambito.pop();
                                listaCodigo.push(new Codigo(etqRetorno + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("end, , , " + metodo.nombreAux + "\n", raiz.hijos[6].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[6].posicion.first_line));
                            }
                            break;
                        case 8:
                            if (raiz.hijos[0].nombre === "VISIBILIDAD") {
                                vis = segundo.recorrer(raiz.hijos[0]);
                                nombre = raiz.hijos[2].token;
                                if (raiz.hijos[1].nombre === "TIPO") {  //VISIBILIDAD TIPO id '(' ')' '{' INSTRUCCIONES '}'
                                    tipo = segundo.recorrer(raiz.hijos[1]);
                                } else {                                //VISIBILIDAD id id '(' ')' '{' INSTRUCCIONES '}'
                                    tipo = raiz.hijos[1].token;
                                }
                            } else if (raiz.hijos[0].nombre === "TIPO") {
                                tipo = segundo.recorrer(raiz.hijos[0]);
                                nombre = raiz.hijos[1].token;
                                if (raiz.hijos[2].nombre === "DIMENSION") { //TIPO id DIMENSION '(' ')' '{' INSTRUCCIONES '}'
                                    var dim = segundo.recorrer(raiz.hijos[2]);
                                } else {                                    //TIPO id '(' PARAMETRO ')' '{' INSTRUCCIONES '}
                                    param = segundo.obtenerParametros(raiz.hijos[3]);
                                    boolParam = 3;
                                }
                            } else {                                        //id id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                                tipo = raiz.hijos[0].token;
                                nombre = raiz.hijos[1].token;
                                param = segundo.obtenerParametros(raiz.hijos[3]);
                                boolParam = 3;
                            }
                            var metodo = obtenerMetodo(nombre, "metodo", param, raiz.hijos[0].posicion);
                            if (metodo != null) {
                                if (metodo.sobrescrito == true) {
                                    if (!buscarMetodoSobrescrito(nombre, claseActual, param)) {
                                        listaErrores.push(new Errores("Error Semantico", "El metodo " + nombre + " no se puede sobreescribir", raiz.hijos[0].posicion.first_line, raiz.hijos[3].first_column));
                                        return null;
                                    }
                                }
                                var etqRetorno = generarEtq();
                                varRetorno = etqRetorno;
                                listaCodigo.push(new Codigo("begin, , , " + metodo.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                metodoActual = metodo;
                                ambito.push(metodo.nombre);
                                if (boolParam != 0) {
                                    segundo.recorrer(raiz.hijos[boolParam]);
                                }
                                segundo.recorrerMetodos(raiz.hijos[6]);
                                ambito.pop();
                                listaCodigo.push(new Codigo(etqRetorno + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("end, , , " + metodo.nombreAux + "\n", raiz.hijos[7].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[7].posicion.first_line));
                            }
                            break;
                        case 9:
                            if (raiz.hijos[0].nombre === "VISIBILIDAD") {
                                vis = segundo.recorrer(raiz.hijos[0]);
                                nombre = raiz.hijos[2].token;
                                if (raiz.hijos[0].nombre === "VISIBILIDAD") {
                                    if (raiz.hijos[1].nombre === "TIPO") {
                                        tipo = segundo.recorrer(raiz.hijos[1]);
                                        if (raiz.hijos[4].nombre === "DIMENSION") {//VISIBILIDAD TIPO id DIMENSION '(' ')' '{' INSTRUCCIONES '}'
                                            var dim = segundo.recorrer(raiz.hijos[3]);
                                        } else {                              // VISIBILIDAD TIPO id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                                            boolParam = 4;
                                            param = segundo.obtenerParametros(raiz.hijos[4]);
                                        }
                                    } else {
                                        tipo = raiz.hijos[1].token;
                                        if (raiz.hijos[4].nombre === "DIMENSION") {//VISIBILIDAD id id DIMENSION '(' ')' '{' INSTRUCCIONES '}'
                                            var dim = primer.recorrer(raiz.hijos[3]);
                                        } else {                              // VISIBILIDAD id id '(' PARAMETRO ')' '{' INSTRUCCIONES '}' 
                                            param = primer.recorrer(raiz.hijos[4]);
                                            boolParam = 4;
                                        }
                                    }
                                } else {                                //TIPO id DIMENSION '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                                    tipo = raiz.hijos[0].token;
                                    nombre = raiz.hijos[1].token;
                                    var dim = segundo.recorrer(raiz.hijos[2]);
                                    boolParam = 4;
                                    param = segundo.obtenerParametros(raiz.hijos[4]);
                                }
                            }
                            var metodo = obtenerMetodo(nombre, "metodo", param, raiz.hijos[0].posicion);
                            if (metodo != null) {
                                if (metodo.sobrescrito == true) {
                                    if (!buscarMetodoSobrescrito(nombre, claseActual, param)) {
                                        listaErrores.push(new Errores("Error Semantico", "El metodo " + nombre + " no se puede sobreescribir", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                        return null;
                                    }
                                }
                                var etqRetorno = generarEtq();
                                varRetorno = etqRetorno;
                                listaCodigo.push(new Codigo("begin, , , " + metodo.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                metodoActual = metodo;
                                ambito.push(metodo.nombre);
                                if (boolParam != 0) {
                                    segundo.recorrer(raiz.hijos[boolParam]);
                                }
                                segundo.recorrerMetodos(raiz.hijos[7]);
                                ambito.pop();
                                listaCodigo.push(new Codigo(etqRetorno + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("end, , , " + metodo.nombreAux + "\n", raiz.hijos[8].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[8].posicion.first_line));
                            }
                            break;
                        case 10:                                        //VISIBILIDAD TIPO id DIMENSION '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                            vis = segundo.recorrer(raiz.hijos[0]);
                            tipo = segundo.recorrer(raiz.hijos[1]);
                            nombre = raiz.hijos[2].token;
                            var dim = segundo.recorrer(raiz.hijos[3]);
                            c3dParam = segundo.recorrer(raiz.hijos[5]);
                            param = segundo.obtenerParametros(raiz.hijos[5]);
                            var metodo = obtenerMetodo(nombre, "metodo", param, raiz.hijos[0].posicion);
                            if (metodo != null) {
                                if (metodo.sobrescrito == true) {
                                    if (!buscarMetodoSobrescrito(nombre, claseActual, param)) {
                                        listaErrores.push(new Errores("Error Semantico", "El metodo " + nombre + " no se puede sobreescribir", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                        return null;
                                    }
                                }
                                var etqRetorno = generarEtq();
                                varRetorno = etqRetorno;
                                listaCodigo.push(new Codigo("begin, , , " + metodo.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                metodoActual = metodo;
                                ambito.push(metodo.nombre);
                                segundo.recorrer(raiz.hijos[5]); //param
                                segundo.recorrerMetodos(raiz.hijos[8]); //
                                ambito.pop();
                                listaCodigo.push(new Codigo(etqRetorno + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("end, , , " + metodo.nombreAux + "\n", raiz.hijos[9].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[9].posicion.first_line));
                            }
                            break;
                    }
                    break;
                case "PARAMETRO":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            var param = segundo.recorrer(raiz.hijos[0]);
                            param += segundo.recorrer(raiz.hijos[2]);
                            result = param;
                            break;
                    }
                    break;
                case "PARAM":
                    var c3dParam = "";
                    switch (raiz.hijos.length) {
                        case 2:  //TIPO id //id id
                            var variable = obtenerVariableLocal(raiz.hijos[1].token, raiz.hijos[1].posicion, false);
                            tipo = segundo.recorrerMetodos(raiz.hijos[0]);
                            if (variable != null) {
                                var t1 = generarTemp();
                                declararVariable(raiz.hijos[1].token, "local");
                            }
                            break;
                        case 3: //Tipo id dimen
                            var variable = obtenerVariableLocal(raiz.hijos[1].token, raiz.hijos[1].posicion, false);
                            tipo = segundo.recorrerMetodos(raiz.hijos[0]);
                            if (variable != null) {
                                var t1 = generarTemp();
                                declararVariable(raiz.hijos[1].token, "local");
                            }
                            break;
                    }
                    result = "";
                    break;
                case "CONSTRUCTOR":
                    var tipo = "vacio";
                    var vis = "publico";
                    var nombre = "";
                    var exito = false;
                    switch (raiz.hijos.length) {
                        case 6:                                 //id '(' ')' '{' INSTRUCCIONES '}'
                            nombre = raiz.hijos[0].token;
                            var metodo = obtenerMetodo(nombre, "constructor", [], raiz.hijos[0].posicion);
                            if (metodo != null) {
                                listaCodigo.push(new Codigo("begin, , , " + metodo.nombreAux + "\n", raiz.hijos[0].posicion.first_line));
                                metodoActual = metodo;
                                ambito.push(metodo.nombre);
                                segundo.recorrerMetodos(raiz.hijos[4]);
                                ambito.pop();
                                listaCodigo.push(new Codigo("end, , , " + metodo.nombreAux + "\n", raiz.hijos[5].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[5].posicion.first_line));
                            }
                            break;
                        case 7:
                            if (raiz.hijos[0].nombre === "VISIBILIDAD") { //VISIBILIDAD id '(' ')' '{' INSTRUCCIONES '}'
                                vis = segundo.recorrer(raiz.hijos[0]);
                                nombre = raiz.hijos[1].token;
                                var metodo = obtenerMetodo(nombre, "constructor", [], raiz.hijos[0].posicion);
                                if (metodo != null) {
                                    listaCodigo.push(new Codigo("begin, , , " + metodo.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                    metodoActual = metodo;
                                    ambito.push(metodo.nombre);
                                    segundo.recorrerMetodos(raiz.hijos[5]);
                                    ambito.pop();
                                    listaCodigo.push(new Codigo("end, , , " + metodo.nombreAux + "\n", raiz.hijos[6].posicion.first_line));
                                    listaCodigo.push(new Codigo("\n", raiz.hijos[6].posicion.first_line));
                                }
                            } else {                                      //id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                                nombre = raiz.hijos[0].token;
                                var param = segundo.obtenerParametros(raiz.hijos[2]);
                                var metodo = obtenerMetodo(nombre, "constructor", param, raiz.hijos[0].posicion);
                                if (metodo != null) {
                                    listaCodigo.push(new Codigo("begin, , , " + metodo.nombreAux + "\n", raiz.hijos[0].posicion.first_line));
                                    metodoActual = metodo;
                                    ambito.push(metodo.nombre);
                                    segundo.recorrer(raiz.hijos[2]); //Parametros
                                    segundo.recorrerMetodos(raiz.hijos[5]);
                                    ambito.pop();
                                    listaCodigo.push(new Codigo("end, , , " + metodo.nombreAux + "\n", raiz.hijos[6].posicion.first_line));
                                    listaCodigo.push(new Codigo("\n", raiz.hijos[6].posicion.first_line));
                                }
                            }
                            break;
                        case 8:                                 //VISIBILIDAD id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                            vis = segundo.recorrer(raiz.hijos[5]);
                            nombre = raiz.hijos[0].token;
                            var param = segundo.obtenerParametros(raiz.hijos[3]);
                            var metodo = obtenerMetodo(nombre, "constructor", param, raiz.hijos[0].posicion);
                            if (metodo != null) {
                                listaCodigo.push(new Codigo("begin, , , " + metodo.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                metodoActual = metodo;
                                ambito.push(metodo.nombre);
                                segundo.recorrer(raiz.hijos[3]); //Parametros
                                segundo.recorrerMetodos(raiz.hijos[6]);
                                ambito.pop();
                                listaCodigo.push(new Codigo("end, , , " + metodo.nombreAux + "\n", raiz.hijos[7].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[7].posicion.first_line));
                            }
                    }
                    break;
                case "ESTRUCTURA":
                    switch (raiz.hijos.length) {
                        case 5:                         //estructura id '[' INSTRUCCIONES ']' 
                            var estruct = obtenerEstructura(raiz.hijos[1].token, raiz.hijos[1].posicion);
                            if (estruct != null) {
                                /*listaCodigo.push(new Codigo("begin, , , " + estruct.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                metodoActual = estruct;
                                ambito.push(estruct.nombre);
                                segundo.recorrerClaseGlobal(raiz.hijos[3]);
                                ambito.pop();
                                listaCodigo.push(new Codigo("end, , , " + estruct.nombre + "_init\n", raiz.hijos[4].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[4].posicion.first_line));*/
                                var claseAnterior = claseActual;
                                claseActual = estruct;
                                listaCodigo.push(new Codigo("begin, , , " + estruct.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                segundo.recorrerClaseGlobal(raiz.hijos[3]);
                                listaCodigo.push(new Codigo("end, , ," + estruct.nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("\n", raiz.hijos[1].posicion.first_line));
                                //result = segundo.recorrer(raiz.hijos[3]);
                                claseActual = claseAnterior;
                            }
                            break;
                    }
                    break;
                case "OP":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "E":
                    //listaCodigoAux = [];
                    result = resolverOperacion(raiz);
                    //listaCodigoAux = [];
                    break;

            }
        }
        return result;
    }

    recorrerClaseGlobal(raiz) {
        var result = null;

        if (raiz !== null) {
            // console.log(raiz.nombre + ":" + raiz.hijos.length);
            switch (raiz.nombre) {
                case "INSTRUCCIONES":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.recorrerClaseGlobal(raiz.hijos[0]);
                            break;
                        case 2:
                            result = segundo.recorrerClaseGlobal(raiz.hijos[0]);
                            result = segundo.recorrerClaseGlobal(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "INSTRUCCION":
                    switch (raiz.hijos.length) {
                        case 1:
                            if (raiz.hijos[0].token === 'romper') {
                            } else if (raiz.hijos[0].token === 'continuar') {
                            } else if (raiz.hijos[0].token === 'retorno') {
                            } else {
                                result = segundo.recorrerClaseGlobal(raiz.hijos[0]);
                            }
                            break;
                        case 2:
                            result = segundo.recorrerClaseGlobal(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "VISIBILIDAD":
                    result = raiz.hijos[0].token;
                    break;
                case "TIPO":
                    result = raiz.hijos[0].token;
                    break;
                case "VARIABLE":
                    // console.log("Variable G = " + raiz.hijos.length);
                    var tipo = "";
                    var vis = "Publico";
                    var nombre = "";
                    var rol = "";
                    var dim = [];
                    var tam = 1;
                    switch (raiz.hijos.length) {
                        case 3:                                         //TIPO id ASIGNAR ';' -- //id id ASIGNAR ';'
                            var variable = obtenerVariableGlobal(raiz.hijos[1].token, raiz.hijos[1].posicion, false);
                            if (variable != null) {
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", ""), raiz.hijos[1].posicion.first_line));
                                var t2 = generarTemp();
                                listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                var t3 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion de la variable " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                var asignar = segundo.recorrerClaseGlobal(raiz.hijos[2]);
                                if (asignar == null || asignar.tipo == "nada") {
                                    if ((verificarExisteTipo(variable, raiz.hijos[0].posicion))) {
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t3, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                        declararVariable(raiz.hijos[1].token, "global");
                                    }
                                } else {
                                    if (esEstructuraDeDatos(variable.tipo)) {
                                        asignarEstructuraDeDatos(variable, t3, asignar, "Heap", raiz.hijos[0].posicion);
                                        declararVariable(raiz.hijos[1].token, "global");
                                    } else if (verificarTipo(variable, asignar.tipo, raiz.hijos[1].posicion)) {
                                        asignarVariable(asignar, t3, "global", raiz.hijos[1].posicion, false);
                                        declararVariable(raiz.hijos[1].token, "global");
                                    }
                                }
                            }

                            break;
                        case 4:
                            if (raiz.hijos[0].nombre === "VISIBILIDAD") {//VISIBILIDAD TIPO id ASIGNAR ';' //VISIBILIDAD id id ASIGNAR ';
                                vis = segundo.recorrerClaseGlobal(raiz.hijos[0]);
                                var variable = obtenerVariableGlobal(raiz.hijos[2].token, raiz.hijos[2].posicion, false);
                                if (variable != null) {
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", ""), raiz.hijos[1].posicion.first_line));
                                    var t2 = generarTemp();
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                    var t3 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion de la variable " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                    var asignar = segundo.recorrerClaseGlobal(raiz.hijos[3]);
                                    if (asignar == null || asignar.tipo == "nada") {
                                        if ((verificarExisteTipo(variable, raiz.hijos[0].posicion))) {
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t3, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                            declararVariable(raiz.hijos[2].token, "global");
                                        }
                                    } else {
                                        if (esEstructuraDeDatos(variable.tipo)) {
                                            asignarEstructuraDeDatos(variable, t3, asignar, "Heap", raiz.hijos[0].posicion);
                                            declararVariable(raiz.hijos[1].token, "global");
                                        } else if (verificarTipo(variable, asignar.tipo, raiz.hijos[1].posicion)) {
                                            asignarVariable(asignar, t3, "global", raiz.hijos[1].posicion, false);
                                            declararVariable(raiz.hijos[2].token, "global");
                                        }
                                    }
                                }

                            } else {
                                if (raiz.hijos[0].nombre === "TIPO") { // TIPO id DIMENSION ASIGNAR ';'
                                    tipo = segundo.recorrer(raiz.hijos[0]);
                                } else {                              // id id DIMENSION ASIGNAR ';'
                                    tipo = raiz.hijos[0].token;
                                }
                                dim = segundo.recorrerClaseGlobal(raiz.hijos[2]);
                                tam = obtenerTamanioArreglo(nombre, dim, raiz.hijos[2].posicion);
                                var variable = obtenerVariableGlobal(raiz.hijos[1].token, raiz.hijos[1].posicion, false);
                                if (variable != null) {
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", ""), raiz.hijos[1].posicion.first_line));
                                    var t2 = generarTemp();
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                    var t3 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion de la variable " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                    var asignar = segundo.recorrerClaseGlobal(raiz.hijos[3]);
                                    //declararArregloDinamico(t3, variable, dim, asignar, raiz.hijos[1].posicion);
                                    declararArregloDinamico(t3, variable, dim, asignar, raiz.hijos[1].posicion);
                                }
                                // declararVariable(raiz.hijos[1].token, "global");
                            }
                            break;
                        case 5:                                         //VISIBILIDAD TIPO id DIMENSION ASIGNAR ';'
                            vis = segundo.recorrerClaseGlobal(raiz.hijos[0]);
                            tipo = segundo.recorrerClaseGlobal(raiz.hijos[1]);
                            dim = segundo.recorrerClaseGlobal(raiz.hijos[3]);
                            tam = obtenerTamanioArreglo(nombre, dim, raiz.hijos[2].posicion);
                            var variable = obtenerVariableGlobal(raiz.hijos[2].token, raiz.hijos[2].posicion, false);
                            if (variable != null) {
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", ""), raiz.hijos[1].posicion.first_line));
                                var t2 = generarTemp();
                                listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                var t3 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion de la variable " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                var asignar = segundo.recorrerClaseGlobal(raiz.hijos[4]);
                                if (asignar == null || asignar.tipo == "nada") {
                                    if ((verificarExisteTipo(variable, raiz.hijos[0].posicion))) {
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t3, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                        declararVariable(raiz.hijos[2].token, "global");
                                    }
                                } else {
                                    if (esEstructuraDeDatos(variable.tipo)) {
                                        asignarEstructuraDeDatos(variable, t3, asignar, "Heap", raiz.hijos[0].posicion);
                                        declararVariable(raiz.hijos[1].token, "global");
                                    } else if (verificarTipo(variable, asignar.tipo, raiz.hijos[1].posicion)) {
                                        asignarVariable(asignar, t3, "global", raiz.hijos[1].posicion, false);
                                        declararVariable(raiz.hijos[2].token, "global");
                                    }
                                }
                            }

                            break;
                    }
                    break;
                case "DIMENSION":
                    switch (raiz.hijos.length) {
                        case 3:
                            var dim = []
                            result = segundo.recorrerMetodos(raiz.hijos[1]);
                            dim.push(result);
                            result = dim;
                            break;
                        case 4:
                            var dim = segundo.recorrerMetodos(raiz.hijos[0]);
                            var num = segundo.recorrerMetodos(raiz.hijos[2]);
                            dim.push(num);
                            result = dim;
                            break;
                    }
                    break;
                case "ASIGNAR":
                    switch (raiz.hijos.length) {
                        case 1:                                     //Nada
                            var resultado = new Expresion();
                            resultado.tipo = "nada";
                            result = resultado;
                            break;
                        case 2:                                     //'=' OP
                            result = segundo.recorrerMetodos(raiz.hijos[1]);
                            break;
                        case 4:                                     //'=' '{' ARREGLO '}' 
                            listaArreglo = [];
                            segundo.recorrerMetodos(raiz.hijos[2]);
                            result = listaArreglo;
                            break;
                        case 5:
                            if (raiz.hijos[2].nombre === "TIPO") {  //'=' nuevo TIPO '(' ')'

                            } else {                                //'=' nuevo id '(' ')'
                                var resultado = new Expresion();
                                var metodoAnterior = metodoActual;
                                var nombre = raiz.hijos[2].token;
                                var clase = obtenerClase(nombre);
                                if (clase != null) {
                                    var tam = obtenerTamanioAmbito();
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    var t3 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", "Posicion inicio de instancia"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", clase.listaVariables.length, "Reservar en el heap la clase nueva"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t1, "+", "0", "Posicion del this simulado"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, t2, "Envio el this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("call, , , " + nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                                    var constructor = obtenerConstructor(nombre, [], raiz.hijos[2].posicion);
                                    if (constructor != null) {
                                        metodoActual = constructor;
                                        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("call, , , " + constructor.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                                    }
                                    resultado.valor = t2;
                                    resultado.tipo = nombre;
                                    resultado.rol = "temp";
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre + " en asignar global", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                }
                                metodoActual = metodoAnterior;
                                result = resultado;
                            }
                            break;
                        case 6:
                            if (raiz.hijos[2].nombre === "TIPO") {
                                var resultado = new Expresion();
                                var estructura = segundo.recorrerMetodos(raiz.hijos[2]);
                                if (raiz.hijos[4].nombre === "TIPO") { //'=' nuevo TIPO '(' TIPO ')'
                                    var tipo = segundo.recorrerMetodos(raiz.hijos[4]);
                                    resultado.tipoEstructura = estructura;
                                    resultado.valor = varNulo;
                                    resultado.tipo = tipo;
                                } else {                            //'=' nuevo TIPO '(' id ')'
                                    resultado.tipoEstructura = estructura;
                                    resultado.tipo = raiz.hijos[4].token;
                                }
                                result = resultado;
                            } else {                                //'=' nuevo id '(' VALOR ')'
                                var resultado = new Expresion();
                                var metodoAnterior = metodoActual;
                                var nombre = raiz.hijos[2].token;
                                var clase = obtenerClase(nombre);
                                if (clase != null) {
                                    var tam = obtenerTamanioAmbito();
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    var t3 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", "Posicion inicio de instancia"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", clase.listaVariables.length, "Reservar en el heap la clase"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t1, "+", "0", "Posicion del this simulado"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, t2, "Envio el this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("call, , , " + nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                                    var param = segundo.recorrerMetodos(raiz.hijos[4]);
                                    var constructor = obtenerConstructor(nombre, param, raiz.hijos[2].posicion);
                                    if (constructor != null) {
                                        for (let i = 0; i < param.length; i++) {
                                            listaCodigo = agregarLista(listaCodigo, param[i].codigo);
                                        }
                                        metodoActual = constructor;
                                        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("call, , , " + constructor.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                                    }
                                    resultado.valor = t2;
                                    resultado.tipo = nombre;
                                    resultado.rol = "temp";
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                }
                                metodoActual = metodoAnterior;
                                result = resultado;
                            }
                            break;
                    }
                    break;
                case "ASIGNACION":
                    switch (raiz.hijos.length) {
                        case 2:
                            if (raiz.hijos[1].nombre === "ASIGNAR") {   //id ASIGNAR ';'
                                tipo = "global";
                                variable = obtenerVariableGlobal(raiz.hijos[0].token, raiz.hijos[0].posicion, true);
                                if (variable != null) {
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    var t3 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", "Posicion del this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                    //listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, ""), raiz.hijos[1].posicion.first_line));
                                    if (variable.heredada == true) {
                                        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicionHeredada, "Posicion de la variable heredada"), raiz.hijos[1].posicion.first_line));
                                    } else {
                                        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion de la variable"), raiz.hijos[1].posicion.first_line));
                                    }
                                    var asignar = segundo.recorrerMetodos(raiz.hijos[1]);
                                    if (asignar == null || asignar.tipo == "nada") {
                                        if (variable.rol == "arreglo") {
                                            asignarArregloDinamico(variable, t3, "Stack", asignar, raiz.hijos[0].posicion);
                                        } else if ((verificarExisteTipo(variable, raiz.hijos[0].posicion))) {
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                        }
                                    } else {
                                        if (variable.rol == "arreglo") {
                                            asignarArregloDinamico(variable, t3, "Stack", asignar, raiz.hijos[0].posicion);
                                        } else {
                                            if (esEstructuraDeDatos(variable.tipo)) {
                                                asignarEstructuraDeDatos(variable, t3, asignar, "Heap", raiz.hijos[0].posicion);
                                            } else if (verificarTipo(variable, asignar.tipo, raiz.hijos[0].posicion)) {
                                                asignarVariable(asignar, t3, tipo, raiz.hijos[0].posicion, true);
                                            }
                                        }
                                    }
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + raiz.hijos[0].token + " local ni globalmente", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    return;
                                }

                            } else if (raiz.hijos[1].nombre === "+") {  //id '+' '+' 

                            } else {                                    //id '-' '-' 

                            }
                            break;
                        case 3:
                            if (raiz.hijos[1].nombre === "DIMENSION") {     //id DIMENSION ASIGNAR

                            } else if (raiz.hijos[2].nombre === "ASIGNAR") {//id INSTANCIA ASIGNAR 

                            } else if (raiz.hijos[2].nombre === "+") {      // id INSTANCIA '+' '+'

                            } else {                                        // id INSTANCIA '-' '-' 

                            }
                            break;
                        case 4:                                             // este '.' id ASIGNAR 

                            break;
                        case 5:                                             // este '.' id INSTANCIA ASIGNAR
                            result = segundo.recorrerMetodos(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "ARREGLO":
                    break;
                case "PUNTEROS":
                    switch (raiz.hijos.length) {
                        case 4: //destruirPuntero '(' id ')' ';'
                            var variable = obtenerVariableGlobal(raiz.hijos[2].token, raiz.hijos[0].posicion, true);
                            if (variable != null) {
                                var t1 = generarTemp();
                                //listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, ""), raiz.hijos[1].posicion.first_line));
                                if (variable.heredada == true) {
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Posicion de la variable heredada "), raiz.hijos[1].posicion.first_line));
                                } else {
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Posicion de la variable "), raiz.hijos[1].posicion.first_line));
                                }
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                            }
                            break;
                        case 7: //crearPuntero '(' TIPO ',' id ')' ASIGNAR ';'//crearPuntero '(' id ',' id ')' ASIGNAR ';'
                            var variable = obtenerVariableGlobal(raiz.hijos[4].token, raiz.hijos[0].posicion, false);
                            if (variable != null) {
                                var t1 = generarTemp();
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", ""), raiz.hijos[1].posicion.first_line));
                                var t2 = generarTemp();
                                listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                var t3 = generarTemp();
                                //listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion de la variable " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                if (variable.heredada == true) {
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicionHeredada, "Posicion de la variable heredada " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                } else {
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion de la variable " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                }
                                var asignar = segundo.recorrerClaseGlobal(raiz.hijos[6]);
                                if (asignar == null || asignar.tipo == "nada") {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t3, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                } else {
                                    if (asignar.rolVariable == "puntero") {
                                        var t2 = generarTemp();
                                        asignar.codigo.push(new Codigo(obtenerArreglo(t2, "Stack", asignar.posicion, "Obtengo la referencia"), raiz.hijos[1].posicion.first_line));
                                        asignar.valor = t2;
                                        variable.ambitoDireccion = asignar.ambitoVariable;
                                    } else {
                                        variable.ambitoDireccion = asignar.ambito;
                                    }
                                    asignarVariable(asignar, t3, "global", raiz.hijos[0].posicion, false);
                                    variable.ambitoDireccion = asignar.ambito;
                                }
                                declararVariable(raiz.hijos[4].token, "global");

                            }
                            break;
                    }
                    break;
                case "MEMORIA":
                    switch (raiz.hijos.length) {
                        case 4:
                            if (raiz.hijos[0].nombre == "obtenerDireccion") {             //obtenerDireccion '(' id ')'
                                var variable = obtenerVariableGlobal(raiz.hijos[2].token, 0, true);
                                if (variable != null) { //Se encontro 
                                    var t1 = generarTemp();
                                    listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", ""), posicion.first_line));
                                    var t2 = generarTemp();
                                    listaCodigoAux.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), posicion.first_line));
                                    var t3 = generarTemp();
                                    //listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Obtengo la posicion de la variable global " + dato), posicion.first_line));
                                    if (variable.heredada == true) {
                                        listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicionHeredada, "Posicion de la variable heredada"), raiz.hijos[1].posicion.first_line));
                                    } else {
                                        listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion de la variable global"), raiz.hijos[1].posicion.first_line));
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
                                    if (variable.rol.toLowerCase() == "arreglo") {
                                        var t2 = generarTemp();
                                        var t3 = generarTemp();
                                        listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", resultado.valor, "+", variable.dimension.length, "Obtener el tamanio"), posicion.first_line));
                                        listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", t2, "+", "1", ""), posicion.first_line));
                                        listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t2, "Posicion del arreglo real"), posicion.first_line));
                                        resultado.codigo = listaCodigoAux;
                                        resultado.tipo = variable.tipo;
                                        resultado.ambito = "global";
                                        resultado.posicion = resultado.valor;
                                        resultado.tamanio = variable.dimension;
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
                                            listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Stack", resultado.valor, "Obtengo el valor del puntero con referencia local"), posicion.first_line));
                                            resultado.valor = t3;
                                            resultado.codigo = listaCodigoAux;
                                        } else {
                                            listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", resultado.valor, "Obtengo el valor del puntero con referencia global"), posicion.first_line));
                                            resultado.valor = t3;
                                            resultado.codigo = listaCodigoAux;
                                        }
                                        listaCodigoAux.push(new Codigo(etqF + ":\n", posicion.first_line));
                                    }
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "Error no se ha encontrado la variable3d : " + dato + " local ni globalmente", posicion.first_line, posicion.first_column));
                                    resultado.valor = "error";
                                    resultado.tipo = "error";
                                    return resultado;
                                }
                                if (variable.rol != "arreglo") {
                                    result.valor = result.posicion;
                                }

                            } else if (raiz.hijos[0].nombre == "reservarMemoria") {        //reservarMemoria '(' OP ')' 
                                var resultado = segundo.recorrerClaseGlobal(raiz.hijos[2]);
                                var listaAux = [];
                                if (resultado.tipo.toLowerCase() == "entero") {
                                    var t0 = generarTemp();
                                    var t1 = generarTemp();
                                    var etqV = generarEtq();
                                    var etqF = generarEtq();
                                    listaAux.push(new Codigo(generarCuadruplo(t0, "=", "H", "", "", ""), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(t1, "=", resultado.valor, "", "", "Contador"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(etqF + ":\n", raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(etqV, "=", t1, operadorRelacional("=="), "0", "Reservar memoria"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", varNulo, ""), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(t1, "=", t1, "-", "1", "Contador"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(etqV + ":\n", raiz.hijos[0].posicion.first_line));
                                    resultado.codigo = agregarLista(resultado.codigo, listaAux);
                                    resultado.valor = t0;
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "El tipo en reservar memoria no es entero", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    resultado.rol = 'error';
                                    resultado.tipo = 'error';
                                    return;
                                }
                                resultado.rol = "temp";
                                return resultado;
                            } else {                                                      //consultarTamanio '(' OP ')'
                                var resultado = segundo.recorrerClaseGlobal(raiz.hijos[2]);
                                if (resultado.valor != "error" && resultado.rolVariable == "arreglo") {
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", resultado.posicion, "+", resultado.tamanio.length, ""), raiz.hijos[0].posicion.first_line));
                                    resultado.codigo.push(new Codigo(obtenerArreglo(t2, "Heap", t1, "Tamanio del arreglo"), raiz.hijos[0].posicion.first_line));
                                    resultado.valor = t2;
                                }
                                if (resultado.valor == "error") {
                                    for (var i = 0; i < claseActual.listaEstructuras.length; i++) {
                                        var m = claseActual.listaEstructuras[i];
                                        if (m.nombre.toLowerCase() === resultado.valorTemp.toLowerCase()) {
                                            resultado.valor = m.contadorPosicion;
                                            resultado.tipo = "entero";
                                            resultado.rol = "valor";
                                        }
                                    }
                                    for (var i = 0; i < tablaSimbolos.length; i++) {
                                        var m = tablaSimbolos[i];
                                        if (m.nombre.toLowerCase() === resultado.valorTemp.toLowerCase()) {
                                            resultado.valor = m.contadorPosicion;
                                            resultado.tipo = "entero";
                                            resultado.rol = "valor";
                                        }
                                    }
                                }
                                result = resultado;
                            }
                            break;
                    }
                    break;
                case "OP":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.recorrerClaseGlobal(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "E":
                    //listaCodigoAux = [];
                    result = resolverOperacion(raiz);
                    //listaCodigoAux = [];
                    break;
            }
        }
        return result;
    }

    recorrerMetodos(raiz) {
        var result = null;
        if (raiz !== null) {
            //console.log(raiz.nombre + ":" + raiz.hijos.length);
            switch (raiz.nombre) {
                case "INSTRUCCIONES":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.recorrerMetodos(raiz.hijos[0]);
                            break;
                        case 2:
                            result = segundo.recorrerMetodos(raiz.hijos[0]);
                            result = segundo.recorrerMetodos(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "INSTRUCCION":
                    switch (raiz.hijos.length) {
                        case 1:
                            if (raiz.hijos[0].nombre === 'romper') {
                                if (listaRomper.length > 0) {
                                    var etqRomper = listaRomper[listaRomper.length - 1];
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqRomper, "=", "", "jmp", "", "Romper"), raiz.hijos[0].posicion.first_line));
                                    //listaRomper.pop();
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No se pueden colocar un romper en esa posicion ", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                }
                            } else if (raiz.hijos[0].nombre === 'continuar') {
                                if (listaContinuar.length > 0) {
                                    var etqContinuar = listaContinuar[listaContinuar.length - 1];
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqContinuar, "=", "", "jmp", "", "Continuar"), raiz.hijos[0].posicion.first_line));
                                    //listaContinuar.pop();
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No se pueden colocar un continuar en esa posicion ", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                }
                            } else if (raiz.hijos[0].nombre === 'retorno') {
                                listaCodigo.push(new Codigo(generarCuadruplo(varRetorno, "=", "", "jmp", "", "Retornar"), raiz.hijos[0].posicion.first_line));
                            } else {
                                result = segundo.recorrerMetodos(raiz.hijos[0]);
                            }
                            break;
                        case 2:
                            if (raiz.hijos[0].nombre === 'romper') {
                                if (listaRomper.length > 0) {
                                    var etqRomper = listaRomper[listaRomper.length - 1];
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqRomper, "=", "", "jmp", "", "Romper"), raiz.hijos[0].posicion.first_line));
                                    //listaRomper.pop();
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No se pueden colocar un romper en esa posicion ", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                }
                            } else if (raiz.hijos[0].nombre === 'retorno') {    //retorno OP

                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "1", "Retorno"), raiz.hijos[1].posicion.first_line));
                                var retorno = segundo.recorrerMetodos(raiz.hijos[1]);
                                var tipo = "Stack";
                                //metodoActual.retorno = true;
                                if (retorno.tipo.toLowerCase() == metodoActual.tipo.toLowerCase()) {
                                    if (retorno.rol == 'temp') {
                                        listaCodigo = agregarLista(listaCodigo, retorno.codigo);
                                        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, t1, retorno.valor, ""), raiz.hijos[1].posicion.first_line));
                                    } else if (retorno.rol == "relacional") {
                                        var etqFin = generarEtq();
                                        listaCodigo = agregarLista(listaCodigo, retorno.codigo);
                                        listaCodigo.push(new Codigo(retorno.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, t1, "1", ""), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(retorno.etqF + ":\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, t1, "0", ""), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(etqFin + ":\n", raiz.hijos[1].posicion.first_line));

                                    } else if (retorno.tipo == 'cadena' || retorno.tipo == 'caracter') {
                                        var t2 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[1].posicion.first_line));
                                        for (var i = 0; i < retorno.valor.length; i++) {
                                            var asc = retorno.valor.charCodeAt(i);
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + retorno.valor[i] + "'"), raiz.hijos[1].posicion.first_line));
                                            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", "Aumento el contador del heap"), raiz.hijos[1].posicion.first_line));
                                        }
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, t1, t2, ""), raiz.hijos[1].posicion.first_line));
                                    } else {//valores puntuales
                                        var t2 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", retorno.valor, "", "", ""), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(guardarEnArreglo(tipo, t1, t2, ""), raiz.hijos[1].posicion.first_line));
                                    }
                                    listaCodigo.push(new Codigo(generarCuadruplo(varRetorno, "=", "", "jmp", "", "Retornar"), raiz.hijos[1].posicion.first_line));
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "El tipo del retorno es incorrecto ", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    //metodoActual.retorno = false;
                                }
                            } else {                                            //id INSTANCIA
                                result = obtenerValorInstancia(raiz.hijos[0].token, raiz.hijos[1]);
                            }
                            break;
                    }
                    break;
                case "VISIBILIDAD":
                    result = raiz.hijos[0].token;
                    break;
                case "TIPO":
                    result = raiz.hijos[0].token;
                    break;
                case "VARIABLE":  //LOCAL
                    //console.log("Variable M = " + raiz.hijos.length);
                    var tipo = "";
                    var vis = "Publico";
                    var nombre = "";
                    var rol = "";
                    var dim = [];
                    var tam = 1;
                    switch (raiz.hijos.length) {
                        case 3:                                         //TIPO id ASIGNAR ';' -- //id id ASIGNAR ';'
                            var variable = obtenerVariableLocal(raiz.hijos[1].token, raiz.hijos[1].posicion, false);
                            if (variable != null) {
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Posicion de la variablee " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                var asignar = segundo.recorrerMetodos(raiz.hijos[2]);
                                if (asignar == null || asignar.tipo == "nada") {
                                    if ((verificarExisteTipo(variable, raiz.hijos[0].posicion))) {
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                        declararVariable(raiz.hijos[1].token, "local");
                                    }
                                } else {
                                    if (esEstructuraDeDatos(variable.tipo)) {
                                        asignarEstructuraDeDatos(variable, t1, asignar, "Stack", raiz.hijos[0].posicion);
                                        declararVariable(raiz.hijos[1].token, "local");
                                    } else if (verificarTipo(variable, asignar.tipo, raiz.hijos[1].posicion)) {
                                        asignarVariable(asignar, t1, "local", raiz.hijos[1].posicion, false);
                                        declararVariable(raiz.hijos[1].token, "local");
                                    }
                                }
                            }

                            break;
                        case 4:
                            if (raiz.hijos[0].nombre === "VISIBILIDAD") { //VISIBILIDAD TIPO id ASIGNAR ';' //VISIBILIDAD id id ASIGNAR ';'
                                vis = segundo.recorrerMetodos(raiz.hijos[0]);
                                var variable = obtenerVariableLocal(raiz.hijos[2].token, raiz.hijos[2].posicion, false);
                                if (variable != null) {
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Posicion de la variablee " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                    var asignar = segundo.recorrerMetodos(raiz.hijos[3]);
                                    if (asignar == null || asignar.tipo == "nada") {
                                        if ((verificarExisteTipo(variable, raiz.hijos[0].posicion))) {
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                            declararVariable(raiz.hijos[2].token, "local");
                                        }
                                    } else {
                                        if (esEstructuraDeDatos(variable.tipo)) {
                                            asignarEstructuraDeDatos(variable, t1, asignar, "Stack", raiz.hijos[0].posicion);
                                            declararVariable(raiz.hijos[1].token, "local");
                                        } else if (verificarTipo(variable, asignar.tipo, raiz.hijos[1].posicion)) {
                                            asignarVariable(asignar, t1, "local", raiz.hijos[1].posicion, false);
                                            declararVariable(raiz.hijos[2].token, "local");
                                        }
                                    }
                                }


                            } else {// TIPO id DIMENSION ASIGNAR ';' // id id DIMENSION ASIGNAR ';'
                                var variable = obtenerVariableLocal(raiz.hijos[1].token, raiz.hijos[1].posicion, false);
                                if (variable != null) {
                                    var t1 = generarTemp();
                                    var dim = segundo.recorrerMetodos(raiz.hijos[2]);
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Posicion de la variablee " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                    var asignar = segundo.recorrerMetodos(raiz.hijos[3]);
                                    declararArregloDinamico(t1, variable, dim, asignar, raiz.hijos[1].posicion);
                                }
                                //declararVariable(raiz.hijos[1].token, "local");
                            }
                            break;
                        case 5:                                         //VISIBILIDAD TIPO id DIMENSION ASIGNAR ';'
                            vis = segundo.recorrerMetodos(raiz.hijos[0]);
                            var variable = obtenerVariableLocal(raiz.hijos[2].token, raiz.hijos[2].posicion, false);
                            if (variable != null) {
                                var t1 = generarTemp();
                                var dim = segundo.recorrerMetodos(raiz.hijos[3]);
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Posicion de la variablee " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                var asignar = segundo.recorrerMetodos(raiz.hijos[4]);
                                declararArregloDinamico(t1, variable, dim, asignar, raiz.hijos[1].posicion);
                            }
                            //declararVariable(raiz.hijos[2].token, "local");
                            break;
                    }
                    break;
                case "DIMENSION":
                    if (claseAuxiliar != "") {
                        var claseAnterior = claseActual;
                        claseActual = claseAuxiliar;
                    }
                    switch (raiz.hijos.length) {
                        case 3:
                            var dim = []
                            result = segundo.recorrerMetodos(raiz.hijos[1]);
                            dim.push(result);
                            result = dim;
                            break;
                        case 4:
                            var dim = segundo.recorrerMetodos(raiz.hijos[0]);
                            var num = segundo.recorrerMetodos(raiz.hijos[2]);
                            dim.push(num);
                            result = dim;
                            break;
                    }
                    if (claseAuxiliar != "") {
                        claseActual = claseAnterior;
                    }
                    break;
                case "ASIGNAR":
                    switch (raiz.hijos.length) {
                        case 1:                                     //Nada
                            var resultado = new Expresion();
                            resultado.tipo = "nada";
                            result = resultado;
                            break;
                        case 2:                                     //'=' OP
                            result = segundo.recorrerMetodos(raiz.hijos[1]);
                            break;
                        case 4:                                     //'=' '{' ARREGLO '}' 
                            listaArreglo = [];
                            segundo.recorrerMetodos(raiz.hijos[2]);
                            result = listaArreglo;
                            break;
                        case 5:
                            if (raiz.hijos[2].nombre === "TIPO") {  //'=' nuevo TIPO '(' ')'

                            } else {                                //'=' nuevo id '(' ')'
                                var resultado = new Expresion();
                                var metodoAnterior = metodoActual;
                                var nombre = raiz.hijos[2].token;
                                var clase = obtenerClase(nombre);
                                if (clase != null) {
                                    var tam = obtenerTamanioAmbito();
                                    //var tam = clase.listaVariables.length;
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    var t3 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", "Posicion inicio de instancia"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", clase.listaVariables.length, "Reservar en el heap la clase"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t1, "+", "0", "Posicion del this simulado"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, t2, "Envio el this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("call, , , " + nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                                    var constructor = obtenerConstructor(nombre, [], raiz.hijos[2].posicion);
                                    if (constructor != null) {
                                        metodoActual = constructor;
                                        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("call, , , " + constructor.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                                    }
                                    resultado.valor = t2;
                                    resultado.tipo = nombre;
                                    resultado.rol = "temp";
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre + " en asignar local", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                }
                                metodoActual = metodoAnterior;
                                result = resultado;
                            }
                            break;
                        case 6:
                            if (raiz.hijos[2].nombre === "TIPO") {
                                var resultado = new Expresion();
                                var estructura = segundo.recorrerMetodos(raiz.hijos[2]);
                                if (raiz.hijos[4].nombre === "TIPO") { //'=' nuevo TIPO '(' TIPO ')'
                                    var tipo = segundo.recorrerMetodos(raiz.hijos[4]);
                                    resultado.tipoEstructura = estructura;
                                    resultado.valor = varNulo;
                                    resultado.tipo = tipo;
                                } else {                            //'=' nuevo TIPO '(' id ')'
                                    resultado.tipoEstructura = estructura;
                                    resultado.tipo = raiz.hijos[4].token;
                                }
                                result = resultado;
                            } else {                                //'=' nuevo id '(' VALOR ')'
                                var resultado = new Expresion();
                                var metodoAnterior = metodoActual;
                                var nombre = raiz.hijos[2].token;
                                var clase = obtenerClase(nombre);
                                if (clase != null) {
                                    var tam = obtenerTamanioAmbito();
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    var t3 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", "Posicion inicio de instancia"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", clase.listaVariables.length, "Reservar en el heap la clase nueva"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t1, "+", "0", "Posicion del this simulado"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, t2, "Envio el this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("call, , , " + nombre + "_init\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                                    var param = segundo.recorrerMetodos(raiz.hijos[4]);
                                    var constructor = obtenerConstructor(nombre, param, raiz.hijos[2].posicion);
                                    if (constructor != null) {
                                        for (let i = 0; i < param.length; i++) {
                                            listaCodigo = agregarLista(listaCodigo, param[i].codigo);
                                        }
                                        metodoActual = constructor;
                                        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("call, , , " + constructor.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                                    }
                                    resultado.valor = t2;
                                    resultado.tipo = nombre;
                                    resultado.rol = "temp";
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No existe la clase " + nombre + " en asignar local", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                }
                                metodoActual = metodoAnterior;
                                result = resultado;
                            }
                            break;
                    }
                    break;
                case "ASIGNACION":
                    switch (raiz.hijos.length) {
                        case 2:
                            if (raiz.hijos[1].nombre === "ASIGNAR") {   //id ASIGNAR ';'
                                var tipo = "local";
                                var variable = obtenerVariableLocal(raiz.hijos[0].token, raiz.hijos[0].posicion, true);
                                if (variable != null) {
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, ""), raiz.hijos[1].posicion.first_line));
                                    // listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                    var asignar = segundo.recorrerMetodos(raiz.hijos[1]);
                                    if (asignar == null || asignar.tipo == "nada") {
                                        if (variable.rol == "arreglo") {
                                            asignarArregloDinamico(variable, t1, "Stack", asignar, raiz.hijos[0].posicion);
                                        } else if ((verificarExisteTipo(variable, raiz.hijos[0].posicion))) {
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                        }
                                    } else {
                                        if (variable.rol == "arreglo") {
                                            asignarArregloDinamico(variable, t1, "Stack", asignar, raiz.hijos[0].posicion);
                                        } else {
                                            if (asignar.rolVariable == "puntero") {
                                                var t2 = generarTemp();
                                                asignar.codigo.push(new Codigo(obtenerArreglo(t2, "Stack", asignar.posicion, "Obtengo la referencia"), raiz.hijos[1].posicion.first_line));
                                                asignar.valor = t2;
                                                variable.ambitoDireccion = asignar.ambitoVariable;
                                            } else {
                                                variable.ambitoDireccion = asignar.ambito;
                                            }
                                            if (esEstructuraDeDatos(variable.tipo)) {
                                                asignarEstructuraDeDatos(variable, t1, asignar, raiz.hijos[0].posicion);
                                            } else if (verificarTipo(variable, asignar.tipo, raiz.hijos[0].posicion)) {
                                                asignarVariable(asignar, t1, tipo, raiz.hijos[0].posicion, true);
                                            }
                                        }
                                    }
                                } else {
                                    tipo = "global";
                                    variable = obtenerVariableGlobal(raiz.hijos[0].token, raiz.hijos[0].posicion, true);
                                    if (variable != null) {
                                        var t1 = generarTemp();
                                        var t2 = generarTemp();
                                        var t3 = generarTemp();
                                        var t4 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", "Posicion del this"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                        //listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion variable"), raiz.hijos[1].posicion.first_line));
                                        if (variable.heredada == true) {
                                            listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicionHeredada, "Posicion variable heredada"), raiz.hijos[1].posicion.first_line));
                                        } else {
                                            listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion variable global"), raiz.hijos[1].posicion.first_line));
                                        }
                                        //  listaCodigo.push(new Codigo(obtenerArreglo(t4, "Heap", t3, ""), raiz.hijos[1].posicion.first_line));
                                        var asignar = segundo.recorrerMetodos(raiz.hijos[1]);
                                        if (asignar == null || asignar.tipo == "nada") {
                                            if (variable.rol == "arreglo") {
                                                asignarArregloDinamico(variable, t4, "Heap", asignar, raiz.hijos[0].posicion);
                                            } else if ((verificarExisteTipo(variable, raiz.hijos[0].posicion))) {
                                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t4, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                            }
                                        } else {
                                            if (variable.rol == "arreglo") {
                                                asignarArregloDinamico(variable, t3, "Heap", asignar, raiz.hijos[0].posicion);
                                            } else {
                                                if (asignar.rolVariable == "puntero") {
                                                    var t2 = generarTemp();
                                                    asignar.codigo.push(new Codigo(obtenerArreglo(t2, "Stack", asignar.posicion, "Obtengo la referencia"), raiz.hijos[1].posicion.first_line));
                                                    asignar.valor = t2;
                                                    variable.ambitoDireccion = asignar.ambitoVariable;
                                                } else {
                                                    variable.ambitoDireccion = asignar.ambito;
                                                }
                                                if (esEstructuraDeDatos(variable.tipo)) {
                                                    asignarEstructuraDeDatos(variable, t3, asignar, "Heap", raiz.hijos[0].posicion);
                                                } else if (verificarTipo(variable, asignar.tipo, raiz.hijos[0].posicion)) {
                                                    asignarVariable(asignar, t3, tipo, raiz.hijos[0].posicion, true);
                                                }
                                            }
                                        }
                                    } else {
                                        listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + raiz.hijos[0].token + " local ni globalmente", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                        return;
                                    }
                                }
                            } else if (raiz.hijos[1].nombre === "++") {  //id '+' '+' 
                                aumento(raiz.hijos[0].token, raiz.hijos[0].posicion, "+");
                            } else {                                    //id '-' '-' 
                                aumento(raiz.hijos[0].token, raiz.hijos[0].posicion, "-");
                            }
                            break;
                        case 3:
                            if (raiz.hijos[1].nombre === "DIMENSION") {     //id DIMENSION ASIGNAR
                                result = segundo.recorrerMetodos(raiz.hijos[1]);
                                var asignar = segundo.recorrerMetodos(raiz.hijos[2]);
                                asignarValorArreglo(raiz.hijos[0].token, result, asignar, raiz.hijos[0].posicion);

                            } else if (raiz.hijos[2].nombre === "ASIGNAR") {//id INSTANCIA ASIGNAR 
                                result = segundo.recorrerMetodos(raiz.hijos[2]);
                                var cant = contarInstancias(raiz.hijos[1]);
                                if (cant > 0) {
                                    asignarValorInstancia(raiz.hijos[0].token, raiz.hijos[1], result, cant);
                                } else {
                                    obtenerValorInstancia(raiz.hijos[0].token, raiz.hijos[1]);
                                }

                            } else if (raiz.hijos[2].nombre === "OP") { //id OP_ASIGNACION OP
                                var resultado = obtenerVariable3D(raiz.hijos[0].token, raiz.hijos[0].posicion);
                                var asignar = segundo.recorrerMetodos(raiz.hijos[2]);
                                var operando = raiz.hijos[1].nombre;
                                if (resultado.valor != "error") {
                                    listaCodigo = agregarLista(listaCodigo, resultado.codigo);
                                    listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                                    if (resultado.tipo == asignar.tipo) {
                                        if (resultado.ambito == "local" && (resultado.tipo == "entero" || resultado.tipo == "decimal")) {
                                            var t1 = generarTemp();
                                            listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", resultado.valor, operando, asignar.valor, ""), raiz.hijos[1].posicion.first_line));
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Stack", resultado.posicion, t1, "Guardo la variable"), raiz.hijos[1].posicion.first_line));
                                        } else { //global
                                            if (resultado.tipo == "caracter" || resultado.tipo == "entero" || resultado.tipo == "decimal") {
                                                var t1 = generarTemp();
                                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", resultado.valor, operando, asignar.valor, ""), raiz.hijos[1].posicion.first_line));
                                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", resultado.posicion, t1, "Guardo la variable"), raiz.hijos[1].posicion.first_line));
                                            } else {
                                                listaErrores.push(new Errores("Error Semantico", "No se pueden realizar la asignacion: " + raiz.hijos[0].token + operando + asignar.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                            }
                                        }
                                        break;
                                    } else {
                                        listaErrores.push(new Errores("Error Semantico", "No se pueden realizar la asignacion: " + raiz.hijos[0].token + operando + asignar.valor, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    }
                                }

                            } else if (raiz.hijos[2].nombre === "++") {      // id INSTANCIA '+' '+'
                                // result = segundo.recorrerMetodos(raiz.hijos[2]);
                                result = obtenerValorInstancia(raiz.hijos[0].token, raiz.hijos[1]);
                                listaCodigo = agregarLista(listaCodigo, result.codigo);
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", result.valor, "+", "1", "Aumento"), raiz.hijos[0].posicion.first_line));
                                result.valor = t1;
                                var cant = contarInstancias(raiz.hijos[1]);
                                if (cant > 0) {
                                    asignarValorInstancia(raiz.hijos[0].token, raiz.hijos[1], result, cant);
                                }
                            } else {                                        // id INSTANCIA '-' '-' 
                                result = obtenerValorInstancia(raiz.hijos[0].token, raiz.hijos[1]);
                                listaCodigo = agregarLista(listaCodigo, result.codigo);
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", result.valor, "-", "1", "Aumento"), raiz.hijos[0].posicion.first_line));
                                result.valor = t1;
                                var cant = contarInstancias(raiz.hijos[1]);
                                if (cant > 0) {
                                    asignarValorInstancia(raiz.hijos[0].token, raiz.hijos[1], result, cant);
                                }
                            }
                            break;
                        case 4:                                             // este '.' id ASIGNAR 
                            if (raiz.hijos[3].nombre == "ASIGNAR") {
                                var tipo = "global";
                                variable = obtenerVariableGlobal(raiz.hijos[2].token, raiz.hijos[0].posicion, true);
                                if (variable != null) {
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    var t3 = generarTemp();
                                    var t4 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", "Posicion del this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                    if (variable.heredada == true) {
                                        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicionHeredada, "Posicion variable heredada"), raiz.hijos[1].posicion.first_line));
                                    } else {
                                        listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Posicion variable global"), raiz.hijos[1].posicion.first_line));
                                    }
                                    var asignar = segundo.recorrerMetodos(raiz.hijos[3]);
                                    if (asignar == null || asignar.tipo == "nada") {
                                        if (variable.rol == "arreglo") {
                                            asignarArregloDinamico(variable, t4, "Heap", asignar, raiz.hijos[0].posicion);
                                        } else if ((verificarExisteTipo(variable, raiz.hijos[0].posicion))) {
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t4, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                        }
                                    } else {
                                        if (variable.rol == "arreglo") {
                                            asignarArregloDinamico(variable, t3, "Heap", asignar, raiz.hijos[0].posicion);
                                        } else {
                                            if (asignar.rolVariable == "puntero") {
                                                var t2 = generarTemp();
                                                asignar.codigo.push(new Codigo(obtenerArreglo(t2, "Stack", asignar.posicion, "Obtengo la referencia"), raiz.hijos[1].posicion.first_line));
                                                asignar.valor = t2;
                                                variable.ambitoDireccion = asignar.ambitoVariable;
                                            } else {
                                                variable.ambitoDireccion = asignar.ambito;
                                            }
                                            if (esEstructuraDeDatos(variable.tipo)) {
                                                asignarEstructuraDeDatos(variable, t3, asignar, "Heap", raiz.hijos[0].posicion);
                                            } else if (verificarTipo(variable, asignar.tipo, raiz.hijos[0].posicion)) {
                                                asignarVariable(asignar, t3, tipo, raiz.hijos[0].posicion, true);
                                            }
                                        }
                                    }
                                }
                            } else if (raiz.hijos[3].token == "++") {       //este '.' id '++'
                                var posicion = raiz.hijos[2].posicion;
                                var variable = obtenerVariableGlobal(raiz.hijos[2].token, posicion, true)
                                if (variable != null) { //Se encontro localmente
                                    var t1 = generarTemp();
                                    //listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Obtengo la posicion de la variable " + nombre), raiz.hijos[1].posicion.first_line));
                                    if (variable.heredada == true) {
                                        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicionHeredada, "Posicion de la variable heredada " + nombre, ""), raiz.hijos[1].posicion.first_line));
                                    } else {
                                        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Posicion de la variable global " + nombre, ""), raiz.hijos[1].posicion.first_line));
                                    }
                                    var t2 = generarTemp();
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                    var t3 = generarTemp();
                                    if (variable.tipo == "entero" || variable.tipo == "decimal" || variable.tipo == "caracter") { //Se encontro localmente
                                        listaCodigo.push(new Codigo(obtenerArreglo(t3, "Heap", t2, ""), raiz.hijos[1].posicion.first_line));
                                        var t4 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t3, "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t2, t4, "Guarda nuevo valor "), raiz.hijos[1].posicion.first_line));
                                    } else {
                                        listaErrores.push(new Errores("Error Semantico", "No se puede realizar el aumento de : " + variable.valor, posicion.first_line, posicion.first_column));
                                    }
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable (G) : " + raiz.hijos[2].token, posicion.first_line, posicion.first_column));
                                }
                            } else {                                        //este '.' id '--'
                                var variable = obtenerVariableGlobal(raiz.hijos[2].token, raiz.hijos[2].posicion, true)
                                if (variable != null) { //Se encontro localmente
                                    var t1 = generarTemp();
                                    //listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Obtengo la posicion de la variable " + nombre), raiz.hijos[1].posicion.first_line));
                                    if (variable.heredada == true) {
                                        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicionHeredada, "Obtengo la posicion de la variable heredada " + nombre), raiz.hijos[1].posicion.first_line));
                                    } else {
                                        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Obtengo la posicion de la variable global " + nombre), raiz.hijos[1].posicion.first_line));
                                    }
                                    var t2 = generarTemp();
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[1].posicion.first_line));
                                    var t3 = generarTemp();
                                    if (variable.tipo == "entero" || variable.tipo == "decimal" || variable.tipo == "caracter") { //Se encontro localmente
                                        listaCodigo.push(new Codigo(obtenerArreglo(t3, "Heap", t2, ""), raiz.hijos[1].posicion.first_line));
                                        var t4 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t3, "-", "1"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", t2, t4, "Guarda nuevo valor "), raiz.hijos[1].posicion.first_line));
                                    } else {
                                        listaErrores.push(new Errores("Error Semantico", "No se puede realizar el decremento de : " + variable.valor, posicion.first_line, posicion.first_column));
                                    }
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable (G) : " + raiz.hijos[2].token, posicion.first_line, posicion.first_column));
                                }
                            }
                            break;
                        case 5:                                             // este '.' id INSTANCIA ASIGNAR
                            result = segundo.recorrerMetodos(raiz.hijos[4]);
                            var cant = contarInstancias(raiz.hijos[3]);
                            if (cant > 0) {
                                asignarValorInstancia(raiz.hijos[2].token, raiz.hijos[3], result, cant);
                            } else {
                                obtenerValorInstancia(raiz.hijos[2].token, raiz.hijos[3]);
                            }
                            break;
                    }
                    break;
                case "LARREGLO":
                    switch (raiz.hijos.length) {
                        case 1:                                                 //ARREGL0
                            //var lista = [];
                            result = segundo.recorrerMetodos(raiz.hijos[0]);
                            //lista.push(result);
                            //result = lista;
                            break;
                        case 3:                                                 //'LARREGLO ',' ARREGL0
                            var lista = segundo.recorrerMetodos(raiz.hijos[0]);
                            result = segundo.recorrerMetodos(raiz.hijos[2]);
                            //lista.push(result);
                            //result = lista;
                            break;
                    }
                    break;
                case "ARREGLO":
                    switch (raiz.hijos.length) {
                        case 1:                                             // OP
                            result = segundo.recorrerMetodos(raiz.hijos[0]);
                            listaArreglo.push(result);
                            break;
                        case 3:                                             //'{' LARREGLO '}'
                            result = segundo.recorrerMetodos(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "SI":
                    switch (raiz.hijos.length) {            // si '(' OP ')' OPCION_SI finsi
                        case 6:
                            ambito.push("Si" + contadorSent++);
                            result = segundo.recorrerMetodos(raiz.hijos[2]); //Condicion
                            if (result != null) {
                                listaCodigo = agregarLista(listaCodigo, result.codigo);
                            } else {
                                console.log("Error en el if");
                            }
                            listaEtqVSi.push(result.etqV);
                            listaEtqFSi.push(result.etqF);
                            segundo.recorrerMetodos(raiz.hijos[4]); //Instruccion
                            listaEtqVSi.pop();
                            listaEtqFSi.pop();
                            ambito.pop();
                            break;
                    }
                    break;
                case "OPCION_SI":
                    switch (raiz.hijos.length) {
                        case 4:                             //esverdadero '{' INSTRUCCIONES '}'
                            listaCodigo.push(new Codigo(listaEtqVSi[listaEtqVSi.length - 1] + ":\n", raiz.hijos[1].posicion.first_line));
                            ambito.push("V");
                            segundo.recorrerMetodos(raiz.hijos[2]);
                            ambito.pop();
                            listaCodigo.push(new Codigo(listaEtqFSi[listaEtqFSi.length - 1] + ":\n", raiz.hijos[1].posicion.first_line));
                            break;
                        case 8:
                            if (raiz.hijos[0].nombre === "esverdadero") { //esverdadero '{' INSTRUCCIONES '}' esfalso '{' INSTRUCCIONES '}' 
                                ambito.push("V");
                                listaCodigo.push(new Codigo(listaEtqVSi[listaEtqVSi.length - 1] + ":\n", raiz.hijos[1].posicion.first_line));
                                segundo.recorrerMetodos(raiz.hijos[2]);
                                ambito.pop();
                                ///
                                var etqFin = generarEtq();
                                listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(listaEtqFSi[listaEtqFSi.length - 1] + ":\n", raiz.hijos[1].posicion.first_line));
                                ///
                                ambito.push("F");
                                segundo.recorrerMetodos(raiz.hijos[6]);
                                ambito.pop();
                                listaCodigo.push(new Codigo(etqFin + ":\n", raiz.hijos[1].posicion.first_line));
                            } else {                                    //esfalso '{' INSTRUCCIONES '}' esverdadero '{' INSTRUCCIONES '}' 
                                ambito.push("F");
                                listaCodigo.push(new Codigo(listaEtqFSi[listaEtqFSi.length - 1] + ":\n", raiz.hijos[1].posicion.first_line));
                                segundo.recorrerMetodos(raiz.hijos[2]);
                                ambito.pop();
                                ///
                                var etqFin = generarEtq();
                                listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(listaEtqVSi[listaEtqVSi.length - 1] + ":\n", raiz.hijos[1].posicion.first_line));
                                ///
                                ambito.push("V");
                                segundo.recorrerMetodos(raiz.hijos[6]);
                                ambito.pop();
                                listaCodigo.push(new Codigo(etqFin + ":\n", raiz.hijos[1].posicion.first_line));
                            }
                            break;
                    }
                    break;
                case "SWITCH":
                    ambito.push("Switch" + contadorSent++);
                    var etqRomper = generarEtq();
                    listaRomper.push(etqRomper);
                    switch (raiz.hijos.length) {
                        case 7:
                            valorSwitch = segundo.recorrerMetodos(raiz.hijos[2]);
                            listaCodigo = agregarLista(listaCodigo, valorSwitch.codigo);
                            if (valorSwitch.rol == "relacional") {
                                var t1 = generarTemp();
                                var etqFin = generarEtq();
                                listaCodigo.push(new Codigo(valorSwitch.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "1", "", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(valorSwitch.etqF + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "0", "", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(etqFin + ":\n", raiz.hijos[1].posicion.first_line));
                                valorSwitch.valor = t1;
                            } else if (valorSwitch.rol == "valor") {
                                if (valorSwitch.tipo == 'cadena' || valorSwitch.tipo == 'caracter') {
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[1].posicion.first_line));
                                    for (var i = 0; i < valorSwitch.valor.length; i++) {
                                        var asc = valorSwitch.valor.charCodeAt(i);
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + valorSwitch.valor[i] + "'"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", "Aumento el contador del heap"), raiz.hijos[1].posicion.first_line));
                                    }
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    valorSwitch.valor = t1;
                                } else {//valores puntuales
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", valorSwitch.valor, "", "", ""), raiz.hijos[1].posicion.first_line));
                                    valorSwitch.valor = t1;
                                }
                            }
                            valorSwitch.rol = "temp";
                            if (raiz.hijos[5].nombre === "CASO") {              //evaluarsi '(' OP ')' '{' CASO '}'
                                segundo.recorrerMetodos(raiz.hijos[5]);
                            } else {                                            //evaluarsi '(' OP ')' '{' DEFECTO '}'
                                segundo.recorrerMetodos(raiz.hijos[5]);
                            }
                            break;
                        case 8:                                                 //evaluarsi '(' OP ')' '{' CASO DEFECTO '}'
                            valorSwitch = segundo.recorrerMetodos(raiz.hijos[2]);
                            listaCodigo = agregarLista(listaCodigo, valorSwitch.codigo);
                            if (valorSwitch.rol == "relacional") {
                                var t1 = generarTemp();
                                var etqFin = generarEtq();
                                listaCodigo.push(new Codigo(valorSwitch.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "1", "", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(valorSwitch.etqF + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "0", "", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(etqFin + ":\n", raiz.hijos[1].posicion.first_line));
                                valorSwitch.valor = t1;

                            } else if (valorSwitch.rol == "valor") {
                                if (valorSwitch.tipo == 'cadena' || valorSwitch.tipo == 'caracter') {
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[1].posicion.first_line));
                                    for (var i = 0; i < valorSwitch.valor.length; i++) {
                                        var asc = valorSwitch.valor.charCodeAt(i);
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + valorSwitch.valor[i] + "'"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", "Aumento el contador del heap"), raiz.hijos[1].posicion.first_line));
                                    }
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    valorSwitch.valor = t1;
                                } else {//valores puntuales
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", valorSwitch.valor, "", "", ""), raiz.hijos[1].posicion.first_line));
                                    valorSwitch.valor = t1;
                                }
                            }
                            valorSwitch.rol = "temp";
                            segundo.recorrerMetodos(raiz.hijos[5]);
                            segundo.recorrerMetodos(raiz.hijos[6]);
                            break;
                    }
                    ambito.pop();
                    listaCodigo.push(new Codigo(etqRomper + ":\n", raiz.hijos[1].posicion.first_line));
                    listaRomper.pop();
                    break;
                case "CASO":
                    // ambito.push("C");
                    switch (raiz.hijos.length) {
                        case 4:                             //esiguala OP ':' INSTRUCCIONES
                            var expresion = segundo.recorrerMetodos(raiz.hijos[1]);
                            listaCodigo = agregarLista(listaCodigo, expresion.codigo);
                            var resultado = compararValores(valorSwitch, operadorRelacional("!="), expresion, raiz.hijos[0].posicion);
                            listaCodigo = agregarLista(listaCodigo, resultado.codigo);
                            segundo.recorrerMetodos(raiz.hijos[3]);
                            listaCodigo.push(new Codigo(resultado.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                            break;
                        case 5:                             //CASO esiguala OP ':' INSTRUCCIONES
                            segundo.recorrerMetodos(raiz.hijos[0]);
                            var expresion = segundo.recorrerMetodos(raiz.hijos[2]);
                            listaCodigo = agregarLista(listaCodigo, expresion.codigo);
                            var resultado = compararValores(valorSwitch, operadorRelacional("!="), expresion, raiz.hijos[0].posicion);
                            listaCodigo = agregarLista(listaCodigo, resultado.codigo);
                            segundo.recorrerMetodos(raiz.hijos[4]);
                            listaCodigo.push(new Codigo(resultado.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                            break;
                    }
                    break;
                case "DEFECTO":
                    switch (raiz.hijos.length) {
                        case 3:
                            segundo.recorrerMetodos(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "CICLO":
                    ambito.push(raiz.hijos[0].nombre + contadorSent++);
                    switch (raiz.hijos.length) {
                        case 5:                                 //enciclar id '{' INSTRUCCIONES '}'
                            var etqIni = generarEtq();
                            var etqFin = generarEtq();
                            listaRomper.push(etqFin);
                            listaContinuar.push(etqIni);
                            listaCodigo.push(new Codigo(etqIni + ":\n", raiz.hijos[1].posicion.first_line));
                            segundo.recorrerMetodos(raiz.hijos[3]);
                            listaCodigo.push(new Codigo(generarCuadruplo(etqIni, "=", "", "jmp", "", "enciclar"), raiz.hijos[1].posicion.first_line));
                            listaCodigo.push(new Codigo(etqFin + ":\n", raiz.hijos[1].posicion.first_line));
                            listaRomper.pop();
                            listaContinuar.pop();
                            break;
                        case 7:                                 //repetirmientras '(' OP ')' '{' INSTRUCCIONES'}'                       
                            var etqIni = generarEtq();
                            var cond = segundo.recorrerMetodos(raiz.hijos[2]);
                            listaCodigo.push(new Codigo(etqIni + ":\n", raiz.hijos[1].posicion.first_line));
                            listaCodigo = agregarLista(listaCodigo, cond.codigo);
                            listaCodigo.push(new Codigo(cond.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                            listaRomper.push(cond.etqF);
                            listaContinuar.push(etqIni);
                            segundo.recorrerMetodos(raiz.hijos[5]);
                            listaCodigo.push(new Codigo(generarCuadruplo(etqIni, "=", "", "jmp", "", "Volver a preguntar"), raiz.hijos[1].posicion.first_line));
                            listaCodigo.push(new Codigo(cond.etqF + ":\n", raiz.hijos[1].posicion.first_line));
                            listaRomper.pop();
                            listaContinuar.pop();
                            break;
                        case 8:
                            if (raiz.hijos[0].nombre === "repetir") {//repetir '{' INSTRUCCIONES'}' hastaque '(' OP ')'
                                var etqIni = generarEtq();
                                var etqRomper = generarEtq();
                                var etqCont = generarEtq();
                                listaRomper.push(etqRomper);
                                listaContinuar.push(etqCont);
                                listaCodigo.push(new Codigo(etqIni + ":\n", raiz.hijos[1].posicion.first_line));
                                segundo.recorrerMetodos(raiz.hijos[2]);
                                listaCodigo.push(new Codigo(etqCont + ":\n", raiz.hijos[1].posicion.first_line));
                                var cond = segundo.recorrerMetodos(raiz.hijos[6]);
                                listaCodigo = agregarLista(listaCodigo, cond.codigo);
                                listaCodigo.push(new Codigo(cond.etqF + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(etqIni, "=", "", "jmp", "", "Volver a preguntar"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(cond.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(etqRomper + ":\n", raiz.hijos[1].posicion.first_line));
                                listaRomper.pop();
                                listaContinuar.pop();
                            } else {                                //hacer '{' INSTRUCCIONES'}' mientras '(' OP ')'
                                var etqSent = generarEtq();
                                listaCodigo.push(new Codigo(generarCuadruplo(etqSent, "=", "", "jmp", "", ""), raiz.hijos[1].posicion.first_line));
                                var etqIni = generarEtq();
                                listaCodigo.push(new Codigo(etqIni + ":\n", raiz.hijos[1].posicion.first_line));
                                var cond = segundo.recorrerMetodos(raiz.hijos[6]);
                                listaRomper.push(cond.etqF);
                                listaContinuar.push(etqIni);
                                listaCodigo = agregarLista(listaCodigo, cond.codigo);
                                listaCodigo.push(new Codigo(cond.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(etqSent + ":\n", raiz.hijos[1].posicion.first_line));
                                segundo.recorrerMetodos(raiz.hijos[2]);
                                listaCodigo.push(new Codigo(generarCuadruplo(etqIni, "=", "", "jmp", "", "Volver a preguntar"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(cond.etqF + ":\n", raiz.hijos[1].posicion.first_line));
                                listaRomper.pop();
                                listaContinuar.pop();
                            }
                            break;
                        case 9:                                 //ciclodoble '(' OP "," OP ')' '{' INSTRUCCIONES'}'
                            var etqIni = generarEtq();
                            listaCodigo.push(new Codigo(etqIni + ":\n", raiz.hijos[1].posicion.first_line));
                            var cond1 = segundo.recorrerMetodos(raiz.hijos[2]);
                            listaCodigo = agregarLista(listaCodigo, cond1.codigo);
                            listaCodigo.push(new Codigo(cond1.etqF + ":\n", raiz.hijos[1].posicion.first_line));
                            var cond2 = segundo.recorrerMetodos(raiz.hijos[4]);
                            listaCodigo = agregarLista(listaCodigo, cond2.codigo);
                            listaCodigo.push(new Codigo(cond1.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                            listaCodigo.push(new Codigo(cond2.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                            var etqCont = generarEtq();
                            listaRomper.push(cond2.etqF);
                            listaContinuar.push(etqCont);
                            segundo.recorrerMetodos(raiz.hijos[7]);
                            listaCodigo.push(new Codigo(etqCont + ":\n", raiz.hijos[1].posicion.first_line));
                            var cond3 = segundo.recorrerMetodos(raiz.hijos[2]);
                            listaCodigo = agregarLista(listaCodigo, cond3.codigo);
                            listaCodigo.push(new Codigo(cond3.etqV + ":\n", raiz.hijos[1].posicion.first_line));
                            listaCodigo.push(new Codigo(generarCuadruplo(cond1.etqF, "=", "", "jmp", "", "Volver a preguntar"), raiz.hijos[1].posicion.first_line));
                            listaCodigo.push(new Codigo(cond2.etqF + ":\n", raiz.hijos[1].posicion.first_line));
                            listaCodigo.push(new Codigo(cond3.etqF + ":\n", raiz.hijos[1].posicion.first_line));
                            listaRomper.pop();
                            listaContinuar.pop();
                            break;
                    }
                    ambito.pop();
                    break;
                case "FOR":
                    ambito.push("For" + contadorSent++);
                    switch (raiz.hijos.length) {
                        case 7:                             //contador '(' OP ')' '{' INSTRUCCIONES'}'
                            result = segundo.recorrerMetodos(raiz.hijos[2]);
                            if (result.tipo == "entero") {
                                listaCodigo = agregarLista(listaCodigo, result.codigo);
                                var t1 = generarTemp();
                                var etqV = generarEtq();
                                var etqIni = generarEtq();
                                var etqCont = generarEtq();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "0", "", "", "Contador"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(etqIni + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(etqV, "=", t1, operadorRelacional("=="), result.valor, "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                                listaRomper.push(etqV);
                                listaContinuar.push(etqCont);
                                segundo.recorrerMetodos(raiz.hijos[5]);
                                listaCodigo.push(new Codigo(etqCont + ":\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", "1", "Aumento contador"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(etqIni, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(etqV + ":\n", raiz.hijos[1].posicion.first_line));
                                listaRomper.pop();
                                listaContinuar.pop();
                            } else {
                                listaErrores.push(new Errores("Error Semantico", "El valor del contador no es un numero ", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            break;
                        case 12:// repetircontando '(' variable ':' id ';' desde ':' OP ';' hasta ':' OP ')' '{' INSTRUCCIONES'}'{ //5//9//13//16
                            var id = raiz.hijos[3].token;
                            var desde = segundo.recorrerMetodos(raiz.hijos[6]);
                            var hasta = segundo.recorrerMetodos(raiz.hijos[9]);
                            listaCodigo = agregarLista(listaCodigo, desde.codigo);
                            listaCodigo = agregarLista(listaCodigo, hasta.codigo);
                            if (desde.tipo == "entero" && hasta.tipo == "entero") {
                                var variable = obtenerVariableLocal(id, raiz.hijos[0].posicion, false);
                                if (variable != null) {
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", desde.valor, "", "", "Valor inicial " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                    var t2 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "P", "+", variable.posicion, "Posicion de la variable " + variable.nombre), raiz.hijos[1].posicion.first_line));
                                    var etqIni = generarEtq();
                                    listaCodigo.push(new Codigo(etqIni + ":\n", raiz.hijos[1].posicion.first_line));
                                    desde.valor = t1;
                                    asignarVariable(desde, t2, "local", raiz.hijos[0].posicion, true);
                                    declararVariable(id, "local");
                                    var etqFin = generarEtq();
                                    var etqV = generarEtq();
                                    var etqCont = generarEtq();
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", t1, operadorRelacional("=="), hasta.valor, "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                                    listaRomper.push(etqFin);
                                    listaContinuar.push(etqCont);
                                    segundo.recorrerMetodos(raiz.hijos[11]);
                                    listaCodigo.push(new Codigo(etqCont + ":\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqV, "=", t1, operadorRelacional(">"), hasta.valor, "--"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "+", 1, "aumento"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqIni, "=", "", "jmp", "", "Inicio"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(etqV + ":\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", t1, "-", 1, "decremento"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqIni, "=", "", "jmp", "", "Inicio"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(etqFin + ":\n", raiz.hijos[1].posicion.first_line));
                                    listaRomper.pop();
                                    listaContinuar.pop();
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable local " + id, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    return;
                                }
                            } else {
                                listaErrores.push(new Errores("Error Semantico", "El valor del repetircontador no es un numero ", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            break;
                    }
                    break;
                case "IMPRIMIR":
                    switch (raiz.hijos.length) {
                        case 4:                                 //imprimir '(' OP ')' '
                            result = segundo.recorrerMetodos(raiz.hijos[2]);
                            if (result.tipo == "error" || result.rol == "error") {
                                return;
                            }
                            var salto = "\n".charCodeAt(0);
                            if (result.rol === "valor") { //Si es un valor
                                listaCodigo = agregarLista(listaCodigo, result.codigo);
                                if (result.tipo == "cadena") {
                                    for (var i = 0; i < result.valor.length; i++) {
                                        var asc = result.valor.charCodeAt(i);
                                        listaCodigo.push(new Codigo("print(\"%c\"," + asc + " ); //" + result.valor[i] + " \n", raiz.hijos[1].posicion.first_line));
                                    }
                                } else if (result.tipo == "caracter") {
                                    listaCodigo.push(new Codigo("print(\"%c\"," + result.valor + " );\n", raiz.hijos[1].posicion.first_line));
                                } else if (result.tipo == "entero") { //valores numericos
                                    listaCodigo.push(new Codigo("print(\"%d\"," + result.valor + " );\n", raiz.hijos[1].posicion.first_line));
                                } else if (result.tipo == "decimal") { //valores numericos
                                    listaCodigo.push(new Codigo("print(\"%f\"," + result.valor + " );\n", raiz.hijos[1].posicion.first_line));
                                } else if (result.tipo == "booleano") { //valores numericos
                                    if (result.valor = 1) {
                                        var bool = "true";
                                        listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(0) + " );\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(1) + " );\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(2) + " );\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(3) + " );\n", raiz.hijos[1].posicion.first_line));
                                    } else {
                                        var bool = "false";
                                        listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(0) + " );\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(1) + " );\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(2) + " );\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(3) + " );\n", raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(4) + " );\n", raiz.hijos[1].posicion.first_line));
                                    }
                                }

                            } else if (result.rol === "temp") {
                                listaCodigo = agregarLista(listaCodigo, result.codigo);
                                if (result.tipo == "entero") { //valores numericos
                                    listaCodigo.push(new Codigo("print(\"%d\"," + result.valor + " );\n", raiz.hijos[1].posicion.first_line));
                                } else if (result.tipo == "decimal") { //valores numericos
                                    listaCodigo.push(new Codigo("print(\"%f\"," + result.valor + " );\n", raiz.hijos[1].posicion.first_line));
                                } else if (result.tipo == "cadena" || result.tipo == "caracter") {
                                    if (result.valorArreglo == true) { // Para validar a = caracter [0]
                                        var t1 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", "Inicio del caracter"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", result.valor, "Guardo de nuevo caracter"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        result.valor = t1;
                                    }
                                    listaCodigo.push(new Codigo("print(\"%c\"," + result.valor + " );\n", raiz.hijos[1].posicion.first_line));
                                } else if (result.tipo == "booleano") { //valores numericos
                                    var etqV = generarEtq();
                                    var etqF = generarEtq();
                                    var etqFin = generarEtq();
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqV, "=", result.valor, operadorRelacional("=="), "1", "Etiqueta verdadera"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(etqV + ":\n", raiz.hijos[1].posicion.first_line));
                                    var bool = "true";
                                    listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(0) + " );\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(1) + " );\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(2) + " );\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(3) + " );\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(etqFin, "=", "", "jmp", "", "fin"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(etqF + ":\n", raiz.hijos[1].posicion.first_line));
                                    bool = "false";
                                    listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(0) + " );\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(1) + " );\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(2) + " );\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(3) + " );\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("print(\"%c\", " + bool.charCodeAt(4) + " );\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(etqFin + ":\n", raiz.hijos[1].posicion.first_line));
                                }
                            }
                            listaCodigo.push(new Codigo("print(\"%c\", " + salto + " ); //salto \n", raiz.hijos[1].posicion.first_line));
                            break;
                    }
                    break;
                case "VALOR": //Se usa en la llamada y en la asignacion de una instancia
                    if (claseAuxiliar != "") {
                        var claseAnterior = claseActual;
                        claseActual = claseAuxiliar;
                    }
                    switch (raiz.hijos.length) {
                        case 1:                     //OP
                            var lista = [];
                            result = segundo.recorrerMetodos(raiz.hijos[0]);
                            if (esLista) {
                                return result;
                            }
                            result.posicion = 2;
                            var tam = obtenerTamanioAmbito();
                            var listaAux = [];
                            listaAux = agregarLista(listaAux, result.codigo);
                            if (result.rol === "temp") {
                                //listaCodigo = agregarLista(listaCodigo, result.codigo);
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                listaAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[0].posicion.first_line));
                                listaAux.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", "2", "Aqui empiezan los parametros"), raiz.hijos[0].posicion.first_line));
                                listaAux.push(new Codigo(guardarEnArreglo("Stack", t2, result.valor, "Guardar parametro"), raiz.hijos[0].posicion.first_line));
                            } else {   //valor
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                if (result.tipo == 'cadena' || result.tipo == 'caracter') {
                                    listaAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", "2", "Aqui empiezan los parametros"), raiz.hijos[0].posicion.first_line));
                                    var t3 = generarTemp();
                                    listaAux.push(new Codigo(generarCuadruplo(t3, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[0].posicion.first_line));
                                    //console.log("parametro = " + asignar.valor);
                                    for (var i = 0; i < result.valor.length; i++) {
                                        var asc = result.valor.charCodeAt(i);
                                        listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + result.valor[i] + "'"), raiz.hijos[0].posicion.first_line));
                                        listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", "Aumento el contador del heap"), raiz.hijos[0].posicion.first_line));
                                    }
                                    listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", " //Fin de la cadena"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(guardarEnArreglo("Stack", t2, t3, "Guardar parametro"), raiz.hijos[0].posicion.first_line));

                                } else {//valores puntuales
                                    listaAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", "2", "Aqui empiezan los parametros"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(guardarEnArreglo("Stack", t2, result.valor, "Guardar parametro"), raiz.hijos[0].posicion.first_line));
                                }
                            }
                            result.codigo = listaAux;
                            lista.push(result);
                            result = lista;
                            break;
                        case 3:                     // VALOR ',' OP
                            var lista = segundo.recorrerMetodos(raiz.hijos[0]);
                            result = segundo.recorrerMetodos(raiz.hijos[2]);
                            var tam = obtenerTamanioAmbito();
                            var listaAux = [];
                            if (result.rol === "temp") {
                                listaAux = agregarLista(listaAux, result.codigo);
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                listaAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito"), raiz.hijos[1].posicion.first_line));
                                listaAux.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", lista.length + 2, "Siguen los parametros"), raiz.hijos[1].posicion.first_line));
                                listaAux.push(new Codigo(guardarEnArreglo("Stack", t2, result.valor, ""), raiz.hijos[1].posicion.first_line));
                            } else {   //valor
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                if (result.tipo == 'cadena') {
                                    listaAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito"), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", lista.length + 2, "Siguen los parametros"), raiz.hijos[1].posicion.first_line));
                                    var t3 = generarTemp();
                                    listaAux.push(new Codigo(generarCuadruplo(t3, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[1].posicion.first_line));
                                    //console.log("parametro = " + asignar.valor);
                                    for (var i = 0; i < result.valor.length; i++) {
                                        var asc = result.valor.charCodeAt(i);
                                        listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + result.valor[i] + "'"), raiz.hijos[1].posicion.first_line));
                                        listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", "Aumento el contador del heap"), raiz.hijos[1].posicion.first_line));
                                    }
                                    listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", " //Fin de la cadena"), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo(guardarEnArreglo("Stack", t2, t3, "Guardar parametro"), raiz.hijos[1].posicion.first_line));

                                } else {//valores puntuales
                                    listaAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito"), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", lista.length + 2, "Siguen los parametros"), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo(guardarEnArreglo("Stack", t2, result.valor, "Guardar parametro"), raiz.hijos[1].posicion.first_line));
                                }
                            }
                            result.codigo = listaAux;
                            lista.push(result);
                            result = lista;
                            break;
                    }
                    if (claseAuxiliar != "") {
                        claseActual = claseAnterior;
                    }
                    break;
                case "LLAMADA":
                    var resultado = new Expresion();
                    var metodoAnterior = metodoActual;
                    switch (raiz.hijos.length) {
                        case 2:                     //este '.' LLAMADA
                            result = segundo.recorrerMetodos(raiz.hijos[2]);
                            break;
                        case 3:                     //id '(' ')'
                            var resultado = new Expresion();
                            resultado.tipo = "error";
                            resultado.rol = "error";
                            var metodo = obtenerMetodoLlamada(raiz.hijos[0].token, [], raiz.hijos[0].posicion);
                            if (metodo != null) {
                                if (metodo.visibilidad.toLowerCase() != "publico" && esObjeto == true) {
                                    listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[0].token + " es " + metodo.visibilidad.toLowerCase(), raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    return resultado;
                                }
                                var tam = obtenerTamanioAmbito();
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                var t3 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[1].posicion.first_line));
                                if (esObjeto) {
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", posInstancia, "", "", "Posicion inicio ya definido de instancia"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", metodo.posicionHeredada, "Posicion actual mas heredada"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, t3, "Envio el this"), raiz.hijos[1].posicion.first_line));

                                } else {
                                    var t4 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "P", "+", "0", "Pos del this de la clase actual"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(obtenerArreglo(t3, "Stack", t2, "Valor del this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t3, "+", metodo.posicionHeredada, "Posicion actual mas heredada"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, t4, "Envio el this"), raiz.hijos[1].posicion.first_line));
                                }
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("call, , , " + metodo.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                if (metodo.tipo != "vacio") {
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, "Se obtiene el parametro"), raiz.hijos[0].posicion.first_line));
                                    resultado.tipo = metodo.tipo;
                                } else {
                                    resultado.tipo = "vacio";
                                }
                                resultado.valor = t2;
                                resultado.rol = "temp";
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                            } else {
                                listaErrores.push(new Errores("Error Semantico", "No existe el metodo " + raiz.hijos[0].token, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            }
                            //metodoActual = metodoAnterior;
                            result = resultado;
                            break;
                        case 4:                     //id '(' VALOR ')'
                            var resultado = new Expresion();
                            var valores = segundo.recorrerMetodos(raiz.hijos[2]);
                            var metodo = obtenerMetodoLlamada(raiz.hijos[0].token, valores, raiz.hijos[0].posicion);
                            if (metodo != null) {
                                var tam = obtenerTamanioAmbito();
                                //var tam = clase.listaVariables.length;
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                var t3 = generarTemp();
                                //listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", "Posicion inicio de instancia"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[1].posicion.first_line));
                                if (esObjeto) {
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", posInstancia, "", "", "Posicion inicio ya definido de instancia"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", metodo.posicionHeredada, "Posicion actual mas heredada"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, t3, "Envio el this"), raiz.hijos[1].posicion.first_line));

                                } else {
                                    var t4 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "P", "+", "0", "Pos del this de la clase actual"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(obtenerArreglo(t3, "Stack", t2, "Valor del this"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t3, "+", metodo.posicionHeredada, "Posicion actual mas heredada"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, t4, "Envio el this"), raiz.hijos[1].posicion.first_line));
                                }

                                //
                                for (let i = 0; i < valores.length; i++) {
                                    listaCodigo = agregarLista(listaCodigo, valores[i].codigo);
                                }
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambio de ambito"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("call, , , " + metodo.nombreAux + "\n", raiz.hijos[1].posicion.first_line));
                                if (metodo.tipo != "vacio") {
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Stack", t1, "Se obtiene el parametro"), raiz.hijos[1].posicion.first_line));
                                    resultado.tipo = metodo.tipo;
                                } else {
                                    resultado.tipo = "vacio";
                                }
                                resultado.valor = t2;
                                resultado.rol = "temp";
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regreso ambito"), raiz.hijos[1].posicion.first_line));
                            } else {
                                listaErrores.push(new Errores("Error Semantico", "No existe el metodo " + raiz.hijos[0].token, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                            }
                            //metodoActual = metodoAnterior;
                            result = resultado;
                            break;
                    }
                    metodoActual = metodoAnterior;
                    result = resultado;
                    break;
                case "INSTANCIA":
                    switch (raiz.hijos.length) {
                        case 2:
                            if (raiz.hijos[0].nombre == "." && raiz.hijos[1].nombre == "LLAMADA") { //'.' LLAMADA
                                segundo.recorrerMetodos(raiz.hijos[1]);

                            } else if (raiz.hijos[0].nombre == ".") {                              // '.' id                                

                            } else {                                                                  //'->' id

                            }
                            break;
                        case 3:
                            if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[2].nombre == "LLAMADA") { //INSTANCIA '.' LLAMADA 
                                segundo.recorrerMetodos(raiz.hijos[1]);

                            } else if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[1].nombre == ".") {//INSTANCIA '.' id                
                            } else if (raiz.hijos[0].nombre == "INSTANCIA" && raiz.hijos[1].nombre == "->") {// INSTANCIA '->' id      
                            } else {                                                                        //'.' id DIMENSION

                            }
                            break;
                    }
                    break;
                case "FUNCIONES":
                    switch (raiz.hijos.length) {
                        case 3:             //id '.' tamanio
                            var resultado = new Expresion();
                            var listaCodigoAux = [];
                            var variable = obtenerVariableLocal(raiz.hijos[0].token, raiz.hijos[0].posicion, true)
                            if (variable != null) { //Se encontro localmente
                                var t1 = generarTemp();
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, "Obtengo la posicion de la variable local " + raiz.hijos[0].token), raiz.hijos[0].posicion.first_line));
                                var t2 = generarTemp();
                                listaCodigoAux.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[0].posicion.first_line));
                                resultado.valor = t2;
                                resultado.ambito = "local";
                                resultado.posicion = t1;
                            } else {
                                var variable = obtenerVariableGlobal(dato, posicion, true)
                                if (variable != null) { //Se encontro localmente
                                    var t1 = generarTemp();
                                    listaCodigoAux.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", "0", ""), raiz.hijos[0].posicion.first_line));
                                    var t2 = generarTemp();
                                    listaCodigoAux.push(new Codigo(obtenerArreglo(t2, "Stack", t1, ""), raiz.hijos[0].posicion.first_line));
                                    var t3 = generarTemp();
                                    //listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Obtengo la posicion de la variable global " + dato), posicion.first_line));
                                    if (variable.heredada == true) {
                                        listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicionHeredada, "Obtengo la posicion de la variable heredada " + dato), posicion.first_line));
                                    } else {
                                        listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", t2, "+", variable.posicion, "Obtengo la posicion de la variable global " + dato), posicion.first_line));
                                    }
                                    var t4 = generarTemp();
                                    listaCodigoAux.push(new Codigo(obtenerArreglo(t4, "Heap", t3, ""), raiz.hijos[0].posicion.first_line));
                                    resultado.valor = t4;
                                    resultado.ambito = "global";
                                    resultado.posicion = t3;
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "Error no se ha encontrado la variable en obtener tam : " + raiz.hijos[0].token + " local ni globalmente", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    resultado.valor = "error";
                                    resultado.tipo = "error";
                                    return resultado;
                                }
                            }
                            if (variable.rol.toLowerCase() == "arreglo") {
                                var t2 = generarTemp();
                                var t3 = generarTemp();
                                listaCodigoAux.push(new Codigo(generarCuadruplo(t2, "=", resultado.valor, "+", variable.dimension.length, "Obtener el tamanio"), raiz.hijos[0].posicion.first_line));
                                listaCodigoAux.push(new Codigo(obtenerArreglo(t3, "Heap", t2, "Posicion del tamanio"), raiz.hijos[0].posicion.first_line));
                                resultado.ambito = "global";
                                resultado.posicion = resultado.valor;
                                resultado.valor = t3;
                            } else {
                                listaErrores.push(new Errores("Error Semantico", "El atributo " + raiz.hijos[1].token + " no es un vector", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                resultado.rol = "error";
                                resultado.tipo = "error";
                                return result;
                            }
                            resultado.visibilidad = variable.visibilidad;
                            resultado.tamanio = variable.tamanio;
                            resultado.rolVariable = variable.rol;
                            resultado.ambitoVariable = variable.ambitoDireccion;
                            resultado.rol = "temp";
                            resultado.codigo = listaCodigoAux;
                            resultado.tipo = "entero";

                            result = resultado;
                            break;
                        case 4:
                            var resultado = new Expresion();
                            var temp = generarTemp();
                            var listaAux = [];
                            if (raiz.hijos[0].nombre == "convertiracadena") { //convertiracadena '(' OP ')'
                                var asignar = segundo.recorrerMetodos(raiz.hijos[2]);
                                listaAux = asignar.codigo;
                                if (asignar.tipo == "entero" || asignar.tipo == "booleano" || asignar.tipo == "decimal") {
                                    var pos1 = asignar.valor;
                                    if (asignar.rol === 'valor') {
                                        asignar.valor = asignar.valor + "";
                                        listaAux.push(new Codigo(generarCuadruplo(temp, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                        for (var i = 0; i < asignar.valor.length; i++) {
                                            var asc = asignar.valor.charCodeAt(i);
                                            listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + asignar.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                            listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        }
                                        listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                        listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        pos1 = temp;
                                        resultado.tamanio = asignar.valor.length;
                                    } else {
                                        var tam = obtenerTamanioAmbito();
                                        listaAux.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), raiz.hijos[1].posicion.first_line));
                                        var t3 = generarTemp();
                                        listaAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        listaAux.push(new Codigo(generarCuadruplo(temp, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                        listaAux.push(new Codigo(guardarEnArreglo("Stack", t3, pos1, "Envio parametro2 a convertirEnteroACadena"), raiz.hijos[1].posicion.first_line));
                                        if (asignar.tipo == "decimal") {
                                            listaAux.push(new Codigo("call, , ,  convertirDecimalACadena \n", raiz.hijos[1].posicion.first_line));
                                        } else {
                                            listaAux.push(new Codigo("call, , ,  convertirEnteroACadena \n", raiz.hijos[1].posicion.first_line));
                                        }
                                        listaAux.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), raiz.hijos[1].posicion.first_line));
                                        listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                        listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        var t4 = generarTemp();
                                        var t5 = generarTemp();
                                        listaAux.push(new Codigo(generarCuadruplo(t4, "=", "H", "-", "1", "Tamanio que ocupa"), raiz.hijos[1].posicion.first_line));
                                        listaAux.push(new Codigo(generarCuadruplo(t5, "=", t4, "-", temp, "Tamanio que ocupa"), raiz.hijos[1].posicion.first_line));
                                        resultado.tamanio = t5;
                                    }
                                    resultado.tipo = "cadena";
                                    resultado.convertirAcadena = true;
                                }
                            } else {                                        //convertiraentero '(' OP ')'{
                                var asignar = segundo.recorrerMetodos(raiz.hijos[2]);
                                listaAux = asignar.codigo;
                                if (asignar.tipo == "cadena" || asignar.tipo == "caracter") {
                                    var pos1 = asignar.valor;
                                    if (asignar.rol === 'valor') {
                                        var t1 = generarTemp();
                                        listaAux.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                        for (var i = 0; i < asignar.valor.length; i++) {
                                            var asc = asignar.valor.charCodeAt(i);
                                            listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + asignar.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                            listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        }
                                        listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                        listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        pos1 = t1;
                                    }
                                    var tam = obtenerTamanioAmbito();
                                    listaAux.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), raiz.hijos[1].posicion.first_line));
                                    var t3 = generarTemp();
                                    listaAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo(guardarEnArreglo("Stack", t3, pos1, "Envio parametro2 a convertirCadenaAEntero"), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo("call, , ,  convertirCadenaAEntero \n", raiz.hijos[1].posicion.first_line));
                                    // listaCodigo.push(new Codigo(    generarCuadruplo("t1", "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    var t4 = generarTemp();
                                    listaAux.push(new Codigo(obtenerArreglo(temp, "Stack", t3, "Se obtiene el parametro"), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), raiz.hijos[1].posicion.first_line));
                                    resultado.tipo = "entero";

                                } else if (asignar.tipo == "booleano") {
                                    listaAux.push(new Codigo(generarCuadruplo(temp, "=", asignar.valor, "", "", "Regresar ambito"), raiz.hijos[1].posicion.first_line));
                                    resultado.tipo = "entero";

                                } else if (asignar.tipo == "decimal" || asignar.tipo == "entero") {
                                    var pos1 = asignar.valor;
                                    var tam = obtenerTamanioAmbito();
                                    listaAux.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), raiz.hijos[1].posicion.first_line));
                                    var t3 = generarTemp();
                                    listaAux.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo(guardarEnArreglo("Stack", t3, pos1, "Envio parametro2 a convertirDecimalAEntero"), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo("call, , ,  convertirDecimalAEntero \n", raiz.hijos[1].posicion.first_line));
                                    // listaCodigo.push(new Codigo(    generarCuadruplo("t1", "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    var t4 = generarTemp();
                                    listaAux.push(new Codigo(obtenerArreglo(temp, "Stack", t3, "Se obtiene el parametro"), raiz.hijos[1].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), raiz.hijos[1].posicion.first_line));
                                    resultado.tipo = "entero";
                                }
                            }
                            resultado.valor = temp;
                            resultado.rol = "temp";
                            resultado.codigo = listaAux;
                            result = resultado;
                            break;
                    }
                    break;
                case "CONCATENAR":
                    switch (raiz.hijos.length) {
                        case 6:                     //concatenar '(' id ',' OP ')'
                            var asignar = segundo.recorrerMetodos(raiz.hijos[4]);
                            var variable = obtenerVariable3D(raiz.hijos[2].token, raiz.hijos[2].posicion, true);
                            if (variable.valor == "error") {
                                listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + raiz.hijos[2].token + " (LG) para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            listaCodigo = agregarLista(listaCodigo, variable.codigo);
                            listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                            var pos1 = variable.valor;
                            var pos2 = asignar.valor;
                            if (asignar == null || asignar.tipo == "nada") {
                                return;
                            } else if (variable.tipo == "caracter" && asignar.tipo == "cadena" || variable.tipo == "caracter" && asignar.tipo == "caracter") {
                                if (asignar.rol === 'valor') {
                                    var t2 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                    for (var i = 0; i < asignar.valor.length; i++) {
                                        var asc = asignar.valor.charCodeAt(i);
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + asignar.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    }
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    pos2 = t2;
                                }
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                // listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", variable.posicion, "+", variable.tamanio.length, ""), p.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", variable.posicion, "+", variable.tamanio, "Obtener el tamanio"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(obtenerArreglo(t2, "Heap", t1, "Valor de la posicion"), raiz.hijos[1].posicion.first_line));
                                var listaAux = generarCodigoConcatenar(t2, pos1, pos2, raiz.hijos[1].posicion);
                                listaCodigo = agregarLista(listaCodigo, listaAux);
                            }
                            break;
                        case 7:                     //concatenar '(' id INSTANCIA ',' OP ')' ';'{ //7
                            var variable = obtenerValorInstancia(raiz.hijos[2].token, raiz.hijos[3]);
                            var asignar = segundo.recorrerMetodos(raiz.hijos[5]);
                            if (variable.valor == "error") {
                                listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + raiz.hijos[2].token + " (LG) para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            listaCodigo = agregarLista(listaCodigo, variable.codigo);
                            listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                            var pos1 = variable.valor;
                            var pos2 = asignar.valor;
                            if (asignar == null || asignar.tipo == "nada") {
                                return;
                            } else if (variable.tipo == "caracter" && asignar.tipo == "cadena" || variable.tipo == "caracter" && asignar.tipo == "caracter") {
                                if (asignar.rol === 'valor') {
                                    var t2 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                    for (var i = 0; i < asignar.valor.length; i++) {
                                        var asc = asignar.valor.charCodeAt(i);
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + asignar.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    }
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    pos2 = t2;
                                }
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", variable.posicion, "+", variable.tamanio, "Obtener el tamanio"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(obtenerArreglo(t2, "Heap", t1, "Valor de la posicion"), raiz.hijos[1].posicion.first_line));
                                var listaAux = generarCodigoConcatenar(t2, pos1, pos2, raiz.hijos[1].posicion);
                                listaCodigo = agregarLista(listaCodigo, listaAux);
                            }
                            break;
                        case 8:                     //concatenar '(' id ',' OP ',' OP ')'
                            if (raiz.hijos[2].nombre == "id") {
                                var cadena = segundo.recorrerMetodos(raiz.hijos[4]);
                                var asignar = segundo.recorrerMetodos(raiz.hijos[6]);
                                var variable = obtenerVariable3D(raiz.hijos[2].token, raiz.hijos[2].posicion, true);
                                if (variable.valor == "error") {
                                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + raiz.hijos[2].token + " (LG) para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    return;
                                }
                                if (!(cadena.rol == "valor" && cadena.tipo == "cadena" && variable.tipo == "caracter")) {
                                    listaErrores.push(new Errores("Error Semantico", "Los tipos son incorrectos: " + raiz.hijos[2].token + " para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    return;
                                }
                                var cadena1 = "";
                                var cadena2 = "";
                                var tipo = "";
                                var noCadena = 1;
                                for (let i = 0; i < cadena.valor.length; i++) {
                                    var caracter = cadena.valor[i];
                                    if (caracter == "#") {
                                        tipo = cadena.valor[i + 1];
                                        i++;
                                        noCadena = 2;
                                    } else {
                                        if (noCadena == 1) {
                                            cadena1 += caracter;
                                        } else {
                                            cadena2 += caracter;
                                        }
                                    }
                                }
                                if (tipo === "") {
                                    listaErrores.push(new Errores("Error Semantico", "No se encontro el # para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    return;
                                }
                                listaCodigo = agregarLista(listaCodigo, variable.codigo);
                                listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                                if ((tipo === "E" && asignar.tipo == "entero") || (tipo === "B" && asignar.tipo == "booleano")) {
                                    var t1 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                    for (var i = 0; i < cadena1.length; i++) {
                                        var asc = cadena1.charCodeAt(i);
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + cadena1[i] + "' "), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    }
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    //
                                    var t2 = "";
                                    if (cadena2 !== "") {
                                        t2 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                        for (var i = 0; i < cadena2.length; i++) {
                                            var asc = cadena2.charCodeAt(i);
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + cadena2[i] + "' "), raiz.hijos[1].posicion.first_line));
                                            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        }
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    }
                                    var tam = obtenerTamanioAmbito();
                                    var t5 = generarTemp();
                                    var t6 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t5, "=", variable.posicion, "+", variable.tamanio, ""), p.first_line));
                                    listaCodigo.push(new Codigo(obtenerArreglo(t6, "Heap", t5, "Posicion del arreglo real"), p.first_line));

                                    var listaAux = generarCodigoConcatenar(t6, variable.valor, t1, raiz.hijos[1].posicion);
                                    listaCodigo = agregarLista(listaCodigo, listaAux);
                                    var t3 = generarTemp();
                                    var t4 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, asignar.valor, "Envio parametro3 a convertirEnteroACadena"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo("call, , , convertirEnteroACadena\n", raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", ""), -2));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -2));
                                    listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), raiz.hijos[1].posicion.first_line));

                                    var listaAux = generarCodigoConcatenar(t6, variable.valor, t4, raiz.hijos[1].posicion);
                                    listaCodigo = agregarLista(listaCodigo, listaAux);
                                    if (cadena2 !== "") {
                                        var listaAux = generarCodigoConcatenar(t6, variable.valor, t2, raiz.hijos[1].posicion);
                                        listaCodigo = agregarLista(listaCodigo, listaAux);
                                    }
                                }
                            }
                            else                    //concatenar '('  este '.' id ',' OP ')' ';'
                            {
                                boolEste = true;
                                var variable = obtenerVariable3D(raiz.hijos[4].token, raiz.hijos[2].posicion, true);
                                boolEste = false;
                                var asignar = segundo.recorrerMetodos(raiz.hijos[6]);
                                if (variable.valor == "error") {
                                    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + raiz.hijos[2].token + " (LG) para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    return;
                                }
                                listaCodigo = agregarLista(listaCodigo, variable.codigo);
                                listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                                var pos1 = variable.valor;
                                var pos2 = asignar.valor;
                                if (asignar == null || asignar.tipo == "nada") {
                                    return;
                                } else if (variable.tipo == "caracter" && asignar.tipo == "cadena" || variable.tipo == "caracter" && asignar.tipo == "caracter") {
                                    if (asignar.rol === 'valor') {
                                        var t2 = generarTemp();
                                        listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                        for (var i = 0; i < asignar.valor.length; i++) {
                                            var asc = asignar.valor.charCodeAt(i);
                                            listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + asignar.valor[i] + "' "), raiz.hijos[1].posicion.first_line));
                                            listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        }
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                        pos2 = t2;
                                    }
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    // listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", variable.posicion, "+", variable.tamanio.length, ""), p.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", variable.posicion, "+", variable.tamanio, "Obtener el tamanio"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(obtenerArreglo(t2, "Heap", t1, "Valor de la posicion"), raiz.hijos[1].posicion.first_line));
                                    var listaAux = generarCodigoConcatenar(t2, pos1, pos2, raiz.hijos[1].posicion);
                                    listaCodigo = agregarLista(listaCodigo, listaAux);
                                }
                            }
                            break;
                        case 9:                     //concatenar '(' id INSTANCIA ',' OP ',' OP ')' ';'{ //9
                            var variable = obtenerValorInstancia(raiz.hijos[2].token, raiz.hijos[3]);
                            var cadena = segundo.recorrerMetodos(raiz.hijos[5]);
                            var asignar = segundo.recorrerMetodos(raiz.hijos[7]);
                            if (variable.valor == "error") {
                                listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + raiz.hijos[2].token + " (LG) para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            if (!(cadena.rol == "valor" && cadena.tipo == "cadena" && variable.tipo == "caracter")) {
                                listaErrores.push(new Errores("Error Semantico", "Los tipos son incorrectos: " + raiz.hijos[2].token + " para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            var cadena1 = "";
                            var cadena2 = "";
                            var tipo = "";
                            var noCadena = 1;
                            for (let i = 0; i < cadena.valor.length; i++) {
                                var caracter = cadena.valor[i];
                                if (caracter == "#") {
                                    tipo = cadena.valor[i + 1];
                                    i++;
                                    noCadena = 2;
                                } else {
                                    if (noCadena == 1) {
                                        cadena1 += caracter;
                                    } else {
                                        cadena2 += caracter;
                                    }
                                }
                            }
                            if (tipo === "") {
                                listaErrores.push(new Errores("Error Semantico", "No se encontro el # para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            listaCodigo = agregarLista(listaCodigo, variable.codigo);
                            listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                            if ((tipo === "E" && asignar.tipo == "entero") || (tipo === "B" && asignar.tipo == "booleano")) {
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < cadena1.length; i++) {
                                    var asc = cadena1.charCodeAt(i);
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + cadena1[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                //
                                var t2 = "";
                                if (cadena2 !== "") {
                                    t2 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                    for (var i = 0; i < cadena2.length; i++) {
                                        var asc = cadena2.charCodeAt(i);
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + cadena2[i] + "' "), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    }
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                var tam = obtenerTamanioAmbito();
                                var t5 = generarTemp();
                                var t6 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t5, "=", variable.posicion, "+", variable.tamanio, ""), p.first_line));
                                listaCodigo.push(new Codigo(obtenerArreglo(t6, "Heap", t5, "Posicion del arreglo real"), p.first_line));

                                var listaAux = generarCodigoConcatenar(t6, variable.valor, t1, raiz.hijos[1].posicion);
                                listaCodigo = agregarLista(listaCodigo, listaAux);
                                var t3 = generarTemp();
                                var t4 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, asignar.valor, "Envio parametro3 a convertirEnteroACadena"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("call, , , convertirEnteroACadena\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", ""), -2));
                                listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -2));
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), raiz.hijos[1].posicion.first_line));

                                var listaAux = generarCodigoConcatenar(t6, variable.valor, t4, raiz.hijos[1].posicion);
                                listaCodigo = agregarLista(listaCodigo, listaAux);
                                if (cadena2 !== "") {
                                    var listaAux = generarCodigoConcatenar(t6, variable.valor, t2, raiz.hijos[1].posicion);
                                    listaCodigo = agregarLista(listaCodigo, listaAux);
                                }
                            }
                            break;
                        case 10:                    //concatenar '(' este '.' id ',' OP ',' OP ')' ';'
                            boolEste = true;
                            var variable = obtenerVariable3D(raiz.hijos[4].token, raiz.hijos[4].posicion, true);
                            boolEste = false;
                            var cadena = segundo.recorrerMetodos(raiz.hijos[6]);
                            var asignar = segundo.recorrerMetodos(raiz.hijos[8]);
                            if (variable.valor == "error") {
                                listaErrores.push(new Errores("Error Semantico", "No se ha encontrado la variable " + raiz.hijos[2].token + " (LG) para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            if (!(cadena.rol == "valor" && cadena.tipo == "cadena" && variable.tipo == "caracter")) {
                                listaErrores.push(new Errores("Error Semantico", "Los tipos son incorrectos: " + raiz.hijos[2].token + " para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            var cadena1 = "";
                            var cadena2 = "";
                            var tipo = "";
                            var noCadena = 1;
                            for (let i = 0; i < cadena.valor.length; i++) {
                                var caracter = cadena.valor[i];
                                if (caracter == "#") {
                                    tipo = cadena.valor[i + 1];
                                    i++;
                                    noCadena = 2;
                                } else {
                                    if (noCadena == 1) {
                                        cadena1 += caracter;
                                    } else {
                                        cadena2 += caracter;
                                    }
                                }
                            }
                            if (tipo === "") {
                                listaErrores.push(new Errores("Error Semantico", "No se encontro el # para concatenar", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                return;
                            }
                            listaCodigo = agregarLista(listaCodigo, variable.codigo);
                            listaCodigo = agregarLista(listaCodigo, asignar.codigo);
                            if ((tipo === "E" && asignar.tipo == "entero") || (tipo === "B" && asignar.tipo == "booleano")) {
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                for (var i = 0; i < cadena1.length; i++) {
                                    var asc = cadena1.charCodeAt(i);
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + cadena1[i] + "' "), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                //
                                var t2 = "";
                                if (cadena2 !== "") {
                                    t2 = generarTemp();
                                    listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                    for (var i = 0; i < cadena2.length; i++) {
                                        var asc = cadena2.charCodeAt(i);
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, " ' " + cadena2[i] + "' "), raiz.hijos[1].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                    }
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de cadena"), raiz.hijos[1].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                }
                                var tam = obtenerTamanioAmbito();
                                var t5 = generarTemp();
                                var t6 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t5, "=", variable.posicion, "+", variable.tamanio, ""), p.first_line));
                                listaCodigo.push(new Codigo(obtenerArreglo(t6, "Heap", t5, "Posicion del arreglo real"), p.first_line));

                                var listaAux = generarCodigoConcatenar(t6, variable.valor, t1, raiz.hijos[1].posicion);
                                listaCodigo = agregarLista(listaCodigo, listaAux);
                                var t3 = generarTemp();
                                var t4 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", "P", "+", "1", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", "H", "", "", ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, asignar.valor, "Envio parametro3 a convertirEnteroACadena"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("call, , , convertirEnteroACadena\n", raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", ""), -2));
                                listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), -2));
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Regresar ambito"), raiz.hijos[1].posicion.first_line));

                                var listaAux = generarCodigoConcatenar(t6, variable.valor, t4, raiz.hijos[1].posicion);
                                listaCodigo = agregarLista(listaCodigo, listaAux);
                                if (cadena2 !== "") {
                                    var listaAux = generarCodigoConcatenar(t6, variable.valor, t2, raiz.hijos[1].posicion);
                                    listaCodigo = agregarLista(listaCodigo, listaAux);
                                }
                            }
                            break;
                    }
                    break;
                case "PUNTEROS":
                    switch (raiz.hijos.length) {
                        case 4: //destruirPuntero '(' id ')' ';'
                            var variable = obtenerVariableLocal(raiz.hijos[2].token, raiz.hijos[0].posicion, true);
                            if (variable != null) {
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, ""), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                            }
                            break;
                        case 7: //crearPuntero '(' TIPO ',' id ')' ASIGNAR ';'//crearPuntero '(' id ',' id ')' ASIGNAR ';'
                            var variable = obtenerVariableLocal(raiz.hijos[4].token, raiz.hijos[0].posicion, false);
                            if (variable != null) {
                                var t1 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", variable.posicion, ""), raiz.hijos[1].posicion.first_line));
                                var asignar = segundo.recorrerMetodos(raiz.hijos[6]);
                                if (asignar == null || asignar.tipo == "nada") {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t1, varNulo, ""), raiz.hijos[1].posicion.first_line));
                                    declararVariable(raiz.hijos[4].token, "local");
                                } else {
                                    if (asignar.rolVariable == "puntero") { //Si la variable es un puntero
                                        var t2 = generarTemp();
                                        asignar.codigo.push(new Codigo(obtenerArreglo(t2, "Stack", asignar.posicion, "Obtengo la referencia"), raiz.hijos[1].posicion.first_line));
                                        asignar.valor = t2;
                                        variable.ambitoDireccion = asignar.ambitoVariable;
                                    } else {
                                        variable.ambitoDireccion = asignar.ambito;
                                    }
                                    asignarVariable(asignar, t1, tipo, raiz.hijos[0].posicion, true);
                                    declararVariable(raiz.hijos[4].token, "local");
                                    //
                                }
                                if (asignar.memoria == true) { // Si la variable ya reservo memoria
                                    variable.memoriaReservada = asignar.memoria;
                                    /*listaCodigoAux.push(new Codigo(generarCuadruplo(etqV, "=", resultado.valor, operadorRelacional("!="), "-281216", "Es nulo"), posicion.first_line));
                                    listaCodigoAux.push(new Codigo(generarCuadruplo(t3, "=", resultado.valor, "", "", "Es nulo"), posicion.first_line));
                                    listaCodigoAux.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), posicion.first_line));
                                        */
                                }
                            }
                            break;
                    }
                    break;
                case "MEMORIA":
                    switch (raiz.hijos.length) {
                        case 4:
                            if (raiz.hijos[0].nombre == "obtenerDireccion") {             //obtenerDireccion '(' id ')'
                                result = obtenerVariable3D(raiz.hijos[2].token, raiz.hijos[0].posicion);
                                if (result.rolVariable != "arreglo") {
                                    result.valor = result.posicion;
                                }

                            } else if (raiz.hijos[0].nombre == "reservarMemoria") {        //reservarMemoria '(' OP ')' 
                                var resultado = segundo.recorrerMetodos(raiz.hijos[2]);
                                var listaAux = [];
                                if (resultado.tipo.toLowerCase() == "entero") {
                                    var t0 = generarTemp();
                                    var t1 = generarTemp();
                                    var etqV = generarEtq();
                                    var etqF = generarEtq();
                                    listaAux.push(new Codigo(generarCuadruplo(t0, "=", "H", "", "", ""), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(t1, "=", resultado.valor, "", "", "Contador"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(etqF + ":\n", raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(etqV, "=", t1, operadorRelacional("=="), "0", "Reservar memoria"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", varNulo, ""), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(t1, "=", t1, "-", "1", "Contador"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo(etqF, "=", "", "jmp", "", "Etiqueta falsa"), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(etqV + ":\n", raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(guardarEnArreglo("Heap", "H", "0", ""), raiz.hijos[0].posicion.first_line));
                                    listaAux.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));

                                    resultado.codigo = agregarLista(resultado.codigo, listaAux);
                                    resultado.posicion = resultado.valor;
                                    resultado.valor = t0;
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "El tipo en reservar memoria no es entero", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    resultado.rol = 'error';
                                    resultado.tipo = 'error';
                                    return;
                                }
                                resultado.rol = "temp";
                                resultado.memoria = true;
                                return resultado;
                            } else {                                                      //consultarTamanio '(' OP ')'
                                var resultado = segundo.recorrerMetodos(raiz.hijos[2]);
                                if (resultado.valor != "error" && resultado.rolVariable == "arreglo") {
                                    var t1 = generarTemp();
                                    var t2 = generarTemp();
                                    resultado.codigo.push(new Codigo(generarCuadruplo(t1, "=", resultado.posicion, "+", resultado.tamanio.length, ""), raiz.hijos[0].posicion.first_line));
                                    resultado.codigo.push(new Codigo(obtenerArreglo(t2, "Heap", t1, "Tamanio del arreglo"), raiz.hijos[0].posicion.first_line));
                                    resultado.valor = t2;
                                }
                                if (resultado.valor == "error") {
                                    for (var i = 0; i < claseActual.listaEstructuras.length; i++) {
                                        var m = claseActual.listaEstructuras[i];
                                        if (m.nombre.toLowerCase() === resultado.valorTemp.toLowerCase()) {
                                            resultado.valor = m.contadorPosicion;
                                            resultado.tipo = "entero";
                                            resultado.rol = "valor";
                                        }
                                    }
                                    for (var i = 0; i < tablaSimbolos.length; i++) {
                                        var m = tablaSimbolos[i];
                                        if (m.nombre.toLowerCase() === resultado.valorTemp.toLowerCase()) {
                                            resultado.valor = m.contadorPosicion;
                                            resultado.tipo = "entero";
                                            resultado.rol = "valor";
                                        }
                                    }
                                }
                                result = resultado;
                            }
                            break;
                        case 6:
                            if (raiz.hijos[0].nombre == "obtenerDireccion") {             //obtenerDireccion '(' este . id ')'
                                result = obtenerVariable3D(raiz.hijos[4].token, raiz.hijos[0].posicion);
                                if (result.rolVariable != "arreglo") {
                                    result.valor = result.posicion;
                                }
                            }
                            break;
                    }
                    break;
                case "TECLADO":
                    switch (raiz.hijos.length) {
                        case 6:                     //leerteclado '(' OP "," id ')' 
                            result = segundo.recorrerMetodos(raiz.hijos[2]);
                            var variable = obtenerVariable3D(raiz.hijos[4].token, raiz.hijos[0].posicion);
                            if (result.tipo.toLowerCase() == "cadena" || result.tipo.toLowerCase() == "caracter") {
                                listaCodigo = agregarLista(listaCodigo, variable.codigo);
                                var t0 = generarTemp();
                                if (result.rol == 'temp') {
                                    listaCodigo = agregarLista(listaCodigo, result.codigo);
                                    //listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", result.valor, "Guardo el inicio de la cadena"), raiz.hijos[0].posicion.first_line));
                                    t0 = result.valor;
                                } else {
                                    listaCodigo.push(new Codigo(generarCuadruplo(t0, "=", "H", "", "", "Inicio de la cadena"), raiz.hijos[0].posicion.first_line));
                                    for (var i = 0; i < result.valor.length; i++) {
                                        var asc = result.valor.charCodeAt(i);
                                        listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", asc, "'" + result.valor[i] + "'"), raiz.hijos[0].posicion.first_line));
                                        listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                    }
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Heap", "H", "0", "Fin de la cadena"), raiz.hijos[0].posicion.first_line));
                                    listaCodigo.push(new Codigo(generarCuadruplo("H", "=", "H", "+", "1", ""), raiz.hijos[0].posicion.first_line));

                                }
                                var tam = obtenerTamanioAmbito();
                                var t1 = generarTemp();
                                var t2 = generarTemp();
                                var t3 = generarTemp();
                                var t4 = generarTemp();
                                var t5 = generarTemp();
                                var t6 = generarTemp();
                                listaCodigo.push(new Codigo(generarCuadruplo(t1, "=", "P", "+", tam, "Desplazar al ambito simulado"), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t2, "=", t1, "+", "1", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t2, "0", "Envio el retorno"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t3, "=", t1, "+", "2", ""), raiz.hijos[0].posicion.first_line));
                                if (variable.rolVariable == "arreglo") {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, variable.valor, "Envio la posicion de la variable a guardar"), raiz.hijos[0].posicion.first_line));
                                } else {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t3, variable.posicion, "Envio la posicion de la variable a guardar"), raiz.hijos[0].posicion.first_line));
                                }
                                listaCodigo.push(new Codigo(generarCuadruplo(t4, "=", t1, "+", "3", ""), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t4, t0, "Envio la posicion del inicio de la cadena"), raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo(t5, "=", t1, "+", "4", ""), raiz.hijos[0].posicion.first_line));
                                if (variable.tipo.toLowerCase() == "entero") {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t5, 0, "Envio el tipo"), raiz.hijos[0].posicion.first_line));
                                } else if (variable.tipo.toLowerCase() == "decimal") {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t5, 1, "Envio el tipo"), raiz.hijos[0].posicion.first_line));
                                } else if (variable.tipo.toLowerCase() == "booleano") {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t5, 2, "Envio el tipo"), raiz.hijos[0].posicion.first_line));
                                } else if (variable.tipo.toLowerCase() == "caracter") {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t5, 3, "Envio el tipo"), raiz.hijos[0].posicion.first_line));
                                } else {
                                    listaErrores.push(new Errores("Error Semantico", "Tipo " + variable.tipo + " incorrecto en leer teclado", raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                                    return;
                                }
                                listaCodigo.push(new Codigo(generarCuadruplo(t6, "=", t1, "+", "5", ""), raiz.hijos[0].posicion.first_line));
                                if (variable.ambito == "local" && variable.rolVariable != "arreglo") {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t6, 0, "Envio el ambito local"), raiz.hijos[0].posicion.first_line));
                                } else {
                                    listaCodigo.push(new Codigo(guardarEnArreglo("Stack", t6, 1, "Envio el ambito global"), raiz.hijos[0].posicion.first_line));
                                }
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "+", tam, "Cambiar ambito "), raiz.hijos[1].posicion.first_line));
                                listaCodigo.push(new Codigo("call, , , $_in_value\n", raiz.hijos[0].posicion.first_line));
                                listaCodigo.push(new Codigo(generarCuadruplo("P", "=", "P", "-", tam, "Cambiar ambito "), raiz.hijos[1].posicion.first_line));
                            }
                            break;
                    }
                    break;
                case "FUNCION_EDD":
                    var opcion = segundo.recorrerMetodos(raiz.hijos[2]);
                    var variable = obtenerVariable3D(raiz.hijos[0].token, raiz.hijos[0].posicion);
                    if (variable.tipo == "error") {
                        return;
                    } else if (variable.inicializada == false) {
                        listaErrores.push(new Errores("Error Semantico", "No se ha inicializado la estructura de datos : " + raiz.hijos[0].token, raiz.hijos[0].posicion.first_line, raiz.hijos[0].posicion.first_column));
                        return;
                    }
                    listaCodigo = agregarLista(listaCodigo, variable.codigo);
                    break;

                case "OPCION_EDD":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = raiz.hijos[0].token;
                            break;
                    }
                    break;
                case "OP":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = segundo.recorrerMetodos(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "E":
                    //listaCodigoAux = [];
                    result = resolverOperacion(raiz);
                    //listaCodigoAux = [];
                    break;
            }
        }
        return result;
    }

    obtenerParametros(raiz) {
        var result = null;

        if (raiz !== null) {
            // console.log(raiz.nombre + ":" + raiz.hijos.length);
            switch (raiz.nombre) {
                case "PARAMETRO":
                    switch (raiz.hijos.length) {
                        case 1:
                            var param = [];
                            param.push(segundo.obtenerParametros(raiz.hijos[0]));
                            result = param;
                            break;
                        case 3:
                            var param = segundo.obtenerParametros(raiz.hijos[0]);
                            param.push(segundo.obtenerParametros(raiz.hijos[2]));
                            result = param;
                            break;
                    }
                    break;
                case "PARAM":
                    var tipo = "";
                    var nombre = "";
                    switch (raiz.hijos.length) {
                        case 2:
                            if (raiz.hijos[0].nombre === "TIPO") {  //TIPO id
                                tipo = segundo.recorrer(raiz.hijos[0]);
                            } else {                                //id id
                                tipo = raiz.hijos[0].token;
                            }
                            nombre = raiz.hijos[1].token;
                            var variable = new Variable("publico", tipo, nombre, crearAmbito(), "parametro", 1, []);
                            result = variable;
                            break;
                        case 3:
                            if (raiz.hijos[0].nombre === "TIPO") {  //TIPO id DIMEN
                                tipo = segundo.recorrer(raiz.hijos[0]);
                            } else {                                //id id DIMEN
                                tipo = raiz.hijos[0].token;
                            }
                            nombre = raiz.hijos[1].token;
                            var dim = segundo.recorrer(raiz.hijos[2]);
                            var variable = new Variable("publico", tipo, nombre, crearAmbito(), "parametro", 1, dim);
                            result = variable;
                            break;
                    }
                    break;

            }
        }
        return result;
    }

}
