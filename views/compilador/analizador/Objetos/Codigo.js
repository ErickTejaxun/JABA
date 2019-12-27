contadorCodigo = 1;
listaCodigo = [];

var codigoExtendido4D;
function Codigo(texto, linea) 
{

	codigoExtendido4D = codigoExtendido4D + texto;
	console.log(codigoExtendido4D);
    this.texto = texto;
    this.linea = linea;
    //this.contador = contadorCodigo;
    //contadorCodigo++;
}
