class GeneradorDeCodigo
{
    constructor()
    {
        this.codigo3D ="";
        this.decMetodos;
        this.decIniciales;
        this.eV;
        this.eF;
        this.eSalida;
        this.etRetorno;
        this.idClase;

        this.tmp;
        this.etq;

        this.listaAboles;

        this.tabla=new TablaSimbolos();

        this.ambitos;
        this.ambito;
        this.ambitotmp;
        this.accesoClase;
        this.params;
        this.tipo;
        this.metodoActual;
        this.tamanoMetodo;
        this.tamanoClase;
        this.nivel;
        this.posicion;
        this.ambitoid;
        this.contadorImports;
        this.cicloIf;
        this.sobreescribir;
        this.heredado;
        this.sobreescribir=false;


    }

    setInicial()
    {
        this.etq = 0;
        this.tmp = 0;
        this.listaAboles = [];
        this.contadorImports = 0;
        this.ambito="";
        this.tabla=new TablaSimbolos();
        this.ambitoid = 0;
        this.nivel = 0;
        this.posicion = 0;
        this.tamanoMetodo=0;
        this.accesoClase="";
        this.heredado="";
        this.idClase="";
        this.params="";     
    }
    inicializar() {
        
        this.tabla.limpiar();
        this.etq = 0;
        this.tmp = 0;
        this.decMetodos = "";
        this.decIniciales = "";
        this.codigo3D = "";
        this.decMetodos+="void imprimir_cadena();|";
        this.decMetodos+="void imprimir_num();|";
        this.decMetodos+="void imprimir_caracter();|";
        
        //gdc.generarImprimir(); pendiente
    }

    Iniciar()
    {
        //pendiente este metodo;
        decIniciales = "#include <iostream>|";
        decIniciales += "using namespace std;|";
        decIniciales += "long Stack[10000];|";
        decIniciales += "long Heap[10000];|";
        console.log("generando codigo cuadruplos");
        this.cicloIf = false;
        emitirCodigo3D();
        archivo3D.close();

    }

    AgregarArbol(arbol)
    {
        this.listaAboles.push(arbol);
        this.analizarImports(arbol);
        this.contadorImports++;
        //this.tabla.imprimir();
        
        //imprimir tabla de simbolos pendiente
        //
    }


    ExisteSimbolo(idd, ambit)
    {
        var texto = "ERROR SEMANTICO: La variable "+idd+" ya fue declara en el ambito "+ambit;
        
    }

    NoExisteSimbolo(idd, ambit)
    {
        var texto = "ERROR SEMANTICO: No existe el identificador "+idd+" en el ámbito "+ambit;
    }


    
    CompilarImport(data, generador) {
        var requestHttp = false;  
        var url = '/abrirArchivo'; // Este metodo devuelve 0 si no existe y un 1 si sí :v y la data ahuevos.
        requestHttp = false;
        if (window.XMLHttpRequest) 
        { 
            requestHttp = new XMLHttpRequest();
            if (requestHttp.overrideMimeType) 
            {
                requestHttp.overrideMimeType('text/xml');                  
            }
        } 
        else if (window.ActiveXObject) 
        { 
            try {
                requestHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) 
            {
                try {
                    requestHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!requestHttp) {
            alert('Falla :( No es posible crear una instancia XMLHTTP');
            return false;
        }

      
        requestHttp.onreadystatechange = function()
          {
              if (this.readyState == 4 && this.status == 200) 
              {       
                 
                  var datos = JSON.parse(this.responseText);
                  alert(datos.contenido);
                  var raiz =  null;                   
                  try 
                  {         
                      raiz = gcc.parse(datos.contenido);	  	
                        if(raiz==null)
                        {
                            addError(data.linea, data.columna, "Archivo", "El archivo "+ data.valor+" No existe");                      
                        }
                        else
                        {     
                            if(raiz.hijos==undefined)
                            {
                                addError(data.linea, data.columna, "Archivo", "El archivo "+ data.valor+" No existe");                      
                            }   
                            else
                            {   
                                if(raiz.hijos.length == 0)
                                {
                                    addError(data.linea, data.columna, "Archivo", "El archivo "+ data.valor+" No existe");                      
                                }
                                else
                                {
                                    grafica(raiz);          
                                    generador.listaAboles.push(raiz); 
                                    generador.AgregarArbol(raiz);
                                }
                                                   
                            }
                        }                          		  			
                  }
                  catch (e) 
                  {
                      
                        console.log("Error: "+e.message);
                        addSalida(e.message);
          
                        if(e.hash.token=="INVALIDO")
                        {
                          addError(e.hash.loc.first_line, e.hash.loc.first_column, "Lexico", e.message);
                        }
                        else
                        {
                          addError(e.hash.loc.first_line, e.hash.loc.first_column, "Sintactico", e.message);
                        }
          
                        //
                  }


                  
                                   
              }                
          };
        requestHttp.open('POST', url, false);
        requestHttp.setRequestHeader("Content-type", "application/json");
        requestHttp.setRequestHeader("dataType", "json");
        var path = {'path':data.valor};
        requestHttp.send(JSON.stringify(path)); 
    }       


    analizarImports(arbol){
        if(arbol!=null){
            var etiqueta = arbol.etiqueta;
            var i;
            if(etiqueta == "INICIO"){
                for(i = 0; i < arbol.hijos.length; i++)
                {
                    this.analizarImports(arbol.hijos[i]);
                }
            } else if (etiqueta == "IMPORTAR"){ //incompleto
                var importar= arbol.hijos[0];
                this.CompilarImport(importar,this);
                
            }
            /* else if (etiqueta == "IMPORT"){
                path = arbol.hijos[0].etiqueta;
                CompilarImport(path);
    
            } 
            */else if (etiqueta == "CLASE"){
                //errores.open("errores.txt");
                this.llenarTabla(arbol);
                //generarCodigo3D(tmp,etq,arbol);
                //Iniciar();
            }
        }
    }

    llenarTabla(arbol){
        if(arbol!=null){
            var etiqueta = arbol.etiqueta;
            console.log(etiqueta);
            //cout<<etiqueta.toStdString()<<endl;
    
            if(etiqueta == "INICIO"){
                var i;
                for (i = 0; i< arbol.hijos.length; i++){
                    this.llenarTabla(arbol.hijos[i]);
                }
            }
    
            else if(etiqueta == "CLASE_LIST"){
                var i;
                for (i = 0; i< arbol.hijos.length; i++){
                    this.llenarTabla(arbol.hijos[i]);
                }
            }
    
            else if(etiqueta == "CLASE"){
                this.ambitoid = 0;
                this.nivel = 0;
                this.posicion = 0;
                var id = "";
                this.accesoClase="publico";
                this.heredado="N/A";
                switch(arbol.hijos.length){
                    case 4:{
                        var hijo0=arbol.hijos[0].etiqueta;
                        var hijo1=arbol.hijos[1].etiqueta;
                        var hijo2=arbol.hijos[2].etiqueta;
                        var hijo3=arbol.hijos[3].etiqueta;

                        if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="ID" && hijo3=="INSTRUCCIONESCUERPO"){
                            this.accesoClase=arbol.hijos[0].valor;
                            id=arbol.hijos[1].valor.toLowerCase();
                            this.idClase=id;
                            this.ambito=id;
                            this.heredado=arbol.hijos[2].valor.toLowerCase();
                            this.llenarTabla(arbol.hijos[3]);

                        }
                        var s=new simbolo();
                        s.setValores(id,id,"N/A",-1,-1,"N/A","clase",this.posicion*4,this.accesoClase,this.heredado,"N/A");
                        if(!this.tabla.existeSimbolo(id)){
                            this.tabla.agregarSimbolo(id,s);
                        } else {
                            this.ExisteSimbolo(id,this.ambito);
                        }
                        break;
                    }
                    case 3:{
                        var hijo0=arbol.hijos[0].etiqueta;
                        var hijo1=arbol.hijos[1].etiqueta;
                        var hijo2=arbol.hijos[2].etiqueta;

                        if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="ID"){
                            this.accesoClase=arbol.hijos[0].valor;
                            id=arbol.hijos[1].valor.toLowerCase();
                            this.idClase=id;
                            this.ambito=id;
                            this.heredado=arbol.hijos[2].valor.toLowerCase();

                        }
                        else if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="INSTRUCCIONESCUERPO"){
                            this.accesoClase=arbol.hijos[0].valor;
                            id=arbol.hijos[1].valor.toLowerCase();
                            this.idClase=id;
                            this.ambito=id;
                            this.llenarTabla(arbol.hijos[2]);
                        }
                        else if(hijo0=="ID" && hijo1=="ID" && hijo2=="INSTRUCCIONESCUERPO"){
                            id=arbol.hijos[0].valor.toLowerCase();
                            this.idClase=id;
                            this.ambito=id;
                            this.heredado=arbol.hijos[1].valor.toLowerCase();
                            this.llenarTabla(arbol.hijos[2]);
                        }
                        var s=new simbolo();
                        s.setValores(id,id,"N/A",-1,-1,"N/A","clase",this.posicion*4,this.accesoClase,this.heredado,"N/A");
                        if(!this.tabla.existeSimbolo(id)){
                            this.tabla.agregarSimbolo(id,s);
                        } else {
                            this.ExisteSimbolo(id,this.ambito);
                        }
                        break;
                    }
                    case 2:{
                        var hijo0=arbol.hijos[0].etiqueta;
                        var hijo1=arbol.hijos[1].etiqueta;

                        if(hijo0=="VISIBILIDAD" && hijo1=="ID"){
                            this.accesoClase=arbol.hijos[0].valor;
                            id=arbol.hijos[1].valor;
                            this.idClase=id;
                            this.ambito=id;
                        }
                        else if(hijo0=="ID" && hijo1=="ID"){
                            id=arbol.hijos[0].valor;
                            this.idClase=id;
                            this.ambito=id;
                            this.heredado=arbol.hijos[2].valor;
                        }
                        else if(hijo0=="ID" && hijo1=="INSTRUCCIONESCUERPO"){
                            id=arbol.hijos[0].valor;
                            this.idClase=id;
                            this.ambito=id;
                            this.llenarTabla(arbol.hijos[1]);
                        }
                        var s=new simbolo();
                        s.setValores(id,id,"N/A",-1,-1,"N/A","clase",this.posicion*4,this.accesoClase,this.heredado,"N/A");
                        if(!this.tabla.existeSimbolo(id)){
                            this.tabla.agregarSimbolo(id,s);
                        } else {
                            this.ExisteSimbolo(id,this.ambito);
                        }
                        break;
                    }
                    case 1:{
                        var hijo0=arbol.hijos[0].etiqueta;

                        if(hijo0=="ID"){
                            id=arbol.hijos[0].valor;
                            this.idClase=id;
                            this.ambito=id;
                        }
                        break;
                    }

                }
            }
            else if (etiqueta == "INSTRUCCIONESCUERPO"){
                    for(var i=0; i<arbol.hijos.length;i++){
                        this.llenarTabla(arbol.hijos[i]);
                    }                       
            }
                else if (etiqueta == "MET_PRINCIPAL"){
                    var identificadores=[];
                    this.tamanoMetodo = 0;
                    this.ambitoid = 0;
                    this.params = "";
                    var acceso = "";
                    var id = "";
                    var tipo = "vacio";
                    var ambitotemp = this.ambito;
                    var posiciontemp = this.posicion;
                    this.posicion = 1;
                    
                    id = arbol.valor;


                    var nombre = this.ambito+"_"+id+this.params;
                    if (acceso == ""){acceso = this.accesoClase;}
                    var cantHijos = arbol.hijos.length;

                    // Cambio de ambito
                    this.ambito = nombre;
                    this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                    var tthis = new simbolo();
                    tthis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A");
                    this.tabla.agregarSimbolo(this.ambito+"_this",tthis);
                    this.tamanoMetodo++;

                    // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                    if(arbol.hijos.length>0){
                        this.llenarTabla(arbol.hijos[0]);
                    }

                    //Agregamos el "return" en la posicion 1 del metodo
                    /*
                    if (!(tipo.toLocaleLowerCase()=="vacio")){
                        ss = new simbolo(ambito+"_return", id, ambito, nivel, posicion*4, tipo, "retorno", TAMANO, "N/A");
                        if(!tabla.existeSimbolo(ambito+"_return")) {
                            tabla.agregarSimbolo(ambito+"_return", ss);
                        }
                        posicion++;
                        tamanoMetodo++;
                    }
                    */

                    // Vuelvo al ámbito anterior
                    this.nivel--;
                    this.ambito = ambitotemp;
                    this.posicion = posiciontemp;

                    // Agregamos metodo a la tabla de simbolos
                    nombre+="()";
                    var ss = null;
                    if(id.toLocaleLowerCase() == this.idClase.toLocaleLowerCase() && tipo.toLowerCase()=="vacio"){
                        ss = new simbolo();
                        ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso);
                    } else {
                        ss = new simbolo();
                        ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso);
                    }

                    //Agregamos los identificadores de los parametros al simbolo
                    ss.parametros = identificadores;

                    //Verificamos que el simbolo no exista en la tabla de simbolos
                    if(!this.tabla.existeSimbolo(nombre)){
                        this.tabla.agregarSimbolo(nombre,ss);
                    } else {
                        this.ExisteSimbolo(id,this.ambito);
                    }

                }

                else if (etiqueta == "CONSTRUCTOR"){
                    var identificadores=[];
                    this.tamanoMetodo = 0;
                    this.ambitoid = 0;
                    this.params = "";
                    var acceso = "";
                    var id = "";
                    var tipo = "vacio";
                    var ambitotemp = this.ambito;
                    var posiciontemp = this.posicion;
                    this.posicion = 1;
                    
                    switch(arbol.hijos.length){
                        case 4:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            var hijo3=arbol.hijos[3].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="PARAMETROS" && hijo3=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }

                            break;
                        }
                        case 3:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="PARAMETROS"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }
                            else if(hijo0=="ID" && hijo1=="PARAMETROS" && hijo2=="INSTRUCCIONES"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[2]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }
                            else if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[2]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }
                            
                            break;
                        }
                        case 2:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;

                            if(hijo0=="ID" && hijo1=="PARAMETROS"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }
                            else if(hijo0=="VISIBILIDAD" && hijo1=="ID"){
                                acceso=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }
                            else if(hijo0=="ID" && hijo1=="INSTRUCCIONES"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[1]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }
                            break;
                        }
                        case 1:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            if(hijo0=="ID"){
                                id=arbol.hijos[0].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[1]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                //llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }

                            break;
                        }

                    }


                }
                else if(etiqueta=="PARAMETROS")
                {
                    for(var i = 0; i<arbol.hijos.length; i++){
                        this.llenarTabla(arbol.hijos[i]);
                    }

                }
                else if(etiqueta=="PARAMETRO")
                {
                    this.params += "_"+arbol.hijos[1].valor;

                }

                else if(etiqueta=="SobreEscribir"){
                    this.sobreescribir=true;
                    for(var i=0;i<arbol.hijos.length;i++){
                        this.llenarTabla();
                    }
                    this.sobreescribir=false;
                }
                else if(etiqueta=="METODO")
                {
                    var identificadores=[];
                    this.tamanoMetodo = 0;
                    this.ambitoid = 0;
                    this.params = "";
                    var acceso = "";
                    var id = "";
                    var tipo = "vacio";
                    var ambitotemp = this.ambito;
                    var posiciontemp = this.posicion;
                    this.posicion = 1;
                    
                    
                    switch(arbol.hijos.length){
                        case 6:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            var hijo3=arbol.hijos[3].etiqueta;
                            var hijo4=arbol.hijos[4].etiqueta;
                            var hijo5=arbol.hijos[5].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="TIPO" && hijo2=="Dimension" && hijo3=="ID" && hijo4=="PARAMETROS" && hijo5=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                tipo=arbol.hijos[1].valor;
                                id=arbol.hijos[3].valor;

                                var dimensione=[];
                                dimensione=this.getDimensiones(dimensione,arbol.hijos[2]);
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[4]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[4]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[5]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    ss.dimensiones=dimensione;
                                    ss.arreglo=true;
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }
                                
                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
            
                                ss = new simbolo();
                                ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;
                                ss.arreglo=true;
                                ss.dimensiones=dimensione;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }



                            break;
                        }
                        case 5:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            var hijo3=arbol.hijos[3].etiqueta;
                            var hijo4=arbol.hijos[4].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="TIPO" && hijo2=="ID" && hijo3=="PARAMETROS" && hijo4=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                tipo=arbol.hijos[1].valor;
                                id=arbol.hijos[2].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[3]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[3]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[4]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }
                                
                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
            
                                ss = new simbolo();
                                ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }

                            else if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="ID" && hijo3=="PARAMETROS" && hijo4=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                tipo=arbol.hijos[1].valor;
                                id=arbol.hijos[2].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[3]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[3]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[4]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }
                                
                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
            
                                ss = new simbolo();
                                ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }
                            //VISIBILIDAD TIPO id DIMENSION '(' ')' '{' LISTA_INSTRUCCIONES '}'
                            else if(hijo0=="VISIBILIDAD" && hijo1=="TIPO" && hijo2=="Dimension" && hijo3=="ID" && hijo4=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                tipo=arbol.hijos[1].valor;
                                id=arbol.hijos[3].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[3]);

                                var dimensione=[];
                                dimensione=this.getDimensiones(dimensione,arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[3]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[4]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    ss.dimensiones=dimensione;
                                    ss.arreglo=true;
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }
                                
                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
            
                                ss = new simbolo();
                                ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=dimensione;
                                ss.arreglo=true;
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }

                            //TIPO id DIMENSION '(' PARAMETROS ')' '{' LISTA_INSTRUCCIONES '}'
                            else if(hijo0=="TIPO" && hijo1=="Dimension" && hijo2=="ID" && hijo3=="PARAMETROS" && hijo4=="INSTRUCCIONES"){
                                
                                tipo=arbol.hijos[0].valor;
                                id=arbol.hijos[2].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[3]);

                                var dimensione=[];
                                dimensione=this.getDimensiones(dimensione,arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[3]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[4]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    ss.dimensiones=dimensione;
                                    ss.arreglo=true;
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }
                                
                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
            
                                ss = new simbolo();
                                ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=dimensione;
                                ss.arreglo=true;
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }


                            break;
                        }

                        case 4:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            var hijo3=arbol.hijos[3].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="TIPO" && hijo2=="ID" && hijo3=="INSTRUCCIONES"){
                                
                                    acceso=arbol.hijos[0].valor;
                                    tipo=arbol.hijos[1].valor;
                                    id=arbol.hijos[2].valor;
                                    //recorremos los parametros
                                    //this.llenarTabla(arbol.hijos[3]);
    
                                    this.ambito = this.ambito+"_"+id+this.params;
                                    this.nivel++;
                                    //creamos los simbolos de parametros
                                    //identificadores = llenarConParametros(identificadores, arbol.hijos[3]);
                                    this.ambito = ambitotemp;
                                    this.nivel--;
    
                                    var nombre = this.ambito+"_"+id+this.params;
                                    if (acceso == ""){
                                        acceso = this.accesoClase;
                                    }
                                    var cantHijos = arbol.hijos.length;
    
                                    // Cambio de ambito
                                    this.ambito = nombre;
                                    this.nivel++;
    
                                    //Agregamos el "this" en la posicion 0 del metodo
                                    var TThis = new simbolo();
                                    TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                    this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                    this.tamanoMetodo++;
    
                                    // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                    this.llenarTabla(arbol.hijos[3]);
    
                                    //Agregamos el "return" en la posicion 1 del metodo
                                    if (!(tipo=="vacio"))
                                    {
                                        var ss = new simbolo();
                                        ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                        if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                        {
                                            this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                        }
                                        this.posicion++;
                                        this.tamanoMetodo++;
                                    }
                                    
                                    // Vuelvo al ámbito anterior
                                    this.nivel--;
                                    this.ambito = ambitotemp;
                                    this.posicion = posiciontemp;
    
                                    // Agregamos metodo a la tabla de simbolos
                                    nombre+="()";
                                    var ss = null;
                
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                    ss.dimensiones=[];
                                    ss.sobreescribir=this.sobreescribir;
                                    //Agregamos los identificadores de los parametros al simbolo
                                    ss.parametros = identificadores;
    
                                    //Verificamos que el simbolo no exista en la tabla de simbolos
                                    if(!this.tabla.existeSimbolo(nombre)){
                                        this.tabla.agregarSimbolo(nombre,ss);
                                    } else {
                                        this.ExisteSimbolo(id,this.ambito);
                                    }

                            }
                            else if(hijo0=="TIPO" && hijo1=="ID" && hijo2=="PARAMETROS" && hijo3=="INSTRUCCIONES"){
                                
                                tipo=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }
                                
                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
            
                                ss = new simbolo();
                                ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }

                        
                            }
                            else if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="ID" && hijo3=="INSTRUCCIONES"){
                                
                                acceso=arbol.hijos[0].valor;
                                tipo=arbol.hijos[1].valor;
                                id=arbol.hijos[2].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[3]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[3]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }
                                
                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
            
                                ss = new simbolo();
                                ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }

                        
                            }
                            else if(hijo0=="ID" && hijo1=="ID" && hijo2=="PARAMETROS" && hijo3=="INSTRUCCIONES"){
                                
                                tipo=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                identificadores = this.llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }
                                
                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
            
                                ss = new simbolo();
                                ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }

                        
                            }
                            else if(hijo0=="TIPO" && hijo1=="Dimension" && hijo2=="ID" && hijo3=="INSTRUCCIONES"){                                
                                tipo=arbol.hijo[0].valor;
                                id=arbol.hijos[2].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[3]);
                                var dimensio=[];
                                dimensio=this.getDimensiones(dimensio,arbol.hijos[1]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[3]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[3]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    ss.dimensiones=dimensio;
                                    ss.arreglo=true;
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }
                                
                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
            
                                ss = new simbolo();
                                ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=dimensio;
                                ss.arreglo=true;
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }

                        
                            }
                            break;
                        }
                        case 3:{
                            var hijo0=arbol.hijos[0].etiqueta;
                            var hijo1=arbol.hijos[1].etiqueta;
                            var hijo2=arbol.hijos[2].etiqueta;
                            if(hijo0=="TIPO" && hijo1=="ID" && hijo2=="INSTRUCCIONES"){
                                tipo=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[2]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }
                            else if(hijo0=="ID" && hijo1=="ID" && hijo2=="INSTRUCCIONES"){
                                tipo=arbol.hijos[0].valor;
                                id=arbol.hijos[1].valor;
                                //recorremos los parametros
                                //this.llenarTabla(arbol.hijos[2]);

                                this.ambito = this.ambito+"_"+id+this.params;
                                this.nivel++;
                                //creamos los simbolos de parametros
                                //identificadores = llenarConParametros(identificadores, arbol.hijos[2]);
                                this.ambito = ambitotemp;
                                this.nivel--;

                                var nombre = this.ambito+"_"+id+this.params;
                                if (acceso == ""){
                                    acceso = this.accesoClase;
                                }
                                var cantHijos = arbol.hijos.length;

                                // Cambio de ambito
                                this.ambito = nombre;
                                this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                                var TThis = new simbolo();
                                TThis.setValores(this.ambito+"_this",id,this.ambito,this.nivel,0,"entero","variable",4,"N/A","N/A","N/A");
                                this.tabla.agregarSimbolo(this.ambito+"_this",TThis);
                                this.tamanoMetodo++;

                                // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                                this.llenarTabla(arbol.hijos[2]);

                                //Agregamos el "return" en la posicion 1 del metodo
                                if (!(tipo=="vacio"))
                                {
                                    var ss = new simbolo();
                                    ss.setValores(this.ambito+"_return", id, this.ambito, this.nivel, this.posicion*4, tipo, "retorno", 4, "N/A", "N/A", "N/A");
                                    if(!this.tabla.existeSimbolo(this.ambito+"_return")) 
                                    {
                                        this.tabla.agregarSimbolo(this.ambito+"_return", ss);
                                    }
                                    this.posicion++;
                                    this.tamanoMetodo++;
                                }

                                // Vuelvo al ámbito anterior
                                this.nivel--;
                                this.ambito = ambitotemp;
                                this.posicion = posiciontemp;

                                // Agregamos metodo a la tabla de simbolos
                                nombre+="()";
                                var ss = null;
                                if(id.toLocaleLowerCase() ==this.idClase.toLocaleLowerCase() && tipo=="vacio"){
                                    ss = new simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new simbolo();
                                    ss.setValores(nombre,id, ambitotemp,this.nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }
                            }
                            
                            break;
                        }

                    }

                }
                else if (etiqueta == "INSTRUCCIONES"){
                    var i = 0;
                    for(i=0;i<arbol.hijos.length;i++){
                        this.llenarTabla(arbol.hijos[i]);
                    }
                }
                else if(etiqueta == "INSTRUCCION"){
                    this.llenarTabla(arbol.hijos[0]);
                }
                else if(etiqueta == "ESTRUCTURA"){
                    //this.llenarTabla(arbol.hijos[0]);
                    
                    var ambitotemporal=this.ambito
                    var ambitoidtemporal=this.ambitoid;
                    var niveltemporal=this.nivel;
                    var posiciontemporal=this.posicion;
                    var heredadotemporal =this.heredado;
                    var idClasetemporal=this.idClase;
                    var tipotemporal=this.tipo;
                    var accesoClasetemporal=this.accesoClase;


                    this.ambitoid = 0;
                    this.nivel = 0;
                    this.posicion = 0;
                    var id = "";
                    this.accesoClase="publico";
                    this.heredado="N/A";

                    var hijo2=arbol.hijos[0];
                    var hijo3=arbol.hijos[1];

                        id=hijo2.valor.toLowerCase();
                        this.idClase=id;
                        this.ambito=id;
                        
                        //llenamos los atributos de la estructura
                        this.llenarTabla(hijo3);

                    
                    var s=new simbolo();
                    s.setValores(id,id,"N/A",-1,-1,"N/A","estructura",this.posicion*4,this.accesoClase,"N/A","N/A");
                    if(!this.tabla.existeSimbolo(id)){
                        this.tabla.agregarSimbolo(id,s);
                    } else {
                        this.ExisteSimbolo(id,this.ambito);
                    }

                    this.ambito=ambitotemporal;
                    this.ambitoid=ambitoidtemporal;
                    this.nivel=niveltemporal;
                    this.posicion=posiciontemporal;
                    this.heredado=heredadotemporal;
                    this.idClase=idClasetemporal;
                    this.tipo=tipotemporal;
                    this.accesoClase=accesoClasetemporal;



                    
                    


                    


                }
                else if(etiqueta == "DECLARACION"){
                    var acceso = "";
                    var id = "";
                    var tipo = "";;
                    var rol = "";
                    var l_ids;
                    var es_arreglo=false;
                    var dimensioness=[];
                    var nombre="";

                    switch(arbol.hijos.length){

                        case 4:{
                            acceso=arbol.hijos[0].valor;
                            tipo=arbol.hijos[1].valor;
                            l_ids=arbol.hijos[2];

                            var i=0;
                            for(i=0;i<l_ids.hijos.length;i++){
                                es_arreglo=false;
                                dimensioness=[];
                                id="";
                                var variable=l_ids.hijos[i];

                                if(variable.hijos.length==1){
                                    id=variable.hijos[0].valor;
                                    rol="variable"
                                }else if(variable.hijos.length==2){
                                    id=variable.hijos[0].valor;
                                    dimensioness=this.getDimensiones(dimensioness,variable.hijos[1]);
                                    es_arreglo=true;
                                    rol="arreglo";
                                }

                                nombre = this.ambito+"_"+id;
                                if(!this.tabla.existeSimbolo(nombre)){
                                    if(this.nivel>0){
                                        var s = new simbolo();
                                        s.setValores(nombre,id,this.ambito,this.nivel,this.posicion*4,tipo,rol,4,"N/A","N/A","N/A");                                    
                                        s.arreglo=es_arreglo;
                                        s.dimensiones=dimensioness;

                                        this.tabla.agregarSimbolo(nombre,s);
                                        this.posicion++;
                                    }else if(this.nivel==0){
                                        var s = new simbolo();
                                        s.setValores(nombre,id,this.ambito,this.nivel,this.posicion*4,tipo,rol,4,acceso,"N/A","N/A");
                                        s.arreglo=es_arreglo;
                                        s.dimensiones=dimensioness;

                                        this.tabla.agregarSimbolo(nombre,s);
                                        this.posicion++;
                                    }
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }



                            }


                            break;
                        }
                        case 3:{
                            tipo=arbol.hijos[0].valor;
                            l_ids=arbol.hijos[1];

                            var i=0;
                            for(i=0;i<l_ids.hijos.length;i++){
                                es_arreglo=false;
                                dimensioness=[];
                                id="";
                                var variable=l_ids.hijos[i];

                                if(variable.hijos.length==1){
                                    id=variable.hijos[0].valor;
                                    rol="variable"
                                }else if(variable.hijos.length==2){
                                    id=variable.hijos[0].valor;
                                    dimensioness=this.getDimensiones(dimensioness,variable.hijos[1]);
                                    es_arreglo=true;
                                    rol="arreglo";
                                }

                                nombre = this.ambito+"_"+id;
                                if(!this.tabla.existeSimbolo(nombre)){
                                    if(this.nivel>0){
                                        var s = new simbolo();
                                        s.setValores(nombre,id,this.ambito,this.nivel,this.posicion*4,tipo,rol,4,"N/A","N/A","N/A");
                                        s.arreglo=es_arreglo;
                                        s.dimensiones=dimensioness;

                                        this.tabla.agregarSimbolo(nombre,s);
                                        this.posicion++;
                                    }else if(this.nivel==0){
                                        acceso=this.accesoClase;
                                        var s = new simbolo();
                                        s.setValores(nombre,id,this.ambito,this.nivel,this.posicion*4,tipo,rol,4,acceso,"N/A","N/A");
                                        s.arreglo=es_arreglo;
                                        s.dimensiones=dimensioness;

                                        this.tabla.agregarSimbolo(nombre,s);
                                        this.posicion++;
                                    }
                                } else {
                                    this.ExisteSimbolo(id,this.ambito);
                                }



                            }


                            break;
                        }

                    }
                } 
                else if(etiqueta=="SI"){
                    var ambitotemporal = this.ambito;
                    this.ambito+="_si"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;
                    //for(int i = 0; i<arbol->cantHijos; i++){
                        this.ambitoid = 0;
                        this.nivel++;
                        this.llenarTabla(arbol.hijos[1]);
                        this.nivel--;
                    //}
                    this.ambitoid = ambitoidtemporal;
                    this.ambito = ambitotemporal;




                    //this.llenarTabla(arbol.hijos[1]);

                }               
                else if(etiqueta=="CUERPO_IF"){
                    var esverdadero=arbol.hijos[0];
                    var esfalso=arbol.hijos[1];

                    var ambitotemporal = this.ambito;
                    this.ambito+="_esverdadero"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal= this.ambitoid;
                    this.ambitoid=0;
                    for(i=0;i<esverdadero.hijos.length;i++){

                        
                        
                        this.llenarTabla(esverdadero.hijos[i]);
                        


                    }
                    this.ambito = ambitotemporal;
                    this.ambitoid = ambitoidtemporal;

                    ambitotemporal = this.ambito;
                    this.ambito+="_esfalso"+this.ambitoid;
                    this.ambitoid++;
                    ambitoidtemporal = this.ambitoid;
                   
                    this.ambitoid=0;
                    for(i=0;i<esfalso.hijos.length;i++){
                        
                        
                        this.llenarTabla(esfalso.hijos[i]);
                        


                    }
                    this.ambito = ambitotemporal;
                    this.ambitoid = ambitoidtemporal;
                    

                }
                else if (etiqueta=="SWITCH"){

                    var ambitotemporal = this.ambito;
                    this.ambito+="_evaluarsi"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;
                    //for(int i = 0; i<arbol->cantHijos; i++){
                        this.ambitoid = 0;
                        this.nivel++;
                        if(arbol.hijos.length==2){

                            this.llenarTabla(arbol.hijos[1]);
                        }
                        else if(arbol.hijos.length==3){
                            this.llenarTabla(arbol.hijos[1]);
                            this.llenarTabla(arbol.hijos[2]);
                        }
                        
                        this.nivel--;
                    //}
                    this.ambitoid = ambitoidtemporal;
                    this.ambito = ambitotemporal;                    
                }
                else if(etiqueta=="DEFECTO"){

                    var ambitotemporal = this.ambito;
                    this.ambito+="_defecto"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal= this.ambitoid;
                    this.ambitoid=0;
                        
                        
                        this.llenarTabla(arbol.hijos[0]);
                        


                    this.ambito = ambitotemporal;
                    this.ambitoid = ambitoidtemporal;

                }
                else if(etiqueta=="CASOS"){
                    var i=0;
                    for (i=0;i<arbol.hijos.length;i++){
                        this.llenarTabla(arbol.hijos[i]);

                    }
                }
                else if(etiqueta=="CASO"){
                    var ambitotemporal = this.ambito;
                    this.ambito+="_caso"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;

                    if (arbol.hijos.length==2){
                        this.ambitoid = 0;
                        
                        this.llenarTabla(arbol.hijos[1]);
                        
                    }
                    this.ambito = ambitotemporal;
                    this.ambitoid = ambitoidtemporal;
                }
                else if(etiqueta=="WHILE"){
                    var ambitotemporal = this.ambito;
                    this.ambito+="_repetirmientras"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;
                    //for(int i = 0; i<arbol->cantHijos; i++){
                        this.ambitoid = 0;
                        this.nivel++;
                        if(arbol.hijos.length==2){

                            this.llenarTabla(arbol.hijos[1]);
                        }
                        
                        this.nivel--;
                    //}
                    this.ambitoid = ambitoidtemporal;
                    this.ambito = ambitotemporal;

                }
                else if(etiqueta=="DOWHILE"){
                    var ambitotemporal = this.ambito;
                    this.ambito+="_hacermientras"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;
                    //for(int i = 0; i<arbol->cantHijos; i++){
                        this.ambitoid = 0;
                        this.nivel++;
                        if(arbol.hijos.length==2){

                            this.llenarTabla(arbol.hijos[0]);
                        }
                        
                        this.nivel--;
                    //}
                    this.ambitoid = ambitoidtemporal;
                    this.ambito = ambitotemporal;
                }
                else if(etiqueta=="REPETIR"){
                    var ambitotemporal = this.ambito;
                    this.ambito+="_repetirhastaque"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;
                    //for(int i = 0; i<arbol->cantHijos; i++){
                        this.ambitoid = 0;
                        this.nivel++;
                        if(arbol.hijos.length==2){

                            this.llenarTabla(arbol.hijos[0]);
                        }
                        
                        this.nivel--;
                    //}
                    this.ambitoid = ambitoidtemporal;
                    this.ambito = ambitotemporal;
                }
                else if(etiqueta=="CICLOX"){
                    var ambitotemporal = this.ambito;
                    this.ambito+="_ciclodoble"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;
                    //for(int i = 0; i<arbol->cantHijos; i++){
                        this.ambitoid = 0;
                        this.nivel++;
                        if(arbol.hijos.length==3){

                            this.llenarTabla(arbol.hijos[2]);
                        }
                        
                        this.nivel--;
                    //}
                    this.ambitoid = ambitoidtemporal;
                    this.ambito = ambitotemporal;                    
                }
                else if(etiqueta=="ENCICLAR"){
                    var identificadorr=arbol.hijos[0].valor;
                    var ambitotemporal = this.ambito;
                    this.ambito+="_enciclar"+identificadorr+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;
                    //for(int i = 0; i<arbol->cantHijos; i++){
                        this.ambitoid = 0;
                        this.nivel++;
                        if(arbol.hijos.length==2){

                            this.llenarTabla(arbol.hijos[1]);
                        }
                        
                        this.nivel--;
                    //}
                    this.ambitoid = ambitoidtemporal;
                    this.ambito = ambitotemporal;

                }
                else if(etiqueta=="FOR"){
                    var ambitotemporal = this.ambito;
                    this.ambito+="_repetircontando"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;
                    //for(int i = 0; i<arbol->cantHijos; i++){
                        this.ambitoid = 0;
                        this.nivel++;
                        if(arbol.hijos.length==4){

                            this.llenarTabla(arbol.hijos[3]);
                        }
                        
                        this.nivel--;
                    //}
                    this.ambitoid = ambitoidtemporal;
                    this.ambito = ambitotemporal;
                }
                else if(etiqueta=="CONTADOR"){
                    var ambitotemporal = this.ambito;
                    this.ambito+="_contador"+this.ambitoid;
                    this.ambitoid++;
                    var ambitoidtemporal = this.ambitoid;
                    //for(int i = 0; i<arbol->cantHijos; i++){
                        this.ambitoid = 0;
                        this.nivel++;
                        if(arbol.hijos.length==2){

                            this.llenarTabla(arbol.hijos[1]);
                        }
                        
                        this.nivel--;
                    //}
                    this.ambitoid = ambitoidtemporal;
                    this.ambito = ambitotemporal;
                }

    
            }
        }
    

    llenarConParametros(identifica, arbol)
    {
        if(arbol!=null){
            var etiqueta = arbol.etiqueta;
        if(etiqueta == "PARAMETROS"){
            for (var i = 0; i<arbol.hijos.length; i++){
                var paramet=arbol.hijos[i];

                switch(paramet.hijos.length){
                    case 2:{
                        var hijo0=paramet.hijos[0];
                        var hijo1=paramet.hijos[1];
                        if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="ID"){
                            var id=hijo1.valor;
                            identifica.push(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();
                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,this.ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="ID"){
                            var id=hijo1.valor;
                            identifica.push(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();
                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,this.ambito);
                            }

                        }
                        break;
                    }
                    case 3:{
                        var hijo0=paramet.hijos[0];
                        var hijo1=paramet.hijos[1];
                        var hijo2=paramet.hijos[2];
                        if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="ID" && hijo2.etiqueta=="Dimension"){
                            var id=hijo1.valor;
                            identifica.push(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();

                            var dimensione=[];
                            dimensione=this.getDimensiones(dimensione,paramet.hijos[2]);

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            s.arreglo=true;
                            s.dimensiones=dimensione;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,this.ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="ID" && hijo2.etiqueta=="Dimension"){
                            var id=hijo1.valor;
                            identifica.push(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();

                            var dimensione=[];
                            dimensione=this.getDimensiones(dimensione,paramet.hijos[2]);

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            s.arreglo=true;
                            s.dimensiones=dimensione;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,this.ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID"){
                            var id=hijo2.valor;
                            identifica.push(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_ref",4,"N/A","N/A","N/A");
                            s.puntero=true;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,this.ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID"){
                            var id=hijo2.valor;
                            identifica.push(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_ref",4,"N/A","N/A","N/A");
                            s.puntero=true;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,this.ambito);
                            }

                        }
                        break;
                    }
                    case 4:{
                        var hijo0=paramet.hijos[0];
                        var hijo1=paramet.hijos[1];
                        var hijo2=paramet.hijos[2];
                        var hijo3=paramet.hijos[3];
                        if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID" && hijo3.etiqueta=="Dimension"){
                            var id=hijo2.valor;
                            identifica.push(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();

                            var dimensione=[];
                            dimensione=this.getDimensiones(dimensione,paramet.hijos[3]);

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            s.arreglo=true;
                            s.puntero=true;
                            s.dimensiones=dimensione;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,this.ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID" && hijo3.etiqueta=="Dimension"){
                            var id=hijo2.valor;
                            identifica.push(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();

                            var dimensione=[];
                            dimensione=this.getDimensiones(dimensione,paramet.hijos[3]);

                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            s.arreglo=true;
                            s.puntero=true;
                            s.dimensiones=dimensione;
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,this.ambito);
                            }

                        }
                        
                        break;
                    }


                }

            }
        }
        return identifica;
    }

    }

getDimensiones(dimension, arbol){
    
    for(var i=0;i<arbol.hijos.length;i++){
        if(arbol.hijos[i].etiqueta=="ENTERO"){
            dimension.push(arbol.hijos[i].valor);
        }

    }
    return dimension;
}




}