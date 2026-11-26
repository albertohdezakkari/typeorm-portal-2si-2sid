import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Plaza } from '../../plazas/entities/plaza.entity';
import { Tecnico } from '../../tecnicos/entities/tecnico.entity';

@Injectable()
export class AsignarTecnicoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Plaza) private readonly plazas: Repository<Plaza>,
    @InjectRepository(Tecnico) private readonly tecnicos: Repository<Tecnico>
  ) {}

  buscarPlazaRepository(plazaId: number) {
    return this.plazas.findOneBy({ id: plazaId });
  }

  buscarTecnicoRepository(tecnicoId: number) {
    return this.tecnicos.findOneBy({ id: tecnicoId });
  }

  async asignarTecnicoRepository(plazaId: number, tecnicoId: number, rol: string) {
    const asignacion = { plazaId, tecnicoId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}
