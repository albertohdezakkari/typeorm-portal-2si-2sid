import { Body, Controller, Get, Post } from '@nestjs/common';
import { InspectoresService } from './service';

@Controller('inspectores')
export class InspectoresController {
  constructor(private readonly service: InspectoresService) {}

  @Post()
  crear(@Body() datos: { nombre: string; apellidos: string; email: string }) {
    return this.service.crearInspectorService(datos.nombre, datos.apellidos, datos.email);
  }

  @Get()
  listar() {
    return this.service.listarInspectoresService();
  }
}
