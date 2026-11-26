import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zona } from '../entities/zona.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Zona) private readonly zonas: Repository<Zona>
  ) {}

  async eliminarZonaRepository(zonaId: number) {
    await this.zonas.delete(zonaId);
  }
}
