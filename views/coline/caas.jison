
/* lexical grammar */
%{
var codigoHash=0;
var contTemporales = 0;
var contEtiquetas = 0;
var listaErrores = [];
var lista3D = [];
var p = 0;
var h = 0;
var nulo = 201213050*7;
var fs = require('fs');
//var entornoGlobal = new Entorno(null);

var Error = function(linea,col, id, desc ,type)
{
    var self = this;
    self.linea = linea;
    self.columna = col;
    self.id = id;
    self.descripcion = desc;
    self.tipo = type;
};

function compilar(raiz, entorno)
{
    //var entornoGlobal = new Entorno(null);    
    iniciarVariables();    
    raiz.forEach(element => 
    {
            element.generarCodigo(entorno);
    });
    lista3D.push("end"); 
    /*Generar nativas */
    generarNativas();    
    var stream = fs.createWriteStream("entrada3d.txt");
    console.log("-----------Codigo 3D---------------");           
    stream.once('open', function(fd) 
    {
        lista3D.forEach(sts =>
        {            
            stream.write(sts+"\n");
        });                     
        stream.end();
    });     
     
   

    console.log("-----------Errores---------------");
    /*Errores*/
    listaErrores.forEach(ierror =>
    {
        console.log(ierror);
    });    
}

function generarNativas()
{    
    nativaImprimir();
    nativaConcatenar();
}

function iniciarVariables()
{
    lista3D.push("var p = 0;");
    lista3D.push("var h = 0;");
    lista3D.push("var stack [];");
    lista3D.push("var heap [];");    
    lista3D.push("call initColine;"); 
    lista3D.push("proc initColine begin"); 
}

function nativaConcatenar()/*Concatena dos cadenas */
{
    var temp1=generarTemporal();
    var temp2=generarTemporal();
    var temp4=generarTemporal();
    var eti1=generarEtiqueta();
    var temp5=generarTemporal();
	var eti2=generarEtiqueta();
    var eti3=generarEtiqueta();
    var temp6=generarTemporal();
    var temp7=generarTemporal();
    var eti4=generarEtiqueta();
    var eti5=generarEtiqueta();
	var eti6=generarEtiqueta();
    var temp9=generarTemporal();
    var temp10=generarTemporal();    
	lista3D.push("//metodo 3D que concatena 2 cadenas");
	lista3D.push("proc concat begin ");
	lista3D.push(temp1+"=p+1; //cadena1");    
	lista3D.push(temp2+"=stack["+temp1+"]; //puntero al heap");    
    lista3D.push(temp4+"=h; //nueva cadena");        
	lista3D.push(eti1+":");    
	lista3D.push(temp5+"=heap["+temp2+"]; //extrayendo caracter");    
	lista3D.push("if("+temp5+"!="+nulo+") goto "+eti2+";");
	lista3D.push("goto "+eti3+";");
	lista3D.push(eti2+":");
	lista3D.push("heap[h]="+temp5+"; //almacenando caracter");
	lista3D.push("h=h+1;");
	lista3D.push(temp2+"="+temp2+"+1;");
	lista3D.push("goto "+eti1+";");
	lista3D.push(eti3+":");    
	lista3D.push(temp6+"=p+2; //cadena2");    
	lista3D.push(temp7+"=stack["+temp6+"]; //puntero al heap");
	lista3D.push(eti4+":");	
	lista3D.push(temp9+"=heap["+temp7+"]; //extrayendo caracter");
	lista3D.push("if("+temp9+"!="+nulo+") goto "+eti5+";");
	lista3D.push("goto "+eti6+";");
	lista3D.push(eti5+":");
	lista3D.push("heap[h]="+temp9+"; //almacenando caracter");
	lista3D.push("h=h+1;");
	lista3D.push(temp7+"="+temp7+"+1;");
	lista3D.push("goto "+eti4+";");
	lista3D.push(eti6+":");
	lista3D.push("heap[h]=0;");
	lista3D.push("h=h+1;");
	lista3D.push(temp10+"=p+0; //return del metodo");
	lista3D.push("stack["+temp10+"]="+temp4+";");
	lista3D.push("end");

}

function nativaImprimir()
{
    var t1 = generarTemporal();
    var t2 = generarTemporal();    
    var t3 = generarTemporal();
    var t4 = generarTemporal();
    var t5 = generarTemporal();
    var t6 = generarTemporal();          
    var L1 = generarEtiqueta();
    var L2 = generarEtiqueta();       
    var L3 = generarEtiqueta();
    var L4 = generarEtiqueta();
    var L5 = generarEtiqueta();
    var L6 = generarEtiqueta();       
    var L7 = generarEtiqueta();
    var L8 = generarEtiqueta();    
    var L10 = generarEtiqueta();   
    lista3D.push("proc impresionNativa begin");
    lista3D.push(t1 +"= p  + 0 ;");
    lista3D.push(t2 +"= stack["+t1+"];");
    lista3D.push(t3 +"= p + 1 ;");
    lista3D.push(t4 +"= stack["+t3+"];");
    lista3D.push("if ("+ t4 +"== 0 ) goto "+ L1 +";// Imprimir en modo %c caracter");
    lista3D.push("goto "+ L2+";" );
    lista3D.push(L2+": ");
    lista3D.push("if ("+ t4 +"== 1) goto "+L3 +";// Imprimir en modo %e entero");
    lista3D.push("goto "+L4 +";");
    lista3D.push(L4+": ");
    lista3D.push("if ("+t4 +"== 2 ) goto "+L5 +";// Imprimir en modod %d decimal");
    lista3D.push("goto "+L6 +";// Error");
    lista3D.push(L1+": ");
    lista3D.push(t5+" = heap["+t2+"]; ");
    lista3D.push("if ( "+t5+" != "+nulo+" ) goto "+L7 +";");
    lista3D.push("goto "+L8+";");
    lista3D.push(L7+": ");
    lista3D.push("print( \"%c\" ,"+ t5+" ); ");
    lista3D.push(t2+" = "+t2 +"+ 1; ");
    lista3D.push("goto "+L1+ ";");
    lista3D.push(L3+": ");
    lista3D.push("print( \"%e\" , "+t2+" ); ");
    lista3D.push("goto "+L8+";");
    lista3D.push(L5+": ");
    lista3D.push("print( \"%d\" , "+t2+" ); ");
    lista3D.push("goto "+L10+";");
    lista3D.push(L6+":"+L7+":"+L8+":"+L10+":");
    lista3D.push(t6 +"= 10 ;");
    lista3D.push("print( \"%c\" , "+t6+" ); ");
    lista3D.push("end");
}


function coreGetStr(){
    //----------------------------------------------
        var tempExt=generarTemporal();
        var eti12=generarEtiqueta();
        var eti13=generarEtiqueta();
    
        var etiSalida=generarEtiqueta();
    //----------------------------------------------
        lista3D.push("proc getStr begin");
    
        var temp1=generarTemporal();
        var temp2=generarTemporal();
        lista3D.push(temp1+"=p+1;");
        lista3D.push(temp2+"=stack["+temp1+"]; //numero a convertir");
    
        var eti1=generarEtiqueta();
        //-----------------------------------------------------------si es 0
        lista3D.push("if("+temp2+"==0) goto "+eti12+";");
        lista3D.push("goto "+eti1+";");
    
        lista3D.push(eti12+":");
        lista3D.push(tempExt+"=h;");
        lista3D.push("heap[h]=48;");
        lista3D.push("h  = h + 1;");
        lista3D.push("goto "+eti13+";");
        //-----------------------------------------------------------------------
    
        
        lista3D.push(eti1+":");
    
        var temp3=generarTemporal();
        lista3D.push(temp3+"=p+2; //simulacion de cambio de ambito");
    
        var temp4=generarTemporal();
        lista3D.push(temp4+"="+temp3+"+1; //parametro del metodo getInt");
        lista3D.push("stack["+temp4+"]="+temp2+";");
    
        lista3D.push("p=p+2; //cambio de ambito real");
        lista3D.push("call getInt();");
    
        var temp5=generarTemporal();
        lista3D.push(temp5+"=p+0; //acceso al return del metodo getInt");
    
        var temp6=generarTemporal();
        lista3D.push(temp6+"=stack["+temp5+"]; //parte entera");
        lista3D.push("p=p-2;  //regreso al metodo getStr");
    
        var eti2=generarEtiqueta();
        var eti3=generarEtiqueta();
        lista3D.push("if("+temp6+">0) goto "+eti2+";");
        lista3D.push("goto "+eti3+";");
    
        lista3D.push(eti2+":");
    
        var temp7=generarTemporal();
        lista3D.push(temp7+"="+temp6+"%10; //extrayendo digito");
        temp6=generarTemporal();
        lista3D.push(temp6+"="+temp7+"+48;");
        lista3D.push("heap[h]="+temp6+"; //agregando digito al heap");
        lista3D.push("h  = h + 1;");
    
        lista3D.push(temp2+"="+temp2+"/10;");
        lista3D.push("goto "+eti1+";");
    
        lista3D.push(eti3+":");
    
        //agregando caracter de fin de cadena
        lista3D.push("heap[h]=0; //caracter de finde cadena");
        var temp8=generarTemporal();
        lista3D.push(temp8+"=h; //parte entera al revez");//**************************************
        lista3D.push("h  = h + 1;");
    
    
        //parte decimal
        temp2=generarTemporal();
        lista3D.push(temp2+"=stack["+temp1+"]; //numero a convertir");
    
    //--
    
        temp3=generarTemporal();
        lista3D.push(temp3+"=p+2; //simulacion de cambio de ambito");
    
        temp4=generarTemporal();
        lista3D.push(temp4+"="+temp3+"+1; //parametro del metodo getInt");
        lista3D.push("stack["+temp4+"]="+temp2+";");
    
        lista3D.push("p=p+2; //cambio de ambito real");
        lista3D.push("call getInt();");
    
        temp5=generarTemporal();
        lista3D.push(temp5+"=p+0; //acceso al return del metodo getInt");
    
        temp6=generarTemporal();
        lista3D.push(temp6+"=stack["+temp5+"]; //parte entera");
        lista3D.push("p=p-2;  //regreso al metodo getStr");
    
    
            //obteniendo parte decimal
        var temp22=generarTemporal();
        lista3D.push(temp22+"="+temp2+"*"+temp2+";");
        var temp23=generarTemporal();
        lista3D.push(temp23+"=1.0/2.0;");
    
        var temp24=generarTemporal();
        var tempI = generarTemporal();
        var etiquetaI = generarEtiqueta();
        lista3D.push(tmpI +" = 0 ; // Inicio");
        lista3D.push(temp24+"="+temp22+"^"+temp23+";");
        lista3D.push("if ( " +tmpI +" != "+temp23+") goto " + etiquetaI +";");        
        var temp9=generarTemporal();
        lista3D.push(temp9+"="+temp24+"-"+temp6+"; // decimal");
        
        var temp10=generarTemporal();
        lista3D.push(temp10+"="+temp9+"^2;");
    
        var temp11=generarTemporal();
        lista3D.push(temp11+"="+temp10+"^"+temp23+";");
    
        var temp12=generarTemporal();
        lista3D.push(temp12+"="+temp11+"*10000;");
    
    
        var eti4=generarEtiqueta()
        var eti5=generarEtiqueta();
    
        lista3D.push("if("+temp12+"!=0) goto "+eti4+"; //si contiene parte decimal");
        lista3D.push("goto "+eti5+"; //si no contiene parte decimal");
    
        lista3D.push(eti4+":");
    
        
        temp3=generarTemporal();
        lista3D.push(temp3+"=p+2; //simulacion de cambio de ambito");
    
        temp4=generarTemporal();
        lista3D.push(temp4+"="+temp3+"+1; //parametro del metodo getInt");
        lista3D.push("stack["+temp4+"]="+temp12+";");
    
        lista3D.push("p=p+2; //cambio de ambito real");
        lista3D.push("getInt();");
    
        temp5=generarTemporal();
        lista3D.push(temp5+"=p+0; //acceso al return del metodo getInt");
    
        temp6=generarTemporal();
        lista3D.push(temp6+"=stack["+temp5+"]; //parte entera");
        lista3D.push("p=p-2;  //regreso al metodo getStr");
    
    
    
    
        eti2=generarEtiqueta();
        eti3=generarEtiqueta();
        lista3D.push("if("+temp6+">0) goto "+eti2+";");
        lista3D.push("goto "+eti3+";");
    
        lista3D.push(eti2+":");
    
        temp7=generarTemporal();
        var temp89=generarTemporal();
        lista3D.push(temp7+"="+temp6+"%10; //extrayendo digito");
        lista3D.push(temp89+"="+temp7+"+48; //ascci del digito");
        lista3D.push("heap[h]="+temp89+"; //agregando digito al heap");
        lista3D.push("h  = h + 1;");
    
        lista3D.push(temp12+"="+temp12+"/10;");
        lista3D.push("goto "+eti4+";");
    
        lista3D.push(eti3+":");
            var temp13=generarTemporal();
            lista3D.push(temp13+"=46; //simbolo de decimal . ");
            lista3D.push("heap[h]="+temp13+";");
            lista3D.push("h  = h + 1;");
    
    
        lista3D.push(eti5+":");
        var temp88=generarTemporal();
        lista3D.push(temp88+"=s; //parte decimal");
    
        lista3D.push("heap[h]=0;");
        lista3D.push("h  = h + 1;");
    
        var temp13=generarTemporal();
    
        lista3D.push(temp13+"=s; //cadena convertida");
    
        var temp14=generarTemporal();
        lista3D.push(temp14+"=stack["+temp1+"];");
    
        var eti6=generarEtiqueta();
        var eti7=generarEtiqueta();
    
        lista3D.push("if("+temp14+"<0) goto "+eti6+"; //si en numero a convertir es negativo");
        lista3D.push("goto "+eti7+";");
    //--------------------------------------
        lista3D.push(eti6+":");
        var temp15=generarTemporal();
        lista3D.push(temp15+"=45;");
        lista3D.push("heap[h]="+temp15+";");
        lista3D.push("h  = h + 1;");
        
        lista3D.push(eti7+":");
        lista3D.push(temp8+"="+temp8+"-1;");
        var temp16=generarTemporal();
        lista3D.push(temp16+"=heap["+temp8+"];");
    
        var eti8=generarEtiqueta();
        var eti9=generarEtiqueta();
        lista3D.push("if("+temp16+"!=0) goto "+eti8+";");
        lista3D.push("goto "+eti9+";");
    
        lista3D.push(eti8+":");
        lista3D.push("heap[h]="+temp16+";");
        lista3D.push("h  = h + 1;");
        lista3D.push("goto "+eti7+";");
    
    
    //decimal
        lista3D.push(eti9+":");
    
        lista3D.push(temp88+"="+temp88+"-1;");
        var temp17=generarTemporal();
        lista3D.push(temp17+"=heap["+temp88+"];");
    
        var eti10=generarEtiqueta();
        var eti11=generarEtiqueta();
        lista3D.push("if("+temp17+"!=0) goto "+eti10+";");
        lista3D.push("goto "+eti11+";");
    
        lista3D.push(eti10+":");
        lista3D.push("heap[h]="+temp17+";");
        lista3D.push("h  = h + 1;");
        lista3D.push("goto "+eti9+";");
    
        lista3D.push(eti11+":");
        var temp18=generarTemporal();
        lista3D.push("heap[h]=0;");
        lista3D.push("h  = h + 1;");
    
        lista3D.push(temp18+"=p+0; //retorno");
        lista3D.push("stack["+temp18+"]="+temp13+";");
    
        lista3D.push("goto "+etiSalida+";");
    
        //si el valor a convertir es 0
        lista3D.push(eti13+":");
        temp18=generarTemporal();
        lista3D.push("heap[h]=0;");
        lista3D.push("h  = h + 1;");
    
        lista3D.push(temp18+"=p+0; //retorno");
        lista3D.push("stack["+temp18+"]="+tempExt+";");
    
        lista3D.push(etiSalida+":  ;");
    
        lista3D.push("}\n");
    
    }
    


var Simbolo = function(linea, columna, id, tipo, rol, valor)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.id = id.toLowerCase();
    self.tipo = tipo.toLowerCase();
    self.rol = rol;
    self.valor = valor;  
    self.posicion = 0;  
    self.visibilida = "publico";
    self.dimension = 0;
};

var Resultado = function(linea, columna, valor, referencia, tipo)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = valor;
    self.referencia = referencia;
    self.tipo = tipo;
    self.flag = 0; /*0 es valor, 1 es referencia */
};


var Entorno = function(anterior,i)
{   
    var self = this;
    self.anterior = anterior;
    self.tablaSimbolos = {};// :3
    self.contador = 2;
    self.id= i;

    self.addSimbolo = function(simbolo)
    {        
        if(self.tablaSimbolos[simbolo.id] == null)
        {
            simbolo.posicion = self.contador++;
            self.tablaSimbolos[simbolo.id] = simbolo;
        }    
        else
        {
            listaErrores.push( new Error(simbolo.linea, simbolo.columna, simbolo.id ,"La variable "+simbolo.id +" ya existe en la tabla de símbolos", "Semantico"));
        }
    };    
    
    self.buscarSimbolo = function(id)
    {
        var entornoActual = self;
        while(entornoActual !=null)
        {
            if(entornoActual.tablaSimbolos[id] != null)
            {                
                return entornoActual.tablaSimbolos[id];
            }    
            entornoActual = entornoActual.anterior;
        }        
        listaErrores.push(new Error(simbolo.linea, simbolo.columna, id ,"La variable "+id +" no existe en la tabla de símbolos", "Semantico"));
        return null;
    };
};

function generarTemporal()
{
    return "t"+contTemporales++;
};

function generarEtiqueta()
{
    return "L"+contEtiquetas++;
};

function getCodigo()
{
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


var Llamada = function(linea, columna, tipo, id, exp)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.tipo = tipo;
    self.id = id;
    self.expresion = exp;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};


var Declaracion = function(linea, columna, tipo, id, exp)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.tipo = tipo;
    self.id = id;
    self.expresion = exp;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
        entorno.addSimbolo(new Simbolo(linea,columna,id,tipo));
        var simbolo = entorno.buscarSimbolo(self.id);
        var posicion = generarTemporal();
        lista3D.push(posicion + " = p + "+ simbolo.posicion + ";\t// Posicion relativa de la variable " + self.id);        
        var result = self.expresion.generarCodigo(entorno);        
        lista3D.push("stack["+posicion+"] = "+result.valor + ";\t// Asignandole el valor a la variable " +self.id);
    }    
};


var Asignacion = function(linea, columna, id, exp)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.id = id ;
    self.expresion = exp;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
        var simbolo = entorno.buscarSimbolo(self.id);
        if(simbolo !=null)
        {
            var temporal = generarTemporal();            
            lista3D.push(temporal + " = p + " + simbolo.posicion +"; // Posicion variable " + self.id);            
            var expresion = self.expresion.generarCodigo(entorno);    
            if(expresion!=null)
            {
                //console.log( expresion.tipo+ "=="+ simbolo.tipo);                
                if(expresion.tipo == simbolo.tipo)
                {
                    lista3D.push("stack["+temporal+"] = " +expresion.valor + ";\t// Asignandole el valor a la variable "+self.id);
                }
                else
                {         
                    //console.log("Error de tipos al tratar de asignar un valor " + expresion.tipo + ", se esperaba " + simbolo.tipo + " linea: "+ self.linea);       
                    listaErrores.push( new Error(self.linea, self.columna, self.id, "Error de tipos al tratar de asignar un valor " + expresion.tipo + ", se esperaba " + simbolo.tipo, "Semantico"));
                }
            }                            
        }
    }    
};



var Or = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};

var And = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};



var MenorIgual = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};



var MayorIgual = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};




var Diferente = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};



var Igual = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};



var Menor = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};



var Mayor = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};



var Modulo = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};



var Potencia = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};



var Multiplicacion = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};



var Division = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};


var Resta = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
    }    
};

var Suma = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;

    self.generarCodigo = function(entorno)
    {
        var vali = self.operandoI.generarCodigo(entorno); // Resultado1
        var vald = self.operandoD.generarCodigo(entorno); // Resultado2        
        var etiqueta = generarTemporal();
        var resultado= null;
        switch(vali.tipo)
        {
            case "int":
                switch(vald.tipo)
                {                    
                    case "int":
                        lista3D.push(etiqueta + " = " + vali.valor + " + " + vald.valor+";");
                        resultado = new Resultado(self.linea, self.columna, etiqueta, "", "int");
                    break;
                    case "double":
                        lista3D.push(etiqueta + " = " + vali.valor + " + " + vald.valor+";");
                        resultado = new Resultado(self.linea, self.columna, etiqueta, "", "double");
                    break;
                    case "string":
                        var 
                        lista3D.push(etiqueta + " = " + vali.valor + " + " + vald.valor+";");
                        resultado = new Resultado(self.linea, self.columna, etiqueta, "", "string");                       
                    default:                                    
                    listaErrores.push(new Error(self.linea, self.columna, "Suma","Error de tipos " + vali.tipo+ " + "+vald.tipo, "Semantico" ));
                    break;
                }
            break;
            case "string":
                switch(vald.tipo)
                {   
                    case "string":
                        var tmp2 = generarTemporal();
                        var tmp3 = generarTemporal();
                        var tmp4 = generarTemporal();
                        var tmp5 = generarTemporal();
                        var tmp6 = generarTemporal();
                        var tmp7 = generarTemporal();
                        lista3D.push(tmp2 +" = p + " + entorno.contador + "; // simulación de cambio de ambito");
                        lista3D.push(tmp3 +" = "+tmp2 +" + 1; // Direccion paso parametro cadena 1");
                        lista3D.push("stack["+tmp3+"] = "+vali.valor+" ;// Pasando cadena 1");
                        lista3D.push(tmp4 +" = "+tmp2 +" + 2; // Direccion paso parametro cadena 2");
                        lista3D.push("stack["+tmp4+"] = "+vald.valor+" ;// Pasando cadena 1");
                        lista3D.push("p = p + "+entorno.contador + "; // Cambio real de ambito");
                        lista3D.push("call concat ;");
                        lista3D.push("p = p - "+entorno.contador + "; // Cambio real de ambito");
                        lista3D.push(tmp5 + " = p + " + entorno.contador + "; // simulación de cambio de ambito");
                        lista3D.push(tmp6 + " = "+tmp5 +" + 0; // Direccion return");
                        lista3D.push(tmp7  + " = stack["+tmp6+"];// valor nueva cadena");
                        lista3D.push("heap[h] = " + nulo +"; // Fin cadena nueva");
                        lista3D.push("h = h + 1; ");
                        resultado = new Resultado(self.linea, self.columna, tmp7, "", "string");                        
                    break;
                }
            break;
        }        
        
        if(vali.flag == 0  && vald.flag ==0)
        {
            
        }                
        
        return resultado;
    }    
};

var ExpInt = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v;    

    function generar3d()
    {
        return self.valor;
    }

    self.generarCodigo = function(entorno)
    {                         
        var resultado = new Resultado(self.linea, self.columna, self.valor, "", "int");              
        return resultado;
    }    
};

var Expdecimal = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v;    
    
    self.generarCodigo = function(entorno)
    {                         
        var resultado = new Resultado(self.linea, self.columna, self.valor, "", "double");              
        return resultado;
    }   
};


var ExpString = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v;    

    self.generarCodigo = function(entorno)
    {           
        var tmp = generarTemporal();        
        lista3D.push(tmp + " = h; \t//Posicion actual del h")                             
        var i;
        for(i = 0 ; i < self.valor.length  ; i++)
        {                 
            lista3D.push("heap[h] = " +self.valor[i].charCodeAt(0) + ";\t//"+self.valor[i] );
            lista3D.push(" h = h + 1;");                                     
        }
        lista3D.push("heap[h] = " +nulo + ";\t// Fin de cadena");
        lista3D.push(" h = h + 1;"); 
        var resultado = new Resultado(self.linea, self.columna, tmp, "", "string");            
        return resultado;        
    }    
};


var ExpChar = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v.charCodeAt(0);    

    self.generarCodigo = function(entorno)
    {         
        var resultado = new Resultado(self.linea, self.columna, self.valor,  "", "char");        
        return resultado;
    }    
};

var ExpBoolean = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v;    

    self.generarCodigo = function(entorno)
    {                 
        var resultado = new Resultado(self.linea, self.columna, self.valor, "", "boolean");        
        return resultado;
    }    
};

var Impresion = function(linea, columna, v)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.expresion = v;
    self.generarCodigo  = function(entorno)
    {
        var resultado = self.expresion.generarCodigo(entorno);
        var tmp1 = generarTemporal(); // Simulacion de cambio de ambito        
        var tmp2 = generarTemporal(); 
        var tmp3 = generarTemporal();         
        lista3D.push(tmp1 + " = p + " +entorno.contador + "; // Simulacion de cambio de ambito");
        lista3D.push(tmp2 + " = "+  tmp1 + " + 0 ; // Posicion inicio de cadena");
        if(resultado.tipo==0)
        {
            lista3D.push("stack["+tmp2+"] = "+  resultado.valor + ";// Paso por referencia del inicio de cadena");
        }
        if(resultado.tipo==1)
        {
            lista3D.push("stack["+tmp2+"] = "+  resultado.referencia + ";// Paso por referencia del inicio de cadena");
        }                        
        lista3D.push(tmp3 + " = "+  tmp1 + " + 1 ; // Posicion flag modo impresion");
        lista3D.push("stack["+tmp3+"] = "+resultado.flag+" ;// Paso por referencia del inicio de cadena");
        lista3D.push("p = p + "+entorno.contador +"; // Cambio real de ambito");
        lista3D.push("call impresionNativa ;  // Llamando funcion");
        lista3D.push("p = p - "+entorno.contador +"; // Retomar ambito");
        lista3D.push("$$_clean_scope (" + tmp1 +" , " + entorno.contador +" ) ;// Limpiando stack");
    }
};

var ExpId = function(linea, columna, id)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.id = id;

    self.generarCodigo = function(entorno)
    {
        var tmp1 = generarTemporal();
        var tmp2 = generarTemporal();
        var simbolo = entorno.buscarSimbolo(self.id);
        lista3D.push(tmp1 + " = p + "+ simbolo.posicion + "; // Posicion local "+id);
        lista3D.push(tmp2 + " = stack["+tmp1 +"] ; // Valor de "+id);
        //console.log(simbolo);        
        if(simbolo.tipo == "string")
        {
            var tmp3 = generarTemporal();
            lista3D.push(tmp3 + " = stack["+tmp2 +"] ; // Direccion en el heap");
            var resultado = new Resultado(self.linea, self.columna, tmp3, tmp2, 1);
            resultado.flag = 0;
            return resultado;        
        }
        else 
        if(simbolo.tipo == "int")
        {
            var resultado = new Resultado(self.linea, self.columna, tmp2, tmp1, 0);
            resultado.flag = 1;
            return resultado;        
        }
        else 
        if(simbolo.tipo == "double")
        {
            var resultado = new Resultado(self.linea, self.columna, tmp2, tmp1, 0);
            resultado.flag = 2;
            return resultado;        
        }  
        else
        if(simbolo.tipo == "boolean")
        {
            var resultado = new Resultado(self.linea, self.columna, tmp2, tmp1, 0);
            resultado.flag = 2;
            return resultado;        
        }      
        else
        if(simbolo.tipo == "char")
        {
            var resultado = new Resultado(self.linea, self.columna, tmp2, tmp1, 0);
            resultado.flag = 1;
            return resultado;        
        }                  
    }
};


	%}
%lex
%options case-insensitive

%%

\s+                   /* skip whitespace */
\n+                   /* skip whitespace */
\t+                   /* skip whitespace */
//comentarios
"//"[^\r\n]*[^\r\n]     return;
"/*"[^]*"*/"         return;
"/*"[^"*"]~"*/"         return;

[0-9]+"."[0-9]+	  return 'decimal'
[0-9]+			  return 'entero'
\"(\\.|[^"])*\" 	  return 'texto'
\'(\\.|[^'])*\' 	  return 'textosimple'

//AUMENTO DECREMENTO
"++"                  %{ /*lista3D.push('++');*/return '++'; %}
"--"                  %{ /*lista3D.push('--');*/return '--'; %}
//asignacion y Eeracion
"+="                  %{ /*lista3D.push('+=');*/return '+='; %}
"*="                  %{ /*lista3D.push('*-');*/return '*-'; %}
"-="                  %{ /*lista3D.push('-=');*/return '-='; %}
"/="                  %{ /*lista3D.push('/=k');*/return '/='; %}
//Eeradores relacionales
">="                  %{ /*lista3D.push('>=');*/return '>='; %}
"<="                  %{ /*lista3D.push('<=');*/return '<='; %}
"=="                  %{ /*lista3D.push('==');*/return '=='; %}
"!="                  %{ /*lista3D.push('!=');*/return '!='; %}

//Eeradores Logicos
"||"                  %{ /*lista3D.push('||');*/return '||'; %}
"??"                  %{ /*lista3D.push('??');*/return '??'; %}
"&&"                  %{ /*lista3D.push('&&');*/return '&&'; %}
"!"                   %{ /*lista3D.push('!');*/return '!'; %}
//Eeradores aritmeticos
"*"                   %{ /*lista3D.push('*');*/return '*'; %}
"->"                 %{ /*lista3D.push('->');*/return 'flecha'; %} 
"/"                   %{ /*lista3D.push('/');*/return '/'; %}
"-"                   %{ /*lista3D.push('-');*/return '-'; %}
"+"                   %{ /*lista3D.push('+');*/return '+'; %}
"%"                   %{ /*lista3D.push('+');*/return '%'; %}
"^"                   %{ /*lista3D.push('^');*/return '^'; %}
"="                   %{ /*lista3D.push('=');*/return '='; %}
//signos de agrupacion
"("                   %{ /*lista3D.push('(');*/return '('; %}
")"                   %{ /*lista3D.push(')');*/return ')'; %}
"{"                   %{ /*lista3D.push('{');*/return '{'; %}
"}"                   %{ /*lista3D.push('}');*/return '}'; %}
"["                   %{ /*lista3D.push('[');*/return '['; %}
"]"                   %{ /*lista3D.push(']');*/return ']'; %}
//otros signitos culeros

">"                   %{ /*lista3D.push('>');*/return '>'; %}
"<"                   %{ /*lista3D.push('<');*/return '<'; %}
","                   %{ /*lista3D.push(',');*/return ','; %}
"."                   %{ /*lista3D.push('.');*/return '.'; %}
					  
":"                   %{ /*lista3D.push(':');*/return ':'; %}
";"                   %{ /*lista3D.push(';');*/return ';'; %}
// Palabras reservadas para coline

"abstract"            %{ /*lista3D.push(yytext);*/return 'abstract'; %}
"boolean"             %{ /*lista3D.push(yytext);*/return 'boolean'; %}
"break"               %{ /*lista3D.push(yytext);*/return 'break'; %}
"case"                %{ /*lista3D.push(yytext);*/return 'case'; %}
"catch"               %{ /*lista3D.push(yytext);*/return 'catch'; %}
"break"               %{ /*lista3D.push(yytext);*/return 'break'; %}
"char"                %{ /*lista3D.push(yytext);*/return 'char'; %}
"class"               %{ /*lista3D.push(yytext);*/return 'class'; %}
"continue"            %{ /*lista3D.push(yytext);*/return 'continue'; %}
"default"             %{ /*lista3D.push(yytext);*/return 'default'; %}
"do"                  %{ /*lista3D.push(yytext);*/return 'do'; %}
"double"              %{ /*lista3D.push(yytext);*/return 'double'; %}
"else"                %{ /*lista3D.push(yytext);*/return 'else'; %}
"extends"             %{ /*lista3D.push(yytext);*/return 'extends'; %}
"final"               %{ /*lista3D.push(yytext);*/return 'final'; %}
"for"                 %{ /*lista3D.push(yytext);*/return 'for'; %}
"graph_dot"           %{ /*lista3D.push(yytext);*/return 'graph_dot'; %}
"if"                  %{ /*lista3D.push(yytext);*/return 'if'; %}
"import"              %{ /*lista3D.push(yytext);*/return 'import'; %}
"instanceof"          %{ /*lista3D.push(yytext);*/return 'instanceof'; %}
"int"                 %{ /*lista3D.push(yytext);*/return 'int'; %}
"message"             %{ /*lista3D.push(yytext);*/return 'message'; %}
"new"                 %{ /*lista3D.push(yytext);*/return 'new'; %}
"object"              %{ /*lista3D.push(yytext);*/return 'object'; %}
"pow"                 %{ /*lista3D.push(yytext);*/return 'pow'; %}
"println"             %{ /*lista3D.push(yytext);*/return 'println'; %}
"private"             %{ /*lista3D.push(yytext);*/return 'private'; %}
"protected"           %{ /*lista3D.push(yytext);*/return 'protected'; %}
"public"              %{ /*lista3D.push(yytext);*/return 'public'; %}
"return"              %{ /*lista3D.push(yytext);*/return 'return'; %}
"read_console"        %{ /*lista3D.push(yytext);*/return 'read_console'; %}
"read_file"           %{ /*lista3D.push(yytext);*/return 'read_file'; %}
"static"              %{ /*lista3D.push(yytext);*/return 'static'; %}
"str"                 %{ /*lista3D.push(yytext);*/return 'str'; %}
"string"              %{ /*lista3D.push(yytext);*/return 'string'; %}
"super"               %{ /*lista3D.push(yytext);*/return 'super'; %}
"switch"              %{ /*lista3D.push(yytext);*/return 'switch'; %}
"continue"            %{ /*lista3D.push(yytext);*/return 'continue'; %}
"this"                %{ /*lista3D.push(yytext);*/return 'this'; %}
"toChar"              %{ /*lista3D.push(yytext);*/return 'tochar'; %}
"toDouble"            %{ /*lista3D.push(yytext);*/return 'toDouble'; %}
"toInt"               %{ /*lista3D.push(yytext);*/return 'toInt'; %}
"try"                 %{ /*lista3D.push(yytext);*/return 'try'; %}
"while"               %{ /*lista3D.push(yytext);*/return 'while'; %}
"write_file"          %{ /*lista3D.push(yytext);*/return 'write_file'; %}
"true"                %{ /*lista3D.push(yytext);*/return 'verdadero'; %}
"false"               %{ /*lista3D.push(yytext);*/return 'falso'; %}
"null"                %{ /*lista3D.push(yytext);*/return 'null'; %}
([a-zA-Z]|"_"|"$")([a-zA-Z]|[0-9]|"_"|"$")* 
					  %{ /*lista3D.push(yytext);*/ return 'id'; %}

<<EOF>>               return 'EOF'
.                     return 'INVALIDO'
/lex

/* Eerator associations and precedence */

/* lexical grammar */

%lex
%options case-insensitive
MultilineaComentario   = "/*" [^*] ~"*/" | "/*" "*"+ "/"
%%

\s+                   /* skip whitespace */
\n+                   /* skip whitespace */
\t+                   /* skip whitespace */
[0-9]+"."[0-9]+	 	  return 'numDecimal'
[0-9]+				  return 'numEntero'
\"(\\.|[^"])*\" 	  return 'cadenaDoble'
\'(\\.|[^'])*\' 	  return 'cadenaSimple'

"//"(.)*              /*IGNORAR*/;
"/*"[^"*"]"*/"        /*IGNORAR*/;
"/*"[^"*"]~"*/"       /*IGNORAR*/;

"/*"[^'*']*"*/"         return;
"//"[^\r\n]*[^\r\n]     return;
"/*"[^"*"]~"*/"         return;

"++"                  return '++'
"--"                  return '--'
"+="                  return '+='
"-="                  return '-='
"*="                  return '*='
"/="                  return '/='
"->"                  return '->'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"("                   return '('
")"                   return ')'
">="                  return '>='
"<="                  return '<='
"=="                  return '=='
"!="                  return '!='
">"                   return '>'
"<"                   return '<'
"&&"                  return '&&'
"||"                  return '||'
"??"                  return '??'
"!"                   return '!'
"{"                   return '{'
"}"                   return '}'
","                   return ','
"."                   return '.'
":"                   return ':'
";"                   return ';'
"["                   return '['
"]"                   return ']'
"="                   return '='
"booleano"            return 'booleano'
"entero"              return 'entero'
"decimal"             return 'decimal'
"caracter"            return 'caracter'
"nada"                return 'nada'
"tamanio"             return 'tamanio'
"concatenar"          return 'concatenar'
"convertiracadena"    return 'convertiracadena'
"convertiraentero"    return 'convertiraentero'
"si"                  return 'si'
"es_verdadero"        return 'esverdadero'
"es_falso"            return 'esfalso'
"fin-si"		      return 'finsi'
"evaluar_si"          return 'evaluarsi'
"es_igual_a"          return 'esiguala'
"defecto"             return 'defecto'
"verdadero"                return 'verdadero'
"falso"               return 'falso'
"true"                return 'verdadero'
"false"               return 'falso'
"romper"              return 'romper'
"continuar"           return 'continuar'
"retorno"             return 'retorno'
"repetir_mientras"    return 'repetirmientras'
"hacer"               return 'hacer'
"mientras"            return 'mientras'
"ciclo_doble_condicion"       return 'ciclodoble'
"repetir"		      return 'repetir'
"hasta_que"		      return 'hastaque'
"hasta"               return 'hasta'
"desde"               return 'desde'
"repetir_contando"    return 'repetircontando'
"enciclar"            return 'enciclar'
"contador"            return 'contador'
"leer_teclado"        return 'leerteclado'
"vacio"               return 'vacio'
"Principal"           return 'Principal'
"lista"               return 'lista'
"destruirPuntero"     return 'destruirPuntero'
"reservarMemoria"     return 'reservarMemoria'
"consultarTamanio"    return 'consultarTamanio'
"obtenerDireccion"    return 'obtenerDireccion'
"crearPuntero"        return 'crearPuntero'
"estructura"          return 'estructura'
"variable"            return 'variable'
"'\0'"                return 'nulo'
"nuevo"               return 'nuevo'
"hereda_de"           return 'hereda_de'
"importar"			  return 'importar'
"@sobrescribir"       return 'sobrescribir'
"protegido"      	  return 'protegido'
"privado"    		  return 'privado'
"publico"       	  return 'publico'
"este"			      return 'este'
"clase"     		  return 'clase'
"imprimir"		      return 'imprimir'
"funcion"		      return 'funcion'
"pila"		      	  return 'pila'
"cola"		      	  return 'cola'
"puntero"	      	  return 'puntero'
[a-zA-z_0-9]+		  return 'id'


<<EOF>>               return 'EOF'
.                     return 'INVALIDO'

/lex

/* operator associations and precedence */


%left UMINUS
%left '||' 
%left '&&' 
%left '??'
%right '!'
%left '>' '<' '>=' '<=' '==' '!='
%left '+=' '-=' '*=' '/=' 
%left '++' '--'
%left '+' '-'
%left '*' '/'
%left '^'
%left '->'

%right '!'
%error-verbose


%start INICIO

%% /* language grammar */


INICIO	: ENTRADA EOF{
	parser.arbol.raiz = $1;
	console.log(" * * * * * * CORRECTO * * * * * * *");
};


ENTRADA	: IMPORTAR CLASES {
		nodo  = new Nodo("ENTRADA",$1,@1,[$1,$2]);
		$$ = nodo;
	}
	| CLASES{
		nodo  = new Nodo("ENTRADA",$1,@1,[$1]);
		$$ = nodo;
	};


IMPORTAR : IMPORTAR importar '(' OP ')' ';'{ //6
		nodo1 = new Nodo('importar',$2,@2,[]);
		nodo2 = new Nodo('(',$3,@3,[]);
		nodo5 = new Nodo(')',$5,@5,[]);
		nodo  = new Nodo("IMPORTAR",$1,@1,[$1,nodo1,nodo2,$4,nodo5]);
		$$ = nodo;
	}
	|importar '(' OP ')' ';'{ //6
		nodo1 = new Nodo('importar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("IMPORTAR",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


CLASES	: CLASES CLASE {
		nodo  = new Nodo("CLASES",$1,@1,[$1,$2]);
		$$ = nodo;
	}
	| CLASE{
		nodo  = new Nodo("CLASES",$1,@1,[$1]);
		$$ = nodo;
	}
	| CLASES ESTRUCTURA {
		nodo  = new Nodo("CLASES",$1,@1,[$1,$2]);
		$$ = nodo;
	}
	| ESTRUCTURA{
		nodo  = new Nodo("CLASES",$1,@1,[$1]);
		$$ = nodo;
	};


CLASE : VISIBILIDAD clase id hereda_de id '{' INSTRUCCIONES '}' { //6
		nodo2 = new Nodo('clase',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('hereda_de',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("CLASE",$1,@1,[$1,nodo2,nodo3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	| VISIBILIDAD clase id '{' INSTRUCCIONES '}' { //6
		nodo2 = new Nodo('clase',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('{',$4,@4,[]);
		nodo6 = new Nodo('}',$6,@6,[]);
		nodo  = new Nodo("CLASE",$1,@1,[$1,nodo2,nodo3,nodo4,$5,nodo6]);
		$$ = nodo;
	}
	| clase id hereda_de id '{' INSTRUCCIONES '}' { //6
		nodo1 = new Nodo('clase',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('hereda_de',$3,@3,[]);
		nodo4 = new Nodo('id',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("CLASE",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo4,$6,nodo7]);
		$$ = nodo;
	}
	|clase id '{' INSTRUCCIONES '}' { //6
		nodo1 = new Nodo('clase',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('{',$3,@3,[]);
		nodo5 = new Nodo('}',$5,@5,[]);
		nodo  = new Nodo("CLASE",$1,@1,[nodo1,nodo2,nodo3,$4,nodo5]);
		$$ = nodo;
	};


INSTRUCCIONES	: INSTRUCCIONES INSTRUCCION {
		nodo  = new Nodo("INSTRUCCIONES",$1,@1,[$1,$2]);
		$$ = nodo;
	}
	| INSTRUCCION{
		nodo  = new Nodo("INSTRUCCIONES",$1,@1,[$1]);
		$$ = nodo;
	};

		
INSTRUCCION : VARIABLE{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| ASIGNACION{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| CONSTRUCTOR{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| CONCATENAR{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| IMPRIMIR{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| PROCEDIMIENTO{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| PRINCIPAL{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| ESTRUCTURA{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| PUNTEROS{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| SI{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| SWITCH{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| CICLO {
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| FOR {
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| TECLADO {
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| id INSTANCIA {
		nodo1 = new Nodo("id",$1,@1,[]);
		nodo = new Nodo("INSTRUCCION",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	| LLAMADA ';'{
		nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		$$ = nodo;
	}
	| romper ';'{
		nodo1 = new Nodo('romper',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| romper OP ';'{
		nodo1 = new Nodo('romper',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	| continuar ';'{
		nodo1 = new Nodo('continuar',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| retorno ';'{
		nodo1 = new Nodo('retorno',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| retorno OP ';'{
		nodo1 = new Nodo('retorno',$1,@1,[]);
		nodo  = new Nodo("INSTRUCCION",$1,@1,[nodo1,$2]);
		$$ = nodo;
	};

VISIBILIDAD	: publico { //1
		nodo1 = new Nodo('publico',$1,@1,[]);
		nodo  = new Nodo("VISIBILIDAD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| privado{ //1
		nodo1 = new Nodo('privado',$1,@1,[]);
		nodo  = new Nodo("VISIBILIDAD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| protegido{ //1
		nodo1 = new Nodo('protegido',$1,@1,[]);
		nodo  = new Nodo("VISIBILIDAD",$1,@1,[nodo1]);
		$$ = nodo;
	};


TIPO	: entero { //1
		nodo1 = new Nodo('entero',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| decimal{ //1
		nodo1 = new Nodo('decimal',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| booleano{ //1
		nodo1 = new Nodo('booleano',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| 'caracter'{ //1
		nodo1 = new Nodo('caracter',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| vacio{ //1
		nodo1 = new Nodo('vacio',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| funcion{ //1
		nodo1 = new Nodo('funcion',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| lista {
		nodo1 = new Nodo('lista',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| pila {
		nodo1 = new Nodo('pila',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| cola {
		nodo1 = new Nodo('cola',$1,@1,[]);
		nodo  = new Nodo("TIPO",$1,@1,[nodo1]);
		$$ = nodo;
	};


VARIABLE :  VISIBILIDAD TIPO id DIMENSION ASIGNAR ';' { //5
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,$2,nodo3,$4,$5]);
		$$ = nodo;
	}
	| TIPO id DIMENSION ASIGNAR ';' { //4
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,nodo2,$3,$4]);
		$$ = nodo;
	}
	| id id DIMENSION ASIGNAR ';' { //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[nodo1,nodo2,$3,$4]);
		$$ = nodo;
	}
	|VISIBILIDAD TIPO id ASIGNAR ';'{ //4
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,$2,nodo3,$4]);
		$$ = nodo;
	}
	|VISIBILIDAD id id ASIGNAR ';'{ //4
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,nodo2,nodo3,$4]);
		$$ = nodo;
	}
	| TIPO id ASIGNAR ';'{ //3
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[$1,nodo2,$3]);
		$$ = nodo;
	}
	| id id ASIGNAR ';'{ //3
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("VARIABLE",$1,@1,[nodo1,nodo2,$3]);
		$$ = nodo;
	};


DIMENSION	: DIMENSION '[' OP ']'{ //4
		nodo1 = new Nodo('[',$2,@2,[]);
		nodo2 = new Nodo(']',$4,@4,[]);
		nodo  = new Nodo("DIMENSION",$1,@1,[$1,nodo1,$3,nodo2]);
		$$ = nodo;
	}
	| '[' OP ']' { //3
		nodo1 = new Nodo('[',$1,@1,[]);
		nodo2 = new Nodo(']',$3,@3,[]);
		nodo  = new Nodo("DIMENSION",$1,@1,[nodo1,$2,nodo2]);
		$$ = nodo;
	};


ASIGNAR	: '=' OP{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	|'=' '{' LARREGLO '}' { //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo4 = new Nodo('}',$4,@4,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	}
	|'=' nuevo id '(' ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo5 = new Nodo(')',$5,@5,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5]);
		$$ = nodo;
	}
	|'=' nuevo id '(' VALOR ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo5 = new Nodo('(',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,nodo3,nodo5,$5,nodo6]);
		$$ = nodo;
	}
	|'=' nuevo TIPO '(' ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo5 = new Nodo(')',$5,@5,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5]);
		$$ = nodo;
	}
	|'=' nuevo TIPO '(' TIPO ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,$3,nodo4,$5,nodo6]);
		$$ = nodo;
	}
	|'=' nuevo TIPO '(' id ')'{ //2
		nodo1 = new Nodo('=',$1,@1,[]);
		nodo2 = new Nodo('nuevo',$2,@2,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,nodo6]);
		$$ = nodo;
	}
	|{ //1
		nodo1 = new Nodo('nulo',$1,@1,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1]);
		$$ = nodo;
	};

LARREGLO :  LARREGLO ',' ARREGLO{ //2
		nodo2 = new Nodo(',',$2,@2,[]);
		nodo  = new Nodo("LARREGLO",$1,@1,[$1,nodo2,$3]);
		$$ = nodo;
	}
    | ARREGLO{ //2
		nodo  = new Nodo("LARREGLO",$1,@1,[$1]);
		$$ = nodo;
	};
		
ARREGLO : OP {
		nodo  = new Nodo("ARREGLO",$1,@1,[$1]);
		$$ = nodo;
	}
    |'{' LARREGLO '}' { //2
		nodo1 = new Nodo('{',$1,@1,[]);
		nodo3 = new Nodo('}',$3,@3,[]);
		nodo  = new Nodo("ARREGLO",$1,@1,[nodo1,$2,nodo3]);
		$$ = nodo;
	};

ARREGLOB : ARREGLO ',' '{' ARREGLO '}' { //2
		nodo2 = new Nodo(',',$2,@2,[]);
		nodo3 = new Nodo('{',$3,@3,[]);
		nodo5 = new Nodo('}',$5,@5,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[$1,nodo2,nodo3,$4,nodo5]);
		$$ = nodo;
	}
    | ARREGLO ',' OP{ //2
		nodo2 = new Nodo(',',$2,@2,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[$1,nodo2,$3]);
		$$ = nodo;
	}
    | OP{ //2
		nodo  = new Nodo("ASIGNAR",$1,@1,[$1]);
		$$ = nodo;
	}
    |'{' ARREGLO '}' { //2
		nodo1 = new Nodo('{',$1,@1,[]);
		nodo3 = new Nodo('}',$3,@3,[]);
		nodo  = new Nodo("ASIGNAR",$1,@1,[nodo1,$2,nodo3]);
		$$ = nodo;
	};


ASIGNACION	: id ASIGNAR ';'{ 
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	| id DIMENSION ASIGNAR ';'{ 
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,$3]);
		$$ = nodo;
	}
	| este '.' id ASIGNAR ';'{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2,nodo3,$4]);
		$$ = nodo;
	}
	| este '.' id INSTANCIA ASIGNAR ';'{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2,nodo3,$4,$5]);
		$$ = nodo;
	}
	| id INSTANCIA ASIGNAR ';'{ 
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,$3]);
		$$ = nodo;
	}
	| id INSTANCIA '++' ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo3 = new Nodo('++',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,nodo3]);
		$$ = nodo;
	}
	| id INSTANCIA '--' ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo3 = new Nodo('--',$3,@3,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,nodo3]);
		$$ = nodo;
	}
	| id '++' ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('++',$2,@2,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	}
	| id '--' ';'{ //4
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('--',$2,@2,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	} 
	| id OP_ASIGNACION OP ';' {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$2,$3]);
		$$ = nodo;
	} 	
	| este '.' id '++' ';'{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('++',$4,@4,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	}
	| este '.' id '--' ';'{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo('--',$4,@4,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	};

OP_ASIGNACION : '+=' {
		nodo1 = new Nodo('+',$1,@1,[]);
		//nodo  = new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo1;
	}
    | '-=' {
		nodo1 = new Nodo('-',$1,@1,[]);
		//nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo1;
	}
    | '*=' {
		nodo1 = new Nodo('*',$1,@1,[]);
		//nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo1;
	}
    | '/=' {
		nodo1 = new Nodo('/',$1,@1,[]);
		//nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo1;
	};

PRINCIPAL	: Principal '(' ')' '{'  INSTRUCCIONES '}'{
		nodo1 = new Nodo('Principal',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$3,@3,[]);
		nodo4 = new Nodo('{',$4,@4,[]);
		nodo6 = new Nodo('{',$6,@6,[]);
		nodo  = new Nodo("PRINCIPAL",$1,@1,[nodo1,nodo2,nodo3,nodo4,$5,nodo6]);
		$$ = nodo;
	};


PROCEDIMIENTO : sobrescribir METODO {
		nodo1 = new Nodo('sobrescribir',$1,@1,[]);
		nodo  = new Nodo("PROCEDIMIENTO",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	|METODO {
		nodo  = new Nodo("PROCEDIMIENTO",$1,@1,[$1]);
		$$ = nodo;
	};


METODO : VISIBILIDAD TIPO id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo6 = new Nodo(')',$6,@6,[]); nodo7 = new Nodo('{',$7,@7,[]);
		nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,$2,nodo3,nodo4,$5,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	|VISIBILIDAD TIPO id '(' ')' '{' INSTRUCCIONES '}'{ //8
		nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo6 = new Nodo(')',$5,@5,[]); nodo7 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,$2,nodo3,nodo4,nodo6,nodo7,$7,nodo8]);
		$$ = nodo;
	}
	| TIPO id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //8
		nodo3 = new Nodo('id',$2,@2,[]); nodo4 = new Nodo('(',$3,@3,[]); nodo6 = new Nodo(')',$5,@5,[]); nodo7 = new Nodo('{',$6,@6,[]); 
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo3,nodo4,$4,nodo6,nodo7,$7,nodo8]);
		$$ = nodo;
	}
	| TIPO id '(' ')' '{' INSTRUCCIONES '}'{ //7
		nodo2 = new Nodo('id',$2,@2,[]); nodo3 = new Nodo('(',$3,@3,[]); nodo4 = new Nodo(')',$4,@4,[]); nodo5 = new Nodo('{',$5,@5,[]); 
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo2,nodo3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	| VISIBILIDAD id id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo2 = new Nodo('id',$2,@2,[]); nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo6 = new Nodo(')',$6,@6,[]);
		nodo7 = new Nodo('{',$7,@7,[]); nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo2,nodo3,nodo4,$5,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	| VISIBILIDAD id id '(' ')' '{' INSTRUCCIONES '}'{ //8
		nodo2 = new Nodo('id',$2,@2,[]); nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo5 = new Nodo(')',$5,@5,[]); nodo6 = new Nodo('{',$6,@6,[]); nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo2,nodo3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	| id id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ 
		nodo1 = new Nodo('id',$1,@1,[]); nodo2 = new Nodo('id',$2,@2,[]); nodo3 = new Nodo('(',$3,@3,[]); nodo6 = new Nodo(')',$5,@5,[]);
		nodo7 = new Nodo('{',$6,@6,[]); nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[nodo1,nodo2,nodo3,$4,nodo6,nodo7,$7,nodo8]);
		$$ = nodo;
	}
	| id id '(' ')' '{' INSTRUCCIONES '}'{ 
		nodo1 = new Nodo('id',$1,@1,[]); nodo2 = new Nodo('id',$2,@2,[]); nodo3 = new Nodo('(',$3,@3,[]); nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]); nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("METODO",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	|VISIBILIDAD TIPO id DIMENSION '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$5,@5,[]); nodo6 = new Nodo(')',$7,@7,[]); nodo7 = new Nodo('{',$8,@8,[]);
		nodo10 = new Nodo('}',$10,@10,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,$2,nodo3,$4, nodo4,$6,nodo6,nodo7,$9,nodo10]);
		$$ = nodo;
	}
	|VISIBILIDAD TIPO id DIMENSION '(' ')' '{' INSTRUCCIONES '}'{ //8
		nodo3 = new Nodo('id',$3,@3,[]); nodo4 = new Nodo('(',$5,@5,[]); nodo6 = new Nodo(')',$6,@6,[]); nodo7 = new Nodo('{',$7,@7,[]);
		nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,$2,nodo3,$4,nodo4,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	| TIPO id DIMENSION '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo3 = new Nodo('id',$2,@2,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo6 = new Nodo(')',$6,@6,[]); nodo7 = new Nodo('{',$7,@7,[]); 
		nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo3,$4,nodo4,$5,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	| TIPO id DIMENSION '(' ')' '{' INSTRUCCIONES '}'{ //7
		nodo3 = new Nodo('id',$2,@2,[]); nodo4 = new Nodo('(',$4,@4,[]); nodo5 = new Nodo(')',$5,@5,[]); nodo6 = new Nodo('{',$6,@6,[]); 
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("METODO",$1,@1,[$1,nodo3,$3, nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	};


PARAMETRO 	: PARAMETRO ',' PARAM{
		nodo1 = new Nodo(',',$2,@2,[]);
		nodo  = new Nodo("PARAMETRO",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| PARAM{
		nodo  = new Nodo("PARAMETRO",$1,@1,[$1]);
		$$ = nodo;
	};


PARAM 	: TIPO id {
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAM",$1,@1,[$1,nodo2]);
		$$ = nodo;
	}
	| id id {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAM",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	}
	| TIPO id DIMENSION {
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAM",$1,@1,[$1,nodo2,$3]);
		$$ = nodo;
	}
	| id id DIMENSION {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("PARAM",$1,@1,[nodo1,nodo2,$3]);
		$$ = nodo;
	}
	| TIPO puntero id {
		nodo2 = new Nodo('puntero',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("PARAM",$1,@1,[$1,nodo2,nodo3]);
		$$ = nodo;
	}
	| id puntero id {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('puntero',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("PARAM",$1,@1,[nodo1,nodo2,nodo3]);
		$$ = nodo;
	}
	| TIPO puntero id DIMENSION {
		nodo2 = new Nodo('puntero',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("PARAM",$1,@1,[$1,nodo2,nodo3,$4]);
		$$ = nodo;
	}
	| id puntero id DIMENSION {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('puntero',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("PARAM",$1,@1,[nodo1,nodo2,nodo3,$4]);
		$$ = nodo;
	};


CONSTRUCTOR : VISIBILIDAD id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo3 = new Nodo('id',$2,@2,[]);
		nodo4 = new Nodo('(',$3,@3,[]);
		nodo6 = new Nodo(')',$5,@5,[]);
		nodo7 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("CONSTRUCTOR",$1,@1,[$1,nodo3,nodo4,$4,nodo6,nodo7,$7,nodo8]);
		$$ = nodo;
	}
	| id '(' PARAMETRO ')' '{' INSTRUCCIONES '}'{ //9
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("CONSTRUCTOR",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	|VISIBILIDAD id '(' ')' '{' INSTRUCCIONES '}'{ //9
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('(',$3,@3,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("CONSTRUCTOR",$1,@1,[$1,nodo2,nodo3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	| id '(' ')' '{' INSTRUCCIONES '}'{ //9
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$3,@3,[]);
		nodo4 = new Nodo('{',$4,@4,[]);
		nodo6 = new Nodo('}',$6,@6,[]);
		nodo  = new Nodo("CONSTRUCTOR",$1,@1,[nodo1,nodo2,nodo3,nodo4,$5,nodo6]);
		$$ = nodo;
	};


LLAMADA	: id '(' VALOR ')' {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("LLAMADA",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	}
	|id '(' ')' {
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$3,@3,[]);
		nodo  = new Nodo("LLAMADA",$1,@1,[nodo1,nodo2,nodo3]);
		$$ = nodo;
	} 
	|este '.' LLAMADA {
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo  = new Nodo("LLAMADA",$1,@1,[nodo1,$2]);
		$$ = nodo;
	};
			
			
VALOR 	: VALOR ',' OP{
		nodo1 = new Nodo(',',$2,@2,[]);
		nodo  = new Nodo("VALOR",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
		| OP{
		nodo  = new Nodo("VALOR",$1,@1,[$1]);
		$$ = nodo;
	};

				
INSTANCIA	: INSTANCIA '.' LLAMADA{
		nodo1 = new Nodo('.',$2,@2,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| INSTANCIA '.' id{
		nodo1 = new Nodo('.',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[$1,nodo1,nodo2]);
		$$ = nodo;
	}
	| INSTANCIA '->' id{
		nodo1 = new Nodo('->',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[$1,nodo1,nodo2]);
		$$ = nodo;
	}
	| INSTANCIA '.' id DIMENSION{
		nodo1 = new Nodo('.',$2,@2,[]);
		nodo2 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[$1,nodo1,nodo2,$4]);
		$$ = nodo;
	}
	|'.' LLAMADA{
		nodo1 = new Nodo('.',$1,@1,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
	|'.' id{
		nodo1 = new Nodo('.',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	}
	| '->' id{
		nodo1 = new Nodo('->',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	}
	| '.' id DIMENSION{
		nodo1 = new Nodo('.',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo  = new Nodo("INSTANCIA",$1,@1,[nodo1,nodo2,$3]);
		$$ = nodo;
	};



FUNCIONES : id '.' tamanio { //3
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('=',$2,@2,[]);
		nodo3 = new Nodo('tamanio',$3,@3,[]);
		nodo  = new Nodo("FUNCIONES",$1,@1,[nodo1,nodo2,nodo3]);
		$$ = nodo;
	}
	|convertiracadena '(' OP ')'{ //3
		nodo1 = new Nodo('convertiracadena',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("FUNCIONES",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	}
	|convertiraentero '(' OP ')'{ //3
		nodo1 = new Nodo('convertiraentero',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("FUNCIONES",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


CONCATENAR : concatenar '(' id ',' OP ',' OP ')' ';'{ //8
		nodo1 = new Nodo('concatenar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(',',$4,@4,[]);
		nodo6 = new Nodo(',',$6,@6,[]);
		nodo8 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("CONCATENAR",$1,@1,[nodo1,nodo2,nodo3,nodo4,$5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	|concatenar '(' id ',' OP ')' ';'{ //6
		nodo1 = new Nodo('concatenar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(',',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("CONCATENAR",$1,@1,[nodo1,nodo2,nodo3,nodo4,$5,nodo6]);
		$$ = nodo;
	}
	|concatenar '(' este '.' id ',' OP ',' OP ')' ';'{ //10
		nodo1 = new Nodo('concatenar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('este',$3,@3,[]);
		nodo4 = new Nodo('.',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(',',$6,@6,[]);
		nodo8 = new Nodo(',',$8,@8,[]);
		nodo10 = new Nodo(')',$10,@10,[]);
		nodo  = new Nodo("CONCATENAR",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5,nodo6,$7,nodo8,$9,nodo10]);
		$$ = nodo;
	}
	|concatenar '('  este '.' id ',' OP ')' ';'{ //8
		nodo1 = new Nodo('concatenar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('este',$3,@3,[]);
		nodo4 = new Nodo('.',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(',',$6,@6,[]);
		nodo8 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("CONCATENAR",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	|concatenar '(' id INSTANCIA ',' OP ',' OP ')' ';'{ //9
		nodo1 = new Nodo('concatenar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo5 = new Nodo(',',$5,@5,[]);
		nodo7 = new Nodo(',',$7,@7,[]);
		nodo9 = new Nodo(')',$9,@9,[]);
		nodo  = new Nodo("CONCATENAR",$1,@1,[nodo1,nodo2,nodo3,$4,nodo5,$6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	|concatenar '(' id INSTANCIA ',' OP ')' ';'{ //7
		nodo1 = new Nodo('concatenar',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo5 = new Nodo(',',$5,@5,[]);
		nodo7 = new Nodo(')',$7,@7,[]);
		nodo  = new Nodo("CONCATENAR",$1,@1,[nodo1,nodo2,nodo3,$4,nodo5,$6,nodo7]);
		$$ = nodo;
	};


IMPRIMIR : imprimir '(' OP ')' ';'{ //6
		nodo1 = new Nodo('imprimir',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("IMPRIMIR",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


ESTRUCTURA : estructura id '[' INSTRUCCIONES ']' ';'{ //6
		nodo1 = new Nodo('estructura',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('[',$3,@3,[]);
		nodo5 = new Nodo(']',$5,@5,[]);
		nodo  = new Nodo("ESTRUCTURA",$1,@1,[nodo1,nodo2,nodo3,$4,nodo5]);
		$$ = nodo;
	};


PUNTEROS : crearPuntero '(' TIPO ',' id ')' ASIGNAR ';'{ //6
		nodo1 = new Nodo('crearPuntero',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(',',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("PUNTEROS",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,nodo6,$7]);
		$$ = nodo;
	}
	|crearPuntero '(' id ',' id ')' ASIGNAR ';'{ //6
		nodo1 = new Nodo('crearPuntero',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(',',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("PUNTEROS",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5,nodo6,$7]);
		$$ = nodo;
	}
	|destruirPuntero '(' id ')' ';'{ //6
		nodo1 = new Nodo('crearPuntero',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("PUNTEROS",$1,@1,[nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	};


MEMORIA : obtenerDireccion '(' id ')' { //6
		nodo1 = new Nodo('obtenerDireccion',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("MEMORIA",$1,@1,[nodo1,nodo2,nodo3,nodo4]);
		$$ = nodo;
	}
	| obtenerDireccion '(' este '.' id ')' { //6
		nodo1 = new Nodo('obtenerDireccion',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('este',$3,@3,[]);
		nodo4 = new Nodo('.',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("MEMORIA",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5,nodo6]);
		$$ = nodo;
	}
	|reservarMemoria '(' OP ')' { //6
		nodo1 = new Nodo('reservarMemoria',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("MEMORIA",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	}
	|consultarTamanio '(' OP ')' { //6
		nodo1 = new Nodo('consultarTamanio',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo  = new Nodo("MEMORIA",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


FUNCION_EDD	: id '.' OPCION_EDD '(' OP ')' { 
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("FUNCION_EDD",$1,@1,[nodo1,nodo2,$3,nodo4,$5,nodo6]);
		$$ = nodo;
	}
	| id '.' OPCION_EDD '(' ')' { //2
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('insertar',$3,@3,[]);
		nodo4 = new Nodo('(',$4,@4,[]);
		nodo5 = new Nodo(')',$5,@5,[]);
		nodo  = new Nodo("FUNCION_EDD",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5]);
		$$ = nodo;
	};


OPCION_EDD  : insertar {
		nodo1 = new Nodo('insertar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|obtener {
		nodo1 = new Nodo('obtener',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|buscar {
		nodo1 = new Nodo('buscar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|apilar {
		nodo1 = new Nodo('apilar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|desapilar {
		nodo1 = new Nodo('desapilar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|encolar {
		nodo1 = new Nodo('encolar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|desencolar {
		nodo1 = new Nodo('desencolar',$1,@1,[]);
		nodo  = new Nodo("OPCION_EDD",$1,@1,[nodo1]);
		$$ = nodo;
	};


SI	: si '(' OP ')' OPCION_SI finsi { //8
		nodo1 = new Nodo('si',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(')',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("SI",$1,@1,[nodo1,nodo2,$3,nodo3,$5,nodo6]);
		$$ = nodo;
	};


OPCION_SI : esverdadero '{' INSTRUCCIONES '}' esfalso '{' INSTRUCCIONES '}' { //8
		nodo1 = new Nodo('esverdadero',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo4 = new Nodo('}',$4,@4,[]);
		nodo5 = new Nodo('esfalso',$5,@5,[]);
		nodo6 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("OPCION_SI",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	| esfalso '{' INSTRUCCIONES '}' esverdadero '{' INSTRUCCIONES '}' { //8
		nodo1 = new Nodo('esfalso',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo4 = new Nodo('}',$4,@4,[]);
		nodo5 = new Nodo('esverdadero',$5,@5,[]);
		nodo6 = new Nodo('{',$6,@6,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("OPCION_SI",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	| esverdadero '{' INSTRUCCIONES '}' { //8
		nodo1 = new Nodo('esverdadero',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo4 = new Nodo('}',$4,@4,[]);
		nodo  = new Nodo("OPCION_SI",$1,@1,[nodo1,nodo2,$3,nodo4]);
		$$ = nodo;
	};


SWITCH	: evaluarsi '(' OP ')' '{' CASO '}'{
		nodo1 = new Nodo('evaluarsi',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("SWITCH",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	| evaluarsi '(' OP ')' '{' DEFECTO '}'{
		nodo1 = new Nodo('evaluarsi',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("SWITCH",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	| evaluarsi '(' OP ')' '{' CASO DEFECTO '}'{
		nodo1 = new Nodo('evaluarsi',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo8 = new Nodo('}',$8,@8,[]);
		nodo  = new Nodo("SWITCH",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,$7,nodo8]);
		$$ = nodo;
	};


CASO 	: CASO esiguala OP ':' INSTRUCCIONES{
		nodo1 = new Nodo('esiguala',$2,@2,[]);
		nodo4 = new Nodo(':',$4,@4,[]);
		nodo  = new Nodo("CASO",$1,@1,[$1,nodo1,$3,nodo4,$5]);
		$$ = nodo;
	}
	| esiguala OP ':' INSTRUCCIONES{
		nodo1 = new Nodo('esiguala',$1,@1,[]);
		nodo4 = new Nodo(':',$3,@3,[]);
		nodo  = new Nodo("CASO",$1,@1,[nodo1,$2,nodo4,$4]);
		$$ = nodo;
	};
		

DEFECTO	: defecto ':' INSTRUCCIONES{
		nodo1 = new Nodo('defecto',$1,@1,[]);
		nodo2 = new Nodo(':',$2,@2,[]);
		nodo  = new Nodo("DEFECTO",$1,@1,[nodo1,nodo2,$3]);
		$$ = nodo;
	};


CICLO 	: repetirmientras '(' OP ')' '{' INSTRUCCIONES'}'{ //7
		nodo1 = new Nodo('repetirmientras',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo7 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo7]);
		$$ = nodo;
	}
	| hacer '{' INSTRUCCIONES '}' mientras '(' OP ')' ';'{ //8
		nodo1 = new Nodo('hacer',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo4 = new Nodo('}',$4,@4,[]);
		nodo5 = new Nodo('mientras',$5,@5,[]);
		nodo6 = new Nodo('(',$6,@6,[]);
		nodo8 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,nodo6,$7,nodo8]);
		$$ = nodo;
	}
	| repetir '{' INSTRUCCIONES'}' hastaque '(' OP ')' ';'{ //9
		nodo1 = new Nodo('repetir',$1,@1,[]);
		nodo2 = new Nodo('{',$2,@2,[]);
		nodo3 = new Nodo('}',$4,@4,[]);
		nodo4 = new Nodo('hastaque',$5,@5,[]);
		nodo5 = new Nodo('(',$6,@6,[]);
		nodo8 = new Nodo(')',$8,@8,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,$3,nodo3,nodo4,nodo5,$7,nodo8]);
		$$ = nodo;
	}
	| ciclodoble '(' OP "," OP ')' '{' INSTRUCCIONES '}' { //10
		nodo1 = new Nodo('ciclodoble',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(',',$4,@4,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo7 = new Nodo('{',$7,@7,[]);
		nodo9 = new Nodo('}',$9,@9,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,$3,nodo4,$5,nodo6,nodo7,$8,nodo9]);
		$$ = nodo;
	}
	| enciclar id '{' INSTRUCCIONES '}'{ //5
		nodo1 = new Nodo('enciclar',$1,@1,[]);
		nodo2 = new Nodo('id',$2,@2,[]);
		nodo3 = new Nodo('{',$3,@3,[]);
		nodo4 = new Nodo('}',$5,@5,[]);
		nodo  = new Nodo("CICLO",$1,@1,[nodo1,nodo2,nodo3,$4,nodo4]);
		$$ = nodo;
	};

FOR 	: repetircontando '(' variable ':' id ';' desde ':' OP ';' hasta ':' OP ')' '{' INSTRUCCIONES'}'{ //5//9//13//16
		nodo1 = new Nodo('repetircontando',$1,@1,[]); nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo('variable',$3,@3,[]); nodo4 = new Nodo('id',$5,@5,[]);
		nodo5 = new Nodo(';',$5,@5,[]); nodo6 = new Nodo('desde',$6,@6,[]);
		nodo8 = new Nodo(';',$8,@8,[]); nodo9 = new Nodo('hasta',$9,@9,[]);
		nodo11 = new Nodo(')',$11,@11,[]);
		nodo  = new Nodo("FOR",$1,@1,[nodo1,nodo2,nodo3,nodo4,nodo5,nodo6, $9,nodo8,nodo9,$13,nodo11,$16]);
		$$ = nodo;
	}
	| contador '(' OP ')' '{' INSTRUCCIONES'}'{//7
		nodo1 = new Nodo('contador',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo4 = new Nodo(')',$4,@4,[]);
		nodo5 = new Nodo('{',$5,@5,[]);
		nodo6 = new Nodo('}',$7,@7,[]);
		nodo  = new Nodo("FOR",$1,@1,[nodo1,nodo2,$3,nodo4,nodo5,$6,nodo6]);
		$$ = nodo;
	};


TECLADO : leerteclado '(' OP "," id ')' ';'{ //10
		nodo1 = new Nodo('leerteclado',$1,@1,[]);
		nodo2 = new Nodo('(',$2,@2,[]);
		nodo3 = new Nodo(',',$4,@4,[]);
		nodo5 = new Nodo('id',$5,@5,[]);
		nodo6 = new Nodo(')',$6,@6,[]);
		nodo  = new Nodo("TECLADO",$1,@1,[nodo1,nodo2,$3,nodo3,nodo5,nodo6]);
		$$ = nodo;
	};








OP: E { 
		nodo  = new Nodo("OP",$1,@1,[$1]);
		$$ = nodo;
		//console.log("Expresion"); 
	};


E   : '(' E ')'{
		nodo1 = new Nodo('(',$1,@1,[]);
		nodo2 = new Nodo(')',$3,@3,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,$2,nodo2]);
		$$ = nodo;
	}
    | E '+' E{
		nodo1 = new Nodo('+',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '-' E{
		nodo1 = new Nodo('-',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '*' E{
		nodo1 = new Nodo('*',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '/' E{
		nodo1 = new Nodo('/',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '^' E{
		nodo1 = new Nodo('^',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | '!' E{
		nodo1 = new Nodo('!',$1,@1,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}
    | '-' E %prec UMINUS{
		nodo1 = new Nodo('-',$1,@1,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,$2]);
		$$ = nodo;
	} 
    | E '>=' E{
		nodo1 = new Nodo('>=',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '<=' E{
		nodo1 = new Nodo('<=',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '==' E{
		nodo1 = new Nodo('==',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '!=' E{
		nodo1 = new Nodo('!=',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '>' E{
		nodo1 = new Nodo('>',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '<' E{
		nodo1 = new Nodo('<',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '||' E{
		nodo1 = new Nodo('||',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '&&' E{
		nodo1 = new Nodo('&&',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
    | E '??' E{
		nodo1 = new Nodo('??',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1,$3]);
		$$ = nodo;
	}
	| verdadero{
		nodo1 = new Nodo("verdadero",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
	| falso{
		nodo1 = new Nodo("falso",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
	| E '++'{
		nodo1 = new Nodo('++',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1]);
		$$ = nodo;
	}
	| E '--'{
		nodo1 = new Nodo('--',$2,@2,[]);
		nodo  = new Nodo("E",$1,@1,[$1,nodo1]);
		$$ = nodo;
	}
    | numEntero{
		nodo1 = new Nodo("entero",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
	| numDecimal{
		nodo1 = new Nodo("decimal",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}
    | id {
		nodo1 = new Nodo("id",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
    | cadenaDoble{
		nodo1 = new Nodo("cadenaDoble",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}	
    | cadenaSimple{
		nodo1 = new Nodo("cadenaSimple",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| nada{
		nodo1 = new Nodo("nada",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| nulo{
		nodo1 = new Nodo("nulo",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1]);
		$$ = nodo;
	}
	| este '.' id { //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,nodo2,nodo3,nodo1]);
		$$ = nodo;
	}
	| este '.' id INSTANCIA{ //3
		nodo1 = new Nodo('este',$1,@1,[]);
		nodo2 = new Nodo('.',$2,@2,[]);
		nodo3 = new Nodo('id',$3,@3,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,nodo2,nodo3,$4]);
		$$ = nodo;
	}
 	| FUNCIONES {
		nodo	= new Nodo("E",$1,@1,[$1]);
		$$ = nodo;
	}
	| LLAMADA {
		nodo	= new Nodo("E",$1,@1,[$1]);
		$$ = nodo;
	}
	| CONCATENAR {
		nodo	= new Nodo("E",$1,@1,[$1]);
		$$ = nodo;
	}
	| MEMORIA {
		nodo	= new Nodo("E",$1,@1,[$1]);
		$$ = nodo;
	}
	| id INSTANCIA {
		nodo1 = new Nodo("id",$1,@1,[]);
		nodo	= new Nodo("E",$1,@1,[nodo1,$2]);
		$$ = nodo;
	}	
	| id DIMENSION { 
		nodo1 = new Nodo('id',$1,@1,[]);
		nodo  = new Nodo("E",$1,@1,[nodo1,$2]);
		$$ = nodo;
	};


			
%%

function Nodo(nombre, token, posicion, hijos){
	this.nombre = nombre;
	this.token = token;
	this.posicion = posicion;
	this.hijos = hijos;	
}

parser.arbol = {
	raiz:null
};