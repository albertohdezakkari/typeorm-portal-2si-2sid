import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Planta } from '../../plantas/entities/planta.entity';
import { Jardinero } from '../../jardineros/entities/jardinero.entity';

@Injectable()
export class AsignarJardineroRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Planta) private readonly plantas: Repository<Planta>,
    @InjectRepository(Jardinero) private readonly jardineros: Repository<Jardinero>
  ) {}

  buscarPlantaRepository(plantaId: number) {
    return this.plantas.findOneBy({ id: plantaId });
  }

  buscarJardineroRepository(jardineroId: number) {
    return this.jardineros.findOneBy({ id: jardineroId });
  }

  async asignarJardineroRepository(plantaId: number, jardineroId: number, rol: string) {
    const asignacion = { plantaId, jardineroId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}
