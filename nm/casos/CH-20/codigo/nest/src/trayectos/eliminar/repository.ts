import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trayecto } from '../entities/trayecto.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Trayecto) private readonly trayectos: Repository<Trayecto>
  ) {}

  async eliminarTrayectoRepository(trayectoId: number) {
    await this.trayectos.delete(trayectoId);
  }
}
