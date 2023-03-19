import {IsIn, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class LibroUpdateDto {
    @IsString()
    titulo: string;
    @IsString()
    fechaPublicacion: Date;
    @IsNumber()
    precioLibro: number;
    @IsIn([true, false])
    bestSeller: boolean;

}