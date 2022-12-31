// import inquirer
import * as inquirer from 'inquirer';
import {Libro, Autor} from "./interfaces";
import {createBook, createAuthor, updateBook, updateAuthor, deleteBook, deleteAuthor} from "./GestorLibros";
import {leerArchivo} from "./GestorDocumentos";

const path = './resources/BD.txt';

async function main() {
    try {
        // do while
        let opcion: string;
        let opcion2: string;
        do {
            // preguntar que quiere hacer
            opcion = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'opcion',
                    message: '¿Qué desea hacer? (1: Crear, 2: Leer, 3: Acutalizar, 4: Borrar, 5: Salir):\n'
                }
            ])
            // switch
            switch (opcion["opcion"]) {
                case '1':

                    do {
                        opcion2 = await inquirer.prompt([
                            {
                                type: 'input',
                                name: 'opcion2',
                                message: '¿Qué desea hacer? (1: Crear Libro, 2: Crear Autor, 3: Salir):\n'
                            }
                        ])
                        switch (opcion2["opcion2"]) {
                            case '1':
                                await crearLibro();
                                break;
                            case '2':
                                await crearAutor();
                                break;
                        }
                    }while (opcion2["opcion2"] != '3')

                    break;
                case '2':
                    const content = await leerArchivo(path);
                    //console.log(content);
                    content.toString().split("};").forEach((value) => {
                         //console.log("this is the value: " + value);
                         if ( value ) {
                             let a: Autor = JSON.parse(value + "}");
                             console.log(a);
                         }
                    });

                    break;
                case '3':
                    do {
                        opcion2 = await inquirer.prompt([
                            {
                                type: 'input',
                                name: 'opcion2',
                                message: '¿Qué desea hacer? (1: Actualizar Libro, 2: Actualizar Autor, 3: Salir):\n'
                            }
                        ])
                        switch (opcion2["opcion2"]) {
                            case '1':
                                await actualizarLibro();
                                break;
                            case '2':
                                await actualizarAutor();
                                break;
                        }
                    }while (opcion2["opcion2"] != '3')
                    break;
                case '4':
                    do {
                        opcion2 = await inquirer.prompt([
                            {
                                type: 'input',
                                name: 'opcion2',
                                message: '¿Qué desea hacer? (1: Borrar Libro, 2: Borrar Autor, 3: Salir):\n'
                            }
                        ])
                        switch (opcion2["opcion2"]) {
                            case '1':
                                await borrarLibro();
                                break;
                            case '2':
                                await borrarAutor();
                                break;
                        }
                    }while (opcion2["opcion2"] != '3')
                    break;
                    break;
            }
        } while (opcion !== '5');

    } catch (e) {
        console.error(e)
    }
}

async function crearLibro() {
    try {
        const libroResponse= await inquirer.prompt([
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

        ])
        const libroNuevo: Libro = {
            // Unique and aleatory id
            id: Math.floor(Math.random() * 1000),
            titulo: libroResponse.titulo,
            fecha: new Date(libroResponse.fecha),
            precio: parseFloat(libroResponse.precio),
            bestseller: libroResponse.bestseller === 'TRUE'
        };
        await  createBook(libroNuevo, libroResponse.idAutor);
    } catch (e) {
        console.error(e)
    }
}
async function crearAutor() {
    try {
        const AutorResponse= await inquirer.prompt([
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
        ])
        const autorNuevo: Autor = {
            // Unique and aleatory id
            id: Math.floor(Math.random() * 1000),
            nombre: AutorResponse.nombre,
            fechaNacimiento: new Date(AutorResponse.fechaNacimiento),
            numPublicaciones: Number(AutorResponse.numPublicaciones),
            fallecido: AutorResponse.fallecido === 'TRUE',
            libros: []
        };
        await  createAuthor(autorNuevo);
    } catch (e) {
        console.error(e)
    }
}
async function actualizarLibro() {
    try {
        const response = await inquirer.prompt([
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
        ])
        const libroNuevo: Libro = {
            id: Number(response.idAutor),
            titulo: response.titulo,
            fecha: new Date(response.fecha),
            precio: parseFloat(response.precio),
            bestseller: response.bestseller === 'TRUE'
        }
        updateBook(libroNuevo);

    } catch (e) {
        console.error(e)
    }
}
async function actualizarAutor() {
    try {
        const response = await inquirer.prompt([
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
        ])
        const autorNuevo: Autor = {
            id: Number(response.idAutor),
            nombre: response.nombre,
            fechaNacimiento: new Date(response.fechaNacimiento),
            numPublicaciones: Number(response.numPublicaciones),
            fallecido: response.fallecido === 'TRUE',
            libros: []
        }
        updateAuthor(autorNuevo);

    } catch (e) {
        console.error(e)
    }
}
async function borrarLibro() {
    try {
        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'idAutor',
                message: 'Ingrese el Id del Libro a Borrar'
            }
        ])
        deleteBook(Number(response.idAutor));

    } catch (e) {
        console.error(e)
    }
}
async function borrarAutor() {
    try {
        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'idAutor',
                message: 'Ingrese el Id del Autor a Borrar'
            }
        ])
        deleteAuthor(Number(response.idAutor));

    } catch (e) {
        console.error(e)
    }
}

main();
