import {IsBoolean, IsDate, IsIn, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {AutorEntity} from "../../autor/autor.entity";

export class LibroCreateDto {
    @IsNotEmpty()
    @IsString()
    tituloLibro: string;
    @IsDate()
    fechaPublicacion: Date;
    @IsNotEmpty()
    @IsNumber()
    precioLibro: number;
    @IsNotEmpty()
    @IsBoolean()
    bestSeller: boolean;
    @IsNotEmpty()
    autor: AutorEntity;
}