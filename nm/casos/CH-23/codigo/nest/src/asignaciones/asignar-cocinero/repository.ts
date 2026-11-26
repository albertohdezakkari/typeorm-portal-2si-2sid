import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Comanda } from '../../comandas/entities/comanda.entity';
import { Cocinero } from '../../cocineros/entities/cocinero.entity';

@Injectable()
export class AsignarCocineroRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Comanda) private readonly comandas: Repository<Comanda>,
    @InjectRepository(Cocinero) private readonly cocineros: Repository<Cocinero>
  ) {}

  buscarComandaRepository(comandaId: number) {
    return this.comandas.findOneBy({ id: comandaId });
  }

  buscarCocineroRepository(cocineroId: number) {
    return this.cocineros.findOneBy({ id: cocineroId });
  }

  async asignarCocineroRepository(comandaId: number, cocineroId: number, rol: string) {
    const asignacion = { comandaId, cocineroId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}
