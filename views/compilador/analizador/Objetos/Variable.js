function Variable(visibilidad, tipo, nombre, ambito, rol, tamanio, dimension) {
    this.visibilidad = visibilidad.toLowerCase();
    this.nombre = nombre.toLowerCase();
    this.tipo = tipo.toLowerCase();
    this.ambito = ambito;
    this.rol = rol;
    this.posicion = 0;
    this.tamanio = tamanio;
    this.dimension = dimension;
    this.tipo
    //
    this.declarada = false;
    this.ambitoAux = "global";
    this.disponible = 0;
    this.arregloDeclarado = false;
    this.inicializada = false;
    //
    this.ambitoDireccion = "global";
    this.memoriaReservada = false;
    //
    this.heredada = false;
    this.posicionHeredada = 0;
}

function obtenerTamanioArreglo(nombre, dim, p) {
    return 1;
}

function obtenerVariableGlobal(nombre, p, declarada) {
    for (var i = 0; i < claseActual.listaVariables.length; i++) {
        var v = claseActual.listaVariables[i];
        if (v.nombre.toLowerCase() === nombre.toLowerCase()) {
            if (v.declarada == declarada) {
                return v;
            } else {
                console.log("Puede que no este declarada global = " + nombre);
            }
        }
    }
    if (claseActual.herencia != "") {
        return buscarVariablesHeredadas(nombre, claseActual, claseActual.listaVariables.length, p);
    }
    return null;
}

function obtenerVariableLocal(nombre, p, declarada) {
    if (metodoActual != "") {
        for (var i = 0; i < metodoActual.listaVariables.length; i++) {
            var v = metodoActual.listaVariables[i];
            if (v.nombre.toLowerCase() === nombre.toLowerCase()) {
                if (v.declarada == declarada) {
                    var ambitoV = v.ambito.split(',');
                    if (compararAmbito(ambitoV, ambito.length) == true) { //Aunque esta en el mismo metodo asi diferenciar las varibles de algo recursivo
                        return v;
                    }
                } else {
                    console.log("Puede que no este declarada local = " + nombre);
                }
            }
        }
    }
    return null;
}

function verificarTipo(variable, tipoAsignar, p) {
    if (variable.tipo != null && tipoAsignar != null) {
        if (verificarExisteTipo(variable, p) == false) {
            return false;
        }
        if (variable.tipo.toLowerCase() === tipoAsignar.toLowerCase()) {
            return true;
        } else if (variable.tipo.toLowerCase() == "cadena" || tipoAsignar.toLowerCase() == "cadena" || variable.tipo.toLowerCase() == "caracter" || tipoAsignar.toLowerCase() == "caracter") {
            return true;
        } else {
            listaErrores.push(new Errores("Error Semantico", "Tipo incorecto = " + variable.tipo + " - " + tipoAsignar, p.first_line, p.first_column));
            listaCodigo.push(new Codigo("// ERROR\n", p.first_line));
            return false;
        }
    } else {
        listaErrores.push(new Errores("Error Semantico", "Tipo nuloo = " + variable.tipo + " - " + tipoAsignar, p.first_line, p.first_column));
        listaCodigo.push(new Codigo("// ERROR\n", p.first_line));
        return false;
    }
}

function declararVariable(nombre, tipo) {
    //if (tipo == "global") {
    try {
        switch (tipo) {
            case "global":
                for (var i = 0; i < claseActual.listaVariables.length; i++) {
                    var v = claseActual.listaVariables[i];
                    if (v.nombre.toLowerCase() === nombre.toLowerCase()) {
                        claseActual.listaVariables[i].declarada = true;
                        return;
                    }
                }
            case "local":
                if (metodoActual != "") {
                    for (var i = 0; i < metodoActual.listaVariables.length; i++) {
                        var v = metodoActual.listaVariables[i];
                        if (v.nombre.toLowerCase() === nombre.toLowerCase() && v.ambito.toLowerCase() == crearAmbito()) { //Aunque esta en el mismo metodo asi diferenciar las varibles de algo recursivo
                            metodoActual.listaVariables[i].declarada = true;
                            return;
                        }
                    }
                }
        }
    } catch (error) {
        listaErrores.push(new Errores("Error Semantico", "Al declarar la variable " + nombre, 0, 0));
    }
}

function buscarVariablesHeredadas(nombre, clase, tamanio, p) {
    if (clase.herencia != "") {
        var claseHeredada = obtenerClase(clase.herencia);
        if (claseHeredada != null) {
            for (var i = 0; i < claseHeredada.listaVariables.length; i++) {
                var v = claseHeredada.listaVariables[i];
                if (v.nombre.toLowerCase() === nombre.toLowerCase()) {
                    if (v.visibilidad.toLowerCase() != "privado") {
                        v.posicionHeredada = v.posicion + tamanio;
                        v.heredada = true;
                        return v;
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El atributo " + nombre + " es privado", p.first_line, p.first_column));
                        return null;
                    }
                }
            }
            if (claseHeredada.herencia != "") {
                return buscarVariablesHeredadas(nombre, claseHeredada, tamanio + claseHeredada.listaVariables.length, p);
            }
        }
    }
    return null;
}

function verificarExisteTipo(variable, p) {
    try {
        var tipo = variable.tipo.toLowerCase();
        if (tipo == "entero" || tipo == "decimal" || tipo == "caracter" || tipo == "booleano" || tipo == "vacio") {
            return true;
        } else if (tipo == "lista" || tipo == "pila" || tipo == "cola") {
            return true;
        }
        for (var i = 0; i < tablaSimbolos.length; i++) {
            var simbolo = tablaSimbolos[i];
            if (simbolo.nombre.toLowerCase() == tipo.toLowerCase()) {
                if (simbolo.rol == "clase") {
                    variable.inicializada = true;
                }
                return true;
            }
        }
        for (var i = 0; i < claseActual.listaEstructuras.length; i++) {
            var m = claseActual.listaEstructuras[i];
            if (m.nombre.toLowerCase() === tipo.toLowerCase()) {
                return true;
            }
        }
    } catch (error) {
        listaErrores.push(new Errores("Error Semantico", "El tipo " + tipo + " no existe ", p.first_line, p.first_column));
        listaCodigo.push(new Codigo("// ERROR\n", p.first_line));
        return false;
    }
    listaErrores.push(new Errores("Error Semantico", "El tipo " + tipo + " no existe ", p.first_line, p.first_column));
    listaCodigo.push(new Codigo("// ERROR\n", p.first_line));
    return false;
}