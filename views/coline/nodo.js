var codigoHash=0;

function getCodigo(){
    return "nodo"+(codigoHash++);
}

function reiniciar(){
    temp=1;
    codigoHash=0;
}

function crearNodo(etiqueta,linea,columna){
    var nodo=new Nodo(etiqueta,linea,columna+1);
    nodo.codigo=getCodigo();
    return nodo;
}

function crearHoja(etiqueta,valor,linea,columna){
    var nodo=new Nodo(etiqueta,linea,columna+1);
    nodo.valor=valor;
    nodo.codigo=getCodigo();
    return nodo;
}

class Nodo
{
    constructor(etiqueta,linea,columna)
    {
        this.etiqueta=etiqueta;
        this.valor=null;
        this.linea=linea;
        this.columna=columna;
        this.hijos=new Array();        
        this.add=function(nodo)
        {
            if(nodo!=null)
            {
                this.hijos.push(nodo);
            }
        }
    }
}

