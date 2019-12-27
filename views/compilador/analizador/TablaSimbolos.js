function agregarClase(clase, p) {
    console.log(clase);

    for (var i = 0; i < tablaSimbolos.length; i++) {
        if (tablaSimbolos[i].nombre == clase.nombre) {
            listaErrores.push(new Errores("Error Semantico", "Ya existe la clase o estructura " + clase.nombre, p.first_line, p.first_column));
            return false;
        }
    }
    console.log(" * * * * * * * * * *  " + clase.nombre + " * * * * * * * * * *  ");
    clase.nombreAux = clase.nombre;
    tablaSimbolos.push(clase);
    claseActual = clase;
    return true;
}

function agregarVariable(variable, p) {
    //console.log(variable);
    if (metodoActual == "") {
        for (var i = 0; i < claseActual.listaVariables.length; i++) {
            var v = claseActual.listaVariables[i];
            if (v.nombre === variable.nombre && v.ambito.toLowerCase() == crearAmbito()) {
                listaErrores.push(new Errores("Error Semantico", "Ya existe la variable global" + variable.nombre, p.first_line, p.first_column));
                return false;
            }
        }
        variable.ambitoAux = "global";
        variable.posicion = claseActual.contadorPosicion;
        claseActual.contadorPosicion += 1;
        claseActual.listaVariables.push(variable);
    } else {
        for (var i = 0; i < metodoActual.listaVariables.length; i++) {
            var v = metodoActual.listaVariables[i];
            if (v.nombre === variable.nombre && v.ambito.toLowerCase() == crearAmbito()) {
                listaErrores.push(new Errores("Error Semantico", "Ya existe la variable local " + variable.nombre, p.first_line, p.first_column));
                return false;
            }
        }
        variable.ambitoAux = "local";
        variable.tipo = variable.tipo.toLowerCase();
        variable.posicion = metodoActual.contadorPosicion;
        metodoActual.contadorPosicion += 1;
        metodoActual.listaVariables.push(variable);
    }
    return true;
}

function agregarMetodo(metodo, p, tamReturn) {
    console.log(metodo);
    metodo.nombreAux = metodo.nombre;
    for (var i = 0; i < claseActual.listaMetodos.length; i++) {
        var v = claseActual.listaMetodos[i];
        if (v.nombre === metodo.nombre) {
            if (v.listaParametros.length === metodo.listaParametros.length) {
                var igual = 0;
                for (let j = 0; j < metodo.listaParametros.length; j++) {
                    var p1 = metodo.listaParametros[j];
                    var p2 = v.listaParametros[j];
                    if (p1.tipo === p2.tipo && p1.nombre === p2.nombre) {
                        igual += 1;
                    }
                }
                if (igual === metodo.listaParametros.length) {
                    listaErrores.push(new Errores("Error Semantico", "Ya existe el metodo " + metodo.nombre, p.first_line, p.first_column));
                    return false;
                }
            }
        }
    }
    ambito.push(metodo.nombre);
    metodoActual = metodo;
    iniciarMetodo(tamReturn);
    //Agregar Parametros
    for (let i = 0; i < metodo.listaParametros.length; i++) {
        var variable = metodo.listaParametros[i];
        console.log(variable);
        variable.ambito = crearAmbito();
        variable.ambitoAux = "local";
        variable.tipo = variable.tipo.toLowerCase();
        variable.posicion = metodoActual.contadorPosicion;
        metodoActual.contadorPosicion += 1;
        metodoActual.listaVariables.push(variable);
    }
    if (!(metodo.nombre.toLowerCase() == "principal")) {
        metodo.nombreAux = metodo.nombre + "_" + contadorMetodos++;
    }
    metodoActual.posicion = claseActual.contadorPosicion;
    claseActual.listaMetodos.push(metodoActual);
    return true;
}

function iniciarMetodo(tamReturn) {
    //this
    var varThis = new Variable("publico", "this", "this", crearAmbito(), "this", 1, []);
    varThis.posicion = metodoActual.contadorPosicion;
    metodoActual.contadorPosicion += varThis.tamanio;
    metodoActual.listaVariables.push(varThis);
    //Return
    var varReturn = new Variable("publico", "return", "return", crearAmbito(), "return", tamReturn, []);
    varReturn.posicion = metodoActual.contadorPosicion;
    metodoActual.contadorPosicion += varReturn.tamanio;
    metodoActual.listaVariables.push(varReturn);
    //
}

function finalizarMetodo() {
    metodoActual = "";
    ambito.pop();
    //claseActual.contadorPosicion += metodoActual.contadorPosicion + 1;
}

function crearAmbito() {
    var nuevo = "inicio";
    for (let i = 0; i < ambito.length; i++) {
        nuevo += "," + ambito[i].toLowerCase();
    }
    return nuevo;
}

function agregarEstructura(estruct, p) {
    console.log(estruct);
    if (estruct.ambito == "Inicio,Global") {
        for (var i = 0; i < tablaSimbolos.length; i++) {
            if (tablaSimbolos[i].nombre == estruct.nombre) {
                listaErrores.push(new Errores("Error Semantico", "Ya existe la clase o estructura " + estruct.nombre, p.first_line, p.first_column));
                return false;
            }
        }
        claseActual = estruct;
        ambito.push(estruct.nombre);
        tablaSimbolos.push(estruct);
        return true;
    } else {
        for (var i = 0; i < claseActual.listaEstructuras.length; i++) {
            var v = claseActual.listaEstructuras[i];
            if (v.nombre === estruct.nombre) {
                listaErrores.push(new Errores("Error Semantico", "Ya existe la estructura" + estruct.nombre, p.first_line, p.first_column));
                return false;
            }
        }
        ambito.push(estruct.nombre);
        claseActual.listaEstructuras.push(estruct);
        claseActual = estruct;
        return true;
    }
    return false;
}

function obtenerTamanioAmbito() {
    if (metodoActual != "") {
        return metodoActual.listaVariables.length;
    } else {
        return claseActual.listaVariables.length;
    }
    listaErrores.push(new Errores("Error Semantico", "Al momento de obtener el tamanio del ambito", p.first_line, p.first_column));
    return 0;
}

function compararAmbito(ambitoV, iteracion) {
    if (iteracion >= 2) {
        var nombreAmbitoVariable = ambitoV[ambitoV.length - 1];
        var nombreAmbitoActual = ambito[iteracion - 1];
        if (nombreAmbitoActual.toLowerCase() == nombreAmbitoVariable.toLowerCase()) {
            return true;
        } else {
            return compararAmbito(ambitoV, iteracion - 1);
        }
    }
    return false;
}
