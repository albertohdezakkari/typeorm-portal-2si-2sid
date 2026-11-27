import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Escena } from './entities/escena.entity';
import { Estudio } from '../estudios/entities/estudio.entity';

@Injectable()
export class EscenasService {
  constructor(
    @InjectRepository(Escena) private readonly escenas: Repository<Escena>,
    @InjectRepository(Estudio) private readonly estudios: Repository<Estudio>
  ) {}

  crearEscena(nombre: string, duracionSegundos: number, estudioId: number) {
    const escena = this.escenas.create({
      nombre,
      duracionSegundos,
      estudio: { id: estudioId }
    });
    return this.escenas.save(escena);
  }

  listarEscenas() {
    return this.escenas.find({ relations: { estudio: true }, order: { id: 'ASC' } });
  }

  async eliminarEscena(escenaId: number) {
    await this.escenas.delete(escenaId);
  }

  async modificarDuracionSegundos(escenaId: number, duracionSegundos: number) {
    await this.escenas.update(escenaId, { duracionSegundos });
    return this.escenas.findOneBy({ id: escenaId });
  }

  async cambiarEstudio(escenaId: number, estudioId: number) {
    await this.escenas.update(escenaId, { estudio: { id: estudioId } });
    return this.escenas.findOneBy({ id: escenaId });
  }

  async consultarEstudio(estudioId: number, minimo: number) {
    const estudio = await this.estudios.findOneBy({ id: estudioId });
    const escenas = await this.escenas.find({
      where: {
        estudio: { id: estudioId },
        duracionSegundos: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { estudio, escenas };
  }
}
