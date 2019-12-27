function Errores(tipo, descripcion, fila, columna) {

    this.descripcion = descripcion;
    this.tipo = tipo;
    this.fila = fila;
    this.columna = columna;

}

function imprimirErrores() {
    for (let i = 0; i < listaErrores.length; i++) {
        var e = listaErrores[i];
        console.log("-> " + e.tipo + " - " + e.descripcion + " - " + e.fila + " - " + e.columna);
    }

}