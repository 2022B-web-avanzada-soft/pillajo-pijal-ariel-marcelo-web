"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escribirArchivo = exports.leerArchivo = void 0;
const fs = require("fs");
function leerArchivo(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(contenidoArchivo);
            }
        });
    });
}
exports.leerArchivo = leerArchivo;
function escribirArchivo(path, contenido) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, contenido, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(contenido);
            }
        });
    });
}
exports.escribirArchivo = escribirArchivo;
//# sourceMappingURL=GestorDocumentos.js.map