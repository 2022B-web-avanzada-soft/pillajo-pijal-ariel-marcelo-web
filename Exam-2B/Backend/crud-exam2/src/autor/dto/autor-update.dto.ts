import {IsBoolean, IsDate, IsIn, IsNotEmpty, IsNumber, IsString} from "class-validator";
export class AutorUpdateDto {
    @IsString()
    nombreAutor: string
    @IsDate()
    fechaNacimiento: Date;
    @IsNumber()
    numeroLibros: number;
    @IsBoolean()
    fallecido: boolean;
}