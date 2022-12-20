const arregloUsuarios = [
    {
        "id": 1,
        "nombre": "Adrian"
    }
]
const arregloGuardado = JSON.stringify(arregloUsuarios)
const usuario = {
    "id": 2,
    "nombre": "Vicente"
}
const objetoGuardado = JSON.stringify(usuario)

console.log(arregloGuardado)
console.log(objetoGuardado)

const arregloRestaurado = JSON.parse(arregloGuardado)
const objetoRestaurado = JSON.parse(objetoGuardado)

console.log(arregloRestaurado)
console.log(objetoRestaurado)
