function Temporal(nombre, valor, ambito) {
    this.nombre = nombre;
    this.ambito = ambito;
    this.valor = valor;
}



function obtenerTemporal(nombre, p) {
    for (let i = 0; i < listaTemporales.length; i++) {
        var t = listaTemporales[i];
        if (t.nombre === nombre && t.ambito.toLowerCase() === crearAmbito3D()) {
            return t.valor;
        }
    }
    //console.log("****** No encuentra el temporal: " + nombre + " *******")
    //listaErrores.push(new Errores("Error Semantico", " No encuentra el temporal: " + nombre, p.first_line, p.first_column));

}

