import {Injectable} from '@nestjs/common';
import {UsuarioEntity} from "./usuario.entity";
import {DataSource} from "typeorm";
import {InjectDataSource} from "@nestjs/typeorm";

@Injectable()
export class UsuarioService{
    constructor(
    @InjectDataSource()
    public usuarioRespository: DataSource
    ) {

    }
}