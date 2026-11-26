import { Injectable } from '@nestjs/common';
import { HuespedesRepository } from './repository';

@Injectable()
export class HuespedesService {
  constructor(private readonly repository: HuespedesRepository) {}

  crearHuespedService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearHuespedRepository(nombre, apellidos, email);
  }

  listarHuespedesService() {
    return this.repository.listarHuespedesRepository();
  }
}
