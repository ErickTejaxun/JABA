
/* lexical grammar */
%{
var p = 0;
var h = 0;
var nulo = 201213050*7;
var stack = {};
var heap = {};
var temporales = {};
var salidas = [];
var metodos = {};




function compilar(raiz)
{       
    /*Primero los metodos */
    raiz.forEach(element => 
    {
        if(element instanceof Metodo)
        {
            element.ejecutar();
        }            
    });  
    /*Ejecucion*/
    raiz.forEach(element => 
        {
            if(element instanceof Metodo)
            { 
                ////console.log("ya");                         
            }            
            else
            {
                element.ejecutar();
            }
        });  
    //console.log("------------Consola de salida--------------");
    var salida="";
    salidas.forEach(item =>
    {
        salida+=item; 
    });
    //console.log(salida);
    //console.log(stack);
    //console.log(heap);
    ////console.log(temporales);
}

var CleanScope = function(linea, columna, i ,t)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.inicio = i;
    self.tamano = t;
    self.ejecutar = function()
    {

    }
};




var Resultado = function(linea, columna, valor)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = valor;
    self.etiqueta = "";
};


var Llamada = function(linea, columna, id)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna; 
    self.id = id;             
    self.ejecutar = function()
    {                                 
        ////console.log("Buscando metodo " + self.id);                
        var metodo = metodos[self.id];                
        if(metodo != null)
        {
            ////console.log(metodo);            
            metodo.ejecutar2();
        }
    }    
};

var Asignacion = function(linea, columna, id, valor)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.id = id ;
    self.valor = valor;
    self.ejecutar = function()
    {          
        
        if(self.valor == null)
        {
            ////console.log("Temporal\t" +self.id+"\tlinea:"+self.linea +" columna:"+ self.columna); 
            ////console.log(self);      
            return;
        }  
        else
        {
            var resultado = self.valor.ejecutar();  
            if(self.valor instanceof ExpStack)
            {
                ////console.log("expstack    "+resultado.valor);
            }                       
            switch(self.id)
            {
                case "p":
                    p = resultado.valor;
                break;
                case "h":
                    h  = resultado.valor;
                break;
                default:
                    temporales[self.id] = resultado.valor;
                break;
            }

        }            
    }
};

var AsignacionHeap = function(linea, columna, id, valor)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.id = id ;
    self.valor = valor;
    self.ejecutar = function()
    {
        var resultado = self.valor.ejecutar();
        var posicion = self.id.ejecutar();
        heap[posicion.valor] = resultado.valor;
    }
};
var AsignacionStack = function(linea, columna, id, valor)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.id = id ;
    self.valor = valor;
    self.ejecutar = function()
    {
        var resultado = self.valor.ejecutar();
        var posicion = self.id.ejecutar();
        ////console.log("["+posicion.valor+"] = "+resultado.valor);
        stack[posicion.valor] = resultado.valor;
    }
};

var Suma = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;
    self.ejecutar = function()
    {
        var ri = self.operandoI.ejecutar();
        var rd = self.operandoD.ejecutar();
        var resultado = new Resultado(self.linea, self.columna, ri.valor + rd.valor);              
        return resultado;        
    }    
};

var Multiplicacion = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;
    self.ejecutar = function()
    {
        var ri = self.operandoI.ejecutar();
        var rd = self.operandoD.ejecutar();
        var resultado = new Resultado(self.linea, self.columna, ri.valor * rd.valor);              
        return resultado;        
    }    
};

var Division = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;
    self.ejecutar = function()
    {
        var ri = self.operandoI.ejecutar();
        var rd = self.operandoD.ejecutar();
        var resultado = new Resultado(self.linea, self.columna, ri.valor / rd.valor);              
        return resultado;        
    }    
};

var Resta = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;
    self.ejecutar = function()
    {
        var ri = self.operandoI.ejecutar();
        var rd = self.operandoD.ejecutar();
        var resultado = new Resultado(self.linea, self.columna, ri.valor - rd.valor);              
        return resultado;        
    }    
};

var Modulo = function(linea, columna, i, d)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.operandoI = i;
    self.operandoD = d;
    self.ejecutar = function()
    {
        var ri = self.operandoI.ejecutar();
        var rd = self.operandoD.ejecutar();
        var resultado = new Resultado(self.linea, self.columna, ri.valor % rd.valor);              
        return resultado;        
    }    
};

var ExpInt = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v;        
    self.ejecutar = function()
    {                         
        var resultado = new Resultado(self.linea, self.columna, self.valor);              
        return resultado;
    }    
};

var ExpDecimal = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v;           
    self.ejecutar = function()
    {                                                 
        var resultado = new Resultado(self.linea, self.columna, self.valor);              
        return resultado;
    }    
};

var ExpTemporal = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v;           
    self.ejecutar = function()
    {                                                 
        var valor = temporales[self.valor];
        var resultado = new Resultado(self.linea, self.columna, valor );              
        return resultado;
    }    
};

var ExpH = function(linea, columna)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;                
    self.ejecutar = function()
    {                                                 
        var valor = h;
        ////console.log("valor h:"+valor);
        var resultado = new Resultado(self.linea, self.columna, valor );              
        return resultado;
    }    
};

var ExpP = function(linea, columna)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;              
    self.ejecutar = function()
    {                                                 
        var valor = p;
        var resultado = new Resultado(self.linea, self.columna, valor );              
        return resultado;
    }    
};

var ExpStack = function(linea, columna, p)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.posicion = p;
    self.ejecutar = function()
    {
        var tmp = self.posicion.ejecutar();     
        var tmp1 = stack[tmp.valor];
        //console.log("stack["+tmp.valor+"] = "+tmp1);       
        var resultado = new Resultado(self.linea, self.columna, tmp1,0,0);              
        return resultado;        
    }
};

var ExpHeap = function(linea, columna, p)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.posicion = p;
    self.ejecutar = function()
    {
        var tmp = self.posicion.ejecutar();
        var resultado = new Resultado(self.linea, self.columna, heap[tmp.valor]);              
        return resultado;        
    }
};

var Metodo = function(linea, columna, id, li)
{
    var self = this;
    self.linea = linea;
    self.columna = columna ;
    self.id = id;
    self.instrucciones = li;

    self.ejecutar = function()
    {
        metodos[self.id] = self;        
    }

    self.ejecutar2 = function()
    {        
        var i = 0;
        var element ;
        //console.log("Ejecutando la funcion "+self.id+ "\tInstrucciones: "+self.instrucciones.length);
        for(i = 0 ; i  < self.instrucciones.length; i++)
        {            
            element = self.instrucciones[i];                              
            var resultado;
            if(element instanceof Salto)
            { 
                var etiqueta = element.destino;
                //console.log(i+") goto \t" +etiqueta);
                var j =0;
                
                for(j=0 ; j< self.instrucciones.length; j++)
                {                       
                    if(self.instrucciones[j] instanceof Etiqueta)
                    {
                        //console.log(self.instrucciones[j].destino+ "== "+etiqueta);
                        if( self.instrucciones[j].destino == etiqueta)
                        {                            
                            i =  j ;                            
                            break;
                        }
                    }
                }

            }            
            else
            if(element instanceof SaltoCondicional)
            {
                var etiqueta = element.ejecutar()
                //console.log(i +") goto if  \t"+ element.destino);                
                if(etiqueta.valor != "")
                {
                    var j =0;
                    for(j=0 ; j< self.instrucciones.length; j++)
                    {                       
                        if(self.instrucciones[j] instanceof Etiqueta)
                        {
                            if( self.instrucciones[j].destino == etiqueta.valor)
                            {
                                i = j;
                                break;
                            }
                        }
                    }   
                }                                      
            }
            else
            if(element instanceof SaltoCondicionalI)
            {
                var etiqueta = element.ejecutar()
                ////console.log("etiqueta" +etiqueta.valor);
                if(etiqueta.valor != "")
                {
                    var j =0;
                    for(j=0 ; j< self.instrucciones.length; j++)
                    {                       
                        if(self.instrucciones[j] instanceof Etiqueta)
                        {
                            if( self.instrucciones[j].destino == etiqueta.valor)
                            {
                                i = j;
                                break;
                            }
                        }
                    }   
                }                
            }            
            else
            {                
                //console.log(i+") "+element.id);                
                element.ejecutar();
            }
        }
    }
};

var Salto = function(linea, columna, d)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.destino = d;
    self.ejecutar = function()
    {

    }
};

var SaltoCondicional = function(linea, columna, condicion, destino)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.condicion = condicion;
    self.destino = destino;
    self.ejecutar = function()
    {
        var condicional = self.condicion.ejecutar();        
        if(condicional.valor)
        {
            ////console.log("Hay que saltar a "+ self.destino);
            var resultado = new Resultado(self.linea, self.columna, self.destino);              
            return resultado;            
        }
        var resultado = new Resultado(self.linea, self.columna, "");              
        return resultado;            
    }
}
;

var SaltoCondicionalI = function(linea, columna, condicion, destino)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.condicion = condicion;
    self.destino = destino;
    self.ejecutar = function()
    {
        var condicional = self.condicion.ejecutar();
        if(!condicional.valor)
        {
            var resultado = new Resultado(self.linea, self.columna, self.destino);              
            return resultado;            
        }
        var resultado = new Resultado(self.linea, self.columna, "");              
        return resultado;           
    }
}
;

var Etiqueta = function(linea, columna, id)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.destino = id;
    self.ejecutar = function()
    {
        var resultado = new Resultado(self.linea, self.columna, self.destino);              
        return resultado;           
    }
};



var Igual = function(linea, columna, i, d)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.izquiera = i;
    self.derecha = d;
    self.ejecutar = function()
    {
        var valori = self.izquiera.ejecutar();
        var valord = self.derecha.ejecutar();
        ////console.log(valori.valor+"=="+valord.valor);
        if(valori.valor == valord.valor)
        {
            var resultado = new Resultado(self.linea, self.columna, true);              
            return resultado;             
        }
        var resultado = new Resultado(self.linea, self.columna, false);              
        return resultado;             
    }
}


var Desigual = function(linea, columna, i, d)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.izquiera = i;
    self.derecha = d;
    self.ejecutar = function()
    {
        var valori = self.izquiera.ejecutar();
        var valord = self.derecha.ejecutar();
        //console.log(valori.valor + "!=" + valord.valor);
        if(valori.valor != valord.valor)
        {
            var resultado = new Resultado(self.linea, self.columna, true);              
            return resultado;             
        }
        var resultado = new Resultado(self.linea, self.columna, false);              
        return resultado;             
    }
}


var Mayor = function(linea, columna, i, d)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.izquiera = i;
    self.derecha = d;
    self.ejecutar = function()
    {
        var valori = self.izquiera.ejecutar();
        var valord = self.derecha.ejecutar();
        if(valori.valor > valord.valor)
        {
            var resultado = new Resultado(self.linea, self.columna, true);              
            return resultado;             
        }
        var resultado = new Resultado(self.linea, self.columna, false);              
        return resultado;             
    }
}

var Menor = function(linea, columna, i, d)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.izquiera = i;
    self.derecha = d;
    self.ejecutar = function()
    {
        var valori = self.izquiera.ejecutar();
        var valord = self.derecha.ejecutar();
        if(valori.valor < valord.valor)
        {
            var resultado = new Resultado(self.linea, self.columna, true);              
            return resultado;             
        }
        var resultado = new Resultado(self.linea, self.columna, false);              
        return resultado;             
    }
}


var MenorIgual = function(linea, columna, i, d)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.izquiera = i;
    self.derecha = d;
    self.ejecutar = function()
    {
        var valori = self.izquiera.ejecutar();
        var valord = self.derecha.ejecutar();
        if(valori.valor <= valord.valor)
        {
            var resultado = new Resultado(self.linea, self.columna, true);              
            return resultado;             
        }
        var resultado = new Resultado(self.linea, self.columna, false);              
        return resultado;             
    }
}

var MayorIgual = function(linea, columna, i, d)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.izquiera = i;
    self.derecha = d;
    self.ejecutar = function()
    {
        var valori = self.izquiera.ejecutar();
        var valord = self.derecha.ejecutar();        
        if(valori.valor >= valord.valor)
        {
            var resultado = new Resultado(self.linea, self.columna, true);              
            return resultado;             
        }
        var resultado = new Resultado(self.linea, self.columna, false);              
        return resultado;             
    }
}

var Imprimir = function(linea, columna, modo, temporal)
{
    var self = this;
    self.linea = linea;
    self.columna = columna ;
    self.modo = modo;
    self.temporal = temporal;
    self.ejecutar = function()
    {        
        //console.log(stack);        
        var valor = temporales[self.temporal];                
        switch(self.modo)
        {
            case "i":
                salidas.push(parseInt(valor));
            break;
            case "c":
                salidas.push(String.fromCharCode(parseInt(valor)));
            break;
            case "d":
                var residuo = valor % 1;                
                if(residuo!=0)
                {                    
                    salidas.push(parseFloat(valor));
                }
                else
                {                    
                    salidas.push(parseFloat(valor)+".00");
                }                
            break;                        
        }
    }
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

var iniciarP = function(linea, columna, valor)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = valor;
    self.ejecutar = function()
    {        
        var resultado = self.valor.ejecutar();
        p = resultado.valor;
        //console.log("Iniciando p:"+p);
    }
}

var iniciarH = function(linea, columna, valor)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = valor;
    self.ejecutar = function()
    {
        var resultado = self.valor.ejecutar();
        h = resultado.valor;
        //console.log("Iniciando h:"+h);
    }
}

var iniciarHeap = function(linea, columna)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;    
    self.ejecutar = function()
    {
        heap = {};        
        //console.log("Iniciando heap "+heap);
    }
}

var iniciarStack = function(linea, columna)
{
    var self = this;
    self.linea = linea;
    self.columna = columna;    
    self.ejecutar = function()
    {
        stack = {};
        //console.log("Iniciando Stack "+stack);
    }
}


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
"//"(.)*              /*IGNORAR*/;
"t"[0-9]+\b           return 'temporal'
"L"[0-9]+\b           return 'etiqueta';
"\"%c\""                   return 'charmode'
"\"%e\""                   return 'intmode'
"\"%d\""                   return 'decimalmode'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"%"                   return '%'
":"                   return ':'
";"                   return ';'
","                   return ','
"!="                   return '!='
"=="                   return '=='
">="                   return '>='
"<="                   return '<='
"="                   return '='
">"                   return '>'
"<"                   return '<'
"["                   return '['
"]"                   return ']'
"("                   return '('
")"                   return ')'
"{"                   return '{'
"}"                   return '}'
"var"                   return 'var'
"call"                   return 'call'
"proc"                   return 'proc'
"begin"                   return 'begin'
"end"                   return 'end'
"$$_clean_scope"                   return 'clean'
"p"                   %{ /*//console.log(yytext);*/return 'p'; %}
"h"                   %{ /*//console.log("-heap puntero-"+ yytext);*/return 'h'; %}
"stack"                   return 'stack'
"heap"                   return 'heap'
"print"                   return 'imprimir'
"goto"                   return 'goto_'
"iffalse"                   return 'iffalse'
"if"                   return 'if'
([a-zA-Z]|"_"|"$")([a-zA-Z]|[0-9]|"_"|"$")* 
					  %{  return 'id'; %}
<<EOF>>               return 'EOF'
.                     return 'INVALIDO'
/lex



%start INICIO

%% 

INICIO : LINSTRUCCIONES EOF
    {   
        compilar($1);
        var resultados = [];
        resultados.push(stack);
        resultados.push(heap);
        resultados.push(temporales);
        resultados.push(salidas);
        return resultados;           
    }     
;

LINSTRUCCIONES2 : LINSTRUCCIONES2 INSTRUCCION2 { $$ =$1 ; $$.push($2);}
                |INSTRUCCION2 { $$ = []; $$.push($1);}
;      

INSTRUCCION2 : 
    VARDECLARACION{$$=$1;}
    |IMPRIMIR {$$ = $1;}
    |ASIGNACION{$$=$1;}
    |CLERANSCOPE{$$=$1;}    
    |ETIQUETA{$$=$1;}    
    |SALTOCONDICIONAL{$$=$1;}
    |SALTO{$$=$1;}
    |LLAMADA{$$=$1;}
    |CLEANSCOPE{$$=$1;}
;

LINSTRUCCIONES : LINSTRUCCIONES INSTRUCCION { $$ =$1 ; $$.push($2);}
                |INSTRUCCION { $$ = []; $$.push($1);}
;      

INSTRUCCION : 
     VARDECLARACION{$$=$1;}
    |IMPRIMIR {$$ = $1;}
    |ASIGNACION{$$=$1;}
    |CLERANSCOPE{$$=$1;}
    |METODO{$$=$1;}  
    |ETIQUETA{$$=$1;}  
    |SALTOCONDICIONAL{$$=$1;}
    |SALTO{$$=$1;}
    |LLAMADA{$$=$1;}
    |CLEANSCOPE{$$=$1;}
;

LLAMADA : 'call' + id  +';'{$$ = new Llamada(@1.first_line,@1.first_column, $2);}
;

ETIQUETA: etiqueta + ':' + { $$ = new Etiqueta(@1.first_line, @1.first_column, $1);}
;

SALTOCONDICIONAL: 'if' + ER + 'goto_' + etiqueta  +';' { $$ = new SaltoCondicional(@1.first_line,@1.first_column,$2,$4);}
                |'ifelse' + ER + 'goto_' + etiqueta  +';' { $$ = new SaltoCondicionalI(@1.first_line,@1.first_column,$2,$4);}
;

ER: 
     '(' + P + '<' + P + ')' { $$ = new Menor(@1.first_line,@1.first_column,$2,$4); }
    |'(' + P + '>' + P + ')' { $$ = new Mayor(@1.first_line,@1.first_column,$2,$4); }
    |'(' + P + '==' + P + ')' { $$ = new Igual(@1.first_line,@1.first_column,$2,$4); }
    |'(' + P + '!=' + P + ')' { $$ = new Desigual(@1.first_line,@1.first_column,$2,$4); }
    |'(' + P + '>=' + P + ')' { $$ = new MayorIgual(@1.first_line,@1.first_column,$2,$4); }
    |'(' + P + '<=' + P + ')' { $$ = new MenorIgual(@1.first_line,@1.first_column,$2,$4); }
    ;

CLEANSCOPE: clean + '(' + temporal + ','+ E + ')' + ';'
    {$$ = new CleanScope(@1.first_line, @1.first_column, $5, $7);}
;

METODO : 'proc'+id + 'begin' + LINSTRUCCIONES2 + 'end' { $$ = new Metodo(@1.first_line,@1.first_column,$2,$4);}
;
IMPRIMIR : 'imprimir' + '(' +MODE+ ','+ temporal+')' +';'
            {$$ = new Imprimir(@1.first_line,@1.first_column, $3, $5);}
;

SALTO : goto_ + etiqueta + ';' { $$ = new Salto(@1.first_line,@1.first_column,$2);}
;

ASIGNACION : temporal + '=' + E + ";"  {$$ = new Asignacion(@1.first_line, @1.first_column, $1, $3);}  
            | temporal + '=' + stack + '[' + P + ']' + ";" {$$ = new Asignacion(@1.first_line, @1.first_column, $1, new ExpStack(@5.first_line,@5.first_column,$5));}   
            | temporal + '=' + heap + '[' + P + ']' + ";"{$$ = new Asignacion(@1.first_line, @1.first_column, $1, new ExpHeap(@5.first_line,@5.first_column,$5));}  
            | p + '=' + E + ";"  {$$ = new Asignacion(@1.first_line, @1.first_column, $1, $3);}    
            | h + '=' + E + ";"  {$$ = new Asignacion(@1.first_line, @1.first_column, $1, $3);}    
            | stack + '[' + P + ']' + '=' + E + ";"  {$$ = new AsignacionStack(@1.first_line, @1.first_column, $3, $6);}    
            | heap + '[' + P + ']' + '=' + E + ";"  {$$ = new AsignacionHeap(@1.first_line, @1.first_column, $3, $6);}    
;

VARDECLARACION : 
         'var' + 'p' + '=' + E +';' { $$ = new iniciarP(@1.first_line,@1.first_column, $4);}
        |'var' + 'h' + '=' + E +';' { $$ = new iniciarH(@1.first_line,@1.first_column,$4);}
        |'var' + 'stack' + '[' + ']'+ ';' { $$ = new iniciarStack(@1.first_line,@1.first_column);}
        |'var' + 'heap' + '[' + ']'+ ';'{ $$ = new iniciarHeap(@1.first_line,@1.first_column);}
;

E:  
    P '+' P { $$ = new Suma(@1.first_line,@1.first_column, $1,$3);}
   |P '-' P { $$ = new Resta(@1.first_line,@1.first_column, $1,$3);}    
   |P {$$=$1;}
   //|error {$$ = null;}
;

P: entero { $$ =  new ExpInt(@1.first_line, @1.first_column, parseInt($1));}
  |decimal { $$ =  new ExpDecimal(@1.first_line, @1.first_column, parseFloat($1));}
  |temporal {$$ = new ExpTemporal(@1.first_line, @1.first_column,$1); }
  |'p' {$$ = new ExpP(@1.first_line, @1.first_column);}
  |'h' {$$ = new ExpH(@1.first_line, @1.first_column); }
;

MODE: 
'intmode' {$$ = "i";}
|'charmode' {$$ = "c";}
|'decimalmode' {$$ = "d";}
;