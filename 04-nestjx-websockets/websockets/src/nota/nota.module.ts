import {Module} from "@nestjs/common";
import {NotaController} from "./nota.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {NotaEntity} from "./nota.entity";
import {NotaService} from "./nota.service";

@Module({
  imports: [TypeOrmModule.forFeature([NotaEntity])],
  controllers: [NotaController],
  providers: [NotaService],
    exports: [NotaService]
})
export class NotaModule {}