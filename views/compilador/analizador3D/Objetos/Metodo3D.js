
function Metodo3D(nombre, nodo) {
    this.nombre = nombre;
    this.nodo = nodo;
}

function MetodoDebug(nombre, nodo, linea) {
    this.nombre = nombre;
    this.nodo = nodo;
    this.linea = linea;
}

limite = 0;
//boolCasteo = false;

function ejecutarMetodo(nombre) {
    if (nombre == "convertirDecimalACadena") {
        convertirDecimalCadenaDefinido();
        return;
    }
    for (let i = 0; i < listaMetodos3D.length; i++) {
        var m = listaMetodos3D[i];
        if (m.nombre.toLowerCase() === nombre.toLowerCase()) {
            console.log("Ejecutar " + nombre + ", P: " + p + ", H: " + h);
            limite = 0;
            ambito3D.push(nombre);
            var nueva = new Recorrido3D();
            nueva.ejecutar(m.nodo);
            ambito3D.pop();
            return;
        }
    }
    listaErrores.push(new Errores("Error Semantico", "No se ha encontrado el metodo : " + nombre + " para ejecutar", 0, 0));

}
