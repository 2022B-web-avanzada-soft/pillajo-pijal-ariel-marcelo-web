import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule} from "@nestjs/typeorm";
import { AutorEntity } from './autor/autor.entity';
import { LibroEntity } from './libro/libro.entity';
import {LibroModule} from "./libro/libro.module";
import {AutorModule} from "./autor/autor.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
            type: 'sqlite',
            database: './bdd/bdd.sqlite',
            entities: [
                AutorEntity,
                LibroEntity,
            ],
            synchronize: true,
            dropSchema: false,
      }),
      LibroModule,
      AutorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
