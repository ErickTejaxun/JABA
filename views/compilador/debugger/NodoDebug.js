
function nodoDebug(metodo) {
    this.metodo = metodo;
    this.posicion = 0;
    this.listaNodos = metodo.nodo;
    this.linea = metodo.linea;
}