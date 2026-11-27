import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Pista } from './entities/pista.entity';
import { Complejo } from '../complejos/entities/complejo.entity';

@Injectable()
export class PistasService {
  constructor(
    @InjectRepository(Pista) private readonly pistas: Repository<Pista>,
    @InjectRepository(Complejo) private readonly complejos: Repository<Complejo>
  ) {}

  crearPista(nombre: string, superficieM2: number, complejoId: number) {
    const pista = this.pistas.create({
      nombre,
      superficieM2,
      complejo: { id: complejoId }
    });
    return this.pistas.save(pista);
  }

  listarPistas() {
    return this.pistas.find({ order: { id: 'ASC' } });
  }

  async eliminarPista(pistaId: number) {
    await this.pistas.delete(pistaId);
  }

  async modificarSuperficieM2(pistaId: number, superficieM2: number) {
    await this.pistas.update(pistaId, { superficieM2 });
    return this.pistas.findOneBy({ id: pistaId });
  }

  async cambiarComplejo(pistaId: number, complejoId: number) {
    await this.pistas.update(pistaId, { complejo: { id: complejoId } });
    return this.pistas.findOneBy({ id: pistaId });
  }

  async consultarComplejo(complejoId: number, minimo: number) {
    const complejo = await this.complejos.findOneBy({ id: complejoId });
    const pistas = await this.pistas.find({
      where: {
        complejo: { id: complejoId },
        superficieM2: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { complejo, pistas };
  }
}
