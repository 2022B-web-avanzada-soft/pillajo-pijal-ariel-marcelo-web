// 08-promesas.js
const fs = require('fs');

function leerArchivo(path) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                path,
                'utf-8',
                (error, contenidoArchivo) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
}

function escribirArchivo(path, contenido) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                path,
                contenido,
                (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenido);
                    }
                }
            );
        }
    );
}

function ejercicio08(path, contenidoArchivo) {
    return leerArchivo(path)
        .then(
            (algo) => {
                console.log('algo', algo);
                return escribirArchivo(path, algo + contenidoArchivo);
            }
        ).then(
            (algo) => {
                console.log('algo2', algo);
                return leerArchivo(path);
            }
        )
        .catch(
            (error) => {
                return 'Error';
            }
        )
}

ejercicio08('./06-ejemplo.txt', 'Hola Mundo')

// 1)
// ASYNC AWAIT
async  function asyncAwaitUno(nuevoContenidoArchivo) {
    // Si sabemos que en la promesa PUEDE existir un reject
    // usamos try catch
    try {
        const respuestaArchivoOriginal = await leerArchivo('./06-ejemplo.txt');
        await escribirArchivo(
            './06-ejemplo.txt',
            respuestaArchivoOriginal + nuevoContenidoArchivo
        );
    } catch (error) {
        console.error(error)
    }
};

const asyndAwaitDos = async function () {};

const asyncAwaitTres = async () => {}



