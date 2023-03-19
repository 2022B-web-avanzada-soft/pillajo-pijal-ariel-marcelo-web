import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {AutorEntity} from "./autor.entity";
import {AutorCreateDto} from "./dto/autor-create.dto";
import {AutorUpdateDto} from "./dto/autor-update.dto";
import {LibroEntity} from "../libro/libro.entity";

@Injectable()
export class AutorService {

    constructor(
        @InjectDataSource()
        public datasource: DataSource
    ) {}
    private _autorRepository = this.datasource.getRepository(AutorEntity); // un repositorio no es más q una interfaz para conectar mi servicio a la bdd
    private _libroRepository = this.datasource.getRepository(LibroEntity);

    buscarTodos(): Promise<AutorEntity[]> {
        return this._autorRepository.find();
    }

    buscarUno(id: number): Promise<AutorEntity> {
        // return this._autorRepository.findOne({
        //     where: {
        //         id: id,
        //     }
        // });
        const autor = this._autorRepository
            .createQueryBuilder('autor') // Seleccionar la entidad AutorEntity y asignarle un alias "autor"
            .leftJoinAndSelect('autor.libros', 'libros') // Incluir la relación con la entidad LibroEntity y asignarle un alias "libros"
            .where('autor.id = :id', { id }) // Filtrar por el id proporcionado
            .getOne(); // Obtener un solo resultado

        if (!autor) {
            throw new Error(`No se encontró un autor con el id ${id}`);
        }

        return autor;
    }

    crearUno(autorDto: AutorCreateDto): Promise<AutorEntity> {
        return this._autorRepository.save(autorDto);
    }

    editarUno(id: number, autorDto: AutorUpdateDto): Promise<AutorEntity> {
        return this._autorRepository.save(
            {...autorDto, id}
        );
    }

    async eliminarUno(id: number): Promise<boolean> {
        const autor: AutorEntity = await this.buscarUno(id);
        if (autor != null) {
            // Eliminar los libros del autor primero
            autor.libros.forEach(libro => this._libroRepository.delete(libro.id));
            // Luego eliminar al autor
            this._autorRepository.delete(id);
            return true;
        } else {
            return false;
        }

    }
}