import { Injectable } from '@nestjs/common';
import { VendedoresRepository } from './repository';

@Injectable()
export class VendedoresService {
  constructor(private readonly repository: VendedoresRepository) {}

  crearVendedorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearVendedorRepository(nombre, apellidos, email);
  }

  listarVendedoresService() {
    return this.repository.listarVendedoresRepository();
  }
}
