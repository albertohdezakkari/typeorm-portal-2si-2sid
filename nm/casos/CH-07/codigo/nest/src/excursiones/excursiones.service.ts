import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Excursion } from './entities/excursion.entity';
import { Agencia } from '../agencias/entities/agencia.entity';

@Injectable()
export class ExcursionesService {
  constructor(
    @InjectRepository(Excursion) private readonly excursiones: Repository<Excursion>,
    @InjectRepository(Agencia) private readonly agencias: Repository<Agencia>
  ) {}

  crearExcursion(nombre: string, duracionHoras: number, agenciaId: number) {
    const excursion = this.excursiones.create({
      nombre,
      duracionHoras,
      agencia: { id: agenciaId }
    });
    return this.excursiones.save(excursion);
  }

  listarExcursiones() {
    return this.excursiones.find({ relations: { agencia: true }, order: { id: 'ASC' } });
  }

  async eliminarExcursion(excursionId: number) {
    await this.excursiones.delete(excursionId);
  }

  async modificarDuracionHoras(excursionId: number, duracionHoras: number) {
    await this.excursiones.update(excursionId, { duracionHoras });
    return this.excursiones.findOneBy({ id: excursionId });
  }

  async cambiarAgencia(excursionId: number, agenciaId: number) {
    await this.excursiones.update(excursionId, { agencia: { id: agenciaId } });
    return this.excursiones.findOneBy({ id: excursionId });
  }

  async consultarAgencia(agenciaId: number, minimo: number) {
    const agencia = await this.agencias.findOneBy({ id: agenciaId });
    const excursiones = await this.excursiones.find({
      where: {
        agencia: { id: agenciaId },
        duracionHoras: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { agencia, excursiones };
  }
}
