import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../entities/reparacion.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Reparacion) private readonly reparaciones: Repository<Reparacion>
  ) {}

  async eliminarReparacionRepository(reparacionId: number) {
    await this.reparaciones.delete(reparacionId);
  }
}
