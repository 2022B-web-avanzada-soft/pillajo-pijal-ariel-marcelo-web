import * as fs from "fs";

export function leerArchivo(path: string) {
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

export function escribirArchivo(path, contenido) {
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

