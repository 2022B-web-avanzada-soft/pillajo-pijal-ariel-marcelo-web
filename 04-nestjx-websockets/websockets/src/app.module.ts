import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventosModule} from "./eventos/eventos.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
    imports: [
        EventosModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: './bdd/bdd.sqlite',
            entities: [
                UsuarioEntity,
            ],
          synchronize: true,// true => edita tablas y columnas // false nada
          dropSchema: false, // true => elimina toda la bdd // false nada
        }),
        UsuarioModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
