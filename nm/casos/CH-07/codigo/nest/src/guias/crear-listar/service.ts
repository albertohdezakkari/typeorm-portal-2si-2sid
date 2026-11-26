import { Injectable } from '@nestjs/common';
import { GuiasRepository } from './repository';

@Injectable()
export class GuiasService {
  constructor(private readonly repository: GuiasRepository) {}

  crearGuiaService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearGuiaRepository(nombre, apellidos, email);
  }

  listarGuiasService() {
    return this.repository.listarGuiasRepository();
  }
}
