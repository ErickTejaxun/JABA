leyendoTeclado = false;

function leerTeclado3D() {
    try {
        var pos1 = p + 1;
        var retorno = Stack[pos1];
        var pos2 = p + 2;
        var posValorNuevo = Stack[pos2];
        var pos3 = p + 3;
        var posCadena = Stack[pos3];
        var pos4 = p + 4;
        var tipo = Stack[pos4];
        var pos5 = p + 5;
        var ambito = Stack[pos5];

        var cadena = "";
        var bool = true;
        var cont = 0;
        while (bool) {
            var caracter = Heap[posCadena];
            if (caracter === 0 || cont === 100) {
                bool = false;
            }
            var c = String.fromCharCode(caracter);
            cadena += c;
            posCadena++;
            cont++;
        }

        var valor = verificarEntrada(tipo, cadena);
        if (tipo == 3) {
            for (let i = 0; i < valor.length; i++) {
                Heap[posValorNuevo] = valor.charCodeAt(i);
                posValorNuevo++;
            }
            Heap[posValorNuevo] = 0;
            posValorNuevo++;
        } else {
            if (ambito == 0) { //local
                Stack[posValorNuevo] = valor;
            } else {
                Heap[posValorNuevo] = valor;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function verificarEntrada(tipo, cadena) {
    var resultado = prompt(cadena);
    try {
        var valor = "";
        switch (tipo) {
            case 0: //Entero
                valor = parseInt(resultado);
                if (!(isNaN(valor))) {
                    return valor;
                }
                alert("Error al ingresar dato, vuelva a intentarlo");
                return verificarEntrada(tipo, cadena);
            case 1: //decimal
                valor = parseFloat(resultado);
                if (!(isNaN(valor))) {
                    return valor;
                }
                alert("Error al ingresar dato, vuelva a intentarlo");
                return verificarEntrada(tipo, cadena);
            case 2: //Booleano
                valor = parseInt(resultado);
                if (!(isNaN(valor))) {
                    if (valor == 1 || valor == 0) {
                        return valor;
                    }
                }
                alert("Error al ingresar dato, vuelva a intentarlo");
                return verificarEntrada(tipo, cadena);
            case 3: //Cadena
                return resultado;
        }
    } catch (error) {
        console.log(error);
    }
}

function leerTeclado3DDebugger() {
    try {
        var pos1 = p + 1;
        var retorno = Stack[pos1];
        var pos2 = p + 2;
        var posValorNuevo = Stack[pos2];
        var pos3 = p + 3;
        var posCadena = Stack[pos3];
        var pos4 = p + 4;
        var tipo = Stack[pos4];
        var pos5 = p + 5;
        var ambito = Stack[pos5];

        var cadena = "";
        var bool = true;
        var cont = 0;
        while (bool) {
            var caracter = Heap[posCadena];
            if (caracter === 0 || cont === 100) {
                bool = false;
            }
            var c = String.fromCharCode(caracter);
            cadena += c;
            posCadena++;
            cont++;
        }

        var valor = verificarEntrada(tipo, cadena);
        if (tipo == 3) {
            for (let i = 0; i < valor.length; i++) {
                Heap[posValorNuevo] = valor.charCodeAt(i);
                actualizarArreglos("Heap", posValorNuevo, valor.charCodeAt(i));
                posValorNuevo++;
            }
            Heap[posValorNuevo] = 0;
            actualizarArreglos("Heap", posValorNuevo, 0);
            posValorNuevo++;
        } else {
            if (ambito == 0) { //local
                Stack[posValorNuevo] = valor;
                actualizarArreglos("Stack", posValorNuevo, valor);
            } else {
                Heap[posValorNuevo] = valor;
                actualizarArreglos("Heap", posValorNuevo, valor);
            }
        }
    } catch (error) {
        console.log(error);
    }
}