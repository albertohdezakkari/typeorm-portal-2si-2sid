import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Taller } from './entities/taller.entity';

@Injectable()
export class TalleresService {
  constructor(
    @InjectRepository(Taller) private readonly talleres: Repository<Taller>
  ) {}

  crearTaller(nombre: string) {
    const taller = this.talleres.create({ nombre });
    return this.talleres.save(taller);
  }

  listarTalleres() {
    return this.talleres.find({ order: { id: 'ASC' } });
  }
}