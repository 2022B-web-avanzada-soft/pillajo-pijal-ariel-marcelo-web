const arreglo = [
    {
        id: 1,
        nombre: 'Adrian',
        nota: 5
    },
    {
        id: 2,
        nombre: 'Vicente',
        nota: 8
    },
    {
        id: 3,
        nombre: 'Carolina',
        nota: 14
    },
    {
        id: 4,
        nombre: 'Wendy',
        nota: 16
    },
    {
        id: 5,
        nombre: 'Andrea',
        nota: 19
    },
    {
        id: 6,
        nombre: 'Pamela',
        nota: 19
    },
    {
        id: 7,
        nombre: 'Cristian',
        nota: 20
    },
    {
        id: 8,
        nombre: 'Daniel',
        nota: 19
    },
    {
        id: 9,
        nombre: 'Lilly',
        nota: 14
    },
    {
        id: 10,
        nombre: 'Ramiro',
        nota: 12
    }
];
// Enviamos una expression TRUTY FALSY y nos retorna un elemento del arreglo
const respuestaFind = arreglo.find(
    function (valorActual, indiceActual, arregloCompleto){
        console.log('valorActual', valorActual)
        console.log('indiceActual', indiceActual)
        console.log('arregloCompleto', arregloCompleto)
        // si nunca llego a obtener verdadero entonces devuelve un undefined
        return valorActual.nota <= 5 //EXPRESION ===
    }
)

console.log(respuestaFind)

const respuestaIndex = arreglo
    .findIndex(
        function (valorActual, indiceActual, arregloCompleto){
            return valorActual.nombre == 'Cristia'
        }
    )

console.log('respuestaIndex', respuestaIndex)// si no ecuentra manda -1

// FOREACH
// itera y no devuelve nada -> undefined
const respuestForEach = arreglo
    .forEach(
        function (valorActual, indiceActual, arregloCompleto){
            console.log('valor actual',valorActual)
        }
    )

console.log(respuestForEach)

// MAP modifica o muta el arreglo y devuelve un nuevo arreglo
// enviamos los datos del nuevo arreglo
// devuelve un nuevo arreglo
const respuestaMap = arreglo
    .map(
        (valorActual, indiceActual, arregloCompleto)=>{
            const notaActual = valorActual.nota + 1;
            const nuevoElemento = {
                id: valorActual.id,
                nombre: valorActual.nombre,
                nota: notaActual,
                estaAprobado: notaActual > 14,
                casado: false,
            }
            return nuevoElemento
        }
    )

console.log(respuestaMap)
console.log(arreglo)


// FILTER
// enviamos una EXPRESSION TRUTY FALSY
// devuelve los elementos  que cumplen esa condición

const respuestaFilter = arreglo
    .filter(
        (valorActual, indiceActual, arregloCompleto)=> {
            return valorActual.nota >= 14;
        }
    )

console.log('respuestaFilter', respuestaFilter)
console.log('arreglo', arreglo)

// SOME -> expression
// devuelve un booleano
// Hay alguna nota menor a 9 si o no
// or
const respuestaSome = arreglo
    .some(
        function (valorActual, indiceActual, arregloCompleto){
            return valorActual.nota < 9
        }
    )

console.log('return some', respuestaSome)
// Every -> Expresion
// Devuelve Boolean
// Todas las notas son mayores a 14? si no
// and
const respuestaEvery = arreglo
    .every(
        function (valorActual, indiceActual, arregloCompleto){
            return valorActual.nota > 14
        }
    )
// usado usualmente para verificar que un usuario cumpla con todos los permisos
console.log('respuesta every', respuestaEvery)


// REDUCE izq -> dere
// REDUCE RIGHT der -> izq
// PODEMOS CAMBIAR EL VALOR INICIAL Y LA OPERACION AL MOMENTO DE ACUMULAR
// sumo todas las notas. el valor acumulado por defecto es 0
const respuestaReduce = arreglo
    .reduce(
        function (valorAcumulado, valorActual, indice){
            console.log('v ',valorAcumulado)
            return valorAcumulado + valorActual.nota
        },
        0 // Acumulador
    )
console.log(respuestaReduce)
console.log(respuestaReduce / arreglo.length)


let arr = arreglo.filter( (e) => e.nota < 14).map( (e) => e.nota + 1).some(e => e > 14)
console.log(arr)