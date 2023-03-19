import {Module} from "@nestjs/common";
import {LibroController} from "./libro.controller";
import {LibroService} from "./libro.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LibroEntity} from "./libro.entity";
import {AutorEntity} from "../autor/autor.entity";
import {AutorController} from "../autor/autor.controller";
import {AutorService} from "../autor/autor.service";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature(
                [ LibroEntity, AutorEntity ],
                'default'
            )
        ],
        controllers: [LibroController],
        providers: [LibroService, AutorService],
        exports: [LibroService, AutorService]
    }
)
export class LibroModule {}