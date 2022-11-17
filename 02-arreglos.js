// En un arreglo podemos guardar cualquier cosa
let arreglo = [1,2,3,4,5]
// for of -> valores
for ( let numero of arreglo){}
// for in -> indices
for ( let indice in arreglo){}


let objetoPrueba = {a: 1, b: 2, c: 3}
arreglo.push(11)
arreglo.pop() // elimina el ultimo
arreglo.unshift(4) // add al principio
arreglo.splice(0, 0, 4) // add in 0 position, borra 0 y add el 4
console.log(arreglo)

// si hay  varios 9 devuelve el primero q encuentra
const indiceDeNueve = arreglo.indexOf(9);// si no existe un 9 devuelve -1
arreglo.splice(indiceDeNueve, 2) // borra el último
console.log(arreglo)