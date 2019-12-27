function Expresion() {
    this.tipo = "";
    this.valorTemp = "";
    this.valor = "";
    this.rol = "exp";
    this.codigo = [];
    this.etqV = "";
    this.etqF = "";
    this.ambito = "";
    this.posicion = 0;
    this.tamanio = 0;
    //
    this.rolVariable = ""; //Si es variable, arreglo... etc
    this.ambitoVariable = "";
    this.memoria = false;
    this.visibilidad = "publico";
    this.posicionRef = 0;
    this.tipoEstructura =""; //Si es una lista, pila o cola
    this.inicializada = false;
    this.valorArreglo = false; // Para validar a = caracter [0]
    this.convertirAcadena = false; //Si es un convertira a numero o cadena
    //this.codigoTamanio = [];
}
