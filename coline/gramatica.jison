
/* lexical grammar */
%{
var codigoHash=0;

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
        /*generamos codigo*/
    }    
};

var ExpInt = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v;    

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
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
        /*generamos codigo*/
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
        /*generamos codigo*/
    }    
};


var ExpChar = function(linea, columna, v)
{   
    var self = this;
    self.linea = linea;
    self.columna = columna;
    self.valor = v;    

    self.generarCodigo = function(entorno)
    {
        /*generamos codigo*/
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
        /*generamos codigo*/
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
"/*"[^'*']*"*/"         return;
"//"[^\r\n]*[^\r\n]     return;
"/*"[^"*"]~"*/"         return;

[0-9]+"."[0-9]+	  return 'decimal'
[0-9]+			  return 'entero'
\"(\\.|[^"])*\" 	  return 'texto'
\'(\\.|[^'])*\' 	  return 'textosimple'

//AUMENTO DECREMENTO
"++"                  %{ console.log('++');return '++'; %}
"--"                  %{ console.log('--');return '--'; %}
//asignacion y Eeracion
"+="                  %{ console.log('+=');return '+='; %}
"*="                  %{ console.log('*-');return '*-'; %}
"-="                  %{ console.log('-=');return '-='; %}
"/="                  %{ console.log('/=k');return '/='; %}
//Eeradores relacionales
">="                  %{ console.log('>=');return '>='; %}
"<="                  %{ console.log('<=');return '<='; %}
"=="                  %{ console.log('==');return '=='; %}
"!="                  %{ console.log('!=');return '!='; %}

//Eeradores Logicos
"||"                  %{ console.log('||');return '||'; %}
"??"                  %{ console.log('??');return '??'; %}
"&&"                  %{ console.log('&&');return '&&'; %}
"!"                   %{ console.log('!');return '!'; %}
//Eeradores aritmeticos
"*"                   %{ console.log('*');return '*'; %}
"->"                 %{ console.log('->');return 'flecha'; %} 
"/"                   %{ console.log('/');return '/'; %}
"-"                   %{ console.log('-');return '-'; %}
"+"                   %{ console.log('+');return '+'; %}
"%"                   %{ console.log('+');return '%'; %}
"^"                   %{ console.log('^');return '^'; %}
"="                   %{ console.log('=');return '='; %}
//signos de agrupacion
"("                   %{ console.log('(');return '('; %}
")"                   %{ console.log(')');return ')'; %}
"{"                   %{ console.log('{');return '{'; %}
"}"                   %{ console.log('}');return '}'; %}
"["                   %{ console.log('[');return '['; %}
"]"                   %{ console.log(']');return ']'; %}
//otros signitos culeros

">"                   %{ console.log('>');return '>'; %}
"<"                   %{ console.log('<');return '<'; %}
","                   %{ console.log(',');return ','; %}
"."                   %{ console.log('.');return '.'; %}
					  
":"                   %{ console.log(':');return ':'; %}
";"                   %{ console.log(';');return ';'; %}
// Palabras reservadas para coline

"abstract"              %{ console.log(yytext);return 'abstract'; %}
"boolean"              %{ console.log(yytext);return 'boolean'; %}
"break"              %{ console.log(yytext);return 'break'; %}
"case"              %{ console.log(yytext);return 'case'; %}
"catch"              %{ console.log(yytext);return 'catch'; %}
"break"              %{ console.log(yytext);return 'break'; %}
"char"              %{ console.log(yytext);return 'char'; %}
"class"              %{ console.log(yytext);return 'class'; %}
"continue"              %{ console.log(yytext);return 'continue'; %
"default"              %{ console.log(yytext);return 'default'; %}}
"do"              %{ console.log(yytext);return 'do'; %}
"double"              %{ console.log(yytext);return 'double'; %}
"else"              %{ console.log(yytext);return 'else'; %}
"extends"              %{ console.log(yytext);return 'extends'; %}
"final"              %{ console.log(yytext);return 'final'; %}
"for"              %{ console.log(yytext);return 'for'; %}
"graph_dot"              %{ console.log(yytext);return 'graph_dot'; %}
"if"              %{ console.log(yytext);return 'if'; %}
"import"              %{ console.log(yytext);return 'import'; %}
"instanceof"              %{ console.log(yytext);return 'instanceof'; %}
"int"              %{ console.log(yytext);return 'int'; %}
"message"              %{ console.log(yytext);return 'message'; %}
"new"              %{ console.log(yytext);return 'new'; %}
"object"              %{ console.log(yytext);return 'object'; %}
"pow"              %{ console.log(yytext);return 'pow'; %}
"println"              %{ console.log(yytext);return 'println'; %}
"private"              %{ console.log(yytext);return 'private'; %}
"protected"              %{ console.log(yytext);return 'protected'; %}
"public"              %{ console.log(yytext);return 'public'; %}
"return"              %{ console.log(yytext);return 'return'; %}
"read_console"              %{ console.log(yytext);return 'read_console'; %}
"read_file"              %{ console.log(yytext);return 'read_file'; %}
"static"              %{ console.log(yytext);return 'static'; %}
"str"              %{ console.log(yytext);return 'str'; %}
"string"              %{ console.log(yytext);return 'string'; %}
"super"              %{ console.log(yytext);return 'super'; %}
"switch"              %{ console.log(yytext);return 'switch'; %}

"this"              %{ console.log(yytext);return 'this'; %}
"toChar"              %{ console.log(yytext);return 'tochar'; %}
"toDouble"              %{ console.log(yytext);return 'toDouble'; %}
"toInt"              %{ console.log(yytext);return 'toInt'; %}
"try"              %{ console.log(yytext);return 'try'; %}
"while"              %{ console.log(yytext);return 'while'; %}
"write_file"              %{ console.log(yytext);return 'write_file'; %}
"true"                %{ console.log(yytext);return 'verdadero'; %}
"false"               %{ console.log(yytext);return 'falso'; %}
"null"                %{ console.log(yytext);return 'null'; %}

([a-zA-Z]|"_"|"$")([a-zA-Z]|[0-9]|"_"|"$")* 
					%{ console.log(yytext); return 'id'; %}

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

EXP : 
	EXP '+' EXP 
		{
			$$ = new Suma(@1.first_line, @1.first_column, $1, $2);
		}
    |entero 
    		{ 
			$$ = new ExpInt(@1.first_line, @1.first_column, $1);
		}
;		