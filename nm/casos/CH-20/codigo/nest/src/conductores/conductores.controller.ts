import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConductoresService } from './conductores.service';

@Controller('conductores')
export class ConductoresController {
  constructor(private readonly service: ConductoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearConductor(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarConductores();
  }
}
