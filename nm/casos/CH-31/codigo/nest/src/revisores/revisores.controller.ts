import { Body, Controller, Get, Post } from '@nestjs/common';
import { RevisoresService } from './revisores.service';

@Controller('revisores')
export class RevisoresController {
  constructor(private readonly service: RevisoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearRevisor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarRevisores();
  }
}
