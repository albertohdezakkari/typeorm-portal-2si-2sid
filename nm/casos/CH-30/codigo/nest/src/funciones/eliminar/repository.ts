import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from '../entities/funcion.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Funcion) private readonly funciones: Repository<Funcion>
  ) {}

  async eliminarFuncionRepository(funcionId: number) {
    await this.funciones.delete(funcionId);
  }
}
