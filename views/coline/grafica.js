var cadenaDot="";
function grafica( opRaiz  ) 
{
		cadenaDot="";
        cadenaDot = cadenaDot + "digraph lista{  rankdir=TB;node [shape = box, style=rounded]; ";
        recorrerArbol(opRaiz);
        cadenaDot = cadenaDot + "}";
        enviarGrafo(cadenaDot);
        console.log(cadenaDot);

        /*
        addHeap("5");
        addHeap("1");
        addHeap("49");
        addHeap("0");
        addStack(1, "4");
        addSalida("El valor es 4");
        addSimbolo("VARIABLE", "contador1", "main_", "1", "4", "rol", "1", "publico", "1");
        addSimbolo("VARIABLE", "contador2", "main_", "1", "4", "rol", "1", "publico", "1");
        addSimbolo("VARIABLE", "contador3", "main_", "1", "4", "rol", "1", "publico", "1");
        addError("11", "13", "lexico", "' caracter inválido");
        add3D("=> , t1, t100, H[t5]");
        */

}

function recorrerArbol(raiz){
    if (raiz.valor != null) 
    {

        var valor = raiz.valor+"";
        valor = valor.replace(/\"/g, "\\\"");
        cadenaDot = cadenaDot  + raiz.codigo + "[fontsize=50 label=\"" + valor + "  [" + raiz.etiqueta + "]{" + raiz.linea +","+raiz.columna+ "} \", color=\"cyan\", style =\"filled\", shape=\"circle\"]; \n";
        } 
        else 
        {
            cadenaDot = cadenaDot  + raiz.codigo + "[fontsize=50 label=\"" + raiz.etiqueta +"  {"+raiz.linea+"," +raiz.columna+ "} \", color=\"cyan\", style =\"filled\", shape=\"circle\"]; \n";
        }

        for(var i=0;i<raiz.hijos.length;i++) 
        {
        	var hijo=raiz.hijos[i];
            cadenaDot = cadenaDot + "\"" + raiz.codigo + "\"-> \"" + hijo.codigo + "\"" + "\n";            
        }
        for(var i=0;i<raiz.hijos.length;i++) 
        {
        	var hijo=raiz.hijos[i];
            recorrerArbol(hijo);
        }        
        //enviarGrafo(cadenaDot + "}");

}


var requestGrafo = false;
function enviarGrafo(data) {

    var url = '/grafica';
    requestGrafo = false;

    if (window.XMLHttpRequest) { 
        requestGrafo = new XMLHttpRequest();
        if (requestGrafo.overrideMimeType) {
            requestGrafo.overrideMimeType('text/xml');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            requestGrafo = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                requestGrafo = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!requestGrafo) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }

    var datos = {'data':data};
    requestGrafo.onreadystatechange = receptorGrafo;
    requestGrafo.open('POST', url, true);
    requestGrafo.setRequestHeader("Content-type", "application/json");
    requestGrafo.setRequestHeader("dataType", "json");
    requestGrafo.send(JSON.stringify(datos));
    //requestGrafo.send(data);

}

function receptorGrafo() {

    if (requestGrafo.readyState == 4) {
        if (requestGrafo.status == 200) {
            alert('Grafica generada');
        } else {
            alert('Hubo problemas al generar la gráfica');
        }
    }
}
