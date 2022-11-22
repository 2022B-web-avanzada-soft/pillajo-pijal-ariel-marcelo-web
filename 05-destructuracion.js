// Destructuracion de Objetos
const adrian = {
    nombre: "Adrian"
}
const carolina = {
    nombre: "Carolina",
    apellido: "Erguez"
}
// El orden en el que copiamos los valores importa
// carolina se copia primero
// adrian se copia después y sobreescribe las prop de carolina si tienen el mismo nombre
const adrianCarolina = {
    ...carolina,
    ...adrian
}
console.log('adrianCarolina', adrianCarolina)

// Destructuracion de arreglos
const arregloUno = [1,2,3,4,5]
const arregloDos = [6,7,8,9,10]

const superArreglo = [
    ...arregloUno,
    ...arregloDos
]

console.log('superArreglo', superArreglo)




