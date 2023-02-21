import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('epn_usuario') // nombre de la tabla en la bdd
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        name: 'user_nombres',// nombre campo en la bdd
        type: 'varchar', // tipo campo en la bdd
        length: 60,// longitud campo en la bdd
        nullable: false,// si es nullable
    })
    nombres: string; // nombre del objeto

    @Column({
        name: 'user_apellidos',// nombre campo en la bdd
        type: 'varchar', // tipo campo en la bdd
        length: 60,// longitud campo en la bdd
        nullable: false,// si es nullable
    })
    apellidos: string; // nombre del objeto

    @Column({
        name: 'user_rol',// nombre campo en la bdd
        type: 'varchar', // tipo campo en la bdd
        length: 1,// longitud campo en la bdd
        nullable: true,// si es nullable
        default: 'U', // valor por defecto
        comment: 'U => Usuario, A => Administrador'
    })
    rol: string; // nombre del objeto


}