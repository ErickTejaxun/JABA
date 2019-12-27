h = 0;
p = 0;
Heap = [];
Stack = [];
listaMetodos3D = [];
listaTemporales = [];
ambito3D = [];
consola = " -> ";


function buscarEtiqueta(nombre, nodo) {
    if(limite === 1000000000){
        console.log(" ****************  ¡Se enciclo! *****************")
        //return -1;
    }
    limite++;
    for (let i = 0; i < nodo.hijos.length; i++) {
        if (nodo.hijos[i].nombre === "ETIQUETA") {
            for (let j = 0; j < nodo.hijos[i].hijos.length; j++) {
                var etq = nodo.hijos[i].hijos[j].token;
                if (etq === nombre) {
                    console.log("Se encontro : "+nombre);
                    return i;
                }
            }
        }
    }
    return -1;
}

function asignarValor(exp, valor) {
    //console.log("ASIGNAR: " + exp.rol + " - " + exp.nombre + " = " + valor)
    if (exp.rol.toLowerCase() === "h") {
        h = valor;
    } else if (exp.rol.toLowerCase() === "p") {
        p = valor;
    } else {
        if(exp.nombre=="t2"){
            console.log('que rayos');
        }
        for (let i = 0; i < listaTemporales.length; i++) {
            var t = listaTemporales[i];
            if (t.nombre === exp.nombre && t.ambito.toLowerCase() === crearAmbito3D()) {
                listaTemporales[i].valor = valor;
                return;
            }
        }
        listaTemporales.push(new Temporal(exp.nombre, valor, crearAmbito3D()));
    }
}

function crearAmbito3D() {
    var nuevo = "inicio";
    for (let i = 0; i < ambito3D.length; i++) {
        nuevo += "," + ambito3D[i].toLowerCase();
    }
    return nuevo;
}
