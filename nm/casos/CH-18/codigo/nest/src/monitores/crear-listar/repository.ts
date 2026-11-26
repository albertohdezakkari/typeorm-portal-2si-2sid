import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Monitor } from '../entities/monitor.entity';

@Injectable()
export class MonitoresRepository {
  constructor(
    @InjectRepository(Monitor) private readonly monitores: Repository<Monitor>
  ) {}

  crearMonitorRepository(nombre: string, apellidos: string, email: string) {
    const monitor = this.monitores.create({ nombre, apellidos, email });
    return this.monitores.save(monitor);
  }

  listarMonitoresRepository() {
    return this.monitores.find({ order: { id: 'ASC' } });
  }
}
