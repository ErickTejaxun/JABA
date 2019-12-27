function convertirDecimalCadenaDefinido() {
    try {
        var pos1 = p + 1;
        var decimal = Stack[pos1];
        var cadena = decimal +"";
        for (let i = 0; i < cadena.length; i++) {
            Heap[h] = cadena.charCodeAt(i);
            h = h + 1;
        }
        //Heap[h] = 0;
        //h = h + 1;

    } catch (error) {
        console.log(error);
    }
}