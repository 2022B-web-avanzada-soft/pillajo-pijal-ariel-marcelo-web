import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";
import {UsuarioController} from "./usuario.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [ UsuarioEntity ],
            'default'
        ),
    ],
    providers: [UsuarioService ],
    exports: [UsuarioService ],
    controllers: [UsuarioController ],
})

export class UsuarioModule {}