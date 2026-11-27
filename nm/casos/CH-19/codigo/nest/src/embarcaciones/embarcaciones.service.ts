import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Embarcacion } from './entities/embarcacion.entity';
import { Puerto } from '../puertos/entities/puerto.entity';

@Injectable()
export class EmbarcacionesService {
  constructor(
    @InjectRepository(Embarcacion) private readonly embarcaciones: Repository<Embarcacion>,
    @InjectRepository(Puerto) private readonly puertos: Repository<Puerto>
  ) {}

  crearEmbarcacion(nombre: string, esloraMetros: number, puertoId: number) {
    const embarcacion = this.embarcaciones.create({
      nombre,
      esloraMetros,
      puerto: { id: puertoId }
    });
    return this.embarcaciones.save(embarcacion);
  }

  listarEmbarcaciones() {
    return this.embarcaciones.find({ relations: { puerto: true }, order: { id: 'ASC' } });
  }

  async eliminarEmbarcacion(embarcacionId: number) {
    await this.embarcaciones.delete(embarcacionId);
  }

  async modificarEsloraMetros(embarcacionId: number, esloraMetros: number) {
    await this.embarcaciones.update(embarcacionId, { esloraMetros });
    return this.embarcaciones.findOneBy({ id: embarcacionId });
  }

  async cambiarPuerto(embarcacionId: number, puertoId: number) {
    await this.embarcaciones.update(embarcacionId, { puerto: { id: puertoId } });
    return this.embarcaciones.findOneBy({ id: embarcacionId });
  }

  async consultarPuerto(puertoId: number, minimo: number) {
    const puerto = await this.puertos.findOneBy({ id: puertoId });
    const embarcaciones = await this.embarcaciones.find({
      where: {
        puerto: { id: puertoId },
        esloraMetros: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { puerto, embarcaciones };
  }
}
