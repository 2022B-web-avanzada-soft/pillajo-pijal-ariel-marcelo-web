"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthor = exports.deleteBook = exports.updateAuthor = exports.updateBook = exports.createAuthor = exports.createBook = void 0;
const GestorDocumentos_1 = require("./GestorDocumentos");
const GestorDocumentos_2 = require("./GestorDocumentos");
const path = './resources/BD.txt';
// Create
function createBook(book, idAutor) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalContent = yield (0, GestorDocumentos_1.leerArchivo)(path);
        let newContent = '';
        originalContent.toString().split("};").find((value) => {
            if (value) {
                let a = JSON.parse(value + "}");
                if (a.id == idAutor) {
                    a.libros.push(book);
                }
                newContent += JSON.stringify(a, null, 2) + ";";
            }
        });
        // print pretty json
        yield (0, GestorDocumentos_2.escribirArchivo)(path, newContent);
        return true;
    });
}
exports.createBook = createBook;
function createAuthor(author) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalContent = yield (0, GestorDocumentos_1.leerArchivo)(path);
        // print pretty json
        yield (0, GestorDocumentos_2.escribirArchivo)(path, originalContent + JSON.stringify(author, null, 2) + ";");
        return true;
    });
}
exports.createAuthor = createAuthor;
function updateBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalContent = yield (0, GestorDocumentos_1.leerArchivo)(path);
        let newContent = '';
        originalContent.toString().split("};").find((value) => {
            console.log(value);
            if (value) {
                let a = JSON.parse(value + "}");
                a.libros.forEach((libro) => {
                    if (libro.id == book.id) {
                        console.log("Encontrado");
                        a.libros.splice(a.libros.indexOf(libro), 1, book);
                    }
                });
                newContent += JSON.stringify(a, null, 2) + ";";
            }
        });
        // print pretty json
        yield (0, GestorDocumentos_2.escribirArchivo)(path, newContent);
        return true;
    });
}
exports.updateBook = updateBook;
function updateAuthor(author) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalContent = yield (0, GestorDocumentos_1.leerArchivo)(path);
        let newContent = '';
        originalContent.toString().split("};").find((value) => {
            if (value) {
                let a = JSON.parse(value + "}");
                if (a.id == author.id) {
                    author.libros = a.libros;
                    a = author;
                }
                newContent += JSON.stringify(a, null, 2) + ";";
            }
        });
        // print pretty json
        yield (0, GestorDocumentos_2.escribirArchivo)(path, newContent);
        return true;
    });
}
exports.updateAuthor = updateAuthor;
function deleteBook(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalContent = yield (0, GestorDocumentos_1.leerArchivo)(path);
        let newContent = '';
        originalContent.toString().split("};").find((value) => {
            if (value) {
                let a = JSON.parse(value + "}");
                a.libros.forEach((libro) => {
                    if (libro.id == id) {
                        a.libros.splice(a.libros.indexOf(libro), 1);
                    }
                });
                newContent += JSON.stringify(a, null, 2) + ";";
            }
        });
        // print pretty json
        yield (0, GestorDocumentos_2.escribirArchivo)(path, newContent);
        return true;
    });
}
exports.deleteBook = deleteBook;
function deleteAuthor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalContent = yield (0, GestorDocumentos_1.leerArchivo)(path);
        let newContent = '';
        originalContent.toString().split("};").find((value) => {
            if (value) {
                let a = JSON.parse(value + "}");
                if (a.id != id) {
                    newContent += JSON.stringify(a, null, 2) + ";";
                }
            }
        });
        // print pretty json
        yield (0, GestorDocumentos_2.escribirArchivo)(path, newContent);
        return true;
    });
}
exports.deleteAuthor = deleteAuthor;
//# sourceMappingURL=GestorLibros.js.map