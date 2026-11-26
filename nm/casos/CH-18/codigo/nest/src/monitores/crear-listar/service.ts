import { Injectable } from '@nestjs/common';
import { MonitoresRepository } from './repository';

@Injectable()
export class MonitoresService {
  constructor(private readonly repository: MonitoresRepository) {}

  crearMonitorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearMonitorRepository(nombre, apellidos, email);
  }

  listarMonitoresService() {
    return this.repository.listarMonitoresRepository();
  }
}
