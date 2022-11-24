const fs = require('fs'); // File System
                            // modulo fs

// 06 - callbacks.js

console.log('Inicio');
fs.readFile(
    './06-ejemplo.txt', // Ruta del archivo
    'utf-8', // Codificacion
    (error, contenidoArchivo) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.log('No existe el archivo');
            }
            if (error.code === 'EACCES') {
                console.log('No tienes permisos');
            }
            console.error('Hubo error', error);
        } else {
            let contenidoArchivoUno = contenidoArchivo;
            console.log(contenidoArchivo);

            fs.readFile(
                './01-variables.js', // Ruta del archivo
                'utf-8', // Codificacion
                (error, contenidoArchivo) => {
                    if (error) {
                        if (error.code === 'ENOENT') {
                            console.log('No existe el archivo');
                        }
                        if (error.code === 'EACCES') {
                            console.log('No tienes permisos');
                        }
                        console.error('Hubo error', error);
                    } else {
                        console.log(contenidoArchivo);
                        let contenidoArchivoDos = contenidoArchivo;

                        fs.writeFile(
                            './06-nuevo-archivo.txt',
                            contenidoArchivoUno + contenidoArchivoDos,
                            (error) => {
                                console.error('Hubo error', error);
                            }
                        )
                    }
                }
            );
        }
    }
);
console.log('Fin');


// fs.writeFile(
//     './06-ejemplo.txt', // Ruta del archivo
//     nuvoContenidoArchivo, // Contenido
//     'utf-8', // Codificacion
//     (error) => {}
// );

// 1) Leer el archivo