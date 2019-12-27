
function compilar()
{
    limpiarErrores();
    limpiarTablas(true);
    //alert(obtenerActivo());
    var vector = obtenerActivo();
    //var contenedor =  document.getElementById(vector[1]);            
    //alert(contenedor.value);
    var cadena = editores[vector].getValue();
    var texto = cadena;
    //Iniciar(cadena);            
    


    var raiz=null;
        try 
        {         
            raiz = gcc.parse(texto);	  	
              grafica(raiz);
              if(raiz!=null)
              {
                    recorrer1=new GeneradorDeCodigo();
                    recorrer1.setInicial();
                    recorrer1.AgregarArbol(raiz);
                    recorrer1.tabla.imprimir();
              }	  		  			
		}
        catch (e) 
        {			
              console.log("Error: "+e.message);
              addSalida(e.message);

              if(e.hash != undefined)
              {
                    if(e.hash.token=="INVALIDO")
                    {
                    addError(e.hash.loc.first_line, e.hash.loc.first_column, "Lexico", e.message);
                    }
                    else
                    {
                    addError(e.hash.loc.first_line, e.hash.loc.first_column, "Sintactico", e.message);
                    }                   
              }             
		}
      






    
    iniciar();
    c3d = cadena;
    console.log(c3d);
    iniciar3D();
    editor3D.setValue(c3d);
    document.getElementById('consola').innerHTML = consola;
    crearTablaErrores();
    crearTablaSimbolos();
    crearTablaHeap();
    crearTablaStack();
    crearTablaTemporal();
    console.log(" * * * * * * * * * FIN * * * * * * * * * * ");
}

function obtenerC3D() {
    var texto = "";
    for (let i = 0; i < listaCodigo.length; i++) {
        var codigo = listaCodigo[i];
        texto += codigo.texto;
        listaCodigo[i].contador = i;
    }
    return texto;
}

function crearTablaErrores() {
    var cuerpoTabla = document.getElementById("cuerpoTablaErrores");
    for (let i = 0; i < listaErrores.length; i++) {
        var e = listaErrores[i];
        var row = document.createElement("tr");
        row.insertCell().innerHTML = e.fila;
        row.insertCell().innerHTML = e.columna;
        row.insertCell().innerHTML = e.tipo;
        row.insertCell().innerHTML = e.descripcion;
        cuerpoTabla.append(row);
    }
}

function crearTablaSimbolos() {
    var cuerpoTabla = document.getElementById("cuerpoTablaSimbolos");
    for (let i = 0; i < tablaSimbolos.length; i++) {
        var simbolo = tablaSimbolos[i];
        var row = document.createElement("tr");
        row.insertCell().innerHTML = simbolo.nombre;
        row.insertCell().innerHTML = simbolo.rol;
        row.insertCell().innerHTML = "Global";
        row.insertCell().innerHTML = "0";
        row.insertCell().innerHTML = simbolo.contadorPosicion;
        cuerpoTabla.append(row);
        for (let j = 0; j < simbolo.listaVariables.length; j++) {
            var variable = simbolo.listaVariables[j];
            var row = document.createElement("tr");
            row.insertCell().innerHTML = variable.nombre;
            row.insertCell().innerHTML = variable.tipo;
            row.insertCell().innerHTML = obtenerUltimoAmbito(variable.ambito);
            row.insertCell().innerHTML = variable.posicion;
            row.insertCell().innerHTML = variable.tamanio;
            cuerpoTabla.append(row);
        }
        if (simbolo.rol == "clase") {
            for (let j = 0; j < simbolo.listaMetodos.length; j++) {
                var metodo = simbolo.listaMetodos[j];
                var row = document.createElement("tr");
                row.insertCell().innerHTML = metodo.nombre;
                row.insertCell().innerHTML = metodo.tipo;
                row.insertCell().innerHTML = obtenerUltimoAmbito(metodo.ambito);
                row.insertCell().innerHTML = metodo.posicion;
                row.insertCell().innerHTML = metodo.contadorPosicion;
                cuerpoTabla.append(row);
                for (let k = 0; k < metodo.listaVariables.length; k++) {
                    var variable = metodo.listaVariables[k];
                    var row = document.createElement("tr");
                    row.insertCell().innerHTML = variable.nombre;
                    row.insertCell().innerHTML = variable.tipo;
                    row.insertCell().innerHTML = obtenerUltimoAmbito(variable.ambito);
                    row.insertCell().innerHTML = variable.posicion;
                    row.insertCell().innerHTML = variable.tamanio;
                    cuerpoTabla.append(row);
                }
            }
            for (let j = 0; j < simbolo.listaEstructuras.length; j++) {
                var metodo = simbolo.listaEstructuras[j];
                var row = document.createElement("tr");
                row.insertCell().innerHTML = metodo.nombre;
                row.insertCell().innerHTML = "estructura";
                row.insertCell().innerHTML = obtenerUltimoAmbito(metodo.ambito);
                row.insertCell().innerHTML = metodo.posicion;
                row.insertCell().innerHTML = metodo.contadorPosicion;
                cuerpoTabla.append(row);
                for (let k = 0; k < metodo.listaVariables.length; k++) {
                    var variable = metodo.listaVariables[k];
                    var row = document.createElement("tr");
                    row.insertCell().innerHTML = variable.nombre;
                    row.insertCell().innerHTML = variable.tipo;
                    row.insertCell().innerHTML = obtenerUltimoAmbito(variable.ambito);
                    row.insertCell().innerHTML = variable.posicion;
                    row.insertCell().innerHTML = variable.tamanio;
                    cuerpoTabla.append(row);
                }
            }
        }
    }
}

function crearTablaStack() {
    var cuerpoTabla = document.getElementById("cuerpoStack");
    for (let i = 0; i < Stack.length; i++) {
        var row = document.createElement("tr");
        row.insertCell().innerHTML = i;
        var varStack = Stack[i];
        if (varStack != null && !(typeof varStack == undefined)) {
            row.insertCell().innerHTML = Stack[i];
        } else {
            row.insertCell().innerHTML = "-1";
        }
        cuerpoTabla.append(row);
    }
}

function crearTablaHeap() {
    var cuerpoTabla = document.getElementById("cuerpoTablaHeap");
    for (let i = 0; i < Heap.length; i++) {
        var row = document.createElement("tr");
        row.insertCell().innerHTML = i;
        var varHeap = Heap[i];
        if (varHeap != "undefined") {
            row.insertCell().innerHTML = Heap[i];
        } else {
            row.insertCell().innerHTML = "-1";
        }
        cuerpoTabla.append(row);
    }
}

function crearTablaTemporal() {
    var cuerpoTabla = document.getElementById("cuerpoTablaTemporal");
    for (let i = 0; i < listaTemporales.length; i++) {
        var t = listaTemporales[i];
        var row = document.createElement("tr");
        row.insertCell().innerHTML = t.nombre;
        row.insertCell().innerHTML = t.valor;
        row.insertCell().innerHTML = t.ambito;
        cuerpoTabla.append(row);
    }
}
function obtenerUltimoAmbito(ambito) {
    var ambitos = ambito.split(',');
    return ambitos[ambitos.length - 1];
}

function limpiarTablas(limpiar) 
{
    
    //document.getElementById('cuerpoTablaSimbolos').innerHTML = '';
    //document.getElementById('cuerpoTablaErrores').innerHTML = '';
    limpiarSimbolos();
    limpiarErrores();
    cuerpoTablaTemporal();
    limpiarConsola();
    //document.getElementById('cuerpoTablaTemporal').innerHTML = '';
    //document.getElementById('consola').innerHTML = ' -> ';
    if (limpiar) 
    {
        //document.getElementById('cuerpoTablaHeap').innerHTML = '';
        limpiarHeap();
        limpiarStack();
        //document.getElementById('cuerpoStack').innerHTML = '';
        limpiarConsola();
        //document.getElementById('consola').innerHTML = '';
    }
}



