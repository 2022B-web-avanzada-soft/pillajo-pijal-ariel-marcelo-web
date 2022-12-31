import {leerArchivo} from "./GestorDocumentos";
import {escribirArchivo} from "./GestorDocumentos";
import {Libro, Autor} from "./interfaces";

const path = './resources/BD.txt';
// Create
export async function createBook(book: Libro, idAutor: number): Promise<boolean>{
    const originalContent = await leerArchivo(path);
    let newContent = '';
    originalContent.toString().split("};").find((value) => {
        if ( value ) {
            let a: Autor = JSON.parse(value + "}");
            if (a.id == idAutor) {
                a.libros.push(book);
            }
            newContent += JSON.stringify(a, null, 2) + ";";
        }
    });
    // print pretty json
    await escribirArchivo(path, newContent );
    return true;
}

export async function createAuthor(author: Autor): Promise<boolean>{
    const originalContent = await leerArchivo(path);
    // print pretty json
    await escribirArchivo(path, originalContent + JSON.stringify(author, null, 2) + ";" );
    return true;
}

export async function updateBook(book: Libro): Promise<boolean> {
    const originalContent = await leerArchivo(path);
    let newContent = '';
    originalContent.toString().split("};").find((value) => {
        console.log(value);
        if ( value ) {
            let a: Autor = JSON.parse(value + "}");
            a.libros.forEach(
                (libro) => {
                    if (libro.id == book.id) {
                        console.log("Encontrado");
                        a.libros.splice(a.libros.indexOf(libro), 1, book);
                    }
                }
            )
            newContent += JSON.stringify(a, null, 2) + ";";
        }
    });
    // print pretty json
    await escribirArchivo(path, newContent );
    return true;
}

export async function updateAuthor(author: Autor): Promise<boolean> {
    const originalContent = await leerArchivo(path);
    let newContent = '';
    originalContent.toString().split("};").find((value) => {
        if ( value ) {
            let a: Autor = JSON.parse(value + "}");
            if (a.id == author.id) {
                author.libros = a.libros;
                a = author;
            }
            newContent += JSON.stringify(a, null, 2) + ";";
        }
    });
    // print pretty json
    await escribirArchivo(path, newContent );
    return true;
}

export async function deleteBook(id: number): Promise<boolean> {
    const originalContent = await leerArchivo(path);
    let newContent = '';
    originalContent.toString().split("};").find((value) => {
        if ( value ) {
            let a: Autor = JSON.parse(value + "}");
            a.libros.forEach(
                (libro) => {
                    if (libro.id == id) {
                        a.libros.splice(a.libros.indexOf(libro), 1);
                    }
                }
            )
            newContent += JSON.stringify(a, null, 2) + ";";
        }
    });
    // print pretty json
    await escribirArchivo(path, newContent );
    return true;
}

export async function deleteAuthor(id: number): Promise<boolean> {
    const originalContent = await leerArchivo(path);
    let newContent = '';
    originalContent.toString().split("};").find((value) => {
        if ( value ) {
            let a: Autor = JSON.parse(value + "}");
            if (a.id != id) {
                newContent += JSON.stringify(a, null, 2) + ";";
            }
        }
    });
    // print pretty json
    await escribirArchivo(path, newContent );
    return true;
}