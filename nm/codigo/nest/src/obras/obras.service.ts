import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Obra } from './entities/obra.entity';
import { Ayuntamiento } from '../ayuntamientos/entities/ayuntamiento.entity';

@Injectable()
export class ObrasService {
  constructor(
    @InjectRepository(Obra) private readonly obras: Repository<Obra>,
    @InjectRepository(Ayuntamiento) private readonly ayuntamientos: Repository<Ayuntamiento>
  ) {}

  crearObra(nombre: string, presupuestoEuros: number, ayuntamientoId: number) {
    const obra = this.obras.create({
      nombre,
      presupuestoEuros,
      ayuntamiento: { id: ayuntamientoId }
    });
    return this.obras.save(obra);
  }

  listarObras() {
    return this.obras.find({ relations: { ayuntamiento: true }, order: { id: 'ASC' } });
  }

  async eliminarObra(obraId: number) {
    await this.obras.delete(obraId);
  }

  async modificarPresupuesto(obraId: number, presupuestoEuros: number) {
    await this.obras.update(obraId, { presupuestoEuros });
    return this.obras.findOneBy({ id: obraId });
  }

  async cambiarAyuntamiento(obraId: number, ayuntamientoId: number) {
    await this.obras.update(obraId, { ayuntamiento: { id: ayuntamientoId } });
    return this.obras.findOneBy({ id: obraId });
  }

  async consultarAyuntamiento(ayuntamientoId: number, minimo: number) {
    const ayuntamiento = await this.ayuntamientos.findOneBy({ id: ayuntamientoId });
    const obras = await this.obras.find({
      where: {
        ayuntamiento: { id: ayuntamientoId },
        presupuestoEuros: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { ayuntamiento, obras };
  }
}
