

sobrescrito = false;
contadorSent = 1;
class PrimerRecorrido {

    recorrer(raiz) {
        var result = null;

        if (raiz !== null) {
            // console.log(raiz.nombre + ":" + raiz.hijos.length);
            switch (raiz.nombre) {
                case "INICIO":
                    switch (raiz.hijos.length) {
                        case 2:
                            result = primer.recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "ENTRADA":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = primer.recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            result = primer.recorrer(raiz.hijos[0]);
                            result = primer.recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "IMPORTAR":
                    switch (raiz.hijos.length) {
                        case 4:
                            result = primer.recorrer(raiz.hijos[2]);
                            break;
                        case 5:
                            result = primer.recorrer(raiz.hijos[0]);
                            result = primer.recorrer(raiz.hijos[3]);
                            break;
                    }
                    break;
                case "CLASES":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = primer.recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            result = primer.recorrer(raiz.hijos[0]);
                            result = primer.recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "CLASE":
                    //console.log("hijos = " + raiz.hijos.length);
                    switch (raiz.hijos.length) {                    //clase id '{' INSTRUCCIONES '}'
                        case 5:
                            var nuevaClase = new Clase("publico", raiz.hijos[1].token, "");
                            var exito = agregarClase(nuevaClase, raiz.hijos[1].posicion);
                            if (exito) {
                                ambito.push(raiz.hijos[1].token);
                                result = primer.recorrer(raiz.hijos[3]);
                                ambito.pop();
                            }
                            break;
                        case 6:                                     //VISIBILIDAD clase id '{' INSTRUCCIONES '}'
                            var vis = primer.recorrer(raiz.hijos[0]);
                            var nuevaClase = new Clase(vis, raiz.hijos[2].token, "");
                            var exito = agregarClase(nuevaClase, raiz.hijos[2].posicion);
                            if (exito) {
                                ambito.push(raiz.hijos[2].token);
                                result = primer.recorrer(raiz.hijos[4]);
                                ambito.pop();
                            }
                            break;
                        case 7:                                     //clase id hereda_de id '{' INSTRUCCIONES '}'
                            var nuevaClase = new Clase("publico", raiz.hijos[1].token, raiz.hijos[3].token);
                            var exito = agregarClase(nuevaClase, raiz.hijos[1].posicion);
                            if (exito) {
                                ambito.push(raiz.hijos[1].token);
                                result = primer.recorrer(raiz.hijos[5]);
                                ambito.pop();
                            }
                            break;
                        case 8:                                     //VISIBILIDAD clase id hereda_de id '{' INSTRUCCIONES '}'
                            var vis = primer.recorrer(raiz.hijos[0]);
                            var nuevaClase = new Clase(vis, raiz.hijos[2].token, raiz.hijos[4].token);
                            var exito = agregarClase(nuevaClase, raiz.hijos[2].posicion);
                            if (exito) {
                                ambito.push(raiz.hijos[2].token);
                                result = primer.recorrer(raiz.hijos[6]);
                                ambito.pop();
                            }
                            break;
                    }
                    break;
                case "INSTRUCCIONES":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = primer.recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            result = primer.recorrer(raiz.hijos[0]);
                            result = primer.recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "INSTRUCCION":
                    switch (raiz.hijos.length) {
                        case 1:
                            if (raiz.hijos[0].token === 'romper') {
                            } else if (raiz.hijos[0].token === 'continuar') {
                            } else if (raiz.hijos[0].token === 'retorno') {
                            } else {
                                result = primer.recorrer(raiz.hijos[0]);
                            }
                            break;
                        case 2:
                            result = primer.recorrer(raiz.hijos[1]);
                            break;
                    }
                    break;
                case "VISIBILIDAD":
                    result = raiz.hijos[0].token;
                    break;
                case "TIPO":
                    result = raiz.hijos[0].token;
                    break;
                case "VARIABLE":
                    //console.log("Variable = " + raiz.hijos.length + ", N = " + raiz.hijos[0].nombre);
                    var tipo = "";
                    var vis = "Publico";
                    var nombre = "";
                    var rol = "";
                    var dim = [];
                    var tam = 1;
                    switch (raiz.hijos.length) {
                        case 3:
                            if (raiz.hijos[0].nombre === "TIPO") {  //TIPO id ASIGNAR ';'
                                tipo = primer.recorrer(raiz.hijos[0]);
                            } else {                                //id id ASIGNAR ';'
                                tipo = raiz.hijos[0].token;
                                tam = obtenerTamanioClase(tipo, raiz.hijos[1].posicion);
                            }
                            nombre = raiz.hijos[1].token;
                            var asignar = primer.recorrer(raiz.hijos[2]);
                            var variable = new Variable(vis, tipo, nombre, crearAmbito(), "variable", tam, dim);
                            var exito = agregarVariable(variable, raiz.hijos[1].posicion);
                            break;
                        case 4:
                            if (raiz.hijos[0].nombre === "VISIBILIDAD") {
                                vis = primer.recorrer(raiz.hijos[0]);
                                rol = "variable";
                                if (raiz.hijos[1].nombre === "TIPO") { //VISIBILIDAD TIPO id ASIGNAR ';'
                                    tipo = primer.recorrer(raiz.hijos[1]);
                                    nombre = raiz.hijos[2].token;
                                    var asignar = primer.recorrer(raiz.hijos[3]);
                                } else {                              //VISIBILIDAD id id ASIGNAR ';'
                                    tipo = raiz.hijos[1].token;
                                    tam = obtenerTamanioClase(tipo, raiz.hijos[1].posicion);
                                    nombre = primer.recorrer(raiz.hijos[2]);
                                    var asignar = primer.recorrer(raiz.hijos[3]);
                                }
                            } else {
                                rol = "arreglo";
                                if (raiz.hijos[0].nombre === "TIPO") { // TIPO id DIMENSION ASIGNAR ';'
                                    tipo = primer.recorrer(raiz.hijos[0]);
                                } else {                              // id id DIMENSION ASIGNAR ';'
                                    tipo = raiz.hijos[0].token;
                                }
                                nombre = raiz.hijos[1].token;
                                dim = primer.recorrer(raiz.hijos[2]);
                                tam = obtenerTamanioArreglo(nombre, dim, raiz.hijos[2].posicion);
                                var asignar = primer.recorrer(raiz.hijos[3]);
                            }
                            var variable = new Variable(vis, tipo, nombre, crearAmbito(), rol, tam, dim);
                            var exito = agregarVariable(variable, raiz.hijos[1].posicion);
                            break;
                        case 5:                                         //VISIBILIDAD TIPO id DIMENSION ASIGNAR ';'
                            vis = primer.recorrer(raiz.hijos[0]);
                            tipo = primer.recorrer(raiz.hijos[1]);
                            nombre = raiz.hijos[2].token;
                            dim = primer.recorrer(raiz.hijos[3]);
                            tam = obtenerTamanioArreglo(nombre, dim, raiz.hijos[2].posicion);
                            var asignar = primer.recorrer(raiz.hijos[4]);
                            var variable = new Variable(vis, tipo, nombre, crearAmbito(), "arreglo", tam, dim);
                            var exito = agregarVariable(variable, raiz.hijos[1].posicion);
                            break;
                    }
                    break;
                case "DIMENSION":
                    //console.log("dim h = " + raiz.hijos.length);
                    switch (raiz.hijos.length) {
                        case 3:
                            var dim = []
                            result = primer.recorrer(raiz.hijos[1]);
                            dim.push(result);
                            result = dim;
                            break;
                        case 4:
                            var dim = primer.recorrer(raiz.hijos[0]);
                            var num = primer.recorrer(raiz.hijos[2]);
                            dim.push(num);
                            result = dim;
                            break;
                    }
                    break;
                case "ASIGNAR":
                    switch (raiz.hijos.length) {
                        case 1:                                     //Nada
                            result = 0;
                            break;
                        case 2:                                     //'=' OP
                            break;
                        case 4:                                     //'=' '{' ARREGLO '}' 
                            break;
                        case 5:
                            if (raiz.hijos[2].nombre === "TIPO") {  //'=' nuevo TIPO '(' ')'

                            } else {                                //'=' nuevo id '(' ')'
                                //result = obtenerTamanioClase(raiz.hijos[2].token);
                            }
                            break;
                        case 6:
                            if (raiz.hijos[2].nombre === "TIPO") {
                                if (raiz.hijos[4].nombre === "TIPO") { //'=' nuevo TIPO '(' TIPO ')'

                                } else {                            //'=' nuevo TIPO '(' id ')'

                                }
                            } else {                                //'=' nuevo id '(' VALOR ')'
                                // result =obtenerTamanioClase(raiz.hijos[2].token);
                            }
                            break;
                    }
                    break;
                case "ASIGNACION":
                    break;
                case "ARREGLO":
                    break;
                case "PRINCIPAL": //Principal '(' ')' '{'  INSTRUCCIONES '}'
                    switch (raiz.hijos.length) {
                        case 6:
                            var metodo = new Metodo("Publico", "vacio", "Principal", crearAmbito(), sobrescrito, "principal", []);
                            var exito = agregarMetodo(metodo, raiz.hijos[0].posicion, 1);
                            if (exito) {
                                result = primer.recorrer(raiz.hijos[4]);
                                finalizarMetodo();
                            }
                            break;
                    }
                    break;
                case "PROCEDIMIENTO":
                    switch (raiz.hijos.length) {
                        case 1:
                            primer.recorrer(raiz.hijos[0]);
                            break;
                        case 2:
                            sobrescrito = true;
                            primer.recorrer(raiz.hijos[1]);
                            sobrescrito = false;
                            break;
                    }
                    break;
                case "METODO":
                    var tipo = "";
                    var vis = "publico";
                    var nombre = "";
                    var exito = false;
                    var param = [];
                    var tamReturn = 1;
                    switch (raiz.hijos.length) {
                        case 7:
                            nombre = raiz.hijos[1].token;
                            if (raiz.hijos[0].nombre === "TIPO") {  //TIPO id '(' ')' '{' INSTRUCCIONES '}'
                                tipo = primer.recorrer(raiz.hijos[0]);
                            } else {                                // id id '(' ')' '{' INSTRUCCIONES '}'
                                tipo = raiz.hijos[0].token;
                                tamReturn = obtenerTamanioClase(tipo);
                            }
                            var metodo = new Metodo(vis, tipo, nombre, crearAmbito(), sobrescrito, "metodo", param);
                            exito = agregarMetodo(metodo, raiz.hijos[1].posicion, tamReturn);
                            if (exito) {
                                result = primer.recorrer(raiz.hijos[5]);
                                finalizarMetodo();
                            }
                            break;
                        case 8:
                            if (raiz.hijos[0].nombre === "VISIBILIDAD") {
                                vis = primer.recorrer(raiz.hijos[0]);
                                nombre = raiz.hijos[2].token;
                                if (raiz.hijos[1].nombre === "TIPO") {  //VISIBILIDAD TIPO id '(' ')' '{' INSTRUCCIONES '}'
                                    tipo = primer.recorrer(raiz.hijos[1]);
                                } else {                                //VISIBILIDAD id id '(' ')' '{' INSTRUCCIONES '}'
                                    tipo = raiz.hijos[1].token;
                                    tamReturn = obtenerTamanioClase(tipo);
                                }
                            } else if (raiz.hijos[0].nombre === "TIPO") {
                                tipo = primer.recorrer(raiz.hijos[0]);
                                nombre = raiz.hijos[1].token;
                                if (raiz.hijos[2].nombre === "DIMENSION") { //TIPO id DIMENSION '(' ')' '{' INSTRUCCIONES '}'
                                    var dim = primer.recorrer(raiz.hijos[2]);
                                } else {                                    //TIPO id '(' PARAMETRO ')' '{' INSTRUCCIONES '}
                                    param = primer.recorrer(raiz.hijos[3]);
                                }
                            } else {                                        //id id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                                tipo = raiz.hijos[0].token;
                                nombre = raiz.hijos[1].token;
                                tamReturn = obtenerTamanioClase(tipo);
                                param = primer.recorrer(raiz.hijos[3]);
                            }
                            var metodo = new Metodo(vis, tipo, nombre, crearAmbito(), sobrescrito, "metodo", param);
                            exito = agregarMetodo(metodo, raiz.hijos[1].posicion, tamReturn);
                            if (exito) {
                                result = primer.recorrer(raiz.hijos[6]);
                                finalizarMetodo();
                            }
                            break;
                        case 9:
                            if (raiz.hijos[0].nombre === "VISIBILIDAD") {
                                vis = primer.recorrer(raiz.hijos[0]);
                                nombre = raiz.hijos[2].token;
                                if (raiz.hijos[0].nombre === "VISIBILIDAD") {
                                    if (raiz.hijos[1].nombre === "TIPO") {
                                        tipo = primer.recorrer(raiz.hijos[1]);
                                        if (raiz.hijos[4].nombre === "DIMENSION") {//VISIBILIDAD TIPO id DIMENSION '(' ')' '{' INSTRUCCIONES '}'
                                            var dim = primer.recorrer(raiz.hijos[3]);
                                        } else {                              // VISIBILIDAD TIPO id '(' PARAMETRO ')' '{' INSTRUCCIONES '}' 
                                            param = primer.recorrer(raiz.hijos[4]);
                                        }
                                    } else {
                                        tipo = raiz.hijos[1].token;
                                        if (raiz.hijos[4].nombre === "DIMENSION") {//VISIBILIDAD id id DIMENSION '(' ')' '{' INSTRUCCIONES '}'
                                            var dim = primer.recorrer(raiz.hijos[3]);
                                        } else {                              // VISIBILIDAD id id '(' PARAMETRO ')' '{' INSTRUCCIONES '}' 
                                            param = primer.recorrer(raiz.hijos[4]);
                                        }
                                    }
                                } else {                                //TIPO id DIMENSION '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                                    tipo = raiz.hijos[0].token;
                                    nombre = raiz.hijos[1].token;
                                    var dim = primer.recorrer(raiz.hijos[2]);
                                    param = primer.recorrer(raiz.hijos[4]);
                                }
                            }
                            var metodo = new Metodo(vis, tipo, nombre, crearAmbito(), sobrescrito, "metodo", param);
                            exito = agregarMetodo(metodo, raiz.hijos[1].posicion, tamReturn);
                            if (exito) {
                                result = primer.recorrer(raiz.hijos[7]);
                                finalizarMetodo();
                            }
                            break;
                        case 10:                                        //VISIBILIDAD TIPO id DIMENSION '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                            vis = primer.recorrer(raiz.hijos[0]);
                            tipo = primer.recorrer(raiz.hijos[1]);
                            nombre = raiz.hijos[2].token;
                            var dim = primer.recorrer(raiz.hijos[3]);
                            param = segundo.recorrer(raiz.hijos[5]);
                            var metodo = new Metodo(vis, tipo, nombre, crearAmbito(), sobrescrito, "metodo", param);
                            exito = agregarMetodo(metodo, raiz.hijos[1].posicion, tamReturn);
                            if (exito) {
                                result = primer.recorrer(raiz.hijos[8]);
                                finalizarMetodo();
                            }
                            break;
                    }
                    break;
                case "PARAMETRO":
                    switch (raiz.hijos.length) {
                        case 1:
                            var param = [];
                            param.push(primer.recorrer(raiz.hijos[0]));
                            result = param;
                            break;
                        case 3:
                            var param = primer.recorrer(raiz.hijos[0]);
                            param.push(primer.recorrer(raiz.hijos[2]));
                            result = param;
                            break;
                    }
                    break;
                case "PARAM":
                    //console.log("Hijos Param = " + raiz.hijos.length)
                    switch (raiz.hijos.length) {
                        case 2:
                            if (raiz.hijos[0].nombre === "TIPO") {  //TIPO id
                                tipo = primer.recorrer(raiz.hijos[0]);
                            } else {                                //id id
                                tipo = raiz.hijos[0].token;
                            }
                            nombre = raiz.hijos[1].token;
                            var variable = new Variable("publico", tipo, nombre, crearAmbito(), "parametro", 1, []);
                            result = variable;
                            // var exito = agregarVariable(variable, raiz.hijos[1].posicion); 
                            break;
                        case 3:
                            if (raiz.hijos[0].nombre === "TIPO") {  //TIPO id DIMEN
                                tipo = primer.recorrer(raiz.hijos[0]);
                            } else {                                //id id DIMEN
                                tipo = raiz.hijos[0].token;
                            }
                            nombre = raiz.hijos[1].token;
                            var dim = primer.recorrer(raiz.hijos[2]);
                            var variable = new Variable("publico", tipo, nombre, crearAmbito(), "parametro", 1, dim);
                            result = variable;
                            //var exito = agregarVariable(variable, raiz.hijos[1].posicion); 
                            break;
                    }
                    break;
                case "CONSTRUCTOR":
                    var tipo = "vacio";
                    var vis = "publico";
                    var nombre = "";
                    var exito = false;
                    var tamReturn = 1;
                    switch (raiz.hijos.length) {
                        case 6:                                 //id '(' ')' '{' INSTRUCCIONES '}'
                            nombre = raiz.hijos[0].token;
                            var metodo = new Metodo(vis, tipo, nombre, crearAmbito(), sobrescrito, "constructor", []);
                            exito = agregarMetodo(metodo, raiz.hijos[1].posicion, tamReturn);
                            if (exito) {
                                result = primer.recorrer(raiz.hijos[4]);
                                finalizarMetodo();
                            }
                            break;
                        case 7:
                            if (raiz.hijos[0].nombre === "VISIBILIDAD") { //VISIBILIDAD id '(' ')' '{' INSTRUCCIONES '}'
                                vis = primer.recorrer(raiz.hijos[0]);
                                nombre = raiz.hijos[1].token;
                                var metodo = new Metodo(vis, tipo, nombre, crearAmbito(), sobrescrito, "constructor", []);
                                exito = agregarMetodo(metodo, raiz.hijos[1].posicion, tamReturn);
                                if (exito) {
                                    result = primer.recorrer(raiz.hijos[5]);
                                    finalizarMetodo();
                                }
                            } else {                                      //id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                                nombre = raiz.hijos[0].token;
                                var param = primer.recorrer(raiz.hijos[2]);
                                //console.log("Param = " + param);
                                var metodo = new Metodo(vis, tipo, nombre, crearAmbito(), sobrescrito, "constructor", param);
                                exito = agregarMetodo(metodo, raiz.hijos[1].posicion, tamReturn);
                                if (exito) {
                                    result = primer.recorrer(raiz.hijos[5]);
                                    finalizarMetodo();
                                }
                            }
                            break;
                        case 8:                                 //VISIBILIDAD id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'
                            vis = primer.recorrer(raiz.hijos[5]);
                            nombre = raiz.hijos[0].token;
                            var param = primer.recorrer(raiz.hijos[3]);
                            var metodo = new Metodo(vis, tipo, nombre, crearAmbito(), sobrescrito, "constructor", param);
                            exito = agregarMetodo(metodo, raiz.hijos[1].posicion, tamReturn);
                            if (exito) {
                                result = primer.recorrer(raiz.hijos[5]);
                                finalizarMetodo();
                            }
                            break;
                    }
                    break;
                case "LLAMADA":
                    switch (raiz.hijos.length) {
                        case 3:
                            //primer.recorrer(raiz.hijos[0]);
                            break;
                        case 4:
                            primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "VALOR":
                    switch (raiz.hijos.length) {
                        case 1:
                            primer.recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            primer.recorrer(raiz.hijos[0]);
                            primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "INSTANCIA":
                    switch (raiz.hijos.length) {
                        case 1:
                            //primer.recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            //primer.recorrer(raiz.hijos[0]);
                            //primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "FUNCIONES":
                    switch (raiz.hijos.length) {
                        case 1:
                            //primer.recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            //primer.recorrer(raiz.hijos[0]);
                            //primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "CONCATENAR":
                    switch (raiz.hijos.length) {
                        case 1:
                            //primer.recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            //primer.recorrer(raiz.hijos[0]);
                            //primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "IMPRIMIR":
                    switch (raiz.hijos.length) {
                        case 1:
                            //primer.recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            //primer.recorrer(raiz.hijos[0]);
                            //primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "ESTRUCTURA":
                    switch (raiz.hijos.length) {
                        case 5:                         //estructura id '[' INSTRUCCIONES ']' 
                            var claseAnterior = claseActual;
                            var estructura = new Estructura(raiz.hijos[1].token, crearAmbito());
                            var exito = agregarEstructura(estructura, raiz.hijos[1].posicion);
                            if (exito) {
                                result = primer.recorrer(raiz.hijos[3]);
                                ambito.pop();
                            }
                            metodoActual = "";
                            claseActual = claseAnterior;
                            break;
                    }
                    break;
                case "PUNTEROS":
                    var tipo = "";
                    switch (raiz.hijos.length) {
                        case 4: //destruirPuntero '(' id ')' ';'
                            //primer.recorrer(raiz.hijos[0]);
                            break;
                        case 7:
                            if (raiz.hijos[2].nombre === "TIPO") {  //crearPuntero '(' TIPO ',' id ')' ASIGNAR ';'
                                tipo = primer.recorrer(raiz.hijos[2]);
                            } else {                                //crearPuntero '(' id ',' id ')' ASIGNAR ';'
                                tipo = raiz.hijos[2].token;
                            }
                            nombre = raiz.hijos[4].token;
                            //var asignar = primer.recorrer(raiz.hijos[2]);
                            var variable = new Variable("publico", tipo, nombre, crearAmbito(), "puntero", 1, []);
                            var exito = agregarVariable(variable, raiz.hijos[4].posicion);
                            break;
                    }
                    break;
                case "MEMORIA":
                    switch (raiz.hijos.length) {
                        case 1:
                            //primer.recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            //primer.recorrer(raiz.hijos[0]);
                            //primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "FUNCION_EDD":
                    switch (raiz.hijos.length) {
                        case 1:
                            //primer.recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            //primer.recorrer(raiz.hijos[0]);
                            //primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "OPCION_EDD":
                    switch (raiz.hijos.length) {
                        case 1:
                            //primer.recorrer(raiz.hijos[0]);
                            break;
                        case 3:
                            //primer.recorrer(raiz.hijos[0]);
                            //primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "SI":
                    switch (raiz.hijos.length) {
                        case 6:
                            ambito.push("Si" + contadorSent++);
                            primer.recorrer(raiz.hijos[2]);
                            primer.recorrer(raiz.hijos[4]);
                            ambito.pop();
                            break;
                    }
                    break;
                case "OPCION_SI":
                    switch (raiz.hijos.length) {
                        case 4:
                            ambito.push("V");
                            primer.recorrer(raiz.hijos[2]);
                            ambito.pop();
                            break;
                        case 8:
                            if (raiz.hijos[0].nombre === "esverdadero") {
                                ambito.push("V");
                                primer.recorrer(raiz.hijos[2]);
                                ambito.pop();
                                ambito.push("F");
                                primer.recorrer(raiz.hijos[6]);
                                ambito.pop();
                            } else {
                                ambito.push("F");
                                primer.recorrer(raiz.hijos[2]);
                                ambito.pop();
                                ambito.push("V");
                                primer.recorrer(raiz.hijos[6]);
                                ambito.pop();
                            }
                            break;
                    }
                    break;
                case "SWITCH":
                    ambito.push("Switch" + contadorSent++);
                    switch (raiz.hijos.length) {
                        case 7:
                            primer.recorrer(raiz.hijos[2]);
                            primer.recorrer(raiz.hijos[5]);
                            break;
                        case 8:
                            primer.recorrer(raiz.hijos[2]);
                            primer.recorrer(raiz.hijos[5]);
                            primer.recorrer(raiz.hijos[6]);
                            break;
                    }
                    ambito.pop();
                    break;
                case "CASO":
                    // ambito.push("C");
                    switch (raiz.hijos.length) {
                        case 4:
                            primer.recorrer(raiz.hijos[3]);
                            break;
                        case 5:
                            primer.recorrer(raiz.hijos[0]);
                            primer.recorrer(raiz.hijos[4]);
                            break;
                    }
                    break;
                case "DEFECTO":
                    switch (raiz.hijos.length) {
                        case 3:
                            primer.recorrer(raiz.hijos[2]);
                            break;
                    }
                    break;
                case "CICLO":
                    ambito.push(raiz.hijos[0].nombre + contadorSent++);
                    switch (raiz.hijos.length) {
                        case 5:                                 //enciclar id '{' INSTRUCCIONES '}'
                            primer.recorrer(raiz.hijos[3]);
                            break;
                        case 7:                                 //repetirmientras '(' OP ')' '{' INSTRUCCIONES'}'
                            primer.recorrer(raiz.hijos[2]);
                            primer.recorrer(raiz.hijos[5]);
                            break;
                        case 8:
                            if (raiz.hijos[0].nombre === "repetir") {//repetir '{' INSTRUCCIONES'}' hastaque '(' OP ')' 
                                primer.recorrer(raiz.hijos[2]);
                                primer.recorrer(raiz.hijos[6]);
                            } else {                                //hacer '{' INSTRUCCIONES'}' mientras '(' OP ')'
                                primer.recorrer(raiz.hijos[2]);
                                primer.recorrer(raiz.hijos[6]);
                            }
                            break;
                        case 9:                                 //ciclodoble '(' OP "," OP ')' '{' INSTRUCCIONES'}'
                            primer.recorrer(raiz.hijos[2]);
                            primer.recorrer(raiz.hijos[4]);
                            primer.recorrer(raiz.hijos[7]);
                            break;
                    }
                    ambito.pop();
                    break;
                case "FOR":
                    ambito.push("For" + contadorSent++);
                    switch (raiz.hijos.length) {
                        case 6:                             //contador '(' OP ')' '{' INSTRUCCIONES'}'
                            primer.recorrer(raiz.hijos[2]);
                            primer.recorrer(raiz.hijos[5]);
                            break;
                        case 12:// repetircontando '(' variable ':' id ';' desde ':' OP ';' hasta ':' OP ')' '{' INSTRUCCIONES'}'{ //5//9//13//16
                            //TIPO id ASIGNAR ';'
                            nombre = raiz.hijos[3].token;
                            var asignar = primer.recorrer(raiz.hijos[2]);
                            var variable = new Variable("publico", "entero", nombre, crearAmbito(), "variable", 1, []);
                            var exito = agregarVariable(variable, raiz.hijos[3].posicion);
                            if (exito == false) {
                                return;
                            }
                            primer.recorrer(raiz.hijos[6]);
                            primer.recorrer(raiz.hijos[9]);
                            primer.recorrer(raiz.hijos[11]); //instruc
                            break;
                    }
                    break;
                /// ****************************************
                case "OP":
                    switch (raiz.hijos.length) {
                        case 1:
                            result = primer.recorrer(raiz.hijos[0]);
                            break;
                    }
                    break;
                case "E":
                    switch (raiz.hijos.length) {
                        case 1:
                            // console.log("Nombre = " + raiz.hijos[0].nombre + ", Token = " + raiz.hijos[0].token)
                            var nombre = raiz.hijos[0].nombre;
                            var dato = raiz.hijos[0].token;

                            switch (nombre) {
                                case "FUNCIONES":
                                case "LLAMADA":
                                case "CONCATENAR":
                                case "MEMORIA":
                                case "FUNCION_EDD":
                                case "E":
                                    result = primer.recorrer(raiz.hijos[0]);
                                    return result;
                                // default:
                                // var tipoDato = nodo.hijos[0].tipo;
                                // switch (tipoDato) {
                                case "cadena":
                                case "entero":
                                case "decimal":
                                case "bool":
                                    return dato;
                                case "id":
                                /*Object s = VariableCJS.obtenerVariable(dato, nodo.hijos[0].fila, nodo.hijos[0].col);
                                if (s != null) {
                                    return s;
                                } else { //Buscar en lista
                                    Datos.agregarError("Error Semantico", "No se encontro el id : " + dato, nodo.hijos[0].fila, nodo.hijos[0].col);
                                    return "";
                                }*/
                                default:
                                    return "";
                            }
                            break;
                        case 2:

                            break;
                        case 3:
                            switch (raiz.hijos[1].nombre) {
                                case '+':

                                    break;

                                default:
                                    result = primer.recorrer(raiz.hijos[1]); //( E )
                                    break;
                            }
                            break;
                        default:
                            break;
                    }
            }
        }
        return result;
    }

}
