
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




function compilar(raiz)
{
    var entornoGlobal = new Entorno(null);    
    iniciarVariables();    
    raiz.forEach(element => 
    {
            element.generarCodigo(entornoGlobal);
    });
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
    var resultados = [];
    resultados.push(lista3D);
    resultados.push(listaErrores);
    entornoGlobal.imprimir();

    return resultados;
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


var Entorno = function(anterior)
{   
    var self = this;
    self.anterior = anterior;
    self.tablaSimbolos = {};// :3
    self.contador = 2;

    self.addSimbolo = function(simbolo)
    {        
        if(self.tablaSimbolos[simbolo.id] == null)
        {
            simbolo.posicion = self.contador++;
            self.tablaSimbolos[simbolo.id] = simbolo;
        }    
        else
        {
            listaErrores.push("La variable "+simbolo.id +" ya existe en la tabla de símbolos");
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
        listaErrores.push("La variable "+id +" no existe en la tabla de símbolos");
        return null;
    };

    self.imprimir = function()
    {
        var entornoActual = self;
        while(entornoActual !=null)
        {            
            Object.keys(entornoActual.tablaSimbolos).forEach(function(key) {
                console.log(key, entornoActual.tablaSimbolos[key]);
            });            
            entornoActual = entornoActual.anterior;
            console.log("-------------------------------------------> Entorno");
        }                
        return null;        
    }
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
        //function(linea, columna, id, tipo, rol, valor)
        entorno.addSimbolo(new Simbolo(linea,columna,id,tipo,0,0));
        var simbolo = entorno.buscarSimbolo(self.id);
        var posicion = generarTemporal();
        lista3D.push(posicion + " = p + "+ simbolo.posicion + ";\t// Posicion relativa de la variable " + self.id);        
        var result = self.expresion.generarCodigo(entorno);   
        if(result !=null)
        {
            lista3D.push("stack["+posicion+"] = "+result.valor + ";\t// Asignandole el valor a la variable " +self.id);
            return;
        }        
        //listaErrores.push("Error");
        console.error("Error linea:\t "+self.linea +"\tcolumna:\t"+self.columna);
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
                    listaErrores.push("Error de tipos al tratar de asignar un valor " + expresion.tipo + ", se esperaba " + simbolo.tipo + " linea: "+ self.linea);
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
                    case "boolean":
                    case "int":
                        lista3D.push(etiqueta + " = " + vali.valor + " + " + vald.valor+";");
                        return new Resultado(self.linea, self.columna, etiqueta, "", "int");
                    break;
                    case "double":
                        lista3D.push(etiqueta + " = " + vali.valor + " + " + vald.valor+";");
                        return new Resultado(self.linea, self.columna, etiqueta, "", "double");
                    break;                    
                    default:                
                        listaErrores.push("Error de tipos " + vali.tipo+ " + "+vald.tipo+ " linea: "+linea + " columna: "+columna);
                        return;
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
                        return new Resultado(self.linea, self.columna, tmp7, "", "string");                        
                    break;
                }
            break;

        }        
        console.log("Error en operación (+) tipos incopatibles:  Tipo1: "+vali.tipo  + " \tTipo2: "+ vald.tipo);
        return null;
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
            lista3D.push("h = h + 1;");                                     
        }
        lista3D.push("heap[h] = " +nulo + ";\t// Fin de cadena");
        lista3D.push("h = h + 1;"); 
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
        var tmp2 = generarTemporal(); // Dirección de inicio de la cadena
        var tmp3 = generarTemporal(); // Dirección del parametro de tipo de impresión      
        lista3D.push(tmp1 + " = p + " +entorno.contador + "; // Simulacion de cambio de ambito");
        lista3D.push(tmp2 + " = "+  tmp1 + " + 0 ; // Posicion inicio de cadena");
        //console.log("Tipo del resultado --impresion " + resultado.tipo);
        if(resultado.tipo=="string")
        {
            lista3D.push("stack["+tmp2+"] = "+  resultado.valor + ";// Paso por referencia del inicio de cadena");
        }else
        //if(resultado.tipo==1)
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
        console.log("Buscando la variable "+self.id);
        var simbolo = entorno.buscarSimbolo(self.id); 
        console.log("Id: "+ simbolo.id + "\tTipo: "+simbolo.tipo); 
        if(simbolo !=  null)
        {
            lista3D.push(tmp1 + " = p + "+ simbolo.posicion + "; // Posicion local "+id);
            lista3D.push(tmp2 + " = stack["+tmp1 +"] ; // Valor de "+id);                  
            if(simbolo.tipo == "string")
            {
                var tmp3 = generarTemporal();
                lista3D.push(tmp3 + " = stack["+tmp2 +"] ; // Direccion en el heap");
                var resultado = new Resultado(self.linea, self.columna, tmp3, tmp2, self.tipo);
                resultado.flag = 0;
                return resultado;        
            }
            else 
            if(simbolo.tipo == "int")
            {
                var resultado = new Resultado(self.linea, self.columna, tmp2, tmp1, self.tipo);
                resultado.flag = 1;
                return resultado;        
            }
            else 
            if(simbolo.tipo == "double")
            {
                var resultado = new Resultado(self.linea, self.columna, tmp2, tmp1, self.tipo);
                resultado.flag = 2;
                return resultado;        
            }  
            else
            if(simbolo.tipo == "boolean")
            {
                var resultado = new Resultado(self.linea, self.columna, tmp2, tmp1, self.tipo);
                resultado.flag = 2;
                return resultado;        
            }
        }
        console.log("No se ha encontrado la variable "+ self.id);
              
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


%left '+' '-'
%left '*' '/' '%'
%left 'pow'
%left '(' ')'
%left UMINUS
%left '||'
%left '=' 
%left '==' '!=' '>' '>=' '<' '<='
/*%left '+=' '-=' '*=' '/=' */
%left '&&'
%left '^'
%left '++' '--'
%right '!'


%error-verbose

%start INICIO

%% 

INICIO : LINSTRUCCIONES EOF
    {   
        return compilar($1);
    }     
;

LINSTRUCCIONES : LINSTRUCCIONES INSTRUCCION { $$ =$1 ; $$.push($2);}
                |INSTRUCCION { $$ = []; $$.push($1);}

;                            

INSTRUCCION: 
         ASIGNACION{$$=$1;}
        |DECLARACION{$$=$1;}
        |IMPRESION {$$=$1;} 
        |error
;

IMPRESION: 'println' + '(' + EXP + ')' + '; '
    {
        $$ = new Impresion(@1.first_line, @1.first_column, $3);
    }
;
DECLARACION: TIPO id '=' EXP ';' 
    {
        $$ = new Declaracion(@1.first_line,@1.first_column,$1,$2,$4);
        //function(linea, columna, tipo, id, exp)
    }
;

TIPO: 'int'{$$=$1}
    | 'double'{$$=$1}
    | 'string'{$$=$1}
    | 'boolean'{$$=$1}
    | 'char'{$$=$1}
    | id {$$=$1}
;
ASIGNACION : id '=' EXP ';' 
    {
        //lista3D.push("asignacion");
        $$ = new  Asignacion(@1.first_line, @1.first_column, $1, $3);
    }
;

EXP : 
	EXP '+' EXP 
		{
			$$ = new Suma(@1.first_line, @1.first_column, $1, $3);
		}
    | entero 
    	{ 
			$$ = new ExpInt(@1.first_line, @1.first_column, $1);
        }
    | decimal 
    	{ 
			$$ = new Expdecimal(@1.first_line, @1.first_column, $1);
        }        
    | texto
        {            
            $$ = new ExpString(@1.first_line, @1.first_column, $1.substring(1,$1.length-1));
        }        
    | textosimple
        {
            $$ = new ExpChar(@1.first_line, @1.first_column, $1[1]);
        }
    | verdadero
        {
            $$ = new ExpBoolean(@1.first_line, @1.first_column, 1);
        }        
    | falso
        {
            $$ = new ExpBoolean(@1.first_line, @1.first_column, 0);
        } 
    | id
    {
        $$ = new ExpId(@1.first_line, @1.first_column, $1);
    }                       
;