import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from "@nestjs/common";
import {AutorService} from "./autor.service";
import {AutorUpdateDto} from "./dto/autor-update.dto";
import {AutorCreateDto} from "./dto/autor-create.dto";
import {validate} from "class-validator";

@Controller('autor')
export class AutorController {
    constructor(private readonly _autorService: AutorService) {
    }
    @Get('/')
    async listarTodos() {
        return this._autorService.buscarTodos();
    }
    @Get('/:id')
    async listarUno(@Param() params) {
        return this._autorService.buscarUno(params.id);
    }
    @Post('/')
    @HttpCode(201)
    async crearUno(
        @Body() bodyParams
    ) {
        const nuevoAutor = new AutorCreateDto();
        nuevoAutor.nombreAutor = bodyParams.nombreAutor;
        nuevoAutor.fechaNacimiento = new Date ( Date.parse(bodyParams.fechaNacimiento));
        nuevoAutor.numeroLibros = bodyParams.numeroLibros;
        nuevoAutor.fallecido = bodyParams.fallecido;
        const arregloErrores = await validate(
            nuevoAutor
        );
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Error de validacion',
                arregloErrores
            });
        }
        return this._autorService.crearUno(nuevoAutor);
    }
    @Put('/:id')
    async editarUno(
        @Param() params,
        @Body() bodyParams ) {
        const autor = new AutorUpdateDto();
        autor.nombreAutor = bodyParams.nombreAutor;
        autor.fechaNacimiento = new Date ( Date.parse(bodyParams.fechaNacimiento));
        autor.numeroLibros = bodyParams.numeroLibros;
        autor.fallecido = bodyParams.fallecido;
        const arregloErrores = await validate(
            autor
        );
        if (arregloErrores.length > 0) {
            console.error({arregloErrores});
            throw new BadRequestException({
                mensaje: 'Error de validacion',
                arregloErrores
            });
        }
        return this._autorService.editarUno(
            +params.id,
            autor);
    }
    @Delete('/:id')
    async eliminarUno(@Param() params) {
        return this._autorService.eliminarUno(params.id);
    }
}