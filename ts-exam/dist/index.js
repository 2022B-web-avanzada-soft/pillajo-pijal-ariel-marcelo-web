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
// import inquirer
const inquirer = require("inquirer");
const GestorLibros_1 = require("./GestorLibros");
const GestorDocumentos_1 = require("./GestorDocumentos");
const path = './resources/BD.txt';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // do while
            let opcion;
            let opcion2;
            do {
                // preguntar que quiere hacer
                opcion = yield inquirer.prompt([
                    {
                        type: 'input',
                        name: 'opcion',
                        message: '¿Qué desea hacer? (1: Crear, 2: Leer, 3: Acutalizar, 4: Borrar, 5: Salir):\n'
                    }
                ]);
                // switch
                switch (opcion["opcion"]) {
                    case '1':
                        do {
                            opcion2 = yield inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'opcion2',
                                    message: '¿Qué desea hacer? (1: Crear Libro, 2: Crear Autor, 3: Salir):\n'
                                }
                            ]);
                            switch (opcion2["opcion2"]) {
                                case '1':
                                    yield crearLibro();
                                    break;
                                case '2':
                                    yield crearAutor();
                                    break;
                            }
                        } while (opcion2["opcion2"] != '3');
                        break;
                    case '2':
                        const content = yield (0, GestorDocumentos_1.leerArchivo)(path);
                        //console.log(content);
                        content.toString().split("};").forEach((value) => {
                            //console.log("this is the value: " + value);
                            if (value) {
                                let a = JSON.parse(value + "}");
                                console.log(a);
                            }
                        });
                        break;
                    case '3':
                        do {
                            opcion2 = yield inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'opcion2',
                                    message: '¿Qué desea hacer? (1: Actualizar Libro, 2: Actualizar Autor, 3: Salir):\n'
                                }
                            ]);
                            switch (opcion2["opcion2"]) {
                                case '1':
                                    yield actualizarLibro();
                                    break;
                                case '2':
                                    yield actualizarAutor();
                                    break;
                            }
                        } while (opcion2["opcion2"] != '3');
                        break;
                    case '4':
                        do {
                            opcion2 = yield inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'opcion2',
                                    message: '¿Qué desea hacer? (1: Borrar Libro, 2: Borrar Autor, 3: Salir):\n'
                                }
                            ]);
                            switch (opcion2["opcion2"]) {
                                case '1':
                                    yield borrarLibro();
                                    break;
                                case '2':
                                    yield borrarAutor();
                                    break;
                            }
                        } while (opcion2["opcion2"] != '3');
                        break;
                        break;
                }
            } while (opcion !== '5');
        }
        catch (e) {
            console.error(e);
        }
    });
}
function crearLibro() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const libroResponse = yield inquirer.prompt([
                {
                    type: 'input',
                    name: 'idAutor',
                    message: 'Ingrese el Id del Autor del Libro'
                },
                {
                    type: 'input',
                    name: 'titulo',
                    message: 'Título del Libro'
                },
                {
                    type: 'input',
                    name: 'fecha',
                    message: 'Fecha de Publicación del Libro'
                },
                {
                    type: 'input',
                    name: 'precio',
                    message: 'Precio del Libro'
                },
                {
                    type: 'input',
                    name: 'bestseller',
                    message: '¿Es bestseller? TRUE o FALSE'
                },
            ]);
            const libroNuevo = {
                // Unique and aleatory id
                id: Math.floor(Math.random() * 1000),
                titulo: libroResponse.titulo,
                fecha: new Date(libroResponse.fecha),
                precio: parseFloat(libroResponse.precio),
                bestseller: libroResponse.bestseller === 'TRUE'
            };
            yield (0, GestorLibros_1.createBook)(libroNuevo, libroResponse.idAutor);
        }
        catch (e) {
            console.error(e);
        }
    });
}
function crearAutor() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const AutorResponse = yield inquirer.prompt([
                {
                    type: 'input',
                    name: 'nombre',
                    message: 'Nombre del Autor'
                },
                {
                    type: 'input',
                    name: 'fechaNacimiento',
                    message: 'Fecha de Nacimiento del Autor'
                },
                {
                    type: 'input',
                    name: 'numPublicaciones',
                    message: 'Número de publicaciones del Autor'
                },
                {
                    type: 'input',
                    name: 'fallecido',
                    message: '¿fallecido? TRUE o FALSE'
                }
            ]);
            const autorNuevo = {
                // Unique and aleatory id
                id: Math.floor(Math.random() * 1000),
                nombre: AutorResponse.nombre,
                fechaNacimiento: new Date(AutorResponse.fechaNacimiento),
                numPublicaciones: Number(AutorResponse.numPublicaciones),
                fallecido: AutorResponse.fallecido === 'TRUE',
                libros: []
            };
            yield (0, GestorLibros_1.createAuthor)(autorNuevo);
        }
        catch (e) {
            console.error(e);
        }
    });
}
function actualizarLibro() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield inquirer.prompt([
                {
                    type: 'input',
                    name: 'idAutor',
                    message: 'Ingrese el Id del Libro a Actualizar'
                },
                {
                    type: 'input',
                    name: 'titulo',
                    message: 'Título del Libro'
                },
                {
                    type: 'input',
                    name: 'fecha',
                    message: 'Fecha de Publicación del Libro'
                },
                {
                    type: 'input',
                    name: 'precio',
                    message: 'Precio del Libro'
                },
                {
                    type: 'input',
                    name: 'bestseller',
                    message: '¿Es bestseller? TRUE o FALSE'
                }
            ]);
            const libroNuevo = {
                id: Number(response.idAutor),
                titulo: response.titulo,
                fecha: new Date(response.fecha),
                precio: Number(response.precio),
                bestseller: response.bestseller === 'TRUE'
            };
            (0, GestorLibros_1.updateBook)(libroNuevo);
        }
        catch (e) {
            console.error(e);
        }
    });
}
function actualizarAutor() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield inquirer.prompt([
                {
                    type: 'input',
                    name: 'idAutor',
                    message: 'Ingrese el Id del Autor a Actualizar'
                },
                {
                    type: 'input',
                    name: 'nombre',
                    message: 'Nombre del Autor'
                },
                {
                    type: 'input',
                    name: 'fechaNacimiento',
                    message: 'Fecha de Nacimiento del Autor'
                },
                {
                    type: 'input',
                    name: 'numPublicaciones',
                    message: 'Número de publicaciones del Autor'
                },
                {
                    type: 'input',
                    name: 'fallecido',
                    message: '¿fallecido? TRUE o FALSE'
                }
            ]);
            const autorNuevo = {
                id: Number(response.idAutor),
                nombre: response.nombre,
                fechaNacimiento: new Date(response.fechaNacimiento),
                numPublicaciones: Number(response.numPublicaciones),
                fallecido: response.fallecido === 'TRUE',
                libros: []
            };
            (0, GestorLibros_1.updateAuthor)(autorNuevo);
        }
        catch (e) {
            console.error(e);
        }
    });
}
function borrarLibro() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield inquirer.prompt([
                {
                    type: 'input',
                    name: 'idAutor',
                    message: 'Ingrese el Id del Libro a Borrar'
                }
            ]);
            (0, GestorLibros_1.deleteBook)(Number(response.idAutor));
        }
        catch (e) {
            console.error(e);
        }
    });
}
function borrarAutor() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield inquirer.prompt([
                {
                    type: 'input',
                    name: 'idAutor',
                    message: 'Ingrese el Id del Autor a Borrar'
                }
            ]);
            (0, GestorLibros_1.deleteAuthor)(Number(response.idAutor));
        }
        catch (e) {
            console.error(e);
        }
    });
}
main();
//# sourceMappingURL=index.js.map