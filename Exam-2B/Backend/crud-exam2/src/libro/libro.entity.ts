import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AutorEntity} from "../autor/autor.entity";

@Entity('libro') // nombre de la tabla en la bdd
export class LibroEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        name: 'titulo_libro',
        type: 'varchar',
        length: 60,
        nullable: false,
    })
    tituloLibro: string;
    @Column({
        name: 'fecha_publicacion',
        type: 'date',
        nullable: false,
    })
    fechaPublicacion: Date;
    @Column({
        name: 'precio_libro',
        type: 'decimal',
        nullable: true,
    })
    precioLibro: number;
    @Column({
        name: 'best_seller',
        type: 'boolean',
        nullable: true,
    })
    bestSeller: boolean;
    @ManyToOne(
        () => AutorEntity, // Tipo relacion
        autor => autor.libros, // Campo con que relaciona
    )
    autor: AutorEntity;
}