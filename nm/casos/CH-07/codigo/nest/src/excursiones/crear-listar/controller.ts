import { Controller, Post, Get, Body } from '@nestjs/common';
import { CrearListarService } from './service';

@Controller()
export class CrearListarController {
  constructor(private readonly service: CrearListarService) {}

  @Post('excursiones')
  async ejecutar(@Body() datos: { nombre: string; duracionHoras: number; agenciaId: number }) {
    return this.service.crearExcursionService(datos.nombre, datos.duracionHoras, datos.agenciaId);
  }

  @Get('excursiones')
  listar() {
    return this.service.listarExcursionesService();
  }
}
