class TablaSimbolos
{
    constructor()
    {
        this.tabla = {}; 
    }
    agregarSimbolo(nombre, simbolo)
    {
       this.tabla[nombre] = simbolo;
    }
    getSimbolo(nombre)
    {
        return this.tabla[nombre];
    }
    existeSimbolo(nombre)
    {
        return this.tabla[nombre]!=null;
    }
    imprimir()
    {
        window.limpiarSimbolos();       
        for (var element in this.tabla) 
        {            
            if (this.tabla.hasOwnProperty(element)) 
                {
                    if(this.tabla[element].dimensiones === undefined)
                    {
                        window.addSimbolo(
                            this.tabla[element].nombre,
                            this.tabla[element].id,
                            this.tabla[element].ambito,
                            this.tabla[element].nivel,
                            this.tabla[element].posicion,
                            this.tabla[element].rol,
                            this.tabla[element].tamano,
                            this.tabla[element].visibilidad,
                            0,
                            this.tabla[element].tipo
                        );                         
                    }
                    else
                    {
                        window.addSimbolo(
                            this.tabla[element].nombre,
                            this.tabla[element].id,
                            this.tabla[element].ambito,
                            this.tabla[element].nivel,
                            this.tabla[element].posicion,
                            this.tabla[element].rol,
                            this.tabla[element].tamano,
                            this.tabla[element].visibilidad,
                            this.tabla[element].dimensiones.length,
                            this.tabla[element].tipo
                        );                         
                    }

            }
        }
    }
    limpiar()
    {
        this.tabla = {};
    }
}
