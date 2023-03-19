import {Injectable} from "@nestjs/common";
import {InjectDataSource} from "@nestjs/typeorm";
import {LibroEntity} from "./libro.entity";
import {DataSource, FindManyOptions} from "typeorm";
import {LibroCreateDto} from "./dto/libro-create.dto";
import {LibroUpdateDto} from "./dto/libro-update.dto";

@Injectable()
export class LibroService {
    constructor(
        @InjectDataSource('default')
        public dataSource: DataSource,
    ) {

    }
    private _libroRepository = this.dataSource.getRepository(LibroEntity);

    buscarTodos(opciones: FindManyOptions<LibroEntity>): Promise<LibroEntity[]> {
        return this._libroRepository.find(opciones);
    }

    buscarUno(id: number): Promise<LibroEntity> {
        const libro = this._libroRepository
            .createQueryBuilder('libro') // Seleccionar la entidad LibroEntity y asignarle un alias "libro"
            .leftJoinAndSelect('libro.autor', 'autor') // Incluir la relación con la entidad AutorEntity y asignarle un alias "autor"
            .where('libro.id = :id', { id }) // Filtrar por el id proporcionado
            .getOne(); // Obtener un solo resultado

        if (!libro) {
            throw new Error(`No se encontró un libro con el id ${id}`);
        }

        return libro;
    }

    buscarLibrosPorAutor(id: number): Promise<LibroEntity[]> {
        const libros = this._libroRepository
            .createQueryBuilder('libro') // Seleccionar la entidad LibroEntity y asignarle un alias "libro"
            .leftJoinAndSelect('libro.autor', 'autor') // Incluir la relación con la entidad AutorEntity y asignarle un alias "autor"
            .where('libro.autor = :id', { id }) // Filtrar por el id proporcionado
            .getMany(); // Obtener un solo resultado

        if (!libros) {
            throw new Error(`No se encontró un libro con el id ${id}`);
        }

        return libros;
    }

    crearUno(libroDto: LibroCreateDto) {
        return this._libroRepository.save(libroDto);
    }

    async editarUno(id: number, libroDto: LibroUpdateDto): Promise<LibroEntity> {
        const libroExistente = await this.buscarUno(id)
        if (!libroExistente) {
            throw new Error(`No se encontró un libro con el id ${id}`);
        }
        // Actualizar los campos del libro existente con los valores del DTO
        const libroActualizado = {
            ...libroExistente,
            ...libroDto,
        };
        // Guardar el libro actualizado en la base de datos
        return this._libroRepository.save(libroActualizado);
    }

    eliminarUno(id: number): boolean {
        if ( this.buscarUno(id) != null) {
            this._libroRepository.delete(id);
            return true;
        } else {
            return false;
        }
    }

}