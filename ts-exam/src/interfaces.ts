export interface Libro {
    id: number;
    titulo: string;
    fecha: Date;
    precio: number;
    bestseller: boolean;
}

export interface Autor {
    id: number;
    nombre: string;
    fechaNacimiento: Date;
    numPublicaciones: number;
    fallecido: boolean;
    libros: Libro[];
}