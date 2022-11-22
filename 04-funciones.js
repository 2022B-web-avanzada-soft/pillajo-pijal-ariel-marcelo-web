// 04-fuciones
function soloNumeros(a, b, c) {
    return a - b - c;
}

// JS permite el uso de funciones sin validación
// Es decir podemos mandar número , arreglos, booleanos e incluso otras funciones y no pasa nada

function soloLetras (a, b, c){ // Sin return devuelve undefained
    console.log(a,b,c)
}


// Funciones nombreadas - named functions
function funcionNombrada(){

}

// Funciones anonimas
const funcionSinNombre1 = function () {} // let o var tambien valen
//[].forEach(function() {});
funcionSinNombre1();

// Funciones anonimas - Fat Arrow Functions
const funcionFatArrow1 = () => {}
funcionFatArrow1();

const funcionFatArrow2 = (params) => {
    return params + 1;
}
const funcionFatArrow3 = (parametro ) => parametro + 1;
const funcionFatArrow3 = parametro  => arametro + 1;

const funcionFatArrow4 = (numUno, numDos, numTres) => numUno + numDos + numTres

// ... =>  parametros infinitos => llegan en un arreglo de parametros
//          solo podemos tener un parametro infinito por funcion
// Si quiero poner otros parametros estos deben estar declarados antes del parámetro infinito
//   a,b,c, ...arreglo
function sumarNumeros(...todosNumeros ) {
    let total = 0;
    todosNumeros.forEach(
        (valorActual) => {
            total = total + valorActual
        }
    )
    return total;
}
sumarNumeros(1,3,3,4,5,6)

