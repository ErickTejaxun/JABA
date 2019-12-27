class GeneradorDeCodigo
{
    constructor()
    {
        this.codigo3D;
        this.decMetodos;
        this.decIniciales;
        this.eV;
        this.eF;
        this.eSalida;
        this.etRetorno;
        this.idClase;

        this.tmp;
        this.etq;

        this.listaArboles;

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
        this.tabla=new TablaSimbolos();     
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
        
        //imprimir tabla de simbolos pendiente
        //tabla.imprimir();
    }

    ExisteSimbolo(idd, ambit)
    {
        var texto = "ERROR SEMANTICO: La variable "+idd+" ya fue declara en el ambito "+ambit;
        
    }

    NoExisteSimbolo(idd, ambit)
    {
        var texto = "ERROR SEMANTICO: No existe el identificador "+idd+" en el ámbito "+ambit;
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
                var importar= arbol.hijos[0].valor;
                //CompilarImport(importar);
                
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
                            this.heredado=arbol.hijos[2].valor.toLowerCase();
                            this.llenarTabla(arbol.hijos[3]);

                        }
                        var s=new simbolo();
                        s.setValores(id,id,"N/A",-1,-1,"N/A","clase",posicion*4,this.accesoClase,this.heredado,"N/A");
                        if(!this.tabla.existeSimbolo(id)){
                            this.tabla.agregarSimbolo(id,s);
                        } else {
                            this.ExisteSimbolo(id,ambito);
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
                            this.heredado=arbol.hijos[2].valor.toLowerCase();

                        }
                        else if(hijo0=="VISIBILIDAD" && hijo1=="ID" && hijo2=="INSTRUCCIONESCUERPO"){
                            this.accesoClase=arbol.hijos[0].valor;
                            id=arbol.hijos[1].valor.toLowerCase();
                            this.idClase=id;
                            this.llenarTabla(arbol.hijos[2]);
                        }
                        else if(hijo0=="ID" && hijo1=="ID" && hijo2=="INSTRUCCIONESCUERPO"){
                            id=arbol.hijos[0].valor.toLowerCase();
                            this.idClase=id;
                            this.heredado=arbol.hijos[1].valor.toLowerCase();
                            this.llenarTabla(arbol.hijos[2]);
                        }
                        var s=new simbolo();
                        s.setValores(id,id,"N/A",-1,-1,"N/A","clase",posicion*4,this.accesoClase,this.heredado,"N/A");
                        if(!this.tabla.existeSimbolo(id)){
                            this.tabla.agregarSimbolo(id,s);
                        } else {
                            this.ExisteSimbolo(id,ambito);
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
                        }
                        else if(hijo0=="ID" && hijo1=="ID"){
                            id=arbol.hijos[0].valor;
                            this.idClase=id;
                            this.heredado=arbol.hijos[2].valor;
                        }
                        else if(hijo0=="ID" && hijo1=="INSTRUCCIONESCUERPO"){
                            id=arbol.hijos[0].valor;
                            this.idClase=id;
                            this.llenarTabla(arbol.hijos[1]);
                        }
                        var s=new simbolo();
                        s.setValores(id,id,"N/A",-1,-1,"N/A","clase",posicion*4,this.accesoClase,this.heredado,"N/A");
                        if(!this.tabla.existeSimbolo(id)){
                            this.tabla.agregarSimbolo(id,s);
                        } else {
                            this.ExisteSimbolo(id,ambito);
                        }
                        break;
                    }
                    case 1:{
                        var hijo0=arbol.hijos[0].etiqueta;

                        if(hijo0=="ID"){
                            id=arbol.hijos[0].valor;
                            this.idClase=id;
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


                    var nombre = ambito+"_"+id+params;
                    if (acceso == ""){acceso = accesoClase;}
                    var cantHijos = arbol.hijos.length;

                    // Cambio de ambito
                    this.ambito = nombre;
                    this.nivel++;

                                //Agregamos el "this" en la posicion 0 del metodo
                    var tthis = new simbolo();
                    tthis.setValores(ambito+"_this",id,ambito,nivel,0,"entero","variable",4,"N/A");
                    this.tabla.agregarSimbolo(ambito+"_this",tthis);
                    this.tamanoMetodo++;

                    // Lleno tabla con los simbolos dentro de las instrucciones del nuevo ambito
                    if(arbol.hijos.length>0){
                        this.llenarTabla(arbol.hijos[0]);
                    }

                    //Agregamos el "return" en la posicion 1 del metodo
                    /*
                    if (!(tipo.toLocaleLowerCase()=="vacio")){
                        ss = new Simbolo(ambito+"_return", id, ambito, nivel, posicion*4, tipo, "retorno", TAMANO, "N/A");
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
                        ss.setValores(nombre,id,ambitotemp,nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso);
                    } else {
                        ss = new simbolo();
                        ss.setValores(nombre,id,ambitotemp,nivel,-1,tipo,"metodo",this.tamanoMetodo*4,acceso);
                    }

                    //Agregamos los identificadores de los parametros al simbolo
                    ss.parametros = identificadores;

                    //Verificamos que el simbolo no exista en la tabla de simbolos
                    if(!this.tabla.existeSimbolo(nombre)){
                        this.tabla.agregarSimbolo(nombre,ss);
                    } else {
                        this.ExisteSimbolo(id,ambito);
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
                                    var ss = new Simbolo();
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
                                    ss = new Simbolo();
                                    ss.setValores(nombre,id,ambitotemp,this.nivel,-1,tipo,"constructor",this.tamanoMetodo*4,acceso,"N/A","N/A");
                                } else {
                                    ss = new Simbolo();
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss = new Simbolo();
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
                                }
                            }

                            break;
                        }

                    }


                }
                else if(etiqueta=="PARAMETROS")
                {
                    for (i = 0; i<arbol.hijos.length; i++){
                        this.llenarTabla(arbol.hijos[i]);
                    }

                }
                else if(etiqueta=="PARAMETRO")
                {
                    this.params += "_"+arbol.hijos[1].valor;

                }

                else if(etiqueta=="SobreEscribir"){
                    this.sobreescribir=true;
                    for(i=0;i<arbol.hijos.length;i++){
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
                            var hijo5=arbil.hijos[5].etiqueta;
                            if(hijo0=="VISIBILIDAD" && hijo1=="TIPO" && hijo2=="Dimension" && hijo3=="ID" && hijo4=="PARAMETROS" && hijo5=="INSTRUCCIONES"){
                                acceso=arbol.hijos[0].valor;
                                tipo=arbol.hijos[1].valor;
                                id=arbol.hijos[3].valor;

                                var dimensione=[];
                                dimensione=this.getDimensiones(dimensione,arbo.hijos[2]);
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
                                ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;
                                ss.arreglo=true;
                                ss.dimensiones=dimensione;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=dimensione;
                                ss.arreglo=true;
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=dimensione;
                                ss.arreglo=true;
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                    ss.dimensiones=[];
                                    ss.sobreescribir=this.sobreescribir;
                                    //Agregamos los identificadores de los parametros al simbolo
                                    ss.parametros = identificadores;
    
                                    //Verificamos que el simbolo no exista en la tabla de simbolos
                                    if(!this.tabla.existeSimbolo(nombre)){
                                        this.tabla.agregarSimbolo(nombre,ss);
                                    } else {
                                        this.ExisteSimbolo(id,ambito);
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
                                ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss = new Simbolo();
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
                                ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=[];
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                ss.dimensiones=dimensio;
                                ss.arreglo=true;
                                ss.sobreescribir=this.sobreescribir;
                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
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
                                    ss.setValores(nombre,id, ambitotemp,nivel,-1,tipo,"metodo",tamanoMetodo*4,acceso,"N/A","N/A");
                                }

                                //Agregamos los identificadores de los parametros al simbolo
                                ss.parametros = identificadores;

                                //Verificamos que el simbolo no exista en la tabla de simbolos
                                if(!this.tabla.existeSimbolo(nombre)){
                                    this.tabla.agregarSimbolo(nombre,ss);
                                } else {
                                    this.ExisteSimbolo(id,ambito);
                                }
                            }
                            
                            break;
                        }

                    }

                }

                else if (etiqueta == "PARAMETROS"){
                    for (i = 0; i<arbol.hijos.length; i++){
                        this.lenarTabla(arbolhijos[i]);
                    }
                }else if (etiqueta == "PARAMETRO"){
                    params += "_"+arbol.hijos[1].hijos[0].etiqueta;
                } else if (etiqueta == "INSTRUCCIONES"){
                    var i = 0;
                    for(i=0;i<arbol.hijos.length;i++){
                        this.llenarTabla(arbol.hijos[i]);
                    }
                }
                else if(etiqueta == "INSTRUCCION"){
                    this.llenarTabla(arbol.hijos[0]);
                }                
    
            }
        }
    

    llenarConParametros(identifica, arbol)
    {
        if(arbol!=null){
            var etiqueta = arbol.etiqueta;
        if(etiqueta == "PARAMETROS"){
            for (i = 0; i<arbol.hijos.length; i++){
                var paramet=arbol.hijos[i];

                switch(paramet.hijos.length){
                    case 2:{
                        var hijo0=paramet.hijos[0];
                        var hijo1=paramet.hijos[1];
                        if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="ID"){
                            var id=hijo1.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();
                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="ID"){
                            var id=hijo1.valor;
                            identifica.add(id);
                            var tipo=hijo0.valor;
                            var nombre=this.ambito+"_"+id;
                            var s = new simbolo();
                            s.setValores(nombre,id, this.ambito,this.nivel,this.posicion*4,tipo,"parametro_val",4,"N/A","N/A","N/A");
                            
                            if(!this.tabla.existeSimbolo(nombre)){
                                this.tabla.agregarSimbolo(nombre,s);
                                this.posicion++;
                                this.tamanoMetodo++;
                            } else {
                                this.ExisteSimbolo(id,ambito);
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
                            identifica.add(id);
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
                                this.ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="ID" && hijo2.etiqueta=="Dimension"){
                            var id=hijo1.valor;
                            identifica.add(id);
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
                                this.ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID"){
                            var id=hijo2.valor;
                            identifica.add(id);
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
                                this.ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="ID" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID"){
                            var id=hijo2.valor;
                            identifica.add(id);
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
                                this.ExisteSimbolo(id,ambito);
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
                            identifica.add(id);
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
                                this.ExisteSimbolo(id,ambito);
                            }

                        }
                        else if(hijo0.etiqueta=="TIPO" && hijo1.etiqueta=="PUNTERO" && hijo2.etiqueta=="ID" && hijo3.etiqueta=="Dimension"){
                            var id=hijo2.valor;
                            identifica.add(id);
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
                                this.ExisteSimbolo(id,ambito);
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
            dimension.add(arbol.hijos[i].valor);
        }

    }
    return dimension;
}


}