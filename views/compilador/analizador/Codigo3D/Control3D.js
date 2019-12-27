var temp = 0;
var etqL = 0;
var c3d = "";
var varNulo = -281216;

function reiniciarC3D() {
    temp = 0;
    c3d = "";
    etqL = 0;
}

function generarTemp() {
    return "t" + temp++;
}
function generarEtq() {
    return "L" + etqL++;
}

function regresarTemp() {
    temp--;
}

class NodoC3D {
    constructor(cadena, tipo, v, f) {
        this.cadena = cadena;
        this.tipo = tipo;
        this.v = v;
        this.f = f;
    }
}

