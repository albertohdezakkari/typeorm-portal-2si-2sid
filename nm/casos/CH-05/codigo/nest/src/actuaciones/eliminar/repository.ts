import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actuacion } from '../entities/actuacion.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Actuacion) private readonly actuaciones: Repository<Actuacion>
  ) {}

  async eliminarActuacionRepository(actuacionId: number) {
    await this.actuaciones.delete(actuacionId);
  }
}
