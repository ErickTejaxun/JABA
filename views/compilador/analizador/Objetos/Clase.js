
function Clase(visibilidad, nombre, herencia) {

    this.visibilidad = visibilidad.toLowerCase();
    this.nombre = nombre.toLowerCase();
    this.herencia = herencia;
    this.listaVariables = [];
    this.listaMetodos = [];
    this.listaEstructuras = [];
    this.contadorPosicion = 0;
    this.rol = "clase";
    //Estructura
    this.ambito = ambito;
    this.posicion = 0;
}

function obtenerTamanioClase(nombre, p) {

    for (var i = 0; i < tablaSimbolos.length; i++) {
        if (tablaSimbolos[i].nombre.toLowerCase() == nombre.toLowerCase()) {
            return tablaSimbolos[i].contadorPosicion;
        }
    }
    for (var i = 0; i < tablaSimbolos.length; i++) {
        var clase = tablaSimbolos[i];
        for (let j = 0; j < clase.listaEstructuras.length; j++) {
            var estruc = clase.listaEstructuras[j];
            if (estruc.nombre.toLowerCase() == nombre.toLowerCase()) {
                return estruc.contadorPosicion;
            }
        }

    }
    //listaErrores.push(new Errores("Error Semantico", "No existe la clase, ni la estructura" + nombre + " en obtener tamanio", p.first_line, p.first_column));
    return 1;
}

function obtenerClase(nombre) {
    for (var i = 0; i < tablaSimbolos.length; i++) {
        if (tablaSimbolos[i].nombre.toLowerCase() == nombre.toLowerCase()) {
            return tablaSimbolos[i];
        }
    }
    return null;
}

function obtenerClasePrincipal() {
    for (var i = 0; i < tablaSimbolos.length; i++) {
        var simbolo = tablaSimbolos[i];
        if (simbolo.rol == "clase") {
            var listaMetodos = tablaSimbolos[i].listaMetodos;
            for (let j = 0; j < listaMetodos.length; j++) {
                var metodo = listaMetodos[j];
                if (metodo.nombre.toLowerCase() === "principal") {
                    return tablaSimbolos[i];
                }
            }
        }
    }
    listaErrores.push(new Errores("Error Semantico", "No existe ningun metodo principal", 0, 0));
    return null;
}

function obtenerClaseEstructura(nombre) {
    try {
        for (var i = 0; i < tablaSimbolos.length; i++) {
            var simbolo = tablaSimbolos[i];
            if (simbolo.nombre.toLowerCase() == nombre.toLowerCase() ) {
                return simbolo;
            }
        }
        for (var i = 0; i < claseActual.listaEstructuras.length; i++) {
            var m = claseActual.listaEstructuras[i];
            if (m.nombre.toLowerCase() === nombre.toLowerCase()) {
                return m;
            }
        }
    } catch (error) {
        console.log("No se ha encontrado nada");
        return null;
    }
    return null;
}
