/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%options case-insensitive

%%

\s+                   /* skip whitespace */
\n+                   /* skip whitespace */
\t+                   /* skip whitespace */
[0-9]+"."[0-9]+	 	  return 'decimal'
[0-9]+				  return 'numero'
"//"(.)*              /*IGNORAR*/;
"t"[0-9]+\b           return 'temporal'
"L"[0-9]+\b           return 'etiqueta';
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
","                   return ','
":"                   return ':'
"je"                  return 'je'
"jne"                 return 'jne'
"jg"                  return 'jg'
"jge"                 return 'jge'
"jl"                  return 'jl'
"jle"                 return 'jle'
"jmp"                 return 'jmp'
"<="                  return '<='
"=>"                  return '=>'
"="                   return '='
"begin"               return 'begin'
"end"                 return 'end'
"call"                return 'call'
"stack"               return 'stack'
"heap"                return 'heap'
"P"                   return 'p'
"H"                   return 'h'
"("                   return '('
")"                   return ')'
";"                   return ';'
"\0"                  return '\0'
"print"               return 'print'
"\"%c\""              return 'printCaracter'
"\"%d\""              return 'printEntero'
"\"%f\""              return 'printFloat'
"$_in_value"          return 'lectura'

[a-zA-z_0-9]+         return 'id'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */


%start ENTRADA

%% /* language grammar */

ENTRADA : INICIO EOF{
    console.log(" * * * * * * CORRECTO 3D * * * * * * *");
    return $1; 
};


INICIO	: INICIO METODO {
		//nodo  = new Nodo("INICIO",$1,@1,[$1,$2]);
		nodo  = $1;
		nodo.hijos.push($2);
		$$ = nodo;
	}
	| METODO{
		nodo  = new Nodo("INICIO",$1,@1,[$1]);
		$$ = nodo;
	};


METODO: begin ',' ',' ',' id end ',' ',' ',' id {
        nodo1 = new Nodo('id',$5,@5,[]);
		nodo  = new Nodo("METODO",$1,@1,[nodo1]);
		$$ = nodo;
	}
    | begin ',' ',' ',' id INTRUCCIONES end ',' ',' ',' id {
        nodo1 = new Nodo('id',$5,@5,[]);
		nodo  = new Nodo("METODO",$1,@1,[nodo1,$6]);
		$$ = nodo;
	}
	| begin ',' ',' ',' lectura INTRUCCIONES end ',' ',' ',' lectura {
        nodo1 = new Nodo('id',$5,@5,[]);
		nodo  = new Nodo("METODO",$1,@1,[nodo1,$6]);
		$$ = nodo;
	};


INTRUCCIONES: INTRUCCIONES INSTRUCCION{
		nodo  = $1;
		nodo.hijos.push($2);
		$$ = nodo;
	}
	| INSTRUCCION{
		nodo  = new Nodo("INTRUCCIONES",$1,@1,[$1]);
		$$ = nodo;
	};


INSTRUCCION: ASIGNACION{
		//nodo  = new Nodo("INSTRUCCION",$1,@1,[$1]);
		//$$ = nodo;
		$$ = $1;
	}
    |SALTO{
		$$ = $1;
	}
    |CONDICIONAL{
		$$ = $1;
	}
    |IMPRIMIR{
		$$ = $1;
	}
	|ETIQUETA ':'{
		$$ = $1;
	}
	|LLAMADA{
		$$ = $1;
	}
	|LECTURA{
		$$ = $1;
	};
    

ASIGNACION: '=' ',' VALOR ',' ',' VALOR{
        nodo1 = new Nodo('=',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$3,$6]);
		$$ = nodo;
	}
    |OPARIT ',' VALOR ',' VALOR ',' VALOR{
        //nodo1 = new Nodo('=',$1,@1,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[$1,$3,$5,$7]);
		$$ = nodo;
	}            
    |'=>' ',' VALOR ',' VALOR ',' VALOR{
        nodo1 = new Nodo('=>',$1,@1,[]);
        //nodo7 = new Nodo('heap',$7,@7,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$3,$5,$7]);
		$$ = nodo;
	}
    |'<=' ',' VALOR ',' VALOR ',' VALOR{
        nodo1 = new Nodo('<=',$1,@1,[]);
		//nodo7 = new Nodo('stack',$7,@7,[]);
		nodo  = new Nodo("ASIGNACION",$1,@1,[nodo1,$3,$5,$7]);
		$$ = nodo;
	};


VALOR: temporal{
        nodo1 = new Nodo('temporal',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |h{
        nodo1 = new Nodo('h',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |p{
        nodo1 = new Nodo('p',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |numero{
        nodo1 = new Nodo('numero',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |decimal{
        nodo1 = new Nodo('decimal',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|heap{
        nodo1 = new Nodo('heap',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|stack{
        nodo1 = new Nodo('stack',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|etiqueta{
        nodo1 = new Nodo('etiqueta',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|'\0'{
        nodo1 = new Nodo('fin',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1]);
		$$ = nodo;
	}
	|'-' VALOR{
        nodo1 = new Nodo('-',$1,@1,[]);
		nodo  = new Nodo("VALOR",$1,@1,[nodo1, $2]);
		$$ = nodo;
	};


OPARIT : '+' {
        nodo1 = new Nodo('+',$1,@1,[]);
		nodo  = new Nodo("OPARIT",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |'-'{
        nodo1 = new Nodo('-',$1,@1,[]);
		nodo  = new Nodo("OPARIT",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |'*'{
        nodo1 = new Nodo('*',$1,@1,[]);
		nodo  = new Nodo("OPARIT",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |'/'{
        nodo1 = new Nodo('/',$1,@1,[]);
		nodo  = new Nodo("OPARIT",$1,@1,[nodo1]);
		$$ = nodo;
	};


SALTO: jmp ',' ',' ',' etiqueta{
        nodo1 = new Nodo('jmp',$1,@1,[]);
        nodo2 = new Nodo('etiqueta',$5,@5,[]);
		nodo  = new Nodo("SALTO",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	};

CONDICIONAL: OPREL ',' VALOR ',' VALOR ',' etiqueta{
        nodo7 = new Nodo('etiqueta',$7,@7,[]);
		nodo  = new Nodo("CONDICIONAL",$1,@1,[$1,$3,$5,nodo7]);
		$$ = nodo;
	};

OPREL: je{
        nodo1 = new Nodo('je',$1,@1,[]);
		nodo  = new Nodo("OPREL",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |jne  {
        nodo1 = new Nodo('jne',$1,@1,[]);
		nodo  = new Nodo("OPREL",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |jg{
        nodo1 = new Nodo('jg',$1,@1,[]);
		nodo  = new Nodo("OPREL",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |jge{
        nodo1 = new Nodo('jge',$1,@1,[]);
		nodo  = new Nodo("OPREL",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |jl{
        nodo1 = new Nodo('jl',$1,@1,[]);
		nodo  = new Nodo("OPREL",$1,@1,[nodo1]);
		$$ = nodo;
	}
    |jle{
        nodo1 = new Nodo('jle',$1,@1,[]);
		nodo  = new Nodo("OPREL",$1,@1,[nodo1]);
		$$ = nodo;
	};


IMPRIMIR: print '(' IMPR ',' VALOR ')' ';'{
       nodo1 = new Nodo('print',$1,@1,[]);
		nodo  = new Nodo("IMPRIMIR",$1,@1,[nodo1,$3,$5]);
		$$ = nodo;
	};

IMPR : printFloat {
        nodo1 = new Nodo('printFloat',$1,@1,[]);
		nodo  = new Nodo("IMPR",$1,@1,[nodo1]);
		$$ = nodo;
	}
    | printCaracter {
        nodo1 = new Nodo('printCaracter',$1,@1,[]);
		nodo  = new Nodo("IMPR",$1,@1,[nodo1]);
		$$ = nodo;
	}
    | printEntero {
        nodo1 = new Nodo('printEntero',$1,@1,[]);
		nodo  = new Nodo("IMPR",$1,@1,[nodo1]);
		$$ = nodo;
	};

ETIQUETA: ETIQUETA ',' etiqueta{
        nodo2 = new Nodo('etiqueta',$3,@3,[]);
		//nodo  = new Nodo("ETIQUETA",$1,@1,[$1,nodo2]);
		//$$ = nodo;
		nodo  = $1;
		nodo.hijos.push(nodo2);
		$$ = nodo;
	}
    |etiqueta{
        nodo1 = new Nodo('etiqueta',$1,@1,[]);
		nodo  = new Nodo("ETIQUETA",$1,@1,[nodo1]);
		$$ = nodo;
	};

LLAMADA : call ',' ',' ',' id{
        nodo1 = new Nodo('call',$1,@1,[]);
        nodo2 = new Nodo('id',$5,@5,[]);
		nodo  = new Nodo("LLAMADA",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	};

LECTURA: call ',' ',' ',' lectura{
        nodo1 = new Nodo('call',$1,@1,[]);
        nodo2 = new Nodo('lectura',$5,@5,[]);
		nodo  = new Nodo("LECTURA",$1,@1,[nodo1,nodo2]);
		$$ = nodo;
	};

%%

function Nodo(nombre, token, posicion, hijos){
	this.nombre = nombre;
	this.token = token;
	this.posicion = posicion;
	this.hijos = hijos;	
}

parser.arbol ={
	raiz:null
};
