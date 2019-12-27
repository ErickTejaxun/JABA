
class simbolo
{
    constructor()
    {
       this.nombre;
       this.id;
       this.ambito;
       this.nivel;
       this.posicion;
       this.tipo;
       this.rol;
       this.tamano;
       this.visibilidad; 
       this.valor;
       this.heredado;
       this.sobreescribir=false;
       this.puntero;
       this.arreglo;
       this.dimensiones = [];
       this.parametros= [];
    }
    setValores(nombre,id,ambito,nivel,posicion,tipo,rol,tamano,visibilidad,heredado,sobreescribir)
    {
        this.nombre = nombre;
        this.id = id;
        this.ambito = ambito;
        this.nivel = nivel;
        this.posicion = posicion;
        this.tipo = tipo;
        this.rol = rol;
        this.tamano = tamano;
        this.visibilidad = visibilidad;
        this.heredado=heredado;
        this.sobreescribir=sobreescribir;     
    }
    setValores(nombre,id,ambito,nivel,posicion,tipo,rol,tamano,visibilidad,heredado,sobreescribir,dimensiones)
    {
        this.nombre = nombre;
        this.id = id;
        this.ambito = ambito;
        this.nivel = nivel;
        this.posicion = posicion;
        this.tipo = tipo;
        this.rol = rol;
        this.tamano = tamano;
        this.visibilidad = visibilidad;
        this.heredado=heredado;
        this.sobreescribir=sobreescribir;     
        this.dimensiones = dimensiones;
    }    
}
