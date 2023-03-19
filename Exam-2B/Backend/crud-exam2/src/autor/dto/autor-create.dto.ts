import {IsBoolean, IsDate, IsIn, IsNotEmpty, IsNumber, IsString} from "class-validator";
export class AutorCreateDto {
    @IsNotEmpty()
    @IsString()
    nombreAutor: string
    @IsDate()
    fechaNacimiento: Date;
    @IsNumber()
    numeroLibros: number;
    @IsNotEmpty()
    @IsBoolean()
    fallecido: boolean;

}