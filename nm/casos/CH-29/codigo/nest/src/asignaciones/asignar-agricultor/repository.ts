import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Cosecha } from '../../cosechas/entities/cosecha.entity';
import { Agricultor } from '../../agricultores/entities/agricultor.entity';

@Injectable()
export class AsignarAgricultorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Cosecha) private readonly cosechas: Repository<Cosecha>,
    @InjectRepository(Agricultor) private readonly agricultores: Repository<Agricultor>
  ) {}

  buscarCosechaRepository(cosechaId: number) {
    return this.cosechas.findOneBy({ id: cosechaId });
  }

  buscarAgricultorRepository(agricultorId: number) {
    return this.agricultores.findOneBy({ id: agricultorId });
  }

  async asignarAgricultorRepository(cosechaId: number, agricultorId: number, rol: string) {
    const asignacion = { cosechaId, agricultorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}
