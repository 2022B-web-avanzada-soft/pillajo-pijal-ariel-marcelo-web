import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {LibroEntity} from "../libro/libro.entity";

@Entity('autor') // nombre de la tabla en la bdd
export class AutorEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        name: 'nombre_autor',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    nombreAutor: string;
    @Column({
        name: 'fecha_nacimiento',
        type: 'date',
        nullable: true,
    })
    fechaNacimiento: Date;
    @Column({
        name: 'numero_libros',
        type: 'int',
        nullable: true,
    })
    numeroLibros: number;
    @Column({
        name: 'fallecido',
        type: 'boolean',
        nullable: true,
    })
    fallecido: boolean;
    @OneToMany(
        () => LibroEntity, // Tipo relacion
        libro => libro.autor, // Campo con que relaciona
    )
    libros: LibroEntity[];
}