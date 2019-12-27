
function Iniciar(texto, nombre) {
    limpiarErrores();

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

              if(e.hash.token=="INVALIDO")
              {
                addError(e.hash.loc.first_line, e.hash.loc.first_column, "Lexico", e.message,);
              }
              else
              {
                addError(e.hash.loc.first_line, e.hash.loc.first_column, "Sintactico", e.message);
              }              
		}
        
}



function IniciarVariables() {
    tablaSimbolos = [];
    claseActual = "";
    metodoActual = "";
    ambito = [];
    ambito.push("Global");
  
}



   
   
