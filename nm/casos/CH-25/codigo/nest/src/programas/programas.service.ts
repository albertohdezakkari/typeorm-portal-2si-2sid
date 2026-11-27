import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Programa } from './entities/programa.entity';
import { Emisora } from '../emisoras/entities/emisora.entity';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa) private readonly programas: Repository<Programa>,
    @InjectRepository(Emisora) private readonly emisoras: Repository<Emisora>
  ) {}

  crearPrograma(nombre: string, duracionMinutos: number, emisoraId: number) {
    const programa = this.programas.create({
      nombre,
      duracionMinutos,
      emisora: { id: emisoraId }
    });
    return this.programas.save(programa);
  }

  listarProgramas() {
    return this.programas.find({ relations: { emisora: true }, order: { id: 'ASC' } });
  }

  async eliminarPrograma(programaId: number) {
    await this.programas.delete(programaId);
  }

  async modificarDuracionMinutos(programaId: number, duracionMinutos: number) {
    await this.programas.update(programaId, { duracionMinutos });
    return this.programas.findOneBy({ id: programaId });
  }

  async cambiarEmisora(programaId: number, emisoraId: number) {
    await this.programas.update(programaId, { emisora: { id: emisoraId } });
    return this.programas.findOneBy({ id: programaId });
  }

  async consultarEmisora(emisoraId: number, minimo: number) {
    const emisora = await this.emisoras.findOneBy({ id: emisoraId });
    const programas = await this.programas.find({
      where: {
        emisora: { id: emisoraId },
        duracionMinutos: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { emisora, programas };
  }
}
