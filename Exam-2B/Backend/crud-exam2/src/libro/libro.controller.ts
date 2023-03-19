import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from "@nestjs/common";
import {LibroService} from "./libro.service";
import {LibroCreateDto} from "./dto/libro-create.dto";
import {LibroUpdateDto} from "./dto/libro-update.dto";
import {AutorService} from "../autor/autor.service";
import {validate} from "class-validator";
import {FindManyOptions} from "typeorm";
import {LibroEntity} from "./libro.entity";

@Controller('libro')
export class LibroController {

    constructor(
        private readonly _libroService: LibroService,
        private readonly _autorService: AutorService,
    ) {
    }

    @Get('/')
    @HttpCode(200)
    async listarTodos() {
        return this._libroService.buscarTodos({
                relations: ['autor']
        });
    }

    @Get('/:id')
    async listarUno(@Param() params) {
        return this._libroService.buscarUno(params.id);
    }

    @Get('byAutor/:id')
    async listarPorAutor(@Param() params) {
        return this._libroService.buscarLibrosPorAutor(params.id);
    }

    @Post('/')
    async crearUno(
        @Body() bodyParams
    ) {
        const libro = new LibroCreateDto();
        libro.tituloLibro = bodyParams.tituloLibro;
        libro.fechaPublicacion = new Date(Date.parse(bodyParams.fechaPublicacion));
        libro.precioLibro = bodyParams.precioLibro;
        libro.bestSeller = bodyParams.bestSeller;
        libro.autor = await this._autorService.buscarUno(bodyParams.autor);

        const arregloErrores = await validate(
            libro,
        )
        if (arregloErrores.length > 0) {
            console.error('Errores: ', arregloErrores);
            throw new Error('Error validando');
        }
        return this._libroService.crearUno(libro);
    }

    @Put('/:id')
    async editarUno(
        @Param() params,
        @Body() libro: LibroUpdateDto
    ) {
        return this._libroService.editarUno(params.id, libro);
    }

    @Delete('/:id')
    async eliminarUno(@Param() params) {
        return this._libroService.eliminarUno(params.id);
    }

}