function Metodo(visibilidad, tipo, nombre, ambito, sobrescrito, rol, parametros) {

    this.visibilidad = visibilidad.toLowerCase();
    this.tipo = tipo.toLowerCase();
    this.nombre = nombre.toLowerCase();
    this.ambito = ambito;
    this.rol = rol;
    this.sobrescrito = sobrescrito;
    this.listaVariables = [];
    this.listaParametros = parametros;
    this.contadorPosicion = 0;
    this.posicion = 0;
    //
    this.nombreAux = "";
    this.retorno = false;
    this.posicionHeredada = 0;
}

function obtenerMetodo(nombre, rol, parametros, p) {
    for (var i = 0; i < claseActual.listaMetodos.length; i++) {
        var m = claseActual.listaMetodos[i];
        if (m.nombre.toLowerCase() === nombre.toLowerCase() && m.rol.toLowerCase() === rol.toLowerCase()) {
            var contador = 0;
            if (m.listaParametros.length == parametros.length) {
                for (let k = 0; k < m.listaParametros.length; k++) {
                    var p1 = m.listaParametros[k];
                    var p2 = parametros[k];
                    if (p1.nombre.toLowerCase() === p2.nombre.toLowerCase() && p1.tipo.toLowerCase() == p2.tipo.toLowerCase()) {
                        contador++;
                    }
                }
                if (contador === parametros.length) {
                    return m;
                }
            }
        }
    }
    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado el metodo: " + nombre, p.first_line, p.first_column));
    return null;
}

function cambiarAmbitoMetodo(nombreAux) {
    for (var i = 0; i < claseActual.listaMetodos.length; i++) {
        var m = claseActual.listaMetodos[i];
        if (m.nombreAux.toLowerCase() === nombreAux.toLowerCase()) {
            metodoActual = m;
            return;
        }
    }
    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado el metodo para cambiar ambito: " + nombreAux, p.first_line, p.first_column));
    return null;
}

function obtenerMetodoLlamada(nombre, parametros, p) {
    for (var i = 0; i < claseActual.listaMetodos.length; i++) {
        var m = claseActual.listaMetodos[i];
        if (m.nombre.toLowerCase() === nombre.toLowerCase() && m.rol.toLowerCase() === "metodo") {
            var contador = 0;
            if (esObjeto == "true" && m.visibilidad.toLowerCase() == "privado") {
                continue;
            }
            if (m.listaParametros.length == parametros.length) {
                for (let k = 0; k < m.listaParametros.length; k++) {
                    var p1 = m.listaParametros[k];
                    var p2 = parametros[k];
                    var t1 = p1.tipo.toLowerCase();
                    var t2 = p2.tipo.toLowerCase();
                    if (t1 == t2 || (t1 == "cadena" && t2 == "caracter") || (t1 == "caracter" && t2 == "cadena")) {
                        contador++;
                    }
                }
                if (contador === parametros.length) {
                    return m;
                }
            }

        }
    }
    return buscarMetodosHeredados(nombre, claseActual, parametros, claseActual.listaVariables.length, p)
}

function obtenerConstructor(nombre, parametros, p) {
    for (var i = 0; i < tablaSimbolos.length; i++) {
        var clase = tablaSimbolos[i];
        if (clase.nombre == nombre) {
            for (var j = 0; j < clase.listaMetodos.length; j++) {
                var m = clase.listaMetodos[j];
                if (m.nombre.toLowerCase() === nombre.toLowerCase() && m.rol.toLowerCase() == "constructor") {
                    var contador = 0;
                    if (m.listaParametros.length == parametros.length) {
                        for (let k = 0; k < m.listaParametros.length; k++) {
                            var p1 = m.listaParametros[k];
                            var p2 = parametros[k];
                            if (p1.tipo.toLowerCase() == p2.tipo.toLowerCase()) {
                                contador++;
                            }
                        }
                        if (contador === parametros.length) {
                            return m;
                        }
                    }
                }
            }
        }
    }
    if (parametros.length > 0) {
        listaErrores.push(new Errores("Error Semantico", "No se ha encontrado el contructor " + nombre, p.first_line, p.first_column));
    }
    return null;
}

function buscarMetodosHeredados(nombre, clase, parametros, tamanio, p) {
    if (clase.herencia != "") {
        var claseHeredada = obtenerClase(clase.herencia);
        if (claseHeredada != null) {
            for (var i = 0; i < claseHeredada.listaMetodos.length; i++) {
                var m = claseHeredada.listaMetodos[i];
                if (m.nombre.toLowerCase() === nombre.toLowerCase() && m.rol.toLowerCase() === "metodo") {
                    if (m.visibilidad.toLowerCase() != "privado") {
                        var contador = 0;
                        if (m.listaParametros.length == parametros.length) {
                            for (let k = 0; k < m.listaParametros.length; k++) {
                                var p1 = m.listaParametros[k];
                                var p2 = parametros[k];
                                if (p1.tipo.toLowerCase() == p2.tipo.toLowerCase()) {
                                    contador++;
                                }
                            }
                            if (contador === parametros.length) {
                                m.posicionHeredada = tamanio;
                                return m;
                            }
                        }
                    } else {
                        listaErrores.push(new Errores("Error Semantico", "El metodo " + nombre + " es privado", p.first_line, p.first_column));
                        return null;
                    }
                }
            }
            if (claseHeredada.herencia != "") {
                return buscarMetodosHeredados(nombre, claseHeredada, parametros, tamanio + claseHeredada.listaVariables.length, p);
            }
        }
    }
    return null;
}


function buscarMetodoSobrescrito(nombre, clase, parametros) {
    if (clase.herencia != "") {
        var claseHeredada = obtenerClase(clase.herencia);
        if (claseHeredada != null) {
            for (var i = 0; i < claseHeredada.listaMetodos.length; i++) {
                var m = claseHeredada.listaMetodos[i];
                if (m.nombre.toLowerCase() === nombre.toLowerCase() && m.rol.toLowerCase() === "metodo") {
                    var contador = 0;
                    if (m.listaParametros.length == parametros.length) {
                        for (let k = 0; k < m.listaParametros.length; k++) {
                            var p1 = m.listaParametros[k];
                            var p2 = parametros[k];
                            if (p1.tipo.toLowerCase() == p2.tipo.toLowerCase()) {
                                contador++;
                            }
                        }
                        if (contador === parametros.length) {
                            return m;
                        }
                    }
                }
            }
            if (claseHeredada.herencia != "") {
                return buscarMetodoSobrescrito(nombre, claseHeredada, parametros, p);
            }
        }
    }
    return null;
}
